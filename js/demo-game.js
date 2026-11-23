/**
 * FLY TO THE END - Interactive Web Touch Demo
 * 100% Compatible with Three.js r90 Engine
 * Faithful to Original Game Logic & Assets
 */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.error('Three.js is required for Fly to The End 3D Demo.');
    return;
  }

  // DOM Elements
  const container = document.getElementById('world');
  if (!container) return;

  const demoFrame = document.querySelector('.demo-frame');
  const overlay = document.getElementById('demoOverlay');
  const startBtn = document.getElementById('startDemoBtn');
  const pauseBtn = document.getElementById('btnPauseDemo');
  const resetBtn = document.getElementById('resetDemoBtn');
  const muteBtn = document.getElementById('muteDemoBtn');
  const fullscreenBtn = document.getElementById('fullscreenDemoBtn');
  const txtFullscreenBtn = document.getElementById('txtFullscreenBtn');

  const levelValEl = document.getElementById('levelValue');
  const levelCircleEl = document.getElementById('levelCircleStroke');
  const distValEl = document.getElementById('distValue');
  const energyBarEl = document.getElementById('energyBar');
  const tipText = document.getElementById('demoTipText');

  const resultDistEl = document.getElementById('resultDist');
  const resultLvlEl = document.getElementById('resultLvl');
  const gameOverTitle = document.getElementById('gameOverTitle');
  const gameOverDesc = document.getElementById('gameOverDesc');

  // Exact Colors from game.js
  const Colors = {
    red: 0xf25346,
    white: 0xd8d0d1,
    brown: 0x59332e,
    brownDark: 0x23190f,
    pink: 0xF5986E,
    yellow: 0xf4ce93,
    blue: 0x68c3c0,
  };

  // Audio system
  let isMuted = false;
  const soundRing = new Audio('assets/sounds/ring.mp3');
  const soundBoom = new Audio('assets/sounds/boom.mp3');

  function playSound(type) {
    if (isMuted) return;
    try {
      if (type === 'ring') {
        soundRing.currentTime = 0;
        soundRing.play().catch(() => {});
      } else if (type === 'boom') {
        soundBoom.currentTime = 0;
        soundBoom.play().catch(() => {});
      }
    } catch {
      // Ignore
    }
  }

  // Game State
  const game = {
    speed: 0,
    initSpeed: 0.00035,
    baseSpeed: 0.00035,
    targetBaseSpeed: 0.00035,
    incrementSpeedByTime: 0.0000025,
    incrementSpeedByLevel: 0.000005,
    distanceForSpeedUpdate: 100,
    speedLastUpdate: 0,

    distance: 0,
    ratioSpeedDistance: 50,
    energy: 100,
    ratioSpeedEnergy: 3,

    level: 1,
    levelLastUpdate: 0,
    distanceForLevelUpdate: 500,

    planeDefaultHeight: 100,
    planeAmpHeight: 80,
    planeAmpWidth: 75,
    planeMoveSensivity: 0.005,
    planeRotXSensivity: 0.0008,
    planeRotZSensivity: 0.0004,
    planeFallSpeed: 0.001,
    planeMinSpeed: 1.2,
    planeMaxSpeed: 1.6,
    planeSpeed: 0,
    planeCollisionDisplacementX: 0,
    planeCollisionSpeedX: 0,
    planeCollisionDisplacementY: 0,
    planeCollisionSpeedY: 0,

    seaRadius: 600,
    seaLength: 800,
    wavesMinAmp: 5,
    wavesMaxAmp: 20,
    wavesMinSpeed: 0.001,
    wavesMaxSpeed: 0.003,

    cameraFarPos: 500,
    cameraNearPos: 150,
    cameraSensivity: 0.002,

    coinDistanceTolerance: 15,
    coinValue: 4,
    coinsSpeed: 0.5,
    coinLastSpawn: 0,
    distanceForCoinsSpawn: 100,

    ennemyDistanceTolerance: 10,
    ennemyValue: 10,
    ennemiesSpeed: 0.6,
    ennemyLastSpawn: 0,
    distanceForEnnemiesSpawn: 50,

    status: 'menu' // 'menu', 'playing', 'paused', 'gameover'
  };

  let scene, camera, renderer;
  let ambientLight, hemisphereLight, shadowLight;
  let WIDTH, HEIGHT;
  let mousePos = { x: 0, y: 0 };
  let deltaTime = 0;
  let newTime = performance.now();
  let oldTime = performance.now();

  function normalize(v, vmin, vmax, tmin, tmax) {
    const nv = Math.max(Math.min(v, vmax), vmin);
    const dv = vmax - vmin;
    const pc = (nv - vmin) / dv;
    return tmin + pc * (tmax - tmin);
  }

  // ================= 3D PILOT =================
  const Pilot = function () {
    this.mesh = new THREE.Object3D();
    this.mesh.name = 'pilot';
    this.angleHairs = 0;

    const bodyGeom = new THREE.BoxGeometry(15, 15, 15);
    const bodyMat = new THREE.MeshPhongMaterial({ color: Colors.brown, flatShading: THREE.FlatShading });
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    body.position.set(2, -12, 0);
    this.mesh.add(body);

    const faceGeom = new THREE.BoxGeometry(10, 10, 10);
    const faceMat = new THREE.MeshLambertMaterial({ color: Colors.pink });
    const face = new THREE.Mesh(faceGeom, faceMat);
    this.mesh.add(face);

    const hairGeom = new THREE.BoxGeometry(4, 4, 4);
    const hairMat = new THREE.MeshLambertMaterial({ color: 0x000000 });
    const hair = new THREE.Mesh(hairGeom, hairMat);
    hair.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 2, 0));
    const hairs = new THREE.Object3D();

    this.hairsTop = new THREE.Object3D();
    for (let i = 0; i < 12; i++) {
      const h = hair.clone();
      const col = i % 3;
      const row = Math.floor(i / 3);
      const startPosZ = -4;
      const startPosX = -4;
      h.position.set(startPosX + row * 4, 0, startPosZ + col * 4);
      this.hairsTop.add(h);
    }
    hairs.add(this.hairsTop);

    const hairSideGeom = new THREE.BoxGeometry(12, 4, 2);
    hairSideGeom.applyMatrix(new THREE.Matrix4().makeTranslation(-6, 0, 0));
    const hairSideR = new THREE.Mesh(hairSideGeom, hairMat);
    const hairSideL = hairSideR.clone();
    hairSideR.position.set(8, -2, 6);
    hairSideL.position.set(8, -2, -6);
    hairs.add(hairSideR);
    hairs.add(hairSideL);

    const hairBackGeom = new THREE.BoxGeometry(2, 8, 10);
    const hairBack = new THREE.Mesh(hairBackGeom, hairMat);
    hairBack.position.set(-1, -4, 0);
    hairs.add(hairBack);
    hairs.position.set(-5, 5, 0);
    this.mesh.add(hairs);

    const glassGeom = new THREE.BoxGeometry(5, 5, 5);
    const glassMat = new THREE.MeshLambertMaterial({ color: Colors.brown });
    const glassR = new THREE.Mesh(glassGeom, glassMat);
    glassR.position.set(6, 0, 3);
    const glassL = glassR.clone();
    glassL.position.z = -glassR.position.z;
    const glassAGeom = new THREE.BoxGeometry(11, 1, 11);
    const glassA = new THREE.Mesh(glassAGeom, glassMat);
    this.mesh.add(glassR);
    this.mesh.add(glassL);
    this.mesh.add(glassA);

    const earGeom = new THREE.BoxGeometry(2, 3, 2);
    const earL = new THREE.Mesh(earGeom, faceMat);
    earL.position.set(0, 0, -6);
    const earR = earL.clone();
    earR.position.set(0, 0, 6);
    this.mesh.add(earL);
    this.mesh.add(earR);
  };

  Pilot.prototype.updateHairs = function () {
    const hairs = this.hairsTop.children;
    for (let i = 0; i < hairs.length; i++) {
      const h = hairs[i];
      h.scale.y = 0.75 + Math.cos(this.angleHairs + i / 3) * 0.25;
    }
    this.angleHairs += game.speed * deltaTime * 40;
  };

  // ================= 3D AIRPLANE (Three.js r90) =================
  const AirPlane = function () {
    this.mesh = new THREE.Object3D();
    this.mesh.name = 'airPlane';

    // Cabin
    const geomCabin = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
    const matCabin = new THREE.MeshPhongMaterial({ color: Colors.blue, flatShading: THREE.FlatShading });

    if (geomCabin.vertices && geomCabin.vertices.length >= 8) {
      geomCabin.vertices[4].y -= 10;
      geomCabin.vertices[4].z += 20;
      geomCabin.vertices[5].y -= 10;
      geomCabin.vertices[5].z -= 20;
      geomCabin.vertices[6].y += 30;
      geomCabin.vertices[6].z += 20;
      geomCabin.vertices[7].y += 30;
      geomCabin.vertices[7].z -= 20;
    }

    const cabin = new THREE.Mesh(geomCabin, matCabin);
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    this.mesh.add(cabin);

    // Engine
    const geomEngine = new THREE.ConeGeometry(20, 50, 50, 1, 1, 1);
    const matEngine = new THREE.MeshPhongMaterial({ color: Colors.white, flatShading: THREE.FlatShading });
    const engine = new THREE.Mesh(geomEngine, matEngine);
    engine.rotation.z = -Math.PI / 2;
    engine.position.x = 50;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);

    // Tail Plane
    const geomTailPlane = new THREE.BoxGeometry(5, 20, 30, 1, 1, 1);
    const matTailPlane = new THREE.MeshPhongMaterial({ color: Colors.blue, flatShading: THREE.FlatShading });
    const tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-40, 20, 0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);

    // Wings
    const geomSideWing = new THREE.BoxGeometry(30, 5, 120, 1, 1, 1);
    const matSideWing = new THREE.MeshPhongMaterial({ color: Colors.blue, flatShading: THREE.FlatShading });
    const sideWing = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing.position.set(0, 15, 0);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);

    // Windshield
    const geomWindshield = new THREE.BoxGeometry(3, 15, 20, 1, 1, 1);
    const matWindshield = new THREE.MeshPhongMaterial({ color: Colors.white, transparent: true, opacity: 0.3, flatShading: THREE.FlatShading });
    const windshield = new THREE.Mesh(geomWindshield, matWindshield);
    windshield.position.set(5, 27, 0);
    windshield.castShadow = true;
    windshield.receiveShadow = true;
    this.mesh.add(windshield);

    // Propeller
    const geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
    if (geomPropeller.vertices && geomPropeller.vertices.length >= 8) {
      geomPropeller.vertices[4].y -= 5;
      geomPropeller.vertices[4].z += 5;
      geomPropeller.vertices[5].y -= 5;
      geomPropeller.vertices[5].z -= 5;
      geomPropeller.vertices[6].y += 5;
      geomPropeller.vertices[6].z += 5;
      geomPropeller.vertices[7].y += 5;
      geomPropeller.vertices[7].z -= 5;
    }
    const matPropeller = new THREE.MeshPhongMaterial({ color: Colors.brown, flatShading: THREE.FlatShading });
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    const geomBlade = new THREE.BoxGeometry(1, 80, 10, 1, 1, 1);
    const matBlade = new THREE.MeshPhongMaterial({ color: Colors.brownDark, flatShading: THREE.FlatShading });
    const blade1 = new THREE.Mesh(geomBlade, matBlade);
    blade1.position.set(8, 0, 0);
    blade1.castShadow = true;
    blade1.receiveShadow = true;

    const blade2 = blade1.clone();
    blade2.rotation.x = Math.PI / 2;
    blade2.castShadow = true;
    blade2.receiveShadow = true;

    this.propeller.add(blade1);
    this.propeller.add(blade2);
    this.propeller.position.set(60, 0, 0);
    this.mesh.add(this.propeller);

    // Wheels
    const wheelProtecGeom = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1);
    const wheelProtecMat = new THREE.MeshPhongMaterial({ color: Colors.blue, flatShading: THREE.FlatShading });
    const wheelProtecR = new THREE.Mesh(wheelProtecGeom, wheelProtecMat);
    wheelProtecR.position.set(25, -20, 25);
    this.mesh.add(wheelProtecR);

    const wheelTireGeom = new THREE.BoxGeometry(24, 24, 4);
    const wheelTireMat = new THREE.MeshPhongMaterial({ color: Colors.brownDark, flatShading: THREE.FlatShading });
    const wheelTireR = new THREE.Mesh(wheelTireGeom, wheelTireMat);
    wheelTireR.position.set(25, -28, 25);
    this.mesh.add(wheelTireR);

    const wheelProtecL = wheelProtecR.clone();
    wheelProtecL.position.z = -wheelProtecR.position.z;
    this.mesh.add(wheelProtecL);

    const wheelTireL = wheelTireR.clone();
    wheelTireL.position.z = -wheelTireR.position.z;
    this.mesh.add(wheelTireL);

    // Pilot
    this.pilot = new Pilot();
    this.pilot.mesh.position.set(-10, 27, 0);
    this.mesh.add(this.pilot.mesh);

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  };

  // ================= 3D SEA =================
  const Sea = function () {
    const geom = new THREE.CylinderGeometry(game.seaRadius, game.seaRadius, game.seaLength, 40, 10);
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    geom.mergeVertices();
    const l = geom.vertices.length;

    this.waves = [];
    for (let i = 0; i < l; i++) {
      const v = geom.vertices[i];
      this.waves.push({
        y: v.y,
        x: v.x,
        z: v.z,
        ang: Math.random() * Math.PI * 2,
        amp: game.wavesMinAmp + Math.random() * (game.wavesMaxAmp - game.wavesMinAmp),
        speed: game.wavesMinSpeed + Math.random() * (game.wavesMaxSpeed - game.wavesMinSpeed),
      });
    }

    const mat = new THREE.MeshPhongMaterial({
      color: Colors.blue,
      transparent: true,
      opacity: 0.8,
      flatShading: THREE.FlatShading,
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.name = 'waves';
    this.mesh.receiveShadow = true;
  };

  Sea.prototype.moveWaves = function () {
    const verts = this.mesh.geometry.vertices;
    const l = verts.length;
    for (let i = 0; i < l; i++) {
      const v = verts[i];
      const vprops = this.waves[i];
      v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
      v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;
      vprops.ang += vprops.speed * deltaTime;
    }
    this.mesh.geometry.verticesNeedUpdate = true;
  };

  // ================= 3D CLOUDS & SKY =================
  const Cloud = function () {
    this.mesh = new THREE.Object3D();
    this.mesh.name = 'cloud';
    const geom = new THREE.SphereGeometry(20, 6, 6);
    const mat = new THREE.MeshPhongMaterial({
      color: Colors.white,
      flatShading: THREE.FlatShading,
    });

    const nBlocs = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < nBlocs; i++) {
      const m = new THREE.Mesh(geom.clone(), mat);
      m.position.x = i * 15;
      m.position.y = Math.random() * 10;
      m.position.z = Math.random() * 10;
      m.rotation.z = Math.random() * Math.PI * 2;
      m.rotation.y = Math.random() * Math.PI * 2;
      const s = 0.1 + Math.random() * 0.9;
      m.scale.set(s, s, s);
      m.castShadow = true;
      m.receiveShadow = true;
      this.mesh.add(m);
    }
  };

  Cloud.prototype.rotate = function () {
    const l = this.mesh.children.length;
    for (let i = 0; i < l; i++) {
      const m = this.mesh.children[i];
      m.rotation.z += Math.random() * 0.005 * (i + 1);
      m.rotation.y += Math.random() * 0.002 * (i + 1);
    }
  };

  const Sky = function () {
    this.mesh = new THREE.Object3D();
    this.nClouds = 20;
    this.clouds = [];
    const stepAngle = (Math.PI * 2) / this.nClouds;
    for (let i = 0; i < this.nClouds; i++) {
      const c = new Cloud();
      this.clouds.push(c);
      const a = stepAngle * i;
      const h = game.seaRadius + 150 + Math.random() * 200;
      c.mesh.position.y = Math.sin(a) * h;
      c.mesh.position.x = Math.cos(a) * h;
      c.mesh.position.z = -300 - Math.random() * 500;
      c.mesh.rotation.z = a + Math.PI / 2;
      const s = 1 + Math.random() * 2;
      c.mesh.scale.set(s, s, s);
      this.mesh.add(c.mesh);
    }
  };

  Sky.prototype.moveClouds = function () {
    for (let i = 0; i < this.nClouds; i++) {
      this.clouds[i].rotate();
    }
    this.mesh.rotation.z += game.speed * deltaTime;
  };

  // ================= 3D ENNEMY =================
  const Ennemy = function () {
    const geom = new THREE.TetrahedronGeometry(8, 2);
    const mat = new THREE.MeshPhongMaterial({
      color: Colors.red,
      shininess: 0,
      specular: 0xffffff,
      flatShading: THREE.FlatShading,
    });
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.castShadow = true;
    this.angle = 0;
    this.distance = 0;
  };

  const ennemiesPool = [];
  const EnnemiesHolder = function () {
    this.mesh = new THREE.Object3D();
    this.ennemiesInUse = [];
  };

  EnnemiesHolder.prototype.spawnEnnemies = function () {
    const nEnnemies = Math.min(3, game.level);
    for (let i = 0; i < nEnnemies; i++) {
      let ennemy = ennemiesPool.length ? ennemiesPool.pop() : new Ennemy();
      ennemy.angle = -(i * 0.1);
      ennemy.distance = game.seaRadius + game.planeDefaultHeight + (-1 + Math.random() * 2) * (game.planeAmpHeight - 20);
      ennemy.mesh.position.y = -game.seaRadius + Math.sin(ennemy.angle) * ennemy.distance;
      ennemy.mesh.position.x = Math.cos(ennemy.angle) * ennemy.distance;

      this.mesh.add(ennemy.mesh);
      this.ennemiesInUse.push(ennemy);
    }
  };

  EnnemiesHolder.prototype.rotateEnnemies = function () {
    for (let i = 0; i < this.ennemiesInUse.length; i++) {
      const ennemy = this.ennemiesInUse[i];
      ennemy.angle += game.speed * deltaTime * game.ennemiesSpeed;
      if (ennemy.angle > Math.PI * 2) ennemy.angle -= Math.PI * 2;

      ennemy.mesh.position.y = -game.seaRadius + Math.sin(ennemy.angle) * ennemy.distance;
      ennemy.mesh.position.x = Math.cos(ennemy.angle) * ennemy.distance;
      ennemy.mesh.rotation.z += Math.random() * 0.1;
      ennemy.mesh.rotation.y += Math.random() * 0.1;

      const diffPos = airplane.mesh.position.clone().sub(ennemy.mesh.position.clone());
      const d = diffPos.length();
      if (d < game.ennemyDistanceTolerance) {
        playSound('boom');
        particlesHolder.spawnParticles(ennemy.mesh.position.clone(), 15, Colors.red, 3);
        ennemiesPool.unshift(this.ennemiesInUse.splice(i, 1)[0]);
        this.mesh.remove(ennemy.mesh);
        game.planeCollisionSpeedX = (100 * diffPos.x) / d;
        game.planeCollisionSpeedY = (100 * diffPos.y) / d;

        game.energy = Math.max(0, game.energy - game.ennemyValue * 2.5);
        if (ambientLight) ambientLight.intensity = 2;
        setTimeout(() => { if (ambientLight) ambientLight.intensity = 0.5; }, 200);

        if (game.energy <= 0) {
          triggerGameOver('VA CHẠM CHƯỚNG NGẠI VẬT!', 'Máy bay đã va chạm với vật cản trên bầu trời.');
        }
        i--;
      } else if (ennemy.angle > Math.PI) {
        ennemiesPool.unshift(this.ennemiesInUse.splice(i, 1)[0]);
        this.mesh.remove(ennemy.mesh);
        i--;
      }
    }
  };

  // ================= 3D COIN =================
  const Coin = function () {
    const geom = new THREE.TetrahedronGeometry(5, 0);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x009999,
      shininess: 0,
      specular: 0xffffff,
      flatShading: THREE.FlatShading,
    });
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.castShadow = true;
    this.angle = 0;
    this.distance = 0;
  };

  const CoinsHolder = function (nCoins) {
    this.mesh = new THREE.Object3D();
    this.coinsInUse = [];
    this.coinsPool = [];
    for (let i = 0; i < nCoins; i++) {
      this.coinsPool.push(new Coin());
    }
  };

  CoinsHolder.prototype.spawnCoins = function () {
    const nCoins = 1 + Math.floor(Math.random() * 8);
    const d = game.seaRadius + game.planeDefaultHeight + (-1 + Math.random() * 2) * (game.planeAmpHeight - 20);
    const amplitude = 10 + Math.round(Math.random() * 10);

    for (let i = 0; i < nCoins; i++) {
      const coin = this.coinsPool.length ? this.coinsPool.pop() : new Coin();
      this.mesh.add(coin.mesh);
      this.coinsInUse.push(coin);
      coin.angle = -(i * 0.02);
      coin.distance = d + Math.cos(i * 0.5) * amplitude;
      coin.mesh.position.y = -game.seaRadius + Math.sin(coin.angle) * coin.distance;
      coin.mesh.position.x = Math.cos(coin.angle) * coin.distance;
    }
  };

  CoinsHolder.prototype.rotateCoins = function () {
    for (let i = 0; i < this.coinsInUse.length; i++) {
      const coin = this.coinsInUse[i];
      coin.angle += game.speed * deltaTime * game.coinsSpeed;
      if (coin.angle > Math.PI * 2) coin.angle -= Math.PI * 2;
      coin.mesh.position.y = -game.seaRadius + Math.sin(coin.angle) * coin.distance;
      coin.mesh.position.x = Math.cos(coin.angle) * coin.distance;
      coin.mesh.rotation.z += 0.05;
      coin.mesh.rotation.y += 0.05;

      const diffPos = airplane.mesh.position.clone().sub(coin.mesh.position.clone());
      const d = diffPos.length();
      if (d < game.coinDistanceTolerance) {
        playSound('ring');
        this.coinsPool.unshift(this.coinsInUse.splice(i, 1)[0]);
        this.mesh.remove(coin.mesh);
        particlesHolder.spawnParticles(coin.mesh.position.clone(), 5, 0x009999, 0.8);
        game.energy = Math.min(100, game.energy + game.coinValue * 3);
        tipText.innerHTML = '⚡ <strong>Nạp năng lượng!</strong> +12% Nhiên liệu xanh ngọc';
        i--;
      } else if (coin.angle > Math.PI) {
        this.coinsPool.unshift(this.coinsInUse.splice(i, 1)[0]);
        this.mesh.remove(coin.mesh);
        i--;
      }
    }
  };

  // ================= 3D PARTICLES =================
  const Particle = function () {
    const geom = new THREE.BoxGeometry(3, 3, 3);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.visible = false;
    this.life = 0;
    this.vx = 0;
    this.vy = 0;
  };

  Particle.prototype.explode = function (pos, color, scale) {
    this.mesh.material.color.setHex(color);
    this.mesh.scale.set(scale, scale, scale);
    this.mesh.position.copy(pos);
    this.mesh.visible = true;
    this.life = 1;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
  };

  Particle.prototype.update = function () {
    if (this.life <= 0) return;
    this.mesh.position.x += this.vx;
    this.mesh.position.y += this.vy;
    this.life -= 0.03;
    this.mesh.scale.multiplyScalar(0.96);
    if (this.life <= 0) {
      this.mesh.visible = false;
    }
  };

  const particlesPool = [];
  const ParticlesHolder = function () {
    this.mesh = new THREE.Object3D();
    this.particlesInUse = [];
  };

  ParticlesHolder.prototype.spawnParticles = function (pos, density, color, scale) {
    for (let i = 0; i < density; i++) {
      const p = particlesPool.length ? particlesPool.pop() : new Particle();
      this.mesh.add(p.mesh);
      p.explode(pos, color, scale);
      this.particlesInUse.push(p);
    }
  };

  ParticlesHolder.prototype.update = function () {
    for (let i = this.particlesInUse.length - 1; i >= 0; i--) {
      const p = this.particlesInUse[i];
      p.update();
      if (p.life <= 0) {
        this.mesh.remove(p.mesh);
        particlesPool.push(this.particlesInUse.splice(i, 1)[0]);
      }
    }
  };

  // World Instances
  let airplane, sea, sky, coinsHolder, ennemiesHolder, particlesHolder;

  function createScene() {
    HEIGHT = container.clientHeight || 500;
    WIDTH = container.clientWidth || 900;

    scene = new THREE.Scene();
    const aspectRatio = WIDTH / HEIGHT;
    const fieldOfView = 50;
    const nearPlane = 0.1;
    const farPlane = 10000;
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
    camera.position.set(0, game.planeDefaultHeight, 200);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', handleResize, false);
  }

  function handleResize() {
    const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || (demoFrame && demoFrame.classList.contains('is-fullscreen')));
    if (isFull) {
      WIDTH = window.innerWidth;
      HEIGHT = window.innerHeight - 52; // Full height minus 52px top toolbar
    } else {
      WIDTH = container.clientWidth || 900;
      HEIGHT = container.clientHeight || 500;
    }
    if (renderer && camera) {
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    }
  }

  function createLights() {
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
    ambientLight = new THREE.AmbientLight(0xdc8874, 0.5);

    shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
    shadowLight.position.set(150, 350, 350);
    shadowLight.castShadow = true;
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;
    shadowLight.shadow.mapSize.width = 1024;
    shadowLight.shadow.mapSize.height = 1024;

    scene.add(hemisphereLight);
    scene.add(shadowLight);
    scene.add(ambientLight);
  }

  function initWorldObjects() {
    airplane = new AirPlane();
    airplane.mesh.scale.set(0.25, 0.25, 0.25);
    airplane.mesh.position.y = game.planeDefaultHeight;
    scene.add(airplane.mesh);

    sea = new Sea();
    sea.mesh.position.y = -game.seaRadius;
    scene.add(sea.mesh);

    sky = new Sky();
    sky.mesh.position.y = -game.seaRadius;
    scene.add(sky.mesh);

    coinsHolder = new CoinsHolder(20);
    scene.add(coinsHolder.mesh);

    ennemiesHolder = new EnnemiesHolder();
    scene.add(ennemiesHolder.mesh);

    particlesHolder = new ParticlesHolder();
    scene.add(particlesHolder.mesh);
  }

  // ================= TOUCH & POINTER HANDLING =================
  function handlePointer(clientX, clientY) {
    if (game.status !== 'playing') return;
    const rect = container.getBoundingClientRect();
    const tx = -1 + ((clientX - rect.left) / rect.width) * 2;
    const ty = 1 - ((clientY - rect.top) / rect.height) * 2;
    mousePos.x = Math.max(-1, Math.min(1, tx));
    mousePos.y = Math.max(-1, Math.min(1, ty));
  }

  container.addEventListener('mousemove', (e) => handlePointer(e.clientX, e.clientY));
  container.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (e.touches.length > 0) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });

  container.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (game.status === 'menu' || game.status === 'gameover') startGame();
    if (e.touches.length > 0) handlePointer(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });

  container.addEventListener('mousedown', (e) => {
    if (game.status === 'menu' || game.status === 'gameover') startGame();
  });

  // ================= FLIGHT PHYSICS =================
  function updatePlane() {
    game.planeSpeed = normalize(mousePos.x, -0.5, 0.5, game.planeMinSpeed, game.planeMaxSpeed);

    const targetY = normalize(mousePos.y, -0.75, 0.75, game.planeDefaultHeight - game.planeAmpHeight, game.planeDefaultHeight + game.planeAmpHeight);
    const targetX = normalize(mousePos.x, -1, 1, -game.planeAmpWidth * 0.7, -game.planeAmpWidth);

    if (game.planeCollisionDisplacementX > 0) {
      game.planeCollisionDisplacementX -= game.planeCollisionSpeedX * deltaTime;
      airplane.mesh.position.x += game.planeCollisionDisplacementX;
      airplane.mesh.rotation.z += game.planeCollisionDisplacementX * 0.05;
    }
    if (game.planeCollisionDisplacementY > 0) {
      game.planeCollisionDisplacementY -= game.planeCollisionSpeedY * deltaTime;
      airplane.mesh.position.y += game.planeCollisionDisplacementY;
      airplane.mesh.rotation.x += game.planeCollisionDisplacementY * 0.05;
    }

    airplane.mesh.position.y += (targetY - airplane.mesh.position.y) * deltaTime * game.planeMoveSensivity;
    airplane.mesh.position.x += (targetX - airplane.mesh.position.x) * deltaTime * game.planeMoveSensivity;

    airplane.mesh.rotation.z = (targetY - airplane.mesh.position.y) * deltaTime * game.planeRotXSensivity;
    airplane.mesh.rotation.x = (airplane.mesh.position.y - targetY) * deltaTime * game.planeRotZSensivity;

    const cameraTargetZ = normalize(game.planeSpeed, game.planeMinSpeed, game.planeMaxSpeed, game.cameraNearPos, game.cameraFarPos);
    camera.position.z += (cameraTargetZ - camera.position.z) * deltaTime * game.cameraSensivity;

    airplane.propeller.rotation.x += 0.3;
    airplane.pilot.updateHairs();
  }

  function updateCamera() {
    camera.fov = normalize(mousePos.x, -1, 1, 40, 80);
    camera.updateProjectionMatrix();
    camera.position.y += (airplane.mesh.position.y - camera.position.y) * deltaTime * game.cameraSensivity;
  }

  function updateDistance() {
    game.distance += game.speed * deltaTime * game.ratioSpeedDistance;
    if (distValEl) distValEl.textContent = Math.floor(game.distance).toString().padStart(3, '0');

    if (Math.floor(game.distance) % game.distanceForLevelUpdate === 0 && Math.floor(game.distance) > game.levelLastUpdate) {
      game.level++;
      game.levelLastUpdate = Math.floor(game.distance);
      if (levelValEl) levelValEl.textContent = game.level.toString();
      game.targetBaseSpeed = game.initSpeed + (game.incrementSpeedByLevel * game.level);
    }

    if (levelCircleEl) {
      const d = 502 * (1 - (game.distance % game.distanceForLevelUpdate) / game.distanceForLevelUpdate);
      levelCircleEl.setAttribute('stroke-dashoffset', d.toString());
    }
  }

  function updateEnergy() {
    game.energy -= game.speed * deltaTime * game.ratioSpeedEnergy;
    game.energy = Math.max(0, game.energy);
    if (energyBarEl) {
      energyBarEl.style.width = game.energy + '%';
      energyBarEl.style.backgroundColor = (game.energy < 40) ? '#f25346' : '#68c3c0';
    }

    if (game.energy < 1) {
      triggerGameOver('HẾT NHIÊN LIỆU!', 'Máy bay của bạn đã đáp xuống đại dương.');
    }
  }

  function startGame() {
    game.status = 'playing';
    overlay.classList.add('hidden');
    game.speed = game.baseSpeed;
    game.distance = 0;
    game.energy = 100;
    game.level = 1;
    game.levelLastUpdate = 0;
    tipText.innerHTML = '👉 <strong>Đang bay 3D:</strong> Chạm vuốt ngón tay hoặc rê chuột để máy bay lượn sóng!';
  }

  function triggerGameOver(title, desc) {
    game.status = 'gameover';
    if (gameOverTitle) gameOverTitle.innerHTML = title;
    if (gameOverDesc) gameOverDesc.textContent = desc;
    if (resultDistEl) resultDistEl.textContent = `${Math.floor(game.distance)} m`;
    if (resultLvlEl) resultLvlEl.textContent = game.level.toString();

    startBtn.textContent = 'BAY LẠI NGAY';
    overlay.classList.remove('hidden');
    tipText.innerHTML = '💡 <strong>Mẹo:</strong> Tải game trên kho ứng dụng để có thêm chế độ chơi khác!';
  }

  // ================= MAIN LOOP =================
  function loop() {
    newTime = performance.now();
    deltaTime = newTime - oldTime;
    oldTime = newTime;

    if (game.status === 'playing') {
      if (Math.floor(game.distance) % game.distanceForCoinsSpawn === 0 && Math.floor(game.distance) > game.coinLastSpawn) {
        game.coinLastSpawn = Math.floor(game.distance);
        coinsHolder.spawnCoins();
      }

      if (Math.floor(game.distance) % game.distanceForSpeedUpdate === 0 && Math.floor(game.distance) > game.speedLastUpdate) {
        game.speedLastUpdate = Math.floor(game.distance);
        game.targetBaseSpeed += game.incrementSpeedByTime * deltaTime;
      }

      if (Math.floor(game.distance) % game.distanceForEnnemiesSpawn === 0 && Math.floor(game.distance) > game.ennemyLastSpawn) {
        game.ennemyLastSpawn = Math.floor(game.distance);
        ennemiesHolder.spawnEnnemies();
      }

      updatePlane();
      updateDistance();
      updateEnergy();
      game.baseSpeed += (game.targetBaseSpeed - game.baseSpeed) * deltaTime * 0.02;
      game.speed = game.baseSpeed * game.planeSpeed;
    } else if (game.status === 'gameover') {
      game.speed *= 0.99;
      airplane.mesh.rotation.z += (-Math.PI / 2 - airplane.mesh.rotation.z) * 0.0002 * deltaTime;
      airplane.mesh.rotation.x += 0.0003 * deltaTime;
      game.planeFallSpeed *= 1.05;
      airplane.mesh.position.y -= game.planeFallSpeed * deltaTime;
      if (airplane.mesh.position.y < -game.seaRadius + 100) {
        airplane.mesh.position.y = -game.seaRadius + 100;
      }
    } else {
      // Menu idle
      airplane.mesh.position.y = game.planeDefaultHeight + Math.sin(newTime * 0.002) * 8;
      airplane.propeller.rotation.x += 0.15;
      airplane.pilot.updateHairs();
    }

    sea.moveWaves();
    sea.mesh.rotation.z += game.speed * deltaTime;
    if (sea.mesh.rotation.z > Math.PI * 2) sea.mesh.rotation.z -= Math.PI * 2;

    sky.moveClouds();
    coinsHolder.rotateCoins();
    ennemiesHolder.rotateEnnemies();
    particlesHolder.update();
    updateCamera();

    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }

  // Button Listeners
  startBtn.addEventListener('click', startGame);

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      if (game.status === 'playing') {
        game.status = 'paused';
        pauseBtn.textContent = '▶';
        tipText.innerHTML = '⏸ <strong>Tạm dừng:</strong> Nhấn nút Play để tiếp tục bay';
      } else if (game.status === 'paused') {
        game.status = 'playing';
        pauseBtn.textContent = '⏸';
        tipText.innerHTML = '👉 <strong>Tiếp tục:</strong> Lái máy bay nào!';
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      airplane.mesh.position.set(0, game.planeDefaultHeight, 0);
      airplane.mesh.rotation.set(0, 0, 0);
      game.planeFallSpeed = 0.001;
      startGame();
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      muteBtn.innerHTML = isMuted 
        ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg> Bật âm`
        : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> Tắt âm`;
    });
  }

  // Fullscreen Management
  function toggleFullscreen() {
    if (!demoFrame) return;
    const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);

    if (!isFull) {
      if (demoFrame.requestFullscreen) {
        demoFrame.requestFullscreen().catch(() => {});
      } else if (demoFrame.webkitRequestFullscreen) {
        demoFrame.webkitRequestFullscreen();
      } else if (demoFrame.mozRequestFullScreen) {
        demoFrame.mozRequestFullScreen();
      } else if (demoFrame.msRequestFullscreen) {
        demoFrame.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  function handleFullscreenChange() {
    const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    if (demoFrame) {
      demoFrame.classList.toggle('is-fullscreen', isFull);
    }
    document.body.classList.toggle('has-fullscreen', isFull);
    if (fullscreenBtn) {
      fullscreenBtn.innerHTML = isFull
        ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg> <span id="txtFullscreenBtn">Thu nhỏ</span>`
        : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg> <span id="txtFullscreenBtn">Toàn màn hình</span>`;
    }
    // Recompute sizes smoothly
    handleResize();
    setTimeout(handleResize, 80);
    setTimeout(handleResize, 250);
  }

  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
  document.addEventListener('mozfullscreenchange', handleFullscreenChange);
  document.addEventListener('MSFullscreenChange', handleFullscreenChange);

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', toggleFullscreen);
  }

  // Keyboard shortcut 'F' to toggle fullscreen
  window.addEventListener('keydown', (e) => {
    if (e.key === 'f' || e.key === 'F') {
      if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      toggleFullscreen();
    }
  });

  // Initialize
  createScene();
  createLights();
  initWorldObjects();
  requestAnimationFrame(loop);
})();
