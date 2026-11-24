/**
 * FLY TO THE END - Dedicated 360° Interactive 3D Viewer for Landmark Detail Pages
 * Reuses VietnamLandmarksCatalog from landmarks-demo.js (Three.js r187)
 */
(function () {
  'use strict';

  const stage = document.getElementById('landmarkDetailStage');
  if (!stage || typeof THREE === 'undefined' || !window.VietnamLandmarksCatalog) return;

  const landmarkId = stage.getAttribute('data-landmark-id');
  if (!landmarkId) return;

  const catalog = window.VietnamLandmarksCatalog;

  function renderStageFallback(message, onRetry) {
    stage.textContent = '';
    const wrap = document.createElement('div');
    wrap.className = 'stage-fallback-box';
    const p = document.createElement('p');
    p.textContent = message;
    wrap.appendChild(p);
    if (typeof onRetry === 'function') {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'modal-tool-btn';
      btn.textContent = '↻ Thử lại';
      btn.addEventListener('click', onRetry);
      wrap.appendChild(btn);
    }
    stage.appendChild(wrap);
  }

  function initDetailViewer(mesh) {
    if (!mesh) {
      renderStageFallback('Không thể tải mô hình 3D lúc này. Vui lòng thử lại.', loadAndInit);
      return;
    }

    const fire = mesh.getObjectByName('anim_dragon_fire');
    if (fire) {
      fire.visible = true;
      fire.scale.set(1.06, 0.96, 0.96);
    }

    // Calibrated for Three.js r187 physical lighting units
    const scene = new THREE.Scene();
    const hemi = new THREE.HemisphereLight(0xfff9f0, 0x7c5c38, 1.85);
    const ambient = new THREE.AmbientLight(0xdc8874, 0.85);
    const sun = new THREE.DirectionalLight(0xffffff, 2.35);
    sun.position.set(130, 220, 190);
    const rim = new THREE.DirectionalLight(0x93c5fd, 0.72);
    rim.position.set(-140, 90, -160);
    scene.add(hemi, ambient, sun, rim);

    const pivot = new THREE.Object3D();
    pivot.add(mesh);
    mesh.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(mesh);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    mesh.position.set(-center.x, -center.y, -center.z);
    scene.add(pivot);

    const camera = new THREE.PerspectiveCamera(38, 1.5, 1, 3000);
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch (e) {
      console.warn('WebGL unavailable on landmark detail viewer:', e);
      renderStageFallback('Trình duyệt của bạn không hỗ trợ WebGL 3D.');
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = 'landmark-detail-canvas';
    stage.textContent = '';
    stage.appendChild(renderer.domElement);

    const DEFAULT_ROT_X = 0.14;
    const DEFAULT_ROT_Y = -0.44;
    let rotX = DEFAULT_ROT_X;
    let rotY = DEFAULT_ROT_Y;
    let targetRotX = DEFAULT_ROT_X;
    let targetRotY = DEFAULT_ROT_Y;
    let zoomFactor = 1.0;
    let targetZoom = 1.0;
    let autoRotate = true;
    let isDragging = false;
    let dragLastX = 0;
    let dragLastY = 0;
    let isInView = true;
    let isContextLost = false;
    let rafId = 0;
    let lastTime = performance.now();

    function computeCameraDistance(aspect) {
      const vFov = (38 * Math.PI) / 180;
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
      const effW = Math.max(size.x, size.z) * 1.08;
      const effH = size.y * 1.1;
      const distV = (effH * 0.5) / Math.tan(vFov * 0.5);
      const distH = (effW * 0.5) / Math.tan(hFov * 0.5);
      return Math.max(distV, distH) * 1.32;
    }

    let baseDist = 200;

    function resize() {
      const w = Math.max(240, stage.clientWidth || 640);
      const h = Math.max(240, stage.clientHeight || 420);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      baseDist = computeCameraDistance(camera.aspect);
    }

    resize();
    window.addEventListener('resize', resize);

    // Controls
    const btnAuto = document.getElementById('detailAutoRotate');
    const btnZoomIn = document.getElementById('detailZoomIn');
    const btnZoomOut = document.getElementById('detailZoomOut');
    const btnReset = document.getElementById('detailResetView');

    function syncAutoBtn() {
      if (!btnAuto) return;
      btnAuto.classList.toggle('is-active', autoRotate);
      btnAuto.setAttribute('aria-pressed', autoRotate ? 'true' : 'false');
    }

    if (btnAuto) {
      btnAuto.addEventListener('click', function () {
        autoRotate = !autoRotate;
        syncAutoBtn();
      });
    }
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
    if (btnReset) {
      btnReset.addEventListener('click', function () {
        targetRotX = DEFAULT_ROT_X;
        targetRotY = DEFAULT_ROT_Y;
        targetZoom = 1.0;
        autoRotate = true;
        syncAutoBtn();
      });
    }

    function onDragStart(x, y) {
      isDragging = true;
      dragLastX = x;
      dragLastY = y;
      stage.classList.add('is-dragging');
    }

    function onDragMove(x, y) {
      if (!isDragging) return;
      const dx = x - dragLastX;
      const dy = y - dragLastY;
      dragLastX = x;
      dragLastY = y;
      targetRotY += dx * 0.011;
      targetRotX = Math.max(-0.45, Math.min(0.85, targetRotX + dy * 0.008));
    }

    function onDragEnd() {
      isDragging = false;
      stage.classList.remove('is-dragging');
    }

    stage.addEventListener('mousedown', function (e) {
      onDragStart(e.clientX, e.clientY);
    });
    window.addEventListener('mousemove', function (e) {
      onDragMove(e.clientX, e.clientY);
    });
    window.addEventListener('mouseup', onDragEnd);

    stage.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) {
        onDragStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
    stage.addEventListener('touchmove', function (e) {
      if (isDragging && e.touches.length === 1) {
        e.preventDefault();
        onDragMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: false });
    window.addEventListener('touchend', onDragEnd);
    window.addEventListener('touchcancel', onDragEnd);

    // Only intercept Ctrl/Cmd + wheel (or trackpad pinch) so normal vertical page scroll works smoothly
    stage.addEventListener('wheel', function (e) {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      targetZoom = Math.max(0.65, Math.min(1.85, targetZoom + delta));
    }, { passive: false });

    function stopLoop() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    function startLoop() {
      if (rafId || !isInView || document.hidden || isContextLost) return;
      lastTime = performance.now();
      rafId = requestAnimationFrame(tick);
    }

    function tick(now) {
      if (!isInView || document.hidden || isContextLost) {
        rafId = 0;
        return;
      }
      const ts = now || performance.now();
      const dtSec = Math.min(0.05, Math.max(0, (ts - lastTime) / 1000));
      lastTime = ts;

      if (autoRotate && !isDragging) {
        targetRotY += dtSec * 0.42;
      }
      const damp = 1 - Math.exp(-8.5 * dtSec);
      rotX += (targetRotX - rotX) * damp;
      rotY += (targetRotY - rotY) * damp;
      zoomFactor += (targetZoom - zoomFactor) * damp;

      pivot.rotation.set(rotX, rotY, 0);
      if (typeof catalog.animate === 'function') {
        catalog.animate(mesh, ts);
      }

      const dist = baseDist / zoomFactor;
      camera.position.set(0, dist * 0.24, dist);
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    }

    renderer.domElement.addEventListener('webglcontextlost', function (e) {
      e.preventDefault();
      isContextLost = true;
      stopLoop();
    });
    renderer.domElement.addEventListener('webglcontextrestored', function () {
      isContextLost = false;
      startLoop();
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    });

    if (typeof IntersectionObserver === 'function') {
      const stageObserver = new IntersectionObserver(function (entries) {
        for (let i = 0; i < entries.length; i++) {
          isInView = entries[i].isIntersecting;
          if (isInView) {
            startLoop();
          } else {
            stopLoop();
          }
        }
      }, { threshold: 0.05 });
      stageObserver.observe(stage);
    }

    startLoop();
  }

  function loadAndInit() {
    if (typeof catalog.loadById === 'function') {
      catalog.loadById(landmarkId).then(initDetailViewer);
    } else {
      initDetailViewer(catalog.buildById(landmarkId));
    }
  }

  loadAndInit();
})();
