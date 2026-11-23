/**
 * FLY TO THE END - 8 In-Game 3D Hazard & Challenge Models (Three.js r90)
 * Ported directly from FlyToTheEnd-Modern/src/hazards.ts & src/main.ts
 * for live 3D previews and 360° interactive inspection on the website.
 */
(function () {
  'use strict';

  if (typeof THREE === 'undefined') return;

  const HAZARD_MODELS = [
    { id: 'enemy_block', nameVi: 'Vật Cản Khối Đỏ & Tinh Thể Nhiên Liệu', levelVi: 'Level 1' },
    { id: 'hazard_bird', nameVi: 'Đàn Chim Trời (Birds)', levelVi: 'Level 2+' },
    { id: 'hazard_comet', nameVi: 'Mưa Sao Chổi (Comets)', levelVi: 'Level 4+' },
    { id: 'hazard_weather', nameVi: 'Thời Tiết Động 5 Trạng Thái', levelVi: 'Level 6+' },
    { id: 'hazard_lightning', nameVi: 'Sấm Sét Giáng Trời (Lightning)', levelVi: 'Level 8+' },
    { id: 'hazard_spaceship', nameVi: 'Tàu Vũ Trụ Phóng Lên (Spaceship)', levelVi: 'Level 10+' },
    { id: 'hazard_missile', nameVi: 'Tên Lửa Khóa Mục Tiêu (Lock-on Missile)', levelVi: 'Level 12+' },
    { id: 'hazard_rival_plane', nameVi: 'Phi Cơ Đối Thủ (Rival Plane)', levelVi: 'Level 14+' },
  ];

  function phong(color, emissive, emissiveIntensity, extra) {
    const opts = {
      color: color,
      emissive: emissive || 0x000000,
      emissiveIntensity: emissiveIntensity || 0,
      flatShading: THREE.FlatShading,
    };
    if (extra) {
      for (const k in extra) opts[k] = extra[k];
    }
    return new THREE.MeshPhongMaterial(opts);
  }

  // ============================================================
  // 1. LEVEL 1-9: RED ENNEMY TETRAHEDRON + TEAL ENERGY CRYSTAL
  // ============================================================
  function buildEnemyBlock() {
    const g = new THREE.Object3D();

    const enemyGeom = new THREE.TetrahedronGeometry(10, 2);
    const enemyMat = phong(0xf25346, 0x991b1b, 0.12, { shininess: 0, specular: 0xffffff });
    const enemy = new THREE.Mesh(enemyGeom, enemyMat);
    enemy.name = 'anim_spin_enemy';
    enemy.position.set(-6, 1, 0);
    g.add(enemy);

    const coinGeom = new THREE.TetrahedronGeometry(6.2, 0);
    const coinMat = phong(0x009999, 0x0f766e, 0.25, { shininess: 10, specular: 0xffffff });
    const coin = new THREE.Mesh(coinGeom, coinMat);
    coin.name = 'anim_spin_coin';
    coin.position.set(11, 5, 4);
    g.add(coin);

    const coin2 = coin.clone();
    coin2.name = 'anim_spin_coin_2';
    coin2.scale.set(0.75, 0.75, 0.75);
    coin2.position.set(14, -5, -4);
    g.add(coin2);

    return g;
  }

  // ============================================================
  // 2. LEVEL 10+: BIRD (Exact from hazards.ts)
  // ============================================================
  function buildBird() {
    const g = new THREE.Object3D();
    const birdWrap = new THREE.Object3D();
    birdWrap.name = 'anim_bird_body';

    const bodyGeom = new THREE.ConeGeometry(4, 14, 5);
    bodyGeom.rotateZ(-Math.PI / 2);
    const body = new THREE.Mesh(bodyGeom, phong(0x334155));
    birdWrap.add(body);

    const head = new THREE.Mesh(new THREE.SphereGeometry(3.2, 6, 5), phong(0x475569));
    head.position.set(-7, 1.5, 0);
    birdWrap.add(head);

    const beakGeom = new THREE.ConeGeometry(1.6, 5.5, 4);
    beakGeom.rotateZ(Math.PI / 2);
    const beak = new THREE.Mesh(beakGeom, phong(0xf59e0b));
    beak.position.set(-11.5, 1.2, 0);
    birdWrap.add(beak);

    const tail = new THREE.Mesh(new THREE.BoxGeometry(5, 0.8, 6), phong(0x1e293b));
    tail.position.set(8, 0.8, 0);
    tail.rotation.z = 0.2;
    birdWrap.add(tail);

    const wingGeom = new THREE.BoxGeometry(6, 0.9, 13);
    const wingMat = phong(0x64748b);

    const wingL = new THREE.Object3D();
    wingL.name = 'anim_wing_l';
    wingL.position.set(-1, 1.8, 2.5);
    const wingLMesh = new THREE.Mesh(wingGeom, wingMat);
    wingLMesh.position.set(0, 0, 6);
    wingL.add(wingLMesh);
    wingL.rotation.x = 0.38;
    birdWrap.add(wingL);

    const wingR = new THREE.Object3D();
    wingR.name = 'anim_wing_r';
    wingR.position.set(-1, 1.8, -2.5);
    const wingRMesh = new THREE.Mesh(wingGeom, wingMat);
    wingRMesh.position.set(0, 0, -6);
    wingR.add(wingRMesh);
    wingR.rotation.x = -0.38;
    birdWrap.add(wingR);

    g.add(birdWrap);
    return g;
  }

  // ============================================================
  // 3. LEVEL 20+: COMET (Exact from hazards.ts)
  // ============================================================
  function buildComet() {
    const g = new THREE.Object3D();
    const comet = new THREE.Object3D();

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(7, 0),
      phong(0xef4444, 0xd97706, 0.65)
    );
    comet.add(core);

    const tailGeom = new THREE.ConeGeometry(5.5, 28, 6);
    tailGeom.rotateZ(Math.PI / 2);
    const tailMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.85,
    });
    const tailMesh = new THREE.Mesh(tailGeom, tailMat);
    tailMesh.name = 'anim_comet_tail';
    tailMesh.position.set(-15, 0, 0);
    comet.add(tailMesh);

    const innerTailGeom = new THREE.ConeGeometry(3, 18, 6);
    innerTailGeom.rotateZ(Math.PI / 2);
    const innerTail = new THREE.Mesh(
      innerTailGeom,
      new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.92 })
    );
    innerTail.position.set(-11, 0, 0);
    comet.add(innerTail);

    // Streak diagonally down-left just like in-game!
    comet.rotation.z = -Math.PI * 0.78;
    g.add(comet);
    return g;
  }

  // ============================================================
  // 4. LEVEL 30+: WEATHER (In-game Cloud + Sun + Rain & Snow Drops)
  // ============================================================
  function buildWeather() {
    const g = new THREE.Object3D();

    // Warm low-poly sun peeking behind cloud
    const sun = new THREE.Mesh(
      new THREE.IcosahedronGeometry(8.5, 0),
      phong(0xfacc15, 0xf59e0b, 0.5)
    );
    sun.name = 'anim_weather_sun';
    sun.position.set(11, 9, -6);
    g.add(sun);

    // Low-poly in-game cloud cluster (from main.ts Cloud)
    const cloud = new THREE.Object3D();
    cloud.name = 'anim_weather_cloud';
    const cloudMat = phong(0xf1f5f9, 0xcbd5e1, 0.12);
    const puffs = [
      [-10, 2, 0, 0.72],
      [-2, 5, 2, 0.92],
      [7, 3, 1, 0.78],
      [2, 1, -4, 0.68],
    ];
    puffs.forEach(function (p) {
      const m = new THREE.Mesh(new THREE.SphereGeometry(10, 6, 6), cloudMat);
      m.position.set(p[0], p[1], p[2]);
      m.scale.set(p[3], p[3], p[3]);
      cloud.add(m);
    });
    g.add(cloud);

    // Raindrops (blue) & snowflakes (white) falling underneath
    const precip = new THREE.Object3D();
    precip.name = 'anim_weather_precip';
    const rainMat = phong(0x38bdf8, 0x0284c7, 0.35);
    const snowMat = phong(0xffffff, 0xe0f2fe, 0.4);
    const drops = [
      [-11, -9, 2, true],
      [-4, -14, 0, true],
      [3, -10, 3, true],
      [-7, -17, -2, false],
      [1, -17, -1, false],
      [9, -12, 1, false],
    ];
    drops.forEach(function (d) {
      const geom = d[3]
        ? new THREE.CylinderGeometry(0.65, 0.65, 4.2, 5)
        : new THREE.OctahedronGeometry(1.7, 0);
      const mesh = new THREE.Mesh(geom, d[3] ? rainMat : snowMat);
      mesh.position.set(d[0], d[1], d[2]);
      if (d[3]) mesh.rotation.z = -0.22;
      mesh.userData.baseY = d[1];
      precip.add(mesh);
    });
    g.add(precip);

    return g;
  }

  // ============================================================
  // 5. LEVEL 40+: LIGHTNING STRIKE (Exact jagged sky-blue bolt + red telegraph)
  // ============================================================
  function buildLightning() {
    const g = new THREE.Object3D();

    // Dark thundercloud above
    const cloudMat = phong(0x475569, 0x1e293b, 0.2);
    [[-8, 16, 0, 0.72], [0, 18, 2, 0.9], [9, 16, -1, 0.75]].forEach(function (p) {
      const m = new THREE.Mesh(new THREE.SphereGeometry(9, 6, 6), cloudMat);
      m.position.set(p[0], p[1], p[2]);
      m.scale.set(p[3], p[3] * 0.72, p[3]);
      g.add(m);
    });

    // Red vertical telegraph warning beam (from hazards.ts warningLine)
    const warnBeam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.45, 34, 6),
      new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.75 })
    );
    warnBeam.name = 'anim_lightning_warn';
    warnBeam.position.set(-7, -1, -2);
    g.add(warnBeam);

    // Jagged sky-blue lightning bolt built from connected 3D segments
    const boltGroup = new THREE.Object3D();
    boltGroup.name = 'anim_lightning_bolt';
    const boltMat = phong(0x38bdf8, 0x0ea5e9, 0.9);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xe0f2fe });
    const pts = [
      new THREE.Vector3(1, 13, 2),
      new THREE.Vector3(-4, 5, 2),
      new THREE.Vector3(3, 4, 2),
      new THREE.Vector3(-3, -6, 2),
      new THREE.Vector3(4, -7, 2),
      new THREE.Vector3(-1, -18, 2),
    ];

    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      const dir = new THREE.Vector3().subVectors(b, a);
      const len = dir.length();
      const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);

      const seg = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 0.9, len + 0.6, 5), boltMat);
      seg.position.copy(mid);
      seg.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
      boltGroup.add(seg);

      const inner = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.35, len + 0.4, 5), coreMat);
      inner.position.copy(mid);
      inner.quaternion.copy(seg.quaternion);
      boltGroup.add(inner);
    }

    g.add(boltGroup);
    return g;
  }

  // ============================================================
  // 6. LEVEL 50+: SPACESHIP LAUNCH (Exact from hazards.ts)
  // ============================================================
  function buildSpaceship() {
    const g = new THREE.Object3D();
    const ship = new THREE.Object3D();
    ship.name = 'anim_spaceship';

    const fuse = new THREE.Mesh(new THREE.CylinderGeometry(4, 5, 22, 6), phong(0xe2e8f0));
    ship.add(fuse);

    const nose = new THREE.Mesh(new THREE.ConeGeometry(4, 9, 6), phong(0xef4444));
    nose.position.y = 15;
    ship.add(nose);

    const finMat = phong(0x3b82f6);
    const fin1 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 8, 14), finMat);
    fin1.position.y = -7;
    ship.add(fin1);

    const fin2 = new THREE.Mesh(new THREE.BoxGeometry(14, 8, 1.2), finMat);
    fin2.position.y = -7;
    ship.add(fin2);

    const flameGeom = new THREE.ConeGeometry(3.5, 14, 6);
    flameGeom.rotateX(Math.PI);
    const flame = new THREE.Mesh(flameGeom, new THREE.MeshBasicMaterial({ color: 0x06b6d4 }));
    flame.name = 'anim_ship_flame';
    flame.position.y = -17;
    ship.add(flame);

    g.add(ship);
    return g;
  }

  // ============================================================
  // 7. LEVEL 60+: TARGETED LOCK-ON MISSILE (Exact from hazards.ts)
  // ============================================================
  function buildMissile() {
    const g = new THREE.Object3D();

    // Pulsing crimson Target Reticle (from hazards.ts reticleMesh)
    const reticle = new THREE.Object3D();
    reticle.name = 'anim_missile_reticle';
    reticle.position.set(7, 6, -2);
    const retMat = phong(0xef4444, 0xdc2626, 0.65);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(9.5, 0.75, 6, 24), retMat);
    reticle.add(ring);
    const crossH = new THREE.Mesh(new THREE.BoxGeometry(23, 0.85, 0.85), retMat);
    const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.85, 23, 0.85), retMat);
    reticle.add(crossH);
    reticle.add(crossV);
    g.add(reticle);

    // Missile 3D model flying diagonally toward reticle
    const missile = new THREE.Object3D();
    missile.name = 'anim_missile_body';
    missile.position.set(-7, -7, 3);
    missile.rotation.z = -0.68;

    const body = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.7, 15, 6), phong(0x1e293b));
    missile.add(body);

    const tip = new THREE.Mesh(new THREE.ConeGeometry(2.2, 5.5, 6), phong(0xdc2626, 0x991b1b, 0.25));
    tip.position.y = 10;
    missile.add(tip);

    // Rear fins + exhaust glow
    const finMat = phong(0x64748b);
    const f1 = new THREE.Mesh(new THREE.BoxGeometry(8, 3.8, 0.8), finMat);
    f1.position.y = -5.5;
    const f2 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 3.8, 8), finMat);
    f2.position.y = -5.5;
    missile.add(f1);
    missile.add(f2);

    const glowGeom = new THREE.ConeGeometry(2.1, 7.5, 6);
    glowGeom.rotateX(Math.PI);
    const glow = new THREE.Mesh(glowGeom, new THREE.MeshBasicMaterial({ color: 0xf59e0b }));
    glow.position.y = -11;
    missile.add(glow);

    g.add(missile);
    return g;
  }

  // ============================================================
  // 8. LEVEL 70+: RIVAL PLANE (Exact from hazards.ts, r90 vertices)
  // ============================================================
  function buildRivalPlane() {
    const g = new THREE.Object3D();
    const modelGroup = new THREE.Object3D();
    const rivalPrimary = 0xf25346;
    const rivalAccent = 0xd8d0d1;
    const rivalDark = 0x23190f;

    const geomCabin = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
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
    const cabin = new THREE.Mesh(geomCabin, phong(rivalPrimary));
    modelGroup.add(cabin);

    const engine = new THREE.Mesh(new THREE.ConeGeometry(20, 50, 18, 1), phong(rivalAccent));
    engine.rotation.z = -Math.PI / 2;
    engine.position.x = 50;
    modelGroup.add(engine);

    const tailPlane = new THREE.Mesh(new THREE.BoxGeometry(5, 20, 30, 1, 1, 1), phong(rivalPrimary));
    tailPlane.position.set(-40, 20, 0);
    modelGroup.add(tailPlane);

    const sideWing = new THREE.Mesh(new THREE.BoxGeometry(30, 5, 120, 1, 1, 1), phong(rivalPrimary));
    sideWing.position.set(0, 15, 0);
    modelGroup.add(sideWing);

    const windshield = new THREE.Mesh(
      new THREE.BoxGeometry(3, 15, 20, 1, 1, 1),
      phong(rivalAccent, 0x000000, 0, { transparent: true, opacity: 0.4 })
    );
    windshield.position.set(5, 27, 0);
    modelGroup.add(windshield);

    const geomProp = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
    if (geomProp.vertices && geomProp.vertices.length >= 8) {
      geomProp.vertices[4].y -= 5;
      geomProp.vertices[4].z += 5;
      geomProp.vertices[5].y -= 5;
      geomProp.vertices[5].z -= 5;
      geomProp.vertices[6].y += 5;
      geomProp.vertices[6].z += 5;
      geomProp.vertices[7].y += 5;
      geomProp.vertices[7].z -= 5;
    }
    const propeller = new THREE.Mesh(geomProp, phong(0x59332e));
    propeller.name = 'anim_rival_propeller';
    const blade1 = new THREE.Mesh(new THREE.BoxGeometry(1, 80, 10, 1, 1, 1), phong(rivalDark));
    blade1.position.set(8, 0, 0);
    const blade2 = blade1.clone();
    blade2.rotation.x = Math.PI / 2;
    propeller.add(blade1);
    propeller.add(blade2);
    propeller.position.set(60, 0, 0);
    modelGroup.add(propeller);

    const wheelProtecR = new THREE.Mesh(new THREE.BoxGeometry(30, 15, 10, 1, 1, 1), phong(rivalPrimary));
    wheelProtecR.position.set(25, -20, 25);
    modelGroup.add(wheelProtecR);
    const wheelProtecL = wheelProtecR.clone();
    wheelProtecL.position.z = -25;
    modelGroup.add(wheelProtecL);

    const wheelTireR = new THREE.Mesh(new THREE.BoxGeometry(24, 24, 4), phong(rivalDark));
    wheelTireR.position.set(25, -28, 25);
    modelGroup.add(wheelTireR);
    const wheelTireL = wheelTireR.clone();
    wheelTireL.position.z = -25;
    modelGroup.add(wheelTireL);

    // Flip to face LEFT (-X) & scale down to match showcase scale
    modelGroup.rotation.y = Math.PI;
    modelGroup.scale.set(0.32, 0.32, 0.32);
    g.add(modelGroup);
    return g;
  }

  const BUILDERS = {
    enemy_block: buildEnemyBlock,
    hazard_bird: buildBird,
    hazard_comet: buildComet,
    hazard_weather: buildWeather,
    hazard_lightning: buildLightning,
    hazard_spaceship: buildSpaceship,
    hazard_missile: buildMissile,
    hazard_rival_plane: buildRivalPlane,
  };

  function animateHazard(mesh, time) {
    if (!mesh) return;
    const t = typeof time === 'number' ? time : performance.now();

    // Level 1-9 Enemy & Coin
    const enemy = mesh.getObjectByName('anim_spin_enemy');
    if (enemy) {
      enemy.rotation.y = t * 0.0016;
      enemy.rotation.z = t * 0.0012;
    }
    const coin = mesh.getObjectByName('anim_spin_coin');
    if (coin) {
      coin.rotation.y = -t * 0.0024;
      coin.position.y = 5 + Math.sin(t * 0.004) * 1.6;
    }
    const coin2 = mesh.getObjectByName('anim_spin_coin_2');
    if (coin2) {
      coin2.rotation.y = t * 0.0028;
      coin2.position.y = -5 + Math.cos(t * 0.004) * 1.4;
    }

    // Level 10+ Bird flapping
    const wingL = mesh.getObjectByName('anim_wing_l');
    const wingR = mesh.getObjectByName('anim_wing_r');
    if (wingL && wingR) {
      const flap = Math.sin(t * 0.015) * 0.62;
      wingL.rotation.x = flap;
      wingR.rotation.x = -flap;
    }
    const birdBody = mesh.getObjectByName('anim_bird_body');
    if (birdBody) {
      birdBody.position.y = Math.sin(t * 0.005) * 1.4;
    }

    // Level 20+ Comet tail pulsing
    const cometTail = mesh.getObjectByName('anim_comet_tail');
    if (cometTail) {
      cometTail.scale.x = 0.9 + Math.sin(t * 0.022) * 0.16;
    }

    // Level 30+ Weather motion
    const wSun = mesh.getObjectByName('anim_weather_sun');
    if (wSun) {
      wSun.rotation.y = t * 0.001;
    }
    const precip = mesh.getObjectByName('anim_weather_precip');
    if (precip) {
      for (let i = 0; i < precip.children.length; i++) {
        const drop = precip.children[i];
        const baseY = drop.userData.baseY || -12;
        const cycle = ((t * 0.012 + i * 2.7) % 10);
        drop.position.y = baseY + 4 - cycle;
      }
    }

    // Level 40+ Lightning flash
    const lWarn = mesh.getObjectByName('anim_lightning_warn');
    const lBolt = mesh.getObjectByName('anim_lightning_bolt');
    if (lWarn && lBolt) {
      const blink = Math.floor(t / 160) % 2 === 0;
      lWarn.material.opacity = blink ? 0.85 : 0.25;
      const pulse = 0.85 + Math.sin(t * 0.02) * 0.18;
      lBolt.scale.set(pulse, 1, pulse);
    }

    // Level 50+ Spaceship thruster flicker
    const shipFlame = mesh.getObjectByName('anim_ship_flame');
    if (shipFlame) {
      const flicker = 0.85 + Math.sin(t * 0.04) * 0.28;
      shipFlame.scale.set(1, flicker, 1);
    }
    const ship = mesh.getObjectByName('anim_spaceship');
    if (ship) {
      ship.position.y = Math.sin(t * 0.006) * 1.5;
    }

    // Level 60+ Missile reticle pulse
    const reticle = mesh.getObjectByName('anim_missile_reticle');
    if (reticle) {
      const s = 0.94 + Math.sin(t * 0.012) * 0.14;
      reticle.scale.set(s, s, 1);
    }

    // Level 70+ Rival plane propeller spin
    const prop = mesh.getObjectByName('anim_rival_propeller');
    if (prop) {
      prop.rotation.x += 0.34;
    }
  }

  window.GameHazardsCatalog = {
    list: HAZARD_MODELS,
    buildById: function (id) {
      return BUILDERS[id] ? BUILDERS[id]() : null;
    },
    animate: animateHazard,
  };
})();
