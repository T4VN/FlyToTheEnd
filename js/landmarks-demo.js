/**
 * FLY TO THE END - Unified CDN 3D Landmarks Engine for Web (Three.js r90)
 * Single source of truth shared with FlyToTheEnd App & Play Web:
 *   https://cdn.flytotheend.t4vn.com/landmarks/manifest.json
 *   https://cdn.flytotheend.t4vn.com/landmarks/models/<id>.<hash>.json
 */
(function () {
  'use strict';

  if (typeof THREE === 'undefined') return;

  const CDN_ORIGIN = 'https://cdn.flytotheend.t4vn.com';
  const CDN_BASE = CDN_ORIGIN + '/landmarks/';
  const MANIFEST_URL = CDN_BASE + 'manifest.json';
  const MAX_NODES = 600;
  const MAX_DEPTH = 12;

  const VIETNAM_LANDMARKS = [];
  const ENTRY_BY_ID = Object.create(null);
  const BLUEPRINT_CACHE = Object.create(null);
  const BLUEPRINT_INFLIGHT = Object.create(null);
  const MATERIAL_CACHE = Object.create(null);

  let manifestPromise = null;

  function parseColor(val, fallback) {
    if (typeof val === 'number' && isFinite(val)) return val;
    if (typeof val === 'string') {
      const s = val.trim().replace(/^#|^0x/i, '');
      if (/^[0-9a-fA-F]{6}$/.test(s)) return parseInt(s, 16);
    }
    return fallback;
  }

  function getSharedMaterial(color, emissive, emissiveIntensity, opacity, doubleSide) {
    const em = emissive || 0x000000;
    const ei = typeof emissiveIntensity === 'number' ? emissiveIntensity : 0;
    const op = typeof opacity === 'number' ? Math.max(0, Math.min(1, opacity)) : 1;
    const ds = doubleSide ? 1 : 0;
    const key = color + '_' + em + '_' + ei + '_' + op + '_' + ds;
    if (!MATERIAL_CACHE[key]) {
      MATERIAL_CACHE[key] = new THREE.MeshLambertMaterial({
        color: color,
        emissive: em,
        emissiveIntensity: ei,
        flatShading: THREE.FlatShading,
        transparent: op < 1,
        opacity: op,
        side: ds ? THREE.DoubleSide : THREE.FrontSide,
      });
    }
    return MATERIAL_CACHE[key];
  }

  function createGeometry(node) {
    const a = Array.isArray(node.args) ? node.args : [];
    switch (node.type) {
      case 'box':
        return new THREE.BoxGeometry(a[0] || 1, a[1] || 1, a[2] || 1);
      case 'cylinder':
        return new THREE.CylinderGeometry(
          a[0] !== undefined ? a[0] : 1,
          a[1] !== undefined ? a[1] : 1,
          a[2] || 1,
          a[3] || 8
        );
      case 'cone':
        return new THREE.ConeGeometry(a[0] || 1, a[1] || 1, a[2] || 8);
      case 'sphere':
        return new THREE.SphereGeometry(a[0] || 1, a[1] || 8, a[2] || 6);
      case 'plane':
        return new THREE.PlaneGeometry(a[0] || 1, a[1] || 1);
      case 'torus':
        return new THREE.TorusGeometry(a[0] || 1, a[1] || 0.3, a[2] || 6, a[3] || 12);
      case 'dodecahedron':
        return new THREE.DodecahedronGeometry(a[0] || 1, a[1] || 0);
      case 'octahedron':
        return new THREE.OctahedronGeometry(a[0] || 1, a[1] || 0);
      default:
        return null;
    }
  }

  function buildFromBlueprint(blueprint) {
    if (!blueprint || !Array.isArray(blueprint.parts)) return null;
    const root = new THREE.Object3D();
    if (Array.isArray(blueprint.scale) && blueprint.scale.length === 3) {
      root.scale.set(blueprint.scale[0], blueprint.scale[1], blueprint.scale[2]);
    }

    let nodeCount = 0;

    function buildNode(node, parent, depth) {
      if (!node || typeof node !== 'object') return;
      if (depth > MAX_DEPTH || nodeCount >= MAX_NODES) return;
      nodeCount++;

      let obj;
      if (node.type === 'group') {
        obj = new THREE.Object3D();
      } else {
        const geo = createGeometry(node);
        if (!geo) return;
        const mat = getSharedMaterial(
          parseColor(node.color, 0xcccccc),
          parseColor(node.emissive, 0x000000),
          node.emissiveIntensity,
          node.opacity,
          node.doubleSide
        );
        obj = new THREE.Mesh(geo, mat);
      }

      if (typeof node.name === 'string' && node.name.length > 0) {
        obj.name = node.name;
      }
      if (Array.isArray(node.pos) && node.pos.length === 3) {
        obj.position.set(node.pos[0], node.pos[1], node.pos[2]);
      }
      if (Array.isArray(node.rot) && node.rot.length === 3) {
        obj.rotation.set(node.rot[0], node.rot[1], node.rot[2]);
      }
      if (Array.isArray(node.scale) && node.scale.length === 3) {
        obj.scale.set(node.scale[0], node.scale[1], node.scale[2]);
      }
      if (obj.name === 'anim_cablecar') {
        obj.userData.baseX = obj.position.x;
        obj.userData.baseY = obj.position.y;
      }

      parent.add(obj);

      if (Array.isArray(node.children)) {
        for (let i = 0; i < node.children.length; i++) {
          buildNode(node.children[i], obj, depth + 1);
        }
      }
    }

    for (let i = 0; i < blueprint.parts.length; i++) {
      buildNode(blueprint.parts[i], root, 0);
    }

    return root;
  }

  function resolveCdnUrl(modelUrl) {
    if (typeof modelUrl !== 'string' || !modelUrl.trim()) return null;
    try {
      const resolved = new URL(modelUrl.trim(), CDN_BASE);
      if (resolved.origin !== CDN_ORIGIN) return null;
      return resolved.toString();
    } catch (e) {
      return null;
    }
  }

  function loadManifest() {
    if (manifestPromise) return manifestPromise;
    manifestPromise = fetch(MANIFEST_URL, { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        if (!data || !Array.isArray(data.landmarks)) return VIETNAM_LANDMARKS;
        VIETNAM_LANDMARKS.length = 0;
        for (let i = 0; i < data.landmarks.length; i++) {
          const item = data.landmarks[i];
          if (!item || !item.id || !item.modelUrl) continue;
          VIETNAM_LANDMARKS.push(item);
          ENTRY_BY_ID[item.id] = item;
        }
        return VIETNAM_LANDMARKS;
      })
      .catch(function (err) {
        console.warn('[LandmarksCDN] Failed to load manifest:', err);
        manifestPromise = null;
        return VIETNAM_LANDMARKS;
      });
    return manifestPromise;
  }

  function loadBlueprintById(id) {
    if (!id) return Promise.resolve(null);
    if (BLUEPRINT_CACHE[id]) return Promise.resolve(BLUEPRINT_CACHE[id]);
    if (BLUEPRINT_INFLIGHT[id]) return BLUEPRINT_INFLIGHT[id];

    const promise = loadManifest()
      .then(function () {
        const entry = ENTRY_BY_ID[id];
        if (!entry) return null;
        const url = resolveCdnUrl(entry.modelUrl);
        if (!url) return null;
        return fetch(url)
          .then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.json();
          })
          .then(function (bp) {
            if (!bp || !Array.isArray(bp.parts)) return null;
            BLUEPRINT_CACHE[id] = bp;
            return bp;
          });
      })
      .catch(function (err) {
        console.warn('[LandmarksCDN] Failed to load model "' + id + '":', err);
        return null;
      })
      .finally(function () {
        delete BLUEPRINT_INFLIGHT[id];
      });

    BLUEPRINT_INFLIGHT[id] = promise;
    return promise;
  }

  // Living landmark animations (shared between Web Demo & 360° Showcase)
  function animateLandmark(mesh, time) {
    if (!mesh) return;
    const t = typeof time === 'number' ? time : performance.now();
    mesh.traverse(function (obj) {
      if (obj.name === 'anim_flag') {
        obj.rotation.y = Math.sin(t * 0.006) * 0.28;
      } else if (obj.name === 'anim_boat') {
        obj.position.y = 3 + Math.sin(t * 0.004) * 1.1;
        obj.rotation.z = Math.sin(t * 0.003) * 0.06;
      } else if (obj.name === 'anim_dragon_fire') {
        const cycle = (t * 0.002) % (Math.PI * 2);
        const pulse = Math.max(0, Math.sin(cycle));
        obj.visible = pulse > 0.12;
        if (obj.visible) {
          const s = 0.4 + pulse * 0.95 + Math.sin(t * 0.04) * 0.12;
          obj.scale.set(s, 0.6 + pulse * 0.6, 0.6 + pulse * 0.6);
        }
      } else if (obj.name === 'anim_cablecar') {
        const bx = typeof obj.userData.baseX === 'number' ? obj.userData.baseX : -14;
        const by = typeof obj.userData.baseY === 'number' ? obj.userData.baseY : 28;
        const slide = Math.sin(t * 0.0015);
        obj.position.x = bx + slide * 12;
        obj.position.y = by + slide * 5;
      } else if (obj.name === 'anim_windmill') {
        obj.rotation.z = -(t * 0.0028);
      } else if (obj.name === 'anim_mist') {
        const s = 0.94 + Math.sin(t * 0.004) * 0.08;
        obj.scale.set(s, s, 1);
      }
    });
  }

  // Sequential Heritage Parade Manager for Web Demo (demo.html) — powered by CDN
  function VietnamLandmarksDemo(scene, onLandmarkChange) {
    this.scene = scene;
    this.onLandmarkChange = onLandmarkChange;
    this.meshesById = Object.create(null);
    this.zDepth = -50;
    this.currentIndex = 0;
    this.activeMesh = null;
    this.angle = 0;
    this.endAngle = Math.PI;
    this.cooldown = 0;
    this.loadingIndex = -1;
    // Start loading manifest + first landmark immediately
    loadManifest().then(function (list) {
      if (list.length > 0) loadBlueprintById(list[0].id);
    });
  }

  VietnamLandmarksDemo.prototype.computeAngles = function (camera, seaRadius) {
    const distZ = Math.max(120, camera.position.z - this.zDepth);
    const halfH = Math.tan(THREE.Math.degToRad(camera.fov) / 2) * distZ;
    const halfW = halfH * camera.aspect;
    const margin = 85;

    const rightEdgeX = camera.position.x + halfW + margin;
    const leftEdgeX = camera.position.x - halfW - margin;

    const cosStart = Math.max(-0.92, Math.min(0.92, rightEdgeX / seaRadius));
    const cosEnd = Math.max(-0.92, Math.min(0.92, leftEdgeX / seaRadius));

    const startAngle = Math.max(0.3, Math.min(Math.PI / 2 - 0.35, Math.acos(cosStart)));
    const endAngle = Math.min(Math.PI - 0.3, Math.max(Math.PI / 2 + 0.35, Math.acos(cosEnd)));
    return { startAngle: startAngle, endAngle: endAngle };
  };

  VietnamLandmarksDemo.prototype.spawnCurrent = function (camera, seaRadius) {
    if (VIETNAM_LANDMARKS.length === 0) return;
    const idx = this.currentIndex % VIETNAM_LANDMARKS.length;
    const info = VIETNAM_LANDMARKS[idx];
    if (!info) return;

    let mesh = this.meshesById[info.id];
    if (!mesh) {
      const bp = BLUEPRINT_CACHE[info.id];
      if (!bp) {
        if (this.loadingIndex !== idx) {
          this.loadingIndex = idx;
          const self = this;
          loadBlueprintById(info.id).then(function () {
            if (self.loadingIndex === idx) self.loadingIndex = -1;
          });
        }
        return;
      }
      mesh = buildFromBlueprint(bp);
      if (!mesh) return;
      mesh.name = 'vn_demo_' + info.id;
      mesh.visible = false;
      this.scene.add(mesh);
      this.meshesById[info.id] = mesh;
    }

    const angles = this.computeAngles(camera, seaRadius);
    this.angle = angles.startAngle;
    this.endAngle = angles.endAngle;
    this.activeMesh = mesh;

    mesh.visible = true;
    mesh.position.set(
      Math.cos(this.angle) * seaRadius,
      -seaRadius + Math.sin(this.angle) * seaRadius,
      this.zDepth
    );
    mesh.rotation.set(0, 0, this.angle - Math.PI / 2);

    // Pre-fetch next landmark from CDN while current one glides across the horizon
    const nextInfo = VIETNAM_LANDMARKS[(idx + 1) % VIETNAM_LANDMARKS.length];
    if (nextInfo && !BLUEPRINT_CACHE[nextInfo.id]) {
      loadBlueprintById(nextInfo.id);
    }

    if (this.onLandmarkChange) {
      this.onLandmarkChange(info, idx, VIETNAM_LANDMARKS.length);
    }
  };

  VietnamLandmarksDemo.prototype.update = function (deltaTime, speed, camera, seaRadius) {
    if (!this.scene || !camera) return;

    if (!this.activeMesh) {
      this.cooldown -= deltaTime;
      if (this.cooldown <= 0) {
        this.spawnCurrent(camera, seaRadius);
      }
      return;
    }

    const liveAngles = this.computeAngles(camera, seaRadius);
    this.endAngle = Math.max(this.endAngle, liveAngles.endAngle);

    const angularStep = Math.max(0.00028, speed) * deltaTime * 0.65;
    this.angle += angularStep;

    this.activeMesh.position.x = Math.cos(this.angle) * seaRadius;
    this.activeMesh.position.y = -seaRadius + Math.sin(this.angle) * seaRadius;
    this.activeMesh.position.z = this.zDepth;
    this.activeMesh.rotation.z = this.angle - Math.PI / 2;

    animateLandmark(this.activeMesh, performance.now());

    if (this.angle > this.endAngle) {
      this.activeMesh.visible = false;
      this.activeMesh = null;
      this.currentIndex = VIETNAM_LANDMARKS.length > 0
        ? (this.currentIndex + 1) % VIETNAM_LANDMARKS.length
        : 0;
      this.cooldown = 700;
    }
  };

  VietnamLandmarksDemo.prototype.reset = function () {
    if (this.activeMesh) {
      this.activeMesh.visible = false;
      this.activeMesh = null;
    }
    const ids = Object.keys(this.meshesById);
    for (let i = 0; i < ids.length; i++) {
      if (this.meshesById[ids[i]]) this.meshesById[ids[i]].visible = false;
    }
    this.currentIndex = 0;
    this.cooldown = 0;
    this.loadingIndex = -1;
  };

  // Start pre-fetching manifest immediately on script load
  loadManifest();

  window.VietnamLandmarksDemo = VietnamLandmarksDemo;
  window.VietnamLandmarksCatalog = {
    cdnBase: CDN_BASE,
    manifestUrl: MANIFEST_URL,
    list: VIETNAM_LANDMARKS,
    ready: loadManifest,
    loadById: function (id) {
      return loadBlueprintById(id).then(function (bp) {
        return bp ? buildFromBlueprint(bp) : null;
      });
    },
    buildByIndex: function (index) {
      const info = VIETNAM_LANDMARKS[index];
      if (!info || !BLUEPRINT_CACHE[info.id]) return null;
      return buildFromBlueprint(BLUEPRINT_CACHE[info.id]);
    },
    buildById: function (id) {
      if (!BLUEPRINT_CACHE[id]) return null;
      return buildFromBlueprint(BLUEPRINT_CACHE[id]);
    },
    animate: animateLandmark,
  };
})();
