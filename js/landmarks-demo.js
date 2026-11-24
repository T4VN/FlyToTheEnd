/**
 * FLY TO THE END - Unified CDN 3D Landmarks Engine for Web (Three.js r187)
 * Single source of truth shared with FlyToTheEnd App & Play Web:
 *   https://cdn.flytotheend.t4vn.com/landmarks/manifest.json
 *   https://cdn.flytotheend.t4vn.com/landmarks/models/<id>.<hash>.json
 */
(function () {
  'use strict';

  if (typeof THREE === 'undefined') return;

  const CDN_ORIGIN = 'https://cdn.flytotheend.t4vn.com';
  const CDN_PATH_PREFIX = '/landmarks/';
  const CDN_BASE = CDN_ORIGIN + CDN_PATH_PREFIX;
  const MANIFEST_URL = CDN_BASE + 'manifest.json';
  const MAX_NODES = 600;
  const MAX_DEPTH = 12;
  const MAX_PAYLOAD_BYTES = 512 * 1024;
  const MAX_MATERIAL_CACHE = 400;

  const VIETNAM_LANDMARKS = [];
  const ENTRY_BY_ID = Object.create(null);
  const BLUEPRINT_CACHE = Object.create(null);
  const BLUEPRINT_INFLIGHT = Object.create(null);
  const MATERIAL_CACHE = new Map();

  let manifestPromise = null;

  function clampNum(val, min, max, fallback) {
    if (typeof val !== 'number' || !Number.isFinite(val)) return fallback;
    return Math.max(min, Math.min(max, val));
  }

  function clampInt(val, min, max, fallback) {
    return Math.round(clampNum(val, min, max, fallback));
  }

  function isFiniteVec3(arr) {
    return (
      Array.isArray(arr) &&
      arr.length === 3 &&
      Number.isFinite(arr[0]) &&
      Number.isFinite(arr[1]) &&
      Number.isFinite(arr[2])
    );
  }

  function parseColor(val, fallback) {
    if (typeof val === 'number' && Number.isFinite(val)) {
      return Math.max(0, Math.min(0xffffff, Math.floor(val)));
    }
    if (typeof val === 'string') {
      const s = val.trim().replace(/^#|^0x/i, '');
      if (/^[0-9a-fA-F]{6}$/.test(s)) return parseInt(s, 16);
    }
    return fallback;
  }

  function getSharedMaterial(color, emissive, emissiveIntensity, opacity, doubleSide) {
    const em = emissive || 0x000000;
    // Match Three.js default emissiveIntensity=1 whenever an emissive color is set
    const ei =
      typeof emissiveIntensity === 'number' && Number.isFinite(emissiveIntensity)
        ? Math.max(0, Math.min(5, emissiveIntensity))
        : em !== 0
          ? 1
          : 0;
    const op =
      typeof opacity === 'number' && Number.isFinite(opacity)
        ? Math.max(0, Math.min(1, opacity))
        : 1;
    const ds = doubleSide ? 1 : 0;
    const key = color + '_' + em + '_' + ei + '_' + op + '_' + ds;
    let mat = MATERIAL_CACHE.get(key);
    if (!mat) {
      mat = new THREE.MeshLambertMaterial({
        color: color,
        emissive: em,
        emissiveIntensity: ei,
        flatShading: true,
        transparent: op < 1,
        opacity: op,
        side: ds ? THREE.DoubleSide : THREE.FrontSide,
      });
      if (MATERIAL_CACHE.size < MAX_MATERIAL_CACHE) {
        MATERIAL_CACHE.set(key, mat);
      }
    }
    return mat;
  }

  function createGeometry(node) {
    const a = Array.isArray(node.args) ? node.args : [];
    switch (node.type) {
      case 'box':
        return new THREE.BoxGeometry(
          clampNum(a[0], 0.01, 500, 1),
          clampNum(a[1], 0.01, 500, 1),
          clampNum(a[2], 0.01, 500, 1)
        );
      case 'cylinder':
        return new THREE.CylinderGeometry(
          clampNum(a[0], 0, 500, 1),
          clampNum(a[1], 0, 500, 1),
          clampNum(a[2], 0.01, 500, 1),
          clampInt(a[3], 3, 24, 8)
        );
      case 'cone':
        return new THREE.ConeGeometry(
          clampNum(a[0], 0.01, 500, 1),
          clampNum(a[1], 0.01, 500, 1),
          clampInt(a[2], 3, 24, 8)
        );
      case 'sphere':
        return new THREE.SphereGeometry(
          clampNum(a[0], 0.01, 500, 1),
          clampInt(a[1], 3, 24, 8),
          clampInt(a[2], 2, 16, 6)
        );
      case 'plane':
        return new THREE.PlaneGeometry(
          clampNum(a[0], 0.01, 500, 1),
          clampNum(a[1], 0.01, 500, 1)
        );
      case 'torus':
        return new THREE.TorusGeometry(
          clampNum(a[0], 0.01, 500, 1),
          clampNum(a[1], 0.01, 200, 0.3),
          clampInt(a[2], 3, 16, 6),
          clampInt(a[3], 3, 32, 12)
        );
      case 'dodecahedron':
        return new THREE.DodecahedronGeometry(
          clampNum(a[0], 0.01, 500, 1),
          clampInt(a[1], 0, 2, 0)
        );
      case 'octahedron':
        return new THREE.OctahedronGeometry(
          clampNum(a[0], 0.01, 500, 1),
          clampInt(a[1], 0, 2, 0)
        );
      default:
        return null;
    }
  }

  function buildFromBlueprint(blueprint) {
    if (!blueprint || !Array.isArray(blueprint.parts)) return null;
    const root = new THREE.Object3D();
    if (isFiniteVec3(blueprint.scale)) {
      root.scale.set(
        clampNum(blueprint.scale[0], 0.01, 20, 1),
        clampNum(blueprint.scale[1], 0.01, 20, 1),
        clampNum(blueprint.scale[2], 0.01, 20, 1)
      );
    }

    const anim = {
      flags: [],
      boats: [],
      dragonFires: [],
      cableCars: [],
      windmills: [],
      mists: [],
    };
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

      if (typeof node.name === 'string' && node.name.length > 0 && node.name.length <= 64) {
        obj.name = node.name;
      }
      if (isFiniteVec3(node.pos)) {
        obj.position.set(
          clampNum(node.pos[0], -2000, 2000, 0),
          clampNum(node.pos[1], -2000, 2000, 0),
          clampNum(node.pos[2], -2000, 2000, 0)
        );
      }
      if (isFiniteVec3(node.rot)) {
        obj.rotation.set(node.rot[0], node.rot[1], node.rot[2]);
      }
      if (isFiniteVec3(node.scale)) {
        obj.scale.set(
          clampNum(node.scale[0], 0.001, 100, 1),
          clampNum(node.scale[1], 0.001, 100, 1),
          clampNum(node.scale[2], 0.001, 100, 1)
        );
      }

      if (obj.name === 'anim_flag') {
        anim.flags.push(obj);
      } else if (obj.name === 'anim_boat') {
        obj.userData.baseY = obj.position.y;
        anim.boats.push(obj);
      } else if (obj.name === 'anim_dragon_fire') {
        anim.dragonFires.push(obj);
      } else if (obj.name === 'anim_cablecar') {
        obj.userData.baseX = obj.position.x;
        obj.userData.baseY = obj.position.y;
        anim.cableCars.push(obj);
      } else if (obj.name === 'anim_windmill') {
        anim.windmills.push(obj);
      } else if (obj.name === 'anim_mist') {
        anim.mists.push(obj);
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

    root.userData._anim = anim;
    return root;
  }

  function resolveCdnUrl(modelUrl) {
    if (typeof modelUrl !== 'string' || !modelUrl.trim()) return null;
    try {
      const resolved = new URL(modelUrl.trim(), CDN_BASE);
      if (resolved.protocol !== 'https:' || resolved.origin !== CDN_ORIGIN) return null;
      if (!resolved.pathname.startsWith(CDN_PATH_PREFIX)) return null;
      return resolved.toString();
    } catch (e) {
      return null;
    }
  }

  function fetchCdnJson(url, opts) {
    const fetchOpts = Object.assign({ credentials: 'omit', redirect: 'error' }, opts || {});
    return fetch(url, fetchOpts).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const lenHeader = res.headers && res.headers.get('content-length');
      if (lenHeader && Number(lenHeader) > MAX_PAYLOAD_BYTES) {
        throw new Error('Payload too large');
      }
      return res.text().then(function (text) {
        if (text.length > MAX_PAYLOAD_BYTES) throw new Error('Payload too large');
        return JSON.parse(text);
      });
    });
  }

  function loadManifest() {
    if (manifestPromise) return manifestPromise;
    manifestPromise = fetchCdnJson(MANIFEST_URL, { cache: 'no-cache' })
      .then(function (data) {
        if (!data || !Array.isArray(data.landmarks)) return VIETNAM_LANDMARKS;
        VIETNAM_LANDMARKS.length = 0;
        const seen = Object.create(null);
        for (let i = 0; i < data.landmarks.length; i++) {
          const item = data.landmarks[i];
          if (!item || typeof item.id !== 'string' || !item.id || !item.modelUrl || seen[item.id]) {
            continue;
          }
          seen[item.id] = true;
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
        return fetchCdnJson(url).then(function (bp) {
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

  // Living landmark animations (Zero scene traversal per frame via cached node refs)
  function animateLandmark(mesh, time) {
    if (!mesh) return;
    const anim = mesh.userData && mesh.userData._anim;
    if (!anim) return;
    const t = typeof time === 'number' ? time : performance.now();

    for (let i = 0; i < anim.flags.length; i++) {
      anim.flags[i].rotation.y = Math.sin(t * 0.006) * 0.28;
    }
    for (let i = 0; i < anim.boats.length; i++) {
      const boat = anim.boats[i];
      const baseY = typeof boat.userData.baseY === 'number' ? boat.userData.baseY : 3;
      boat.position.y = baseY + Math.sin(t * 0.004) * 1.1;
      boat.rotation.z = Math.sin(t * 0.003) * 0.06;
    }
    for (let i = 0; i < anim.dragonFires.length; i++) {
      const fire = anim.dragonFires[i];
      const cycle = (t * 0.002) % (Math.PI * 2);
      const pulse = Math.max(0, Math.sin(cycle));
      fire.visible = pulse > 0.12;
      if (fire.visible) {
        const s = 0.4 + pulse * 0.95 + Math.sin(t * 0.04) * 0.12;
        fire.scale.set(s, 0.6 + pulse * 0.6, 0.6 + pulse * 0.6);
      }
    }
    for (let i = 0; i < anim.cableCars.length; i++) {
      const car = anim.cableCars[i];
      const bx = typeof car.userData.baseX === 'number' ? car.userData.baseX : -14;
      const by = typeof car.userData.baseY === 'number' ? car.userData.baseY : 28;
      const slide = Math.sin(t * 0.0015);
      car.position.x = bx + slide * 12;
      car.position.y = by + slide * 5;
    }
    for (let i = 0; i < anim.windmills.length; i++) {
      anim.windmills[i].rotation.z = -(t * 0.0028);
    }
    for (let i = 0; i < anim.mists.length; i++) {
      const s = 0.94 + Math.sin(t * 0.004) * 0.08;
      anim.mists[i].scale.set(s, s, 1);
    }
  }

  // Sequential Heritage Parade Manager — powered by CDN
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
    this.retryBackoffMs = 1500;
    loadManifest().then(function (list) {
      if (list.length > 0) loadBlueprintById(list[0].id);
    });
  }

  VietnamLandmarksDemo.prototype.computeAngles = function (camera, seaRadius) {
    const distZ = Math.max(120, camera.position.z - this.zDepth);
    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * distZ;
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
          loadBlueprintById(info.id).then(function (loaded) {
            if (self.loadingIndex === idx) self.loadingIndex = -1;
            if (!loaded) {
              // Exponential backoff prevents 60 FPS fetch loop when CDN is unreachable
              self.cooldown = self.retryBackoffMs;
              self.retryBackoffMs = Math.min(30000, self.retryBackoffMs * 2);
            } else {
              self.retryBackoffMs = 1500;
            }
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
    this.retryBackoffMs = 1500;
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
