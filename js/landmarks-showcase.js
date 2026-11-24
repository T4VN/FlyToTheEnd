/**
 * FLY TO THE END - Unified 3D Models Showcase (63 Landmarks + 8 Hazards)
 * Renders real in-game 3D Low-poly models lazily via IntersectionObserver,
 * a single shared offscreen WebGLRenderer (auto-disposed when idle),
 * live animated 3D hover preview, and an interactive 360-degree 3D Modal Viewer.
 */
(function () {
  'use strict';

  if (typeof THREE === 'undefined') return;

  const landmarksCatalog = window.VietnamLandmarksCatalog || null;
  const hazardsCatalog = window.GameHazardsCatalog || null;

  const landmarkBoxes = landmarksCatalog
    ? Array.from(document.querySelectorAll('.landmark-preview[data-landmark-id]'))
    : [];
  const hazardBoxes = hazardsCatalog
    ? Array.from(document.querySelectorAll('.hazard-preview[data-hazard-id]'))
    : [];

  const allPreviewBoxes = hazardBoxes.concat(landmarkBoxes);
  if (allPreviewBoxes.length === 0) return;

  function getBoxMeta(el) {
    if (el.dataset.hazardId) {
      return { kind: 'hazard', id: el.dataset.hazardId, catalog: hazardsCatalog };
    }
    return { kind: 'landmark', id: el.dataset.landmarkId, catalog: landmarksCatalog };
  }

  // Per-model flattering default 3/4 rotation angles
  function getDefaultAngles(kind, id) {
    if (kind === 'hazard') {
      if (id === 'hazard_bird' || id === 'hazard_rival_plane') {
        return { x: 0.16, y: 0.52 };
      }
      if (id === 'hazard_comet' || id === 'hazard_missile') {
        return { x: 0.1, y: 0.25 };
      }
      if (id === 'hazard_lightning') {
        return { x: 0.08, y: -0.22 };
      }
      return { x: 0.14, y: -0.35 };
    }
    return { x: 0.08, y: -0.44 };
  }

  // Cache built 3D models and deduplicate in-flight builds
  const modelCache = Object.create(null);
  const modelPromises = Object.create(null);

  // Calibrated for Three.js r187 physical lighting units
  function createLighting(scene) {
    const hemi = new THREE.HemisphereLight(0xfff9f0, 0x7c5c38, 1.85);
    const ambient = new THREE.AmbientLight(0xdc8874, 0.85);
    const sun = new THREE.DirectionalLight(0xffffff, 2.35);
    sun.position.set(130, 220, 190);
    const rim = new THREE.DirectionalLight(0x93c5fd, 0.72);
    rim.position.set(-140, 90, -160);

    scene.add(hemi);
    scene.add(ambient);
    scene.add(sun);
    scene.add(rim);
  }

  function wrapMeshEntry(kind, id, catalog, mesh) {
    if (!mesh) return null;
    const fire = mesh.getObjectByName('anim_dragon_fire');
    if (fire) {
      fire.visible = true;
      fire.scale.set(1.05, 0.95, 0.95);
    }

    const pivot = new THREE.Object3D();
    pivot.add(mesh);
    mesh.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(mesh);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    mesh.position.set(-center.x, -center.y, -center.z);

    const entry = {
      kind: kind,
      id: id,
      catalog: catalog,
      pivot: pivot,
      mesh: mesh,
      size: size,
    };
    modelCache[kind + ':' + id] = entry;
    return entry;
  }

  function prepareModelAsync(kind, id, catalog) {
    const cacheKey = kind + ':' + id;
    if (modelCache[cacheKey]) return Promise.resolve(modelCache[cacheKey]);
    if (modelPromises[cacheKey]) return modelPromises[cacheKey];
    if (!catalog) return Promise.resolve(null);

    let promise;
    if (typeof catalog.loadById === 'function') {
      promise = catalog.loadById(id).then(function (mesh) {
        return modelCache[cacheKey] || wrapMeshEntry(kind, id, catalog, mesh);
      });
    } else {
      promise = Promise.resolve(wrapMeshEntry(kind, id, catalog, catalog.buildById(id)));
    }

    modelPromises[cacheKey] = promise;
    promise.finally(function () {
      delete modelPromises[cacheKey];
    });
    return promise;
  }

  function computeCameraDistance(size, fovDeg, aspect, paddingFactor) {
    const vFov = (fovDeg * Math.PI) / 180;
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    const effW = Math.max(size.x, size.z) * 1.06;
    const effH = size.y * 1.08;
    const distV = (effH * 0.5) / Math.tan(vFov * 0.5);
    const distH = (effW * 0.5) / Math.tan(hFov * 0.5);
    return Math.max(distV, distH) * (paddingFactor || 1.32);
  }

  function showPreviewFallback(previewEl, text) {
    if (previewEl.querySelector('.preview-fallback-msg')) return;
    const msg = document.createElement('span');
    msg.className = 'preview-fallback-msg';
    msg.textContent = text;
    previewEl.appendChild(msg);
  }

  // =========================================================================
  // 1. SINGLE SHARED OFFSCREEN SNAPSHOT RENDERER (lazy via IntersectionObserver)
  // =========================================================================
  let thumbRenderer = null;
  let thumbScene = null;
  let thumbCamera = null;
  let thumbIdleTimer = 0;
  let webglUnavailable = false;
  const THUMB_W = 520;
  const THUMB_H = 325;

  function initThumbRenderer() {
    if (thumbRenderer) return true;
    if (webglUnavailable) return false;
    try {
      thumbScene = new THREE.Scene();
      createLighting(thumbScene);
      thumbCamera = new THREE.PerspectiveCamera(38, THUMB_W / THUMB_H, 1, 3000);
      thumbRenderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      thumbRenderer.setPixelRatio(1);
      thumbRenderer.setSize(THUMB_W, THUMB_H, false);
      thumbRenderer.setClearColor(0x000000, 0);
      return true;
    } catch (e) {
      webglUnavailable = true;
      console.warn('WebGL thumbnail renderer unavailable:', e);
      return false;
    }
  }

  function disposeThumbRenderer() {
    if (thumbIdleTimer) {
      clearTimeout(thumbIdleTimer);
      thumbIdleTimer = 0;
    }
    if (thumbRenderer) {
      thumbRenderer.dispose();
      thumbRenderer = null;
    }
    thumbScene = null;
    thumbCamera = null;
  }

  function scheduleThumbIdleDispose() {
    if (thumbIdleTimer) clearTimeout(thumbIdleTimer);
    thumbIdleTimer = window.setTimeout(function () {
      if (activeThumbs === 0 && renderQueue.length === 0) {
        disposeThumbRenderer();
      }
    }, 15000);
  }

  const deferredThumbBoxes = new Set();

  function renderThumbnail(previewEl) {
    const meta = getBoxMeta(previewEl);
    const targetCanvas = previewEl.querySelector('canvas.landmark-thumb, canvas.hazard-thumb');
    if (!meta.id || !meta.catalog || !targetCanvas || previewEl.dataset.rendered === '1') {
      return Promise.resolve();
    }
    if (!initThumbRenderer()) {
      showPreviewFallback(previewEl, 'Trình duyệt chưa hỗ trợ WebGL 3D');
      return Promise.resolve();
    }

    return prepareModelAsync(meta.kind, meta.id, meta.catalog).then(function (entry) {
      if (previewEl.dataset.rendered === '1') return;
      if (!entry) {
        showPreviewFallback(previewEl, 'Không tải được mô hình 3D');
        return;
      }

      // Never steal entry.pivot while it is actively mounted in the live hover/modal scene
      if (liveEntry === entry && liveMode !== 'idle') {
        deferredThumbBoxes.add(previewEl);
        return;
      }

      if (!initThumbRenderer()) return;

      if (entry.pivot.parent) {
        entry.pivot.parent.remove(entry.pivot);
      }

      const angles = getDefaultAngles(meta.kind, meta.id);
      entry.pivot.rotation.set(angles.x, angles.y, 0);

      const fire = entry.mesh.getObjectByName('anim_dragon_fire');
      if (fire) {
        fire.visible = true;
        fire.scale.set(1.08, 0.98, 0.98);
      }

      thumbScene.add(entry.pivot);

      const pad = (meta.id === 'hazard_bird' || meta.id === 'hazard_rival_plane')
        ? 1.48
        : (meta.kind === 'hazard' ? 1.32 : 1.34);
      const camDist = computeCameraDistance(entry.size, 38, THUMB_W / THUMB_H, pad);
      thumbCamera.position.set(0, camDist * 0.25, camDist);
      thumbCamera.lookAt(0, 0, 0);
      thumbCamera.updateProjectionMatrix();

      thumbRenderer.render(thumbScene, thumbCamera);
      thumbScene.remove(entry.pivot);

      targetCanvas.width = THUMB_W;
      targetCanvas.height = THUMB_H;
      const ctx = targetCanvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, THUMB_W, THUMB_H);
        ctx.drawImage(thumbRenderer.domElement, 0, 0, THUMB_W, THUMB_H);
      }
      previewEl.dataset.rendered = '1';
      previewEl.classList.add('is-ready');
      const oldFallback = previewEl.querySelector('.preview-fallback-msg');
      if (oldFallback) oldFallback.remove();
    });
  }

  // Lazy IntersectionObserver queue (fetches & renders only visible/nearby cards)
  const renderQueue = [];
  const queuedBoxes = new WeakSet();
  const MAX_CONCURRENT_THUMBS = 5;
  let activeThumbs = 0;

  function enqueueBox(box) {
    if (queuedBoxes.has(box) || box.dataset.rendered === '1') return;
    queuedBoxes.add(box);
    renderQueue.push(box);
    pumpRenderQueue();
  }

  function pumpRenderQueue() {
    if (thumbIdleTimer) {
      clearTimeout(thumbIdleTimer);
      thumbIdleTimer = 0;
    }
    while (activeThumbs < MAX_CONCURRENT_THUMBS && renderQueue.length > 0) {
      const box = renderQueue.shift();
      activeThumbs++;
      renderThumbnail(box).finally(function () {
        activeThumbs--;
        if (renderQueue.length > 0) {
          requestAnimationFrame(pumpRenderQueue);
        } else if (activeThumbs === 0) {
          scheduleThumbIdleDispose();
        }
      });
    }
  }

  if (typeof IntersectionObserver === 'function') {
    const thumbObserver = new IntersectionObserver(function (entries) {
      for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          const box = entries[i].target;
          thumbObserver.unobserve(box);
          enqueueBox(box);
        }
      }
    }, { rootMargin: '280px 0px' });

    allPreviewBoxes.forEach(function (box) {
      thumbObserver.observe(box);
    });
  } else {
    allPreviewBoxes.forEach(enqueueBox);
  }

  // =========================================================================
  // 2. SINGLE SHARED LIVE 3D RENDERER (used for card hover spin & 360° modal)
  // =========================================================================
  let liveRenderer = null;
  let liveScene = null;
  let liveCamera = null;
  let liveEntry = null;
  let liveHost = null;
  let pendingHoverHost = null;
  let liveMode = 'idle'; // 'idle' | 'hover' | 'modal'
  let rafId = 0;
  let isContextLost = false;

  let rotY = -0.44;
  let rotX = 0.14;
  let targetRotY = -0.44;
  let targetRotX = 0.14;
  let zoomFactor = 1.0;
  let targetZoom = 1.0;
  let autoRotate = true;
  let isDragging = false;
  let dragLastX = 0;
  let dragLastY = 0;

  function ensureLiveRenderer() {
    if (liveRenderer) return true;
    if (webglUnavailable) return false;
    try {
      liveScene = new THREE.Scene();
      createLighting(liveScene);
      liveCamera = new THREE.PerspectiveCamera(38, 1.6, 1, 3000);
      liveRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      liveRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      liveRenderer.setClearColor(0x000000, 0);
      liveRenderer.domElement.className = 'landmark-live-canvas';
      liveRenderer.domElement.addEventListener('webglcontextlost', function (e) {
        e.preventDefault();
        isContextLost = true;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      });
      liveRenderer.domElement.addEventListener('webglcontextrestored', function () {
        isContextLost = false;
        if (liveMode !== 'idle' && liveEntry && !document.hidden) {
          startLiveLoop();
        }
      });
      return true;
    } catch (e) {
      webglUnavailable = true;
      console.warn('WebGL live renderer unavailable:', e);
      return false;
    }
  }

  function resizeLiveRenderer() {
    if (!liveRenderer || !liveHost || !liveCamera) return;
    const w = Math.max(120, liveHost.clientWidth || 320);
    const h = Math.max(120, liveHost.clientHeight || 200);
    liveRenderer.setSize(w, h, false);
    liveCamera.aspect = w / h;
    liveCamera.updateProjectionMatrix();
  }

  function renderModalStageFallback(hostEl, msg, onRetry) {
    hostEl.textContent = '';
    const wrap = document.createElement('div');
    wrap.className = 'stage-fallback-box';
    const p = document.createElement('p');
    p.textContent = msg;
    wrap.appendChild(p);
    if (typeof onRetry === 'function') {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'modal-tool-btn';
      btn.textContent = '↻ Thử lại';
      btn.addEventListener('click', onRetry);
      wrap.appendChild(btn);
    }
    hostEl.appendChild(wrap);
  }

  let mountRequestToken = 0;

  function mountLiveModel(kind, id, catalog, hostEl, mode) {
    if (!ensureLiveRenderer()) {
      if (mode === 'modal') {
        renderModalStageFallback(hostEl, 'Trình duyệt của bạn không hỗ trợ WebGL 3D.');
      }
      return;
    }
    const token = ++mountRequestToken;
    pendingHoverHost = mode === 'hover' ? hostEl : null;

    if (mode === 'modal') {
      const existingFallback = hostEl.querySelector('.stage-fallback-box');
      if (existingFallback) existingFallback.remove();
    }

    prepareModelAsync(kind, id, catalog).then(function (entry) {
      if (token !== mountRequestToken) return;
      if (mode === 'hover' && pendingHoverHost !== hostEl) return;

      if (!entry) {
        if (mode === 'modal') {
          renderModalStageFallback(
            hostEl,
            'Không thể tải mô hình 3D lúc này. Vui lòng kiểm tra kết nối mạng.',
            function () { mountLiveModel(kind, id, catalog, hostEl, mode); }
          );
        }
        return;
      }

      if (liveEntry && liveEntry.pivot.parent === liveScene) {
        liveScene.remove(liveEntry.pivot);
      }
      if (entry.pivot.parent) {
        entry.pivot.parent.remove(entry.pivot);
      }

      liveEntry = entry;
      liveMode = mode;
      liveHost = hostEl;
      if (mode === 'hover') pendingHoverHost = null;

      if (liveRenderer.domElement.parentNode !== hostEl) {
        hostEl.appendChild(liveRenderer.domElement);
      }

      liveScene.add(entry.pivot);
      resizeLiveRenderer();

      const angles = getDefaultAngles(kind, id);
      rotY = angles.y;
      rotX = mode === 'modal' ? Math.max(0.12, angles.x) : angles.x;
      targetRotY = rotY;
      targetRotX = rotX;
      zoomFactor = 1.0;
      targetZoom = 1.0;
      autoRotate = true;
      updateAutoRotateBtn();

      startLiveLoop();
    });
  }

  function unmountLiveModel() {
    mountRequestToken++;
    pendingHoverHost = null;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    if (liveEntry && liveScene && liveEntry.pivot.parent === liveScene) {
      liveScene.remove(liveEntry.pivot);
    }
    if (liveRenderer && liveRenderer.domElement.parentNode) {
      liveRenderer.domElement.parentNode.removeChild(liveRenderer.domElement);
    }
    liveEntry = null;
    liveHost = null;
    liveMode = 'idle';

    // Render any card thumbnails that were deferred while their model was live
    if (deferredThumbBoxes.size > 0) {
      const pending = Array.from(deferredThumbBoxes);
      deferredThumbBoxes.clear();
      pending.forEach(function (box) {
        if (box.dataset.rendered !== '1') {
          renderQueue.push(box);
        }
      });
      pumpRenderQueue();
    }
  }

  function startLiveLoop() {
    if (rafId) cancelAnimationFrame(rafId);
    if (document.hidden || isContextLost) return;
    let lastTime = performance.now();

    function tick() {
      if (liveMode === 'idle' || !liveEntry || !liveRenderer || document.hidden || isContextLost) {
        rafId = 0;
        return;
      }

      const now = performance.now();
      const dt = Math.min(50, Math.max(0, now - lastTime));
      const dtSec = dt / 1000;
      lastTime = now;

      if (liveMode === 'hover') {
        targetRotY += dt * 0.0008;
      } else if (liveMode === 'modal' && autoRotate && !isDragging) {
        targetRotY += dt * 0.00055;
      }

      // Frame-rate independent exponential smoothing
      const damp = 1 - Math.exp(-9 * dtSec);
      rotY += (targetRotY - rotY) * damp;
      rotX += (targetRotX - rotX) * damp;
      zoomFactor += (targetZoom - zoomFactor) * damp;

      liveEntry.pivot.rotation.set(rotX, rotY, 0);
      if (liveEntry.catalog && liveEntry.catalog.animate) {
        liveEntry.catalog.animate(liveEntry.mesh, now);
      }

      const pad = (liveEntry.id === 'hazard_bird' || liveEntry.id === 'hazard_rival_plane')
        ? 1.45
        : (liveEntry.kind === 'hazard' ? 1.32 : 1.34);
      const baseDist = computeCameraDistance(liveEntry.size, 38, liveCamera.aspect, pad);
      const camDist = baseDist / zoomFactor;
      liveCamera.position.set(0, camDist * 0.24, camDist);
      liveCamera.lookAt(0, 0, 0);

      liveRenderer.render(liveScene, liveCamera);
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    } else if (liveMode !== 'idle' && liveEntry && !isContextLost && !rafId) {
      startLiveLoop();
    }
  });

  // Hover live preview on desktop devices (only when modal is closed)
  const canHover = window.matchMedia && window.matchMedia('(hover: hover)').matches;
  if (canHover) {
    allPreviewBoxes.forEach(function (box) {
      box.addEventListener('mouseenter', function () {
        if (liveMode === 'modal') return;
        const meta = getBoxMeta(box);
        if (!meta.id || !meta.catalog) return;
        box.classList.add('is-live');
        mountLiveModel(meta.kind, meta.id, meta.catalog, box, 'hover');
      });

      box.addEventListener('mouseleave', function () {
        box.classList.remove('is-live');
        if (pendingHoverHost === box || (liveMode === 'hover' && liveHost === box)) {
          unmountLiveModel();
        }
      });
    });
  }

  // =========================================================================
  // 3. INTERACTIVE 360° 3D INSPECTOR MODAL (scoped to visible page cards)
  // =========================================================================
  const modal = document.getElementById('landmarkModal');
  const modalStage = document.getElementById('landmarkModalStage');
  const modalNum = document.getElementById('landmarkModalNum');
  const modalRegion = document.getElementById('landmarkModalRegion');
  const modalName = document.getElementById('landmarkModalName');
  const modalLoc = document.getElementById('landmarkModalLoc');
  const modalDesc = document.getElementById('landmarkModalDesc');
  const modalTag = document.getElementById('landmarkModalTag');
  const btnModalClose = document.getElementById('landmarkModalClose');
  const btnModalPrev = document.getElementById('landmarkModalPrev');
  const btnModalNext = document.getElementById('landmarkModalNext');
  const btnZoomIn = document.getElementById('landmarkZoomIn');
  const btnZoomOut = document.getElementById('landmarkZoomOut');
  const btnAutoRotate = document.getElementById('landmarkAutoRotate');

  let activeModalKind = 'landmark';
  let currentModalIndex = 0;
  let lastFocusedEl = null;

  function updateAutoRotateBtn() {
    if (!btnAutoRotate) return;
    btnAutoRotate.classList.toggle('is-active', autoRotate);
    btnAutoRotate.setAttribute('aria-pressed', autoRotate ? 'true' : 'false');
  }

  function getBoxesForKind(kind) {
    return kind === 'hazard' ? hazardBoxes : landmarkBoxes;
  }

  function getModalData(kind, boxIndex) {
    const boxes = getBoxesForKind(kind);
    const box = boxes[boxIndex];
    const total = boxes.length;

    if (kind === 'hazard' && hazardsCatalog && box) {
      const id = box.dataset.hazardId;
      const info = hazardsCatalog.list.find(function (item) { return item.id === id; }) || {
        id: id,
        nameVi: '',
        levelVi: '',
      };
      const card = box.closest('.hazard-card');
      const lvlEl = card ? card.querySelector('.level-pill') : null;
      const dmgEl = card ? card.querySelector('.damage-pill') : null;
      const titleEl = card ? card.querySelector('.hazard-title') : null;
      const descEl = card ? card.querySelector('.hazard-desc') : null;
      const tipEl = card ? card.querySelector('.hazard-tip') : null;
      return {
        kind: 'hazard',
        id: id,
        catalog: hazardsCatalog,
        num: '#' + String(boxIndex + 1).padStart(2, '0') + ' / ' + total,
        badgeText: lvlEl ? lvlEl.textContent.trim() : info.levelVi,
        badgeClass: lvlEl ? lvlEl.className : 'level-pill',
        name: info.nameVi || (titleEl ? titleEl.textContent.trim() : ''),
        sub: dmgEl ? '⚡ Tác động: ' + dmgEl.textContent.trim() : '',
        desc: descEl ? descEl.textContent.trim() : '',
        tagText: tipEl ? tipEl.textContent.trim() : 'Thử thách Fly to The End v4.0',
        tagClass: 'landmark-tag',
        prevLabel: '‹ Thử thách trước',
        nextLabel: 'Thử thách tiếp ›',
      };
    }

    const id = box ? box.dataset.landmarkId : '';
    const info =
      landmarksCatalog && Array.isArray(landmarksCatalog.list)
        ? landmarksCatalog.list.find(function (item) { return item.id === id; })
        : null;
    const card = box ? box.closest('.landmark-card') : null;
    const regEl = card ? card.querySelector('.landmark-region') : null;
    const nameEl = card ? card.querySelector('.landmark-name') : null;
    const locEl = card ? card.querySelector('.landmark-loc') : null;
    const descEl = card ? card.querySelector('.landmark-desc') : null;
    const tagEl = card ? card.querySelector('.landmark-tag') : null;
    return {
      kind: 'landmark',
      id: id,
      catalog: landmarksCatalog,
      num: '#' + String(boxIndex + 1).padStart(2, '0') + ' / ' + total,
      badgeText: regEl ? regEl.textContent.trim() : '',
      badgeClass: regEl ? regEl.className : 'landmark-region',
      name: (info && info.nameVi) || (nameEl ? nameEl.textContent.trim() : ''),
      sub: (info && info.locationVi) ? '📍 ' + info.locationVi : (locEl ? locEl.textContent.trim() : ''),
      desc: descEl ? descEl.textContent.trim() : '',
      tagText: tagEl ? tagEl.textContent.trim() : '',
      tagClass: tagEl ? tagEl.className : 'landmark-tag',
      prevLabel: '‹ Địa điểm trước',
      nextLabel: 'Địa điểm tiếp ›',
    };
  }

  function openModelModal(kind, boxIndex) {
    if (!modal || !modalStage) return;
    const boxes = getBoxesForKind(kind);
    if (boxes.length === 0) return;

    const wasOpen = modal.classList.contains('is-open');
    if (!wasOpen) {
      lastFocusedEl = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }

    activeModalKind = kind;
    currentModalIndex = ((boxIndex % boxes.length) + boxes.length) % boxes.length;
    const data = getModalData(kind, currentModalIndex);
    if (!data.id || !data.catalog) return;

    allPreviewBoxes.forEach(function (b) { b.classList.remove('is-live'); });
    pendingHoverHost = null;

    if (modalNum) modalNum.textContent = data.num;
    if (modalRegion) {
      modalRegion.textContent = data.badgeText;
      modalRegion.className = data.badgeClass;
    }
    if (modalName) modalName.textContent = data.name;
    if (modalLoc) modalLoc.textContent = data.sub;
    if (modalDesc) modalDesc.textContent = data.desc;
    if (modalTag) {
      modalTag.textContent = data.tagText;
      modalTag.className = data.tagClass;
    }
    if (btnModalPrev) btnModalPrev.textContent = data.prevLabel;
    if (btnModalNext) btnModalNext.textContent = data.nextLabel;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    if (!wasOpen && btnModalClose) {
      btnModalClose.focus();
    }

    requestAnimationFrame(function () {
      mountLiveModel(data.kind, data.id, data.catalog, modalStage, 'modal');
    });
  }

  function closeLandmarkModal() {
    if (!modal || !modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    isDragging = false;
    unmountLiveModel();
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      lastFocusedEl.focus();
      lastFocusedEl = null;
    }
  }

  // Bind click & keyboard handlers unconditionally (never depends on async manifest readiness!)
  hazardBoxes.forEach(function (box, idx) {
    box.addEventListener('click', function () {
      openModelModal('hazard', idx);
    });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModelModal('hazard', idx);
      }
    });
  });

  landmarkBoxes.forEach(function (box, idx) {
    box.addEventListener('click', function () {
      openModelModal('landmark', idx);
    });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModelModal('landmark', idx);
      }
    });
  });

  if (btnModalClose) btnModalClose.addEventListener('click', closeLandmarkModal);
  if (btnModalPrev) btnModalPrev.addEventListener('click', function () { openModelModal(activeModalKind, currentModalIndex - 1); });
  if (btnModalNext) btnModalNext.addEventListener('click', function () { openModelModal(activeModalKind, currentModalIndex + 1); });

  if (btnZoomIn) {
    btnZoomIn.addEventListener('click', function () {
      targetZoom = Math.min(1.85, targetZoom + 0.22);
    });
  }
  if (btnZoomOut) {
    btnZoomOut.addEventListener('click', function () {
      targetZoom = Math.max(0.65, targetZoom - 0.22);
    });
  }
  if (btnAutoRotate) {
    btnAutoRotate.addEventListener('click', function () {
      autoRotate = !autoRotate;
      updateAutoRotateBtn();
    });
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeLandmarkModal();
    });
  }

  if (modalStage) {
    const onDragStart = function (x, y) {
      isDragging = true;
      dragLastX = x;
      dragLastY = y;
      modalStage.classList.add('is-dragging');
    };
    const onDragMove = function (x, y) {
      if (!isDragging) return;
      const dx = x - dragLastX;
      const dy = y - dragLastY;
      dragLastX = x;
      dragLastY = y;
      targetRotY += dx * 0.011;
      targetRotX = Math.max(-0.45, Math.min(0.85, targetRotX + dy * 0.008));
    };
    const onDragEnd = function () {
      isDragging = false;
      modalStage.classList.remove('is-dragging');
    };

    modalStage.addEventListener('mousedown', function (e) {
      onDragStart(e.clientX, e.clientY);
    });
    window.addEventListener('mousemove', function (e) {
      onDragMove(e.clientX, e.clientY);
    });
    window.addEventListener('mouseup', onDragEnd);

    modalStage.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) {
        onDragStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
    modalStage.addEventListener('touchmove', function (e) {
      if (isDragging && e.touches.length === 1) {
        e.preventDefault();
        onDragMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: false });
    window.addEventListener('touchend', onDragEnd);
    window.addEventListener('touchcancel', onDragEnd);

    modalStage.addEventListener('wheel', function (e) {
      if (liveMode !== 'modal') return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      targetZoom = Math.max(0.65, Math.min(1.85, targetZoom + delta));
    }, { passive: false });
  }

  window.addEventListener('keydown', function (e) {
    if (!modal || !modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      closeLandmarkModal();
    } else if (e.key === 'ArrowLeft') {
      openModelModal(activeModalKind, currentModalIndex - 1);
    } else if (e.key === 'ArrowRight') {
      openModelModal(activeModalKind, currentModalIndex + 1);
    }
  });

  window.addEventListener('resize', function () {
    if (liveMode !== 'idle') resizeLiveRenderer();
  });
})();
