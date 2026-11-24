/**
 * FLY TO THE END - Unified 3D Models Showcase (63 Landmarks + 8 Hazards)
 * Renders all real in-game 3D Low-poly models directly on homepage cards
 * using a single shared offscreen WebGLRenderer (zero WebGL context overflow),
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

  // Cache built 3D models so each model is constructed only once
  const modelCache = Object.create(null);

  function createLighting(scene) {
    const hemi = new THREE.HemisphereLight(0xfff9f0, 0x7c5c38, 0.95);
    const ambient = new THREE.AmbientLight(0xdc8874, 0.42);
    const sun = new THREE.DirectionalLight(0xffffff, 0.92);
    sun.position.set(130, 220, 190);
    const rim = new THREE.DirectionalLight(0x93c5fd, 0.28);
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
    if (!catalog) return Promise.resolve(null);

    if (typeof catalog.loadById === 'function') {
      return catalog.loadById(id).then(function (mesh) {
        return modelCache[cacheKey] || wrapMeshEntry(kind, id, catalog, mesh);
      });
    }
    return Promise.resolve(wrapMeshEntry(kind, id, catalog, catalog.buildById(id)));
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

  // =========================================================================
  // 1. SINGLE SHARED OFFSCREEN SNAPSHOT RENDERER (renders all 30 cards cleanly)
  // =========================================================================
  let thumbRenderer = null;
  let thumbScene = null;
  let thumbCamera = null;
  const THUMB_W = 520;
  const THUMB_H = 325;

  function initThumbRenderer() {
    if (thumbRenderer) return true;
    try {
      thumbScene = new THREE.Scene();
      createLighting(thumbScene);
      thumbCamera = new THREE.PerspectiveCamera(38, THUMB_W / THUMB_H, 1, 3000);
      thumbRenderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
      });
      thumbRenderer.setPixelRatio(1);
      thumbRenderer.setSize(THUMB_W, THUMB_H, false);
      thumbRenderer.setClearColor(0x000000, 0);
      return true;
    } catch (e) {
      console.warn('WebGL thumbnail renderer unavailable:', e);
      return false;
    }
  }

  function renderThumbnail(previewEl) {
    const meta = getBoxMeta(previewEl);
    const targetCanvas = previewEl.querySelector('canvas.landmark-thumb, canvas.hazard-thumb');
    if (!meta.id || !meta.catalog || !targetCanvas || previewEl.dataset.rendered === '1') {
      return Promise.resolve();
    }
    if (!initThumbRenderer()) return Promise.resolve();

    return prepareModelAsync(meta.kind, meta.id, meta.catalog).then(function (entry) {
      if (!entry || previewEl.dataset.rendered === '1') return;

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
    });
  }

  // Render thumbnails in smooth non-blocking batches (up to 6 concurrent CDN fetches)
  const renderQueue = allPreviewBoxes.slice();
  const MAX_CONCURRENT_THUMBS = 6;
  let activeThumbs = 0;

  function pumpRenderQueue() {
    while (activeThumbs < MAX_CONCURRENT_THUMBS && renderQueue.length > 0) {
      const box = renderQueue.shift();
      activeThumbs++;
      renderThumbnail(box).finally(function () {
        activeThumbs--;
        if (renderQueue.length > 0) {
          requestAnimationFrame(pumpRenderQueue);
        }
      });
    }
  }
  requestAnimationFrame(pumpRenderQueue);

  // =========================================================================
  // 2. SINGLE SHARED LIVE 3D RENDERER (used for card hover spin & 360° modal)
  // =========================================================================
  let liveRenderer = null;
  let liveScene = null;
  let liveCamera = null;
  let liveEntry = null;
  let liveHost = null;
  let liveMode = 'idle'; // 'idle' | 'hover' | 'modal'
  let rafId = 0;

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
    try {
      liveScene = new THREE.Scene();
      createLighting(liveScene);
      liveCamera = new THREE.PerspectiveCamera(38, 1.6, 1, 3000);
      liveRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      liveRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      liveRenderer.setClearColor(0x000000, 0);
      liveRenderer.domElement.className = 'landmark-live-canvas';
      return true;
    } catch (e) {
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

  let mountRequestToken = 0;

  function mountLiveModel(kind, id, catalog, hostEl, mode) {
    if (!ensureLiveRenderer()) return;
    const token = ++mountRequestToken;
    prepareModelAsync(kind, id, catalog).then(function (entry) {
      if (token !== mountRequestToken || !entry) return;

      if (liveEntry && liveEntry.pivot.parent === liveScene) {
        liveScene.remove(liveEntry.pivot);
      }
      if (entry.pivot.parent) {
        entry.pivot.parent.remove(entry.pivot);
      }

      liveEntry = entry;
      liveMode = mode;
      liveHost = hostEl;

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
  }

  function startLiveLoop() {
    if (rafId) cancelAnimationFrame(rafId);
    let lastTime = performance.now();

    function tick() {
      if (liveMode === 'idle' || !liveEntry || !liveRenderer) {
        rafId = 0;
        return;
      }

      const now = performance.now();
      const dt = Math.min(50, now - lastTime);
      lastTime = now;

      if (liveMode === 'hover') {
        targetRotY += dt * 0.0008;
      } else if (liveMode === 'modal' && autoRotate && !isDragging) {
        targetRotY += dt * 0.00055;
      }

      rotY += (targetRotY - rotY) * 0.14;
      rotX += (targetRotX - rotX) * 0.14;
      zoomFactor += (targetZoom - zoomFactor) * 0.14;

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
        if (liveMode === 'hover' && liveHost === box) {
          unmountLiveModel();
        }
      });
    });
  }

  // =========================================================================
  // 3. INTERACTIVE 360° 3D INSPECTOR MODAL (works for both Landmarks & Hazards)
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

  function updateAutoRotateBtn() {
    if (!btnAutoRotate) return;
    btnAutoRotate.classList.toggle('is-active', autoRotate);
    btnAutoRotate.setAttribute('aria-pressed', autoRotate ? 'true' : 'false');
  }

  function getModalData(kind, index) {
    if (kind === 'hazard' && hazardsCatalog) {
      const info = hazardsCatalog.list[index];
      const box = hazardBoxes.find(function (b) { return b.dataset.hazardId === info.id; });
      const card = box ? box.closest('.hazard-card') : null;
      const lvlEl = card ? card.querySelector('.level-pill') : null;
      const dmgEl = card ? card.querySelector('.damage-pill') : null;
      const descEl = card ? card.querySelector('.hazard-desc') : null;
      const tipEl = card ? card.querySelector('.hazard-tip') : null;
      return {
        kind: 'hazard',
        id: info.id,
        catalog: hazardsCatalog,
        num: '#' + String(index + 1).padStart(2, '0') + ' / ' + hazardsCatalog.list.length,
        badgeText: lvlEl ? lvlEl.textContent.trim() : info.levelVi,
        badgeClass: lvlEl ? lvlEl.className : 'level-pill',
        name: info.nameVi,
        sub: dmgEl ? '⚡ Tác động: ' + dmgEl.textContent.trim() : '',
        desc: descEl ? descEl.textContent.trim() : '',
        tagText: tipEl ? tipEl.textContent.trim() : 'Thử thách bản cập nhật 3.0',
        tagClass: 'landmark-tag',
        prevLabel: '‹ Thử thách trước',
        nextLabel: 'Thử thách tiếp ›',
      };
    }

    const info = landmarksCatalog.list[index];
    const box = landmarkBoxes.find(function (b) { return b.dataset.landmarkId === info.id; });
    const card = box ? box.closest('.landmark-card') : null;
    const regEl = card ? card.querySelector('.landmark-region') : null;
    const descEl = card ? card.querySelector('.landmark-desc') : null;
    const tagEl = card ? card.querySelector('.landmark-tag') : null;
    return {
      kind: 'landmark',
      id: info.id,
      catalog: landmarksCatalog,
      num: '#' + String(index + 1).padStart(2, '0') + ' / ' + landmarksCatalog.list.length,
      badgeText: regEl ? regEl.textContent.trim() : '',
      badgeClass: regEl ? regEl.className : 'landmark-region',
      name: info.nameVi,
      sub: '📍 ' + info.locationVi,
      desc: descEl ? descEl.textContent.trim() : '',
      tagText: tagEl ? tagEl.textContent.trim() : '',
      tagClass: tagEl ? tagEl.className : 'landmark-tag',
      prevLabel: '‹ Địa điểm trước',
      nextLabel: 'Địa điểm tiếp ›',
    };
  }

  function openModelModal(kind, index) {
    if (!modal || !modalStage) return;
    const cat = kind === 'hazard' ? hazardsCatalog : landmarksCatalog;
    if (!cat) return;

    activeModalKind = kind;
    currentModalIndex = (index + cat.list.length) % cat.list.length;
    const data = getModalData(kind, currentModalIndex);

    allPreviewBoxes.forEach(function (b) { b.classList.remove('is-live'); });

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
  }

  allPreviewBoxes.forEach(function (box) {
    const meta = getBoxMeta(box);
    if (!meta.catalog) return;
    const idx = meta.catalog.list.findIndex(function (item) { return item.id === meta.id; });
    if (idx < 0) return;

    box.addEventListener('click', function () {
      openModelModal(meta.kind, idx);
    });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModelModal(meta.kind, idx);
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
