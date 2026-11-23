/**
 * FLY TO THE END - 3D Vietnamese Landmarks Showcase
 * Renders all 22 real in-game 3D Low-poly models directly on homepage cards
 * using a single shared offscreen WebGLRenderer (zero WebGL context overflow),
 * live animated 3D hover preview, and an interactive 360-degree 3D Modal Viewer.
 */
(function () {
  'use strict';

  if (typeof THREE === 'undefined' || !window.VietnamLandmarksCatalog) {
    return;
  }

  const catalog = window.VietnamLandmarksCatalog;
  const previewBoxes = Array.from(document.querySelectorAll('.landmark-preview[data-landmark-id]'));
  if (previewBoxes.length === 0) return;

  // Cache built 3D models so each landmark is constructed only once
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

  function prepareModel(id) {
    if (modelCache[id]) return modelCache[id];
    const mesh = catalog.buildById(id);
    if (!mesh) return null;

    // Make sure animated dragon fire is visible for initial bounding box & snapshot
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
      id: id,
      pivot: pivot,
      mesh: mesh,
      size: size,
    };
    modelCache[id] = entry;
    return entry;
  }

  function computeCameraDistance(size, fovDeg, aspect, paddingFactor) {
    const vFov = (fovDeg * Math.PI) / 180;
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    const effW = Math.max(size.x, size.z) * 1.06;
    const effH = size.y * 1.08;
    const distV = (effH * 0.5) / Math.tan(vFov * 0.5);
    const distH = (effW * 0.5) / Math.tan(hFov * 0.5);
    return Math.max(distV, distH) * (paddingFactor || 1.24);
  }

  // =========================================================================
  // 1. SINGLE SHARED OFFSCREEN SNAPSHOT RENDERER (renders all 22 cards cleanly)
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
    const id = previewEl.dataset.landmarkId;
    const targetCanvas = previewEl.querySelector('canvas.landmark-thumb');
    if (!id || !targetCanvas || previewEl.dataset.rendered === '1') return;
    if (!initThumbRenderer()) return;

    const entry = prepareModel(id);
    if (!entry) return;

    // Detach from any previous parent safely
    if (entry.pivot.parent) {
      entry.pivot.parent.remove(entry.pivot);
    }

    // Set appealing 3/4 architectural angle for static preview
    entry.pivot.rotation.set(0.08, -0.44, 0);
    const fire = entry.mesh.getObjectByName('anim_dragon_fire');
    if (fire) {
      fire.visible = true;
      fire.scale.set(1.08, 0.98, 0.98);
    }

    thumbScene.add(entry.pivot);

    const camDist = computeCameraDistance(entry.size, 38, THUMB_W / THUMB_H, 1.34);
    thumbCamera.position.set(0, camDist * 0.25, camDist);
    thumbCamera.lookAt(0, 0, 0);
    thumbCamera.updateProjectionMatrix();

    thumbRenderer.render(thumbScene, thumbCamera);
    thumbScene.remove(entry.pivot);

    // Paint WebGL output onto the card's lightweight 2D canvas
    targetCanvas.width = THUMB_W;
    targetCanvas.height = THUMB_H;
    const ctx = targetCanvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, THUMB_W, THUMB_H);
      ctx.drawImage(thumbRenderer.domElement, 0, 0, THUMB_W, THUMB_H);
    }
    previewEl.dataset.rendered = '1';
    previewEl.classList.add('is-ready');
  }

  // Render thumbnails in smooth non-blocking batches (3 per frame)
  const renderQueue = previewBoxes.slice();
  function processRenderQueue() {
    let count = 0;
    while (renderQueue.length > 0 && count < 3) {
      const box = renderQueue.shift();
      renderThumbnail(box);
      count++;
    }
    if (renderQueue.length > 0) {
      requestAnimationFrame(processRenderQueue);
    }
  }
  requestAnimationFrame(processRenderQueue);

  // =========================================================================
  // 2. SINGLE SHARED LIVE 3D RENDERER (used for card hover spin & 360° modal)
  // =========================================================================
  let liveRenderer = null;
  let liveScene = null;
  let liveCamera = null;
  let liveEntry = null;
  let liveHost = null; // DOM container currently hosting liveRenderer.domElement
  let liveMode = 'idle'; // 'idle' | 'hover' | 'modal'
  let rafId = 0;

  // Interactive camera/model orbit state for Modal
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

  function mountLiveModel(id, hostEl, mode) {
    if (!ensureLiveRenderer()) return;
    const entry = prepareModel(id);
    if (!entry) return;

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

    rotY = -0.44;
    rotX = mode === 'modal' ? 0.14 : 0.08;
    targetRotY = rotY;
    targetRotX = rotX;
    zoomFactor = 1.0;
    targetZoom = 1.0;
    autoRotate = true;
    updateAutoRotateBtn();

    startLiveLoop();
  }

  function unmountLiveModel() {
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
        targetRotY += dt * 0.00075;
      } else if (liveMode === 'modal' && autoRotate && !isDragging) {
        targetRotY += dt * 0.00055;
      }

      rotY += (targetRotY - rotY) * 0.14;
      rotX += (targetRotX - rotX) * 0.14;
      zoomFactor += (targetZoom - zoomFactor) * 0.14;

      liveEntry.pivot.rotation.set(rotX, rotY, 0);
      catalog.animate(liveEntry.mesh, now);

      const pad = liveMode === 'modal' ? 1.34 : 1.34;
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
    previewBoxes.forEach(function (box) {
      box.addEventListener('mouseenter', function () {
        if (liveMode === 'modal') return;
        const id = box.dataset.landmarkId;
        if (!id) return;
        box.classList.add('is-live');
        mountLiveModel(id, box, 'hover');
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
  // 3. INTERACTIVE 360° 3D INSPECTOR MODAL
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

  let currentModalIndex = 0;

  function updateAutoRotateBtn() {
    if (!btnAutoRotate) return;
    btnAutoRotate.classList.toggle('is-active', autoRotate);
    btnAutoRotate.setAttribute('aria-pressed', autoRotate ? 'true' : 'false');
  }

  function getCardMetaByIndex(index) {
    const info = catalog.list[index];
    const box = previewBoxes.find(function (b) {
      return b.dataset.landmarkId === info.id;
    });
    const card = box ? box.closest('.landmark-card') : null;
    return {
      id: info.id,
      num: '#' + String(index + 1).padStart(2, '0') + ' / ' + catalog.list.length,
      name: info.nameVi,
      loc: '📍 ' + info.locationVi,
      regionText: card && card.querySelector('.landmark-region') ? card.querySelector('.landmark-region').textContent.trim() : '',
      regionClass: card && card.querySelector('.landmark-region') ? card.querySelector('.landmark-region').className : 'landmark-region',
      desc: card && card.querySelector('.landmark-desc') ? card.querySelector('.landmark-desc').textContent.trim() : '',
      tagText: card && card.querySelector('.landmark-tag') ? card.querySelector('.landmark-tag').textContent.trim() : '',
      tagClass: card && card.querySelector('.landmark-tag') ? card.querySelector('.landmark-tag').className : 'landmark-tag',
    };
  }

  function openLandmarkModal(index) {
    if (!modal || !modalStage) return;
    currentModalIndex = (index + catalog.list.length) % catalog.list.length;
    const meta = getCardMetaByIndex(currentModalIndex);

    // Clear hover state if active
    previewBoxes.forEach(function (b) { b.classList.remove('is-live'); });

    if (modalNum) modalNum.textContent = meta.num;
    if (modalRegion) {
      modalRegion.textContent = meta.regionText;
      modalRegion.className = meta.regionClass;
    }
    if (modalName) modalName.textContent = meta.name;
    if (modalLoc) modalLoc.textContent = meta.loc;
    if (modalDesc) modalDesc.textContent = meta.desc;
    if (modalTag) {
      modalTag.textContent = meta.tagText;
      modalTag.className = meta.tagClass;
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // Mount live 3D model after modal becomes visible so clientWidth/Height are accurate
    requestAnimationFrame(function () {
      mountLiveModel(meta.id, modalStage, 'modal');
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

  // Click / Keyboard activation on every landmark preview card
  previewBoxes.forEach(function (box) {
    const id = box.dataset.landmarkId;
    const idx = catalog.list.findIndex(function (item) { return item.id === id; });
    if (idx < 0) return;

    box.addEventListener('click', function () {
      openLandmarkModal(idx);
    });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLandmarkModal(idx);
      }
    });
  });

  if (btnModalClose) btnModalClose.addEventListener('click', closeLandmarkModal);
  if (btnModalPrev) btnModalPrev.addEventListener('click', function () { openLandmarkModal(currentModalIndex - 1); });
  if (btnModalNext) btnModalNext.addEventListener('click', function () { openLandmarkModal(currentModalIndex + 1); });

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

  // Backdrop click closes modal
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeLandmarkModal();
    });
  }

  // Drag-to-rotate & wheel-to-zoom inside modal stage
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

  // Keyboard shortcuts when modal is open
  window.addEventListener('keydown', function (e) {
    if (!modal || !modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      closeLandmarkModal();
    } else if (e.key === 'ArrowLeft') {
      openLandmarkModal(currentModalIndex - 1);
    } else if (e.key === 'ArrowRight') {
      openLandmarkModal(currentModalIndex + 1);
    }
  });

  window.addEventListener('resize', function () {
    if (liveMode !== 'idle') resizeLiveRenderer();
  });
})();
