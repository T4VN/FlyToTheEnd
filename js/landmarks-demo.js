/**
 * FLY TO THE END - 22 Vietnamese Cultural Heritage & Architectural Wonders (3D Low-Poly)
 * Compatible with Three.js r90 (Web Demo)
 * Sequential showcase: each landmark glides smoothly across the ground from off-screen RIGHT to LEFT,
 * automatically advancing through all 22 landmarks one after another!
 */
(function () {
  'use strict';

  if (typeof THREE === 'undefined') return;

  const VIETNAM_LANDMARKS = [
    { id: 'chua_mot_cot', nameVi: 'Chùa Một Cột', locationVi: 'Hà Nội' },
    { id: 'ho_guom', nameVi: 'Tháp Rùa - Hồ Gươm', locationVi: 'Hà Nội' },
    { id: 'khue_van_cac', nameVi: 'Văn Miếu - Khuê Văn Các', locationVi: 'Hà Nội' },
    { id: 'cot_co_lung_cu', nameVi: 'Cột Cờ Lũng Cú', locationVi: 'Hà Giang' },
    { id: 'dinh_fansipan', nameVi: 'Đỉnh Fansipan', locationVi: 'Sa Pa, Lào Cai' },
    { id: 'vinh_ha_long', nameVi: 'Vịnh Hạ Long', locationVi: 'Quảng Ninh' },
    { id: 'trang_an', nameVi: 'Danh Thắng Tràng An', locationVi: 'Ninh Bình' },
    { id: 'thanh_nha_ho', nameVi: 'Thành Nhà Hồ', locationVi: 'Thanh Hóa' },
    { id: 'phong_nha', nameVi: 'Động Phong Nha - Kẻ Bàng', locationVi: 'Quảng Bình' },
    { id: 'kinh_thanh_hue', nameVi: 'Kinh Thành Huế (Ngọ Môn)', locationVi: 'Thừa Thiên Huế' },
    { id: 'chua_thien_mu', nameVi: 'Chùa Thiên Mụ', locationVi: 'Huế' },
    { id: 'cau_rong', nameVi: 'Cầu Rồng', locationVi: 'Đà Nẵng' },
    { id: 'cau_vang', nameVi: 'Cầu Vàng - Bà Nà Hills', locationVi: 'Đà Nẵng' },
    { id: 'pho_co_hoi_an', nameVi: 'Phố Cổ Hội An', locationVi: 'Quảng Nam' },
    { id: 'thanh_dia_my_son', nameVi: 'Thánh Địa Mỹ Sơn', locationVi: 'Quảng Nam' },
    { id: 'thap_cham', nameVi: 'Tháp Chăm Po Nagar', locationVi: 'Nha Trang, Khánh Hòa' },
    { id: 'nha_tho_duc_ba', nameVi: 'Nhà Thờ Đức Bà', locationVi: 'TP. Hồ Chí Minh' },
    { id: 'cho_ben_thanh', nameVi: 'Chợ Bến Thành', locationVi: 'TP. Hồ Chí Minh' },
    { id: 'dinh_doc_lap', nameVi: 'Dinh Độc Lập', locationVi: 'TP. Hồ Chí Minh' },
    { id: 'landmark_81', nameVi: 'Tòa Tháp Landmark 81', locationVi: 'TP. Hồ Chí Minh' },
    { id: 'cho_noi_cai_rang', nameVi: 'Chợ Nổi Cái Răng', locationVi: 'Cần Thơ' },
    { id: 'mui_ca_mau', nameVi: 'Mũi Cà Mau', locationVi: 'Cà Mau' },
  ];

  function mat(color, emissive, emissiveIntensity) {
    return new THREE.MeshPhongMaterial({
      color: color,
      emissive: emissive || 0x000000,
      emissiveIntensity: emissiveIntensity || 0,
      flatShading: THREE.FlatShading,
      shininess: 8,
    });
  }

  function addBox(parent, w, h, d, x, y, z, material) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    m.position.set(x, y, z);
    m.receiveShadow = true;
    parent.add(m);
    return m;
  }

  // 1. CHÙA MỘT CỘT — HÀ NỘI
  function buildChuaMotCot() {
    const g = new THREE.Object3D();
    const stone = mat(0x94a3b8);
    const stoneDark = mat(0x64748b);
    const pondMat = mat(0x2dd4bf);
    const wood = mat(0x7c2d12);
    const redWood = mat(0x991b1b);
    const roofTile = mat(0xb45309);
    const gold = mat(0xf59e0b, 0xd97706, 0.25);
    const lotusLeaf = mat(0x15803d);
    const lotusFlower = mat(0xf472b6);

    addBox(g, 76, 16, 46, 0, -6, 0, stoneDark);
    addBox(g, 70, 4, 40, 0, 2, 0, pondMat);
    addBox(g, 76, 3, 3, 0, 3.5, 21.5, stone);
    addBox(g, 76, 3, 3, 0, 3.5, -21.5, stone);

    [[-22, 8], [-16, -6], [20, 6], [24, -8]].forEach(function (p) {
      const pad = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 0.8, 6), lotusLeaf);
      pad.position.set(p[0], 4.3, p[1]);
      g.add(pad);
      const bloom = new THREE.Mesh(new THREE.ConeGeometry(1.6, 3, 5), lotusFlower);
      bloom.position.set(p[0], 5.8, p[1]);
      g.add(bloom);
    });

    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 5, 22, 8), stone);
    pillar.position.set(0, 13, 0);
    g.add(pillar);

    [-0.55, 0.55].forEach(function (angle) {
      const strut = new THREE.Mesh(new THREE.BoxGeometry(2.4, 15, 2.4), wood);
      strut.position.set(angle > 0 ? -6 : 6, 20, 0);
      strut.rotation.z = angle;
      g.add(strut);
    });

    addBox(g, 24, 3, 24, 0, 25, 0, wood);
    addBox(g, 20, 12, 20, 0, 32, 0, redWood);
    addBox(g, 7, 8, 21, 0, 31, 0, gold);

    const roof1 = new THREE.Mesh(new THREE.ConeGeometry(23, 10, 4), roofTile);
    roof1.rotation.y = Math.PI / 4;
    roof1.position.set(0, 42, 0);
    g.add(roof1);

    const roof2 = new THREE.Mesh(new THREE.ConeGeometry(15, 9, 4), roofTile);
    roof2.rotation.y = Math.PI / 4;
    roof2.position.set(0, 49, 0);
    g.add(roof2);

    const spire = new THREE.Mesh(new THREE.ConeGeometry(1.8, 6, 5), gold);
    spire.position.set(0, 55, 0);
    g.add(spire);

    addBox(g, 14, 12, 8, -22, 9, 0, stone);
    addBox(g, 8, 18, 8, -15, 14, 0, stone);
    return g;
  }

  // 2. THÁP RÙA — HỒ GƯƠM, HÀ NỘI
  function buildHoGuom() {
    const g = new THREE.Object3D();
    const lakeMat = mat(0x0d9488);
    const grass = mat(0x16a34a);
    const plaster = mat(0xd6c7a1);
    const plasterDark = mat(0xa89978);
    const archDark = mat(0x3f2e21);
    const roofBrown = mat(0x78350f);
    const treeLeaf = mat(0x166534);

    const islandBase = new THREE.Mesh(new THREE.CylinderGeometry(36, 44, 16, 10), lakeMat);
    islandBase.position.set(0, -6, 0);
    g.add(islandBase);

    const mound = new THREE.Mesh(new THREE.CylinderGeometry(24, 32, 9, 9), grass);
    mound.position.set(0, 5, 0);
    g.add(mound);

    [[-18, 4, 1], [19, -3, 0.85]].forEach(function (t) {
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.8, 8, 5), archDark);
      trunk.position.set(t[0], 11, t[1]);
      g.add(trunk);
      const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(6.5 * t[2], 0), treeLeaf);
      foliage.position.set(t[0], 17, t[1]);
      g.add(foliage);
    });

    addBox(g, 24, 13, 18, 0, 15.5, 0, plaster);
    [-7, 0, 7].forEach(function (ax) { addBox(g, 4, 8, 19, ax, 13.5, 0, archDark); });
    addBox(g, 28, 2.5, 22, 0, 22.8, 0, roofBrown);

    addBox(g, 18, 11, 14, 0, 29.5, 0, plaster);
    [-4.5, 0, 4.5].forEach(function (ax) { addBox(g, 3, 6.5, 15, ax, 28.5, 0, archDark); });
    addBox(g, 22, 2.2, 18, 0, 35.8, 0, roofBrown);

    addBox(g, 13, 9, 10, 0, 41, 0, plasterDark);
    addBox(g, 4, 5, 11, 0, 40.5, 0, archDark);

    const topRoof = new THREE.Mesh(new THREE.ConeGeometry(11.5, 8, 4), roofBrown);
    topRoof.rotation.y = Math.PI / 4;
    topRoof.position.set(0, 49, 0);
    g.add(topRoof);

    const finial = new THREE.Mesh(new THREE.OctahedronGeometry(2, 0), mat(0xf59e0b));
    finial.position.set(0, 54.5, 0);
    g.add(finial);
    return g;
  }

  // 3. VĂN MIẾU - KHUÊ VĂN CÁC — HÀ NỘI
  function buildKhueVanCac() {
    const g = new THREE.Object3D();
    const brickFloor = mat(0x9a3412);
    const whitePillar = mat(0xf1f5f9);
    const redWood = mat(0xb91c1c);
    const roofTile = mat(0x991b1b);
    const goldSun = mat(0xfbbf24, 0xd97706, 0.35);
    const darkInterior = mat(0x29150b);
    const courtyardWall = mat(0x78716c);

    addBox(g, 76, 16, 40, 0, -6, 0, brickFloor);
    addBox(g, 18, 10, 4, -29, 7, 0, courtyardWall);
    addBox(g, 18, 10, 4, 29, 7, 0, courtyardWall);
    addBox(g, 36, 4, 30, 0, 4, 0, whitePillar);

    [-12, 12].forEach(function (px) {
      [-9, 9].forEach(function (pz) {
        addBox(g, 5.5, 18, 5.5, px, 15, pz, whitePillar);
      });
    });

    addBox(g, 28, 3, 24, 0, 25, 0, redWood);
    addBox(g, 24, 15, 20, 0, 34, 0, redWood);

    const sunRing = new THREE.Mesh(new THREE.CylinderGeometry(5.5, 5.5, 21.2, 12), goldSun);
    sunRing.rotation.x = Math.PI / 2;
    sunRing.position.set(0, 34, 0);
    g.add(sunRing);
    const sunCore = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.4, 21.6, 12), darkInterior);
    sunCore.rotation.x = Math.PI / 2;
    sunCore.position.set(0, 34, 0);
    g.add(sunCore);

    const roof1 = new THREE.Mesh(new THREE.ConeGeometry(24, 9, 4), roofTile);
    roof1.rotation.y = Math.PI / 4;
    roof1.position.set(0, 45, 0);
    g.add(roof1);

    const roof2 = new THREE.Mesh(new THREE.ConeGeometry(16, 8, 4), roofTile);
    roof2.rotation.y = Math.PI / 4;
    roof2.position.set(0, 52, 0);
    g.add(roof2);

    const finial = new THREE.Mesh(new THREE.OctahedronGeometry(2.2, 0), goldSun);
    finial.position.set(0, 57.5, 0);
    g.add(finial);
    return g;
  }

  // 4. CỘT CỜ LŨNG CÚ — HÀ GIANG
  function buildCotCoLungCu() {
    const g = new THREE.Object3D();
    const mountain = mat(0x166534);
    const mountainStone = mat(0x57534e);
    const towerStone = mat(0xd6d3d1);
    const towerTrim = mat(0x78716c);
    const poleMat = mat(0xe2e8f0);
    const flagRed = mat(0xdc2626, 0xb91c1c, 0.25);
    const starYellow = mat(0xfacc15, 0xeab308, 0.5);

    const peak = new THREE.Mesh(new THREE.ConeGeometry(42, 30, 8), mountain);
    peak.position.set(0, 3, 0);
    g.add(peak);
    const summit = new THREE.Mesh(new THREE.CylinderGeometry(18, 24, 8, 8), mountainStone);
    summit.position.set(0, 16, 0);
    g.add(summit);

    const baseOct = new THREE.Mesh(new THREE.CylinderGeometry(11, 13, 10, 8), towerTrim);
    baseOct.position.set(0, 24, 0);
    g.add(baseOct);

    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(7.5, 9.5, 22, 8), towerStone);
    shaft.position.set(0, 38, 0);
    g.add(shaft);

    const crown = new THREE.Mesh(new THREE.CylinderGeometry(9.5, 8, 3.5, 8), towerTrim);
    crown.position.set(0, 50, 0);
    g.add(crown);

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 24, 6), poleMat);
    pole.position.set(0, 62, 0);
    g.add(pole);

    const flagGroup = new THREE.Object3D();
    flagGroup.name = 'anim_flag';
    flagGroup.position.set(0.5, 69, 0);
    addBox(flagGroup, 18, 12, 0.9, 9, 0, 0, flagRed);
    const star = new THREE.Mesh(new THREE.OctahedronGeometry(3.2, 0), starYellow);
    star.scale.set(1, 1, 0.45);
    star.position.set(9, 0, 0);
    flagGroup.add(star);
    g.add(flagGroup);
    return g;
  }

  // 5. ĐỈNH FANSIPAN — SA PA, LÀO CAI
  function buildFansipan() {
    const g = new THREE.Object3D();
    const mountainDark = mat(0x14532d);
    const mountainRock = mat(0x64748b);
    const silverMarker = mat(0xe2e8f0, 0x94a3b8, 0.25);
    const goldBase = mat(0xd97706);
    const cloudWhite = mat(0xf8fafc);
    const cableDark = mat(0x334155);
    const cabinRed = mat(0xdc2626);
    const flagRed = mat(0xdc2626, 0xb91c1c, 0.2);

    const mainPeak = new THREE.Mesh(new THREE.ConeGeometry(38, 56, 7), mountainDark);
    mainPeak.position.set(4, 16, 0);
    g.add(mainPeak);

    const rockCap = new THREE.Mesh(new THREE.ConeGeometry(16, 22, 6), mountainRock);
    rockCap.position.set(4, 34, 0);
    g.add(rockCap);

    const sidePeak = new THREE.Mesh(new THREE.ConeGeometry(28, 36, 6), mountainDark);
    sidePeak.position.set(-28, 6, -6);
    g.add(sidePeak);

    addBox(g, 11, 3.5, 11, 4, 45.5, 0, goldBase);
    const marker = new THREE.Mesh(new THREE.ConeGeometry(5.2, 13, 3), silverMarker);
    marker.position.set(4, 53.5, 0);
    g.add(marker);

    const flag = new THREE.Mesh(new THREE.BoxGeometry(6, 4, 0.6), flagRed);
    flag.position.set(11, 51, 2);
    g.add(flag);

    const cable = new THREE.Mesh(new THREE.BoxGeometry(40, 0.7, 0.7), cableDark);
    cable.position.set(-14, 30, 8);
    cable.rotation.z = 0.52;
    g.add(cable);

    const cabin = new THREE.Object3D();
    cabin.name = 'anim_cablecar';
    cabin.position.set(-14, 28, 8);
    addBox(cabin, 0.8, 4, 0.8, 0, 2, 0, cableDark);
    addBox(cabin, 7, 5, 4.5, 0, -1.5, 0, cabinRed);
    addBox(cabin, 5.5, 2.2, 4.7, 0, -1, 0, cloudWhite);
    g.add(cabin);

    [[-18, 16, 14], [24, 22, 10], [-4, 28, -12]].forEach(function (c) {
      const puff = new THREE.Mesh(new THREE.DodecahedronGeometry(6, 0), cloudWhite);
      puff.scale.set(1.5, 0.7, 0.9);
      puff.position.set(c[0], c[1], c[2]);
      g.add(puff);
    });
    return g;
  }

  // 6. VỊNH HẠ LONG — QUẢNG NINH
  function buildVinhHaLong() {
    const g = new THREE.Object3D();
    const limestone = mat(0x78716c);
    const limestoneLight = mat(0xa8a29e);
    const jungle = mat(0x15803d);
    const jungleLight = mat(0x22c55e);
    const water = mat(0x0f766e);
    const boatWood = mat(0x7c2d12);
    const sailRed = mat(0xb91c1c);

    const bay = new THREE.Mesh(new THREE.CylinderGeometry(48, 54, 15, 12), water);
    bay.position.set(0, -6.5, 0);
    g.add(bay);

    const leftNeck = new THREE.Mesh(new THREE.CylinderGeometry(5, 3, 18, 6), limestone);
    leftNeck.position.set(-9, 10, 4);
    leftNeck.rotation.z = -0.14;
    g.add(leftNeck);
    const leftHead = new THREE.Mesh(new THREE.DodecahedronGeometry(10, 0), limestoneLight);
    leftHead.scale.set(1.15, 1.35, 0.9);
    leftHead.position.set(-7, 23, 4);
    g.add(leftHead);
    const leftCap = new THREE.Mesh(new THREE.DodecahedronGeometry(6, 0), jungle);
    leftCap.position.set(-8, 33, 4);
    g.add(leftCap);

    const rightNeck = new THREE.Mesh(new THREE.CylinderGeometry(5.5, 3.2, 16, 6), limestone);
    rightNeck.position.set(9, 9, 4);
    rightNeck.rotation.z = 0.16;
    g.add(rightNeck);
    const rightHead = new THREE.Mesh(new THREE.DodecahedronGeometry(9.5, 0), limestoneLight);
    rightHead.scale.set(1.1, 1.25, 0.9);
    rightHead.position.set(7.5, 21, 4);
    g.add(rightHead);
    const rightCap = new THREE.Mesh(new THREE.DodecahedronGeometry(5.5, 0), jungleLight);
    rightCap.position.set(8.5, 30, 4);
    g.add(rightCap);

    const peak1 = new THREE.Mesh(new THREE.ConeGeometry(16, 48, 6), limestone);
    peak1.position.set(-28, 22, -10);
    g.add(peak1);
    const peak1Green = new THREE.Mesh(new THREE.ConeGeometry(11, 22, 6), jungle);
    peak1Green.position.set(-28, 34, -10);
    g.add(peak1Green);

    const peak2 = new THREE.Mesh(new THREE.ConeGeometry(18, 56, 7), limestone);
    peak2.position.set(28, 25, -12);
    g.add(peak2);
    const peak2Green = new THREE.Mesh(new THREE.ConeGeometry(12, 24, 7), jungle);
    peak2Green.position.set(28, 40, -12);
    g.add(peak2Green);

    const boat = new THREE.Object3D();
    boat.name = 'anim_boat';
    boat.position.set(-2, 3, 18);
    addBox(boat, 15, 3.5, 5, 0, 0, 0, boatWood);
    const sail1 = new THREE.Mesh(new THREE.BoxGeometry(8, 12, 0.8), sailRed);
    sail1.position.set(-2, 7.5, 0);
    sail1.rotation.z = 0.12;
    boat.add(sail1);
    const sail2 = new THREE.Mesh(new THREE.BoxGeometry(6, 9, 0.8), sailRed);
    sail2.position.set(4.5, 6, 0);
    sail2.rotation.z = -0.08;
    boat.add(sail2);
    g.add(boat);
    return g;
  }

  // 7. DANH THẮNG TRÀNG AN — NINH BÌNH
  function buildTrangAn() {
    const g = new THREE.Object3D();
    const river = mat(0x0d9488);
    const karst = mat(0x64748b);
    const green = mat(0x15803d);
    const caveDark = mat(0x0f172a);
    const shrineRed = mat(0xb91c1c);
    const roofGold = mat(0xd97706);
    const boatWood = mat(0x92400e);

    const riverBase = new THREE.Mesh(new THREE.CylinderGeometry(46, 52, 15, 12), river);
    riverBase.position.set(0, -6.5, 0);
    g.add(riverBase);

    const cliffL = new THREE.Mesh(new THREE.ConeGeometry(22, 54, 7), karst);
    cliffL.position.set(-22, 23, -4);
    g.add(cliffL);
    const capL = new THREE.Mesh(new THREE.DodecahedronGeometry(12, 0), green);
    capL.position.set(-22, 42, -4);
    g.add(capL);

    const cliffR = new THREE.Mesh(new THREE.ConeGeometry(24, 58, 7), karst);
    cliffR.position.set(20, 25, -4);
    g.add(cliffR);
    const capR = new THREE.Mesh(new THREE.DodecahedronGeometry(13, 0), green);
    capR.position.set(20, 46, -4);
    g.add(capR);

    addBox(g, 28, 12, 18, -1, 19, -4, karst);
    addBox(g, 14, 13, 19, -1, 7, -4, caveDark);

    addBox(g, 16, 8, 12, 26, 7, 12, shrineRed);
    const tRoof = new THREE.Mesh(new THREE.ConeGeometry(13, 7, 4), roofGold);
    tRoof.rotation.y = Math.PI / 4;
    tRoof.position.set(26, 14.5, 12);
    g.add(tRoof);

    const boat = new THREE.Object3D();
    boat.name = 'anim_boat';
    boat.position.set(-4, 3, 16);
    addBox(boat, 13, 2.5, 4, 0, 0, 0, boatWood);
    const hat = new THREE.Mesh(new THREE.ConeGeometry(2.2, 2, 6), mat(0xfef08a));
    hat.position.set(-2, 4.5, 0);
    boat.add(hat);
    g.add(boat);
    return g;
  }

  // 8. THÀNH NHÀ HỒ — THANH HÓA
  function buildThanhNhaHo() {
    const g = new THREE.Object3D();
    const greenStone = mat(0x6b7280);
    const stoneBlock = mat(0x9ca3af);
    const moss = mat(0x4d7c0f);
    const archDark = mat(0x1f2937);
    const grass = mat(0x15803d);

    addBox(g, 92, 16, 38, 0, -6, 0, grass);
    addBox(g, 82, 24, 22, 0, 12, 0, greenStone);
    addBox(g, 84, 3.5, 24, 0, 24.5, 0, stoneBlock);
    [-34, -18, 18, 34].forEach(function (mx) { addBox(g, 10, 4, 23, mx, 21, 0, moss); });

    [[-20, 11, 14], [0, 14, 18], [20, 11, 14]].forEach(function (gate) {
      const gx = gate[0], gw = gate[1], gh = gate[2];
      addBox(g, gw, gh, 23.5, gx, gh / 2 + 1, 0, archDark);
      const archRim = new THREE.Mesh(new THREE.CylinderGeometry(gw / 2 + 1.8, gw / 2 + 1.8, 24, 10), stoneBlock);
      archRim.rotation.x = Math.PI / 2;
      archRim.position.set(gx, gh + 0.5, 0);
      g.add(archRim);
      const archHole = new THREE.Mesh(new THREE.CylinderGeometry(gw / 2, gw / 2, 24.4, 10), archDark);
      archHole.rotation.x = Math.PI / 2;
      archHole.position.set(gx, gh + 0.5, 0);
      g.add(archHole);
    });
    return g;
  }

  // 9. ĐỘNG PHONG NHA - KẺ BÀNG — QUẢNG BÌNH
  function buildPhongNha() {
    const g = new THREE.Object3D();
    const sonRiver = mat(0x0284c7);
    const limestone = mat(0x78716c);
    const caveInner = mat(0x0f172a);
    const stalactite = mat(0xd6d3d1);
    const amberGlow = mat(0xf59e0b, 0xd97706, 0.7);
    const jungle = mat(0x166534);
    const boatWood = mat(0x7c2d12);

    const river = new THREE.Mesh(new THREE.CylinderGeometry(48, 54, 16, 12), sonRiver);
    river.position.set(0, -6.5, 0);
    g.add(river);

    const mountainBody = new THREE.Mesh(new THREE.DodecahedronGeometry(34, 0), limestone);
    mountainBody.scale.set(1.35, 1.15, 0.85);
    mountainBody.position.set(0, 24, -6);
    g.add(mountainBody);

    [[-22, 42], [0, 52], [22, 40]].forEach(function (j) {
      const tree = new THREE.Mesh(new THREE.DodecahedronGeometry(11, 0), jungle);
      tree.position.set(j[0], j[1], -6);
      g.add(tree);
    });

    const caveMouth = new THREE.Mesh(new THREE.CylinderGeometry(17, 17, 26, 10), caveInner);
    caveMouth.rotation.x = Math.PI / 2;
    caveMouth.position.set(0, 10, 8);
    g.add(caveMouth);

    [-9, -3, 3, 9].forEach(function (sx) {
      const st = new THREE.Mesh(new THREE.ConeGeometry(2.2, 9, 5), (sx === -3 || sx === 3) ? amberGlow : stalactite);
      st.rotation.x = Math.PI;
      st.position.set(sx, 21, 18);
      g.add(st);
    });

    const boat = new THREE.Object3D();
    boat.name = 'anim_boat';
    boat.position.set(0, 3, 24);
    addBox(boat, 14, 2.8, 5, 0, 0, 0, boatWood);
    addBox(boat, 9, 3, 4.5, 0, 2.8, 0, mat(0x2563eb));
    g.add(boat);
    return g;
  }

  // 10. KINH THÀNH HUẾ (NGỌ MÔN)
  function buildKinhThanhHue() {
    const g = new THREE.Object3D();
    const stoneWall = mat(0x57534e);
    const stoneTrim = mat(0x78716c);
    const gateDark = mat(0x1c1917);
    const imperialRed = mat(0xb91c1c);
    const imperialGold = mat(0xeab308, 0xca8a04, 0.2);
    const goldRoofDark = mat(0xd97706);

    addBox(g, 88, 16, 36, 0, -6, 0, stoneWall);
    addBox(g, 82, 20, 26, 0, 10, 0, stoneWall);
    addBox(g, 18, 20, 14, -34, 10, 14, stoneTrim);
    addBox(g, 18, 20, 14, 34, 10, 14, stoneTrim);

    addBox(g, 10, 14, 27, 0, 7, 0, gateDark);
    addBox(g, 7, 11, 27, -14, 5.5, 0, gateDark);
    addBox(g, 7, 11, 27, 14, 5.5, 0, gateDark);
    addBox(g, 84, 2.5, 28, 0, 21, 0, stoneTrim);

    addBox(g, 34, 12, 16, 0, 28, 0, imperialRed);
    addBox(g, 18, 9, 14, -27, 26.5, 4, imperialRed);
    addBox(g, 18, 9, 14, 27, 26.5, 4, imperialRed);

    const centerRoof1 = new THREE.Mesh(new THREE.ConeGeometry(28, 9, 4), imperialGold);
    centerRoof1.rotation.y = Math.PI / 4;
    centerRoof1.scale.set(1.2, 1, 0.65);
    centerRoof1.position.set(0, 38, 0);
    g.add(centerRoof1);

    const centerRoof2 = new THREE.Mesh(new THREE.ConeGeometry(20, 8, 4), goldRoofDark);
    centerRoof2.rotation.y = Math.PI / 4;
    centerRoof2.scale.set(1.15, 1, 0.6);
    centerRoof2.position.set(0, 44.5, 0);
    g.add(centerRoof2);

    [-27, 27].forEach(function (sx) {
      const sRoof = new THREE.Mesh(new THREE.ConeGeometry(15, 7, 4), imperialGold);
      sRoof.rotation.y = Math.PI / 4;
      sRoof.position.set(sx, 34.5, 4);
      g.add(sRoof);
    });
    return g;
  }

  // 11. CHÙA THIÊN MỤ — HUẾ
  function buildChuaThienMu() {
    const g = new THREE.Object3D();
    const hill = mat(0x15803d);
    const brick = mat(0xb45309);
    const roofGreen = mat(0x0f766e);
    const trimCream = mat(0xfef3c7);
    const gold = mat(0xf59e0b, 0xd97706, 0.25);

    const mound = new THREE.Mesh(new THREE.CylinderGeometry(30, 40, 18, 8), hill);
    mound.position.set(0, -6, 0);
    g.add(mound);
    const terrace = new THREE.Mesh(new THREE.CylinderGeometry(16, 18, 5, 8), trimCream);
    terrace.position.set(0, 5, 0);
    g.add(terrace);

    let curY = 8;
    for (let tier = 0; tier < 7; tier++) {
      const radius = 11.5 - tier * 1.1;
      const height = 6.2 - tier * 0.25;
      const body = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.92, radius, height, 8), brick);
      body.position.set(0, curY + height / 2, 0);
      g.add(body);

      const eave = new THREE.Mesh(new THREE.ConeGeometry(radius + 2.6, 2.8, 8), roofGreen);
      eave.position.set(0, curY + height + 0.9, 0);
      g.add(eave);

      curY += height + 1.4;
    }

    const spire = new THREE.Mesh(new THREE.ConeGeometry(2.2, 8, 6), gold);
    spire.position.set(0, curY + 3.5, 0);
    g.add(spire);
    return g;
  }

  // 12. CẦU RỒNG — ĐÀ NẴNG (Fire-Breathing Dragon Bridge!)
  function buildCauRong() {
    const g = new THREE.Object3D();
    const hanRiver = mat(0x0369a1);
    const roadGrey = mat(0x475569);
    const pierStone = mat(0x94a3b8);
    const dragonGold = mat(0xfacc15, 0xca8a04, 0.35);
    const dragonAmber = mat(0xf59e0b, 0xd97706, 0.25);
    const eyeRed = mat(0xef4444, 0xdc2626, 0.8);
    const fireOrange = mat(0xf97316, 0xea580c, 0.9);
    const fireYellow = mat(0xfef08a, 0xfacc15, 0.9);

    addBox(g, 108, 16, 36, 0, -6, 0, hanRiver);
    [-36, -12, 12, 36].forEach(function (px) { addBox(g, 5, 16, 12, px, 7, 0, pierStone); });
    addBox(g, 102, 4, 15, 0, 15.5, 0, roadGrey);

    const segs = 13;
    for (let i = 0; i < segs; i++) {
      const t = i / (segs - 1);
      const bx = -44 + t * 82;
      const archWave = Math.sin(t * Math.PI * 3);
      const by = 22 + Math.abs(archWave) * 14;
      const seg = new THREE.Mesh(new THREE.BoxGeometry(8.5, 5.2, 6), i % 2 === 0 ? dragonGold : dragonAmber);
      seg.position.set(bx, by, 0);
      seg.rotation.z = Math.cos(t * Math.PI * 3) * 0.45;
      g.add(seg);
    }

    const tailFin = new THREE.Mesh(new THREE.ConeGeometry(6, 14, 4), dragonGold);
    tailFin.rotation.z = 0.7;
    tailFin.position.set(-48, 25, 0);
    g.add(tailFin);

    const headX = 42, headY = 27;
    addBox(g, 12, 9, 9, headX, headY, 0, dragonGold);
    addBox(g, 9, 4.5, 7, headX + 8, headY + 1.8, 0, dragonAmber);
    addBox(g, 8, 3, 6.5, headX + 7.5, headY - 3, 0, dragonGold);
    addBox(g, 2.2, 2.2, 9.5, headX + 2, headY + 2.2, 0, eyeRed);
    const horn1 = new THREE.Mesh(new THREE.ConeGeometry(1.8, 9, 4), dragonAmber);
    horn1.rotation.z = 0.55;
    horn1.position.set(headX - 3, headY + 7.5, 2.5);
    g.add(horn1);
    const horn2 = horn1.clone();
    horn2.position.z = -2.5;
    g.add(horn2);

    const fireGroup = new THREE.Object3D();
    fireGroup.name = 'anim_dragon_fire';
    fireGroup.position.set(headX + 12, headY - 0.5, 0);

    const outerFlame = new THREE.Mesh(new THREE.ConeGeometry(5.5, 22, 6), fireOrange);
    outerFlame.rotation.z = -Math.PI / 2;
    outerFlame.position.set(11, 0, 0);
    fireGroup.add(outerFlame);

    const innerFlame = new THREE.Mesh(new THREE.ConeGeometry(3, 14, 6), fireYellow);
    innerFlame.rotation.z = -Math.PI / 2;
    innerFlame.position.set(8, 0, 0);
    fireGroup.add(innerFlame);

    g.add(fireGroup);
    return g;
  }

  // 13. CẦU VÀNG — BÀ NÀ HILLS, ĐÀ NẴNG
  function buildCauVang() {
    const g = new THREE.Object3D();
    const mountain = mat(0x166534);
    const mountainLight = mat(0x15803d);
    const stoneHand = mat(0xa8a29e);
    const stoneMoss = mat(0x78716c);
    const goldBridge = mat(0xf59e0b, 0xd97706, 0.25);
    const goldRail = mat(0xfde047, 0xeab308, 0.2);

    const hill1 = new THREE.Mesh(new THREE.ConeGeometry(34, 34, 7), mountain);
    hill1.position.set(-22, 2, -6);
    g.add(hill1);
    const hill2 = new THREE.Mesh(new THREE.ConeGeometry(36, 36, 7), mountainLight);
    hill2.position.set(22, 3, -6);
    g.add(hill2);
    addBox(g, 86, 16, 34, 0, -8, -4, mountain);

    [-1, 1].forEach(function (dir) {
      const hand = new THREE.Object3D();
      hand.position.set(dir * 16, 18, 4);
      const wrist = new THREE.Mesh(new THREE.BoxGeometry(10, 18, 12), stoneMoss);
      wrist.position.set(dir * 2, -6, -2);
      wrist.rotation.z = dir * 0.22;
      hand.add(wrist);
      const palm = new THREE.Mesh(new THREE.BoxGeometry(14, 12, 14), stoneHand);
      palm.position.set(0, 5, 0);
      palm.rotation.z = -dir * 0.18;
      hand.add(palm);
      for (let f = -1; f <= 1; f++) {
        const finger = new THREE.Mesh(new THREE.BoxGeometry(3.2, 13, 3.2), stoneHand);
        finger.position.set(-dir * 4.5, 13, f * 4.5);
        finger.rotation.z = dir * 0.35;
        hand.add(finger);
      }
      g.add(hand);
    });

    const segments = 7;
    for (let i = 0; i < segments; i++) {
      const t = (i / (segments - 1)) * 2 - 1;
      const sx = t * 38;
      const sy = 28 + (1 - t * t) * 7;
      const deck = new THREE.Mesh(new THREE.BoxGeometry(13.5, 3.5, 12), goldBridge);
      deck.position.set(sx, sy, 6);
      deck.rotation.z = -t * 0.18;
      g.add(deck);
      const railFront = new THREE.Mesh(new THREE.BoxGeometry(13.5, 2.2, 1.2), goldRail);
      railFront.position.set(sx, sy + 2.8, 11.5);
      railFront.rotation.z = -t * 0.18;
      g.add(railFront);
    }
    return g;
  }

  // 14. PHỐ CỔ HỘI AN — QUẢNG NAM
  function buildPhoCoHoiAn() {
    const g = new THREE.Object3D();
    const canal = mat(0x0e7490);
    const hoiAnYellow = mat(0xfbbf24);
    const hoiAnYellowDark = mat(0xd97706);
    const roofTile = mat(0x7c2d12);
    const bridgeRed = mat(0x991b1b);
    const stone = mat(0x9ca3af);
    const woodDark = mat(0x451a03);
    const lanternGlow = mat(0xef4444, 0xf97316, 0.85);
    const lanternGold = mat(0xfef08a, 0xf59e0b, 0.8);

    addBox(g, 90, 16, 38, 0, -6, 0, canal);
    addBox(g, 28, 12, 34, -31, 4, 0, stone);
    addBox(g, 28, 12, 34, 31, 4, 0, stone);

    addBox(g, 5, 12, 16, -12, 6, 2, stone);
    addBox(g, 5, 12, 16, 12, 6, 2, stone);
    addBox(g, 34, 4, 16, 0, 13, 2, woodDark);
    addBox(g, 30, 10, 14, 0, 19, 2, bridgeRed);
    const bridgeRoof = new THREE.Mesh(new THREE.ConeGeometry(24, 9, 4), roofTile);
    bridgeRoof.rotation.y = Math.PI / 4;
    bridgeRoof.scale.set(1.25, 1, 0.65);
    bridgeRoof.position.set(0, 28, 2);
    g.add(bridgeRoof);

    addBox(g, 22, 22, 20, -32, 20, -2, hoiAnYellow);
    addBox(g, 6, 7, 21, -36, 24, -2, woodDark);
    addBox(g, 6, 7, 21, -27, 24, -2, woodDark);
    const houseRoofL = new THREE.Mesh(new THREE.ConeGeometry(19, 9, 4), roofTile);
    houseRoofL.rotation.y = Math.PI / 4;
    houseRoofL.position.set(-32, 35.5, -2);
    g.add(houseRoofL);

    addBox(g, 22, 26, 20, 32, 22, -2, hoiAnYellowDark);
    addBox(g, 6, 8, 21, 28, 26, -2, woodDark);
    addBox(g, 6, 8, 21, 36, 26, -2, woodDark);
    const houseRoofR = new THREE.Mesh(new THREE.ConeGeometry(19, 9, 4), roofTile);
    houseRoofR.rotation.y = Math.PI / 4;
    houseRoofR.position.set(32, 39.5, -2);
    g.add(houseRoofR);

    [[-21, 22, 11, true], [-10, 20, 11, false], [0, 19, 11, true], [10, 20, 11, false], [21, 23, 11, true]].forEach(function (l) {
      const lantern = new THREE.Mesh(new THREE.OctahedronGeometry(2.6, 0), l[3] ? lanternGlow : lanternGold);
      lantern.position.set(l[0], l[1], l[2]);
      g.add(lantern);
    });
    return g;
  }

  // 15. THÁNH ĐỊA MỸ SƠN — QUẢNG NAM
  function buildThanhDiaMySon() {
    const g = new THREE.Object3D();
    const valleyGreen = mat(0x14532d);
    const mossBrick = mat(0x9a3412);
    const brickOld = mat(0x7c2d12);
    const mossPatch = mat(0x3f6212);

    addBox(g, 88, 16, 40, 0, -6, 0, valleyGreen);
    const ridgeL = new THREE.Mesh(new THREE.ConeGeometry(28, 38, 6), valleyGreen);
    ridgeL.position.set(-34, 15, -14);
    g.add(ridgeL);
    const ridgeR = new THREE.Mesh(new THREE.ConeGeometry(30, 42, 6), valleyGreen);
    ridgeR.position.set(34, 17, -14);
    g.add(ridgeR);

    function buildTower(tx, tz, sc) {
      addBox(g, 14 * sc, 16 * sc, 14 * sc, tx, 8 * sc, tz, mossBrick);
      addBox(g, 10 * sc, 10 * sc, 10 * sc, tx, 20 * sc, tz, brickOld);
      addBox(g, 6.5 * sc, 7 * sc, 6.5 * sc, tx, 28 * sc, tz, mossBrick);
      const cap = new THREE.Mesh(new THREE.ConeGeometry(5 * sc, 8 * sc, 4), mossPatch);
      cap.rotation.y = Math.PI / 4;
      cap.position.set(tx, 34 * sc, tz);
      g.add(cap);
    }

    buildTower(-16, 2, 1.0);
    buildTower(4, -2, 1.25);
    buildTower(22, 4, 0.85);
    addBox(g, 14, 7, 4, -2, 4, 14, brickOld);
    addBox(g, 6, 4, 4.5, -2, 8.5, 14, mossPatch);
    return g;
  }

  // 16. THÁP CHĂM PO NAGAR — NHA TRANG
  function buildThapCham() {
    const g = new THREE.Object3D();
    const brick = mat(0xb45309);
    const brickRed = mat(0xc2410c);
    const brickDark = mat(0x7c2d12);
    const hill = mat(0x15803d);

    const base = new THREE.Mesh(new THREE.CylinderGeometry(36, 44, 18, 8), hill);
    base.position.set(0, -6, 0);
    g.add(base);
    addBox(g, 48, 6, 32, 0, 5, 0, brickDark);

    addBox(g, 20, 18, 20, 0, 17, 0, brickRed);
    addBox(g, 8, 13, 22, 0, 14.5, 0, brickDark);
    addBox(g, 15, 10, 15, 0, 31, 0, brick);
    addBox(g, 11, 8, 11, 0, 40, 0, brickRed);
    addBox(g, 7, 6, 7, 0, 47, 0, brick);
    const apex = new THREE.Mesh(new THREE.ConeGeometry(5, 9, 4), brickDark);
    apex.rotation.y = Math.PI / 4;
    apex.position.set(0, 54, 0);
    g.add(apex);

    addBox(g, 13, 14, 13, -22, 14, -4, brick);
    addBox(g, 9.5, 7, 9.5, -22, 24.5, -4, brickRed);
    const sideApex = new THREE.Mesh(new THREE.ConeGeometry(5.5, 8, 4), brickDark);
    sideApex.rotation.y = Math.PI / 4;
    sideApex.position.set(-22, 32, -4);
    g.add(sideApex);

    addBox(g, 12, 12, 12, 22, 13, -3, brickRed);
    const rightApex = new THREE.Mesh(new THREE.ConeGeometry(6, 9, 4), brickDark);
    rightApex.rotation.y = Math.PI / 4;
    rightApex.position.set(22, 23.5, -3);
    g.add(rightApex);
    return g;
  }

  // 17. NHÀ THỜ ĐỨC BÀ — TP. HỒ CHÍ MINH
  function buildNhaThoDucBa() {
    const g = new THREE.Object3D();
    const brick = mat(0xc2410c);
    const brickLight = mat(0xd97706);
    const trim = mat(0xfef3c7);
    const roofSlate = mat(0x334155);
    const plaza = mat(0x94a3b8);
    const crossWhite = mat(0xf8fafc, 0xffffff, 0.25);
    const windowDark = mat(0x1e293b);

    addBox(g, 76, 16, 42, 0, -6, 0, plaza);
    addBox(g, 48, 28, 30, 0, 16, -2, brick);
    const naveRoof = new THREE.Mesh(new THREE.ConeGeometry(24, 12, 4), roofSlate);
    naveRoof.rotation.y = Math.PI / 4;
    naveRoof.scale.set(1.15, 1, 0.9);
    naveRoof.position.set(0, 35, -4);
    g.add(naveRoof);

    const roseWin = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 2, 10), trim);
    roseWin.rotation.x = Math.PI / 2;
    roseWin.position.set(0, 22, 13.5);
    g.add(roseWin);
    const roseCore = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.4, 2.3, 10), windowDark);
    roseCore.rotation.x = Math.PI / 2;
    roseCore.position.set(0, 22, 13.5);
    g.add(roseCore);
    addBox(g, 8, 12, 2, 0, 8, 13.5, windowDark);

    [-18, 18].forEach(function (tx) {
      addBox(g, 13, 42, 13, tx, 23, 8, brick);
      addBox(g, 14.5, 2, 14.5, tx, 28, 8, trim);
      addBox(g, 14.5, 2, 14.5, tx, 43, 8, trim);
      addBox(g, 4.5, 10, 14, tx, 36, 8, windowDark);
      addBox(g, 5, 9, 14, tx, 16, 8, brickLight);
      const spire = new THREE.Mesh(new THREE.ConeGeometry(7.2, 22, 6), roofSlate);
      spire.position.set(tx, 55, 8);
      g.add(spire);
      addBox(g, 1.2, 6.5, 1.2, tx, 68, 8, crossWhite);
      addBox(g, 4.5, 1.2, 1.2, tx, 69.2, 8, crossWhite);
    });
    return g;
  }

  // 18. CHỢ BẾN THÀNH — TP. HỒ CHÍ MINH
  function buildChoBenThanh() {
    const g = new THREE.Object3D();
    const cream = mat(0xfde68a);
    const creamDark = mat(0xf59e0b);
    const terracotta = mat(0xb91c1c);
    const archway = mat(0x451a03);
    const clockFace = mat(0xf8fafc, 0xffffff, 0.35);
    const clockHand = mat(0x0f172a);
    const plaza = mat(0x94a3b8);

    addBox(g, 88, 16, 40, 0, -6, 0, plaza);
    addBox(g, 76, 18, 28, 0, 11, -2, cream);
    [-24, 24].forEach(function (wx) {
      const wRoof = new THREE.Mesh(new THREE.ConeGeometry(22, 10, 4), terracotta);
      wRoof.rotation.y = Math.PI / 4;
      wRoof.scale.set(1.15, 1, 0.85);
      wRoof.position.set(wx, 25, -2);
      g.add(wRoof);
    });

    addBox(g, 20, 38, 18, 0, 21, 5, cream);
    addBox(g, 22, 2.5, 20, 0, 40, 5, creamDark);
    addBox(g, 11, 13, 19.5, 0, 8.5, 5, archway);
    const clock = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 5.2, 1.8, 12), clockFace);
    clock.rotation.x = Math.PI / 2;
    clock.position.set(0, 29, 14);
    g.add(clock);
    addBox(g, 0.9, 3.6, 0.8, 0, 30.2, 15.1, clockHand);
    addBox(g, 3, 0.9, 0.8, 1.2, 29, 15.1, clockHand);

    const towerRoof = new THREE.Mesh(new THREE.ConeGeometry(15, 11, 4), terracotta);
    towerRoof.rotation.y = Math.PI / 4;
    towerRoof.position.set(0, 46.5, 5);
    g.add(towerRoof);
    return g;
  }

  // 19. DINH ĐỘC LẬP — TP. HỒ CHÍ MINH
  function buildDinhDocLap() {
    const g = new THREE.Object3D();
    const lawn = mat(0x16a34a);
    const white = mat(0xf8fafc);
    const cream = mat(0xe2e8f0);
    const glassDark = mat(0x1e293b);
    const bambooCurtain = mat(0xfef3c7);
    const fountainBlue = mat(0x38bdf8);

    addBox(g, 96, 16, 44, 0, -6, 0, lawn);
    const fountain = new THREE.Mesh(new THREE.CylinderGeometry(7, 7.5, 2, 12), fountainBlue);
    fountain.position.set(0, 3, 16);
    g.add(fountain);

    addBox(g, 76, 10, 24, 0, 7, -4, cream);
    addBox(g, 66, 6, 24.5, 0, 7, -4, glassDark);

    addBox(g, 82, 15, 26, 0, 20, -3, white);
    addBox(g, 76, 12, 26.4, 0, 20, -3, glassDark);
    for (let x = -34; x <= 34; x += 6.8) {
      addBox(g, 2.2, 13.5, 1.5, x, 20, 10.5, bambooCurtain);
    }

    addBox(g, 86, 2.8, 28, 0, 28.5, -3, white);
    addBox(g, 28, 7, 16, 0, 33, -4, white);
    addBox(g, 22, 4.5, 16.5, 0, 33, -4, glassDark);
    addBox(g, 32, 2, 18, 0, 37.5, -4, white);
    return g;
  }

  // 20. TÒA THÁP LANDMARK 81 — TP. HỒ CHÍ MINH
  function buildLandmark81() {
    const g = new THREE.Object3D();
    const park = mat(0x15803d);
    const glassBlue = mat(0x38bdf8, 0x0284c7, 0.25);
    const glassLight = mat(0x7dd3fc, 0x0ea5e9, 0.3);
    const steel = mat(0xcbd5e1);
    const spireGlow = mat(0xf8fafc, 0x38bdf8, 0.7);

    addBox(g, 72, 16, 38, 0, -6, 0, park);
    addBox(g, 42, 8, 26, 0, 6, 0, steel);

    [
      [-12, 0, 26, false], [12, 0, 28, false],
      [-8, 6, 36, true], [8, 6, 38, true],
      [-8, -6, 34, false], [8, -6, 32, false],
      [-4, 0, 52, true], [4, 0, 56, false],
      [0, 4, 62, true], [0, -4, 58, false],
      [0, 0, 72, true],
    ].forEach(function (t) {
      addBox(g, 5.5, t[2], 5.5, t[0], t[2] / 2 + 4, t[1], t[3] ? glassLight : glassBlue);
      addBox(g, 5.7, 1.2, 5.7, t[0], t[2] + 4.2, t[1], steel);
    });

    const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 1.3, 18, 6), spireGlow);
    spire.position.set(0, 84, 0);
    g.add(spire);
    return g;
  }

  // 21. CHỢ NỔI CÁI RĂNG — CẦN THƠ
  function buildChoNoiCaiRang() {
    const g = new THREE.Object3D();
    const mekongRiver = mat(0x0e7490);
    const wood = mat(0x7c2d12);
    const woodLight = mat(0x9a3412);
    const canopyBlue = mat(0x2563eb);
    const canopyRed = mat(0xdc2626);
    const melonGreen = mat(0x16a34a);
    const mangoYellow = mat(0xfacc15);
    const dragonfruitPink = mat(0xec4899);
    const bamboo = mat(0xd97706);

    const water = new THREE.Mesh(new THREE.CylinderGeometry(48, 54, 16, 12), mekongRiver);
    water.position.set(0, -6.5, 0);
    g.add(water);

    const fleet = new THREE.Object3D();
    fleet.name = 'anim_boat';
    fleet.position.set(0, 3, 0);

    function addBoat(bx, bz, len, canopyMat, fruitMat, hasBeoPole) {
      addBox(fleet, len, 3.5, 6.5, bx, 0, bz, wood);
      addBox(fleet, len * 0.45, 4.5, 5.8, bx - len * 0.2, 3.5, bz, canopyMat);
      [[len * 0.16, 2.8], [len * 0.25, 2.8], [len * 0.2, 4.8]].forEach(function (f) {
        const fruit = new THREE.Mesh(new THREE.DodecahedronGeometry(2.1, 0), fruitMat);
        fruit.position.set(bx + f[0], f[1], bz);
        fleet.add(fruit);
      });
      if (hasBeoPole) {
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 18, 5), bamboo);
        pole.position.set(bx + len * 0.36, 10, bz);
        pole.rotation.z = -0.18;
        fleet.add(pole);
        const signFruit = new THREE.Mesh(new THREE.DodecahedronGeometry(2, 0), fruitMat);
        signFruit.position.set(bx + len * 0.36 + 1.5, 18, bz);
        fleet.add(signFruit);
      }
    }

    addBoat(-22, 6, 20, canopyBlue, melonGreen, true);
    addBoat(2, -4, 24, canopyRed, mangoYellow, true);
    addBoat(24, 8, 19, woodLight, dragonfruitPink, true);
    addBoat(-6, 15, 16, canopyRed, melonGreen, false);
    g.add(fleet);
    return g;
  }

  // 22. MŨI CÀ MAU — CÀ MAU
  function buildMuiCaMau() {
    const g = new THREE.Object3D();
    const sea = mat(0x0284c7);
    const mangrove = mat(0x166534);
    const plaza = mat(0xd6d3d1);
    const shipWhite = mat(0xf8fafc);
    const shipRed = mat(0xdc2626);
    const sailGold = mat(0xfef08a, 0xf59e0b, 0.25);
    const starYellow = mat(0xfacc15, 0xeab308, 0.5);

    const capeWater = new THREE.Mesh(new THREE.CylinderGeometry(46, 52, 16, 12), sea);
    capeWater.position.set(0, -6.5, 0);
    g.add(capeWater);
    addBox(g, 64, 6, 30, 0, 3, 0, plaza);

    [[-24, -6], [-28, 5], [-18, -9]].forEach(function (t) {
      const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(6.5, 0), mangrove);
      foliage.position.set(t[0], 10, t[1]);
      g.add(foliage);
    });

    addBox(g, 34, 8, 13, 4, 10, 0, shipWhite);
    const prow = new THREE.Mesh(new THREE.ConeGeometry(7.5, 16, 4), shipRed);
    prow.rotation.z = -Math.PI / 2;
    prow.rotation.x = Math.PI / 4;
    prow.position.set(27, 11, 0);
    g.add(prow);

    const sail = new THREE.Mesh(new THREE.ConeGeometry(13, 36, 4), sailGold);
    sail.scale.set(1.1, 1, 0.3);
    sail.position.set(4, 30, 0);
    g.add(sail);

    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1, 18, 6), plaza);
    mast.position.set(4, 46, 0);
    g.add(mast);

    const flagGroup = new THREE.Object3D();
    flagGroup.name = 'anim_flag';
    flagGroup.position.set(4.5, 51, 0);
    addBox(flagGroup, 14, 9.5, 0.8, 7, 0, 0, shipRed);
    const star = new THREE.Mesh(new THREE.OctahedronGeometry(2.5, 0), starYellow);
    star.scale.set(1, 1, 0.45);
    star.position.set(7, 0, 0);
    flagGroup.add(star);
    g.add(flagGroup);
    return g;
  }

  const BUILDERS = [
    buildChuaMotCot,
    buildHoGuom,
    buildKhueVanCac,
    buildCotCoLungCu,
    buildFansipan,
    buildVinhHaLong,
    buildTrangAn,
    buildThanhNhaHo,
    buildPhongNha,
    buildKinhThanhHue,
    buildChuaThienMu,
    buildCauRong,
    buildCauVang,
    buildPhoCoHoiAn,
    buildThanhDiaMySon,
    buildThapCham,
    buildNhaThoDucBa,
    buildChoBenThanh,
    buildDinhDocLap,
    buildLandmark81,
    buildChoNoiCaiRang,
    buildMuiCaMau,
  ];

  // Living landmark animations (shared between Web Demo & 3D Showcase)
  function animateLandmark(mesh, time) {
    if (!mesh) return;
    const t = typeof time === 'number' ? time : performance.now();
    const flag = mesh.getObjectByName('anim_flag');
    if (flag) {
      flag.rotation.y = Math.sin(t * 0.006) * 0.28;
    }
    const boat = mesh.getObjectByName('anim_boat');
    if (boat) {
      boat.position.y = 3 + Math.sin(t * 0.004) * 1.1;
      boat.rotation.z = Math.sin(t * 0.003) * 0.06;
    }
    const dragonFire = mesh.getObjectByName('anim_dragon_fire');
    if (dragonFire) {
      const cycle = (t * 0.002) % (Math.PI * 2);
      const pulse = Math.max(0, Math.sin(cycle));
      dragonFire.visible = pulse > 0.12;
      const s = 0.4 + pulse * 0.95 + Math.sin(t * 0.04) * 0.12;
      dragonFire.scale.set(s, 0.6 + pulse * 0.6, 0.6 + pulse * 0.6);
    }
    const cableCar = mesh.getObjectByName('anim_cablecar');
    if (cableCar) {
      const slide = Math.sin(t * 0.0015);
      cableCar.position.x = -14 + slide * 12;
      cableCar.position.y = 28 + slide * 7;
    }
  }

  // Sequential Heritage Parade Manager for Web Demo
  function VietnamLandmarksDemo(scene, onLandmarkChange) {
    this.scene = scene;
    this.onLandmarkChange = onLandmarkChange;
    this.meshes = new Array(BUILDERS.length).fill(null);
    this.zDepth = -50;
    this.currentIndex = 0;
    this.activeMesh = null;
    this.angle = 0;
    this.endAngle = Math.PI;
    this.cooldown = 0;
  }

  VietnamLandmarksDemo.prototype.getOrCreateMesh = function (index) {
    if (!this.meshes[index]) {
      const m = BUILDERS[index]();
      m.name = 'vn_demo_' + VIETNAM_LANDMARKS[index].id;
      m.visible = false;
      this.scene.add(m);
      this.meshes[index] = m;
    }
    return this.meshes[index];
  };

  VietnamLandmarksDemo.prototype.computeAngles = function (camera, seaRadius) {
    const distZ = Math.max(120, camera.position.z - this.zDepth);
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * distZ;
    const halfW = halfH * camera.aspect;
    const margin = 85;

    const rightEdgeX = camera.position.x + halfW + margin;
    const leftEdgeX = camera.position.x - halfW - margin;

    const cosStart = Math.max(-0.92, Math.min(0.92, rightEdgeX / seaRadius));
    const cosEnd = Math.max(-0.92, Math.min(0.92, leftEdgeX / seaRadius));

    const startAngle = Math.max(0.30, Math.min(Math.PI / 2 - 0.35, Math.acos(cosStart)));
    const endAngle = Math.min(Math.PI - 0.30, Math.max(Math.PI / 2 + 0.35, Math.acos(cosEnd)));
    return { startAngle: startAngle, endAngle: endAngle };
  };

  VietnamLandmarksDemo.prototype.spawnCurrent = function (camera, seaRadius) {
    const angles = this.computeAngles(camera, seaRadius);
    const mesh = this.getOrCreateMesh(this.currentIndex);
    if (!mesh) return;

    this.activeMesh = mesh;
    this.angle = angles.startAngle;
    this.endAngle = angles.endAngle;

    mesh.visible = true;
    mesh.position.set(
      Math.cos(this.angle) * seaRadius,
      -seaRadius + Math.sin(this.angle) * seaRadius,
      this.zDepth
    );
    mesh.rotation.set(0, 0, this.angle - Math.PI / 2);

    if (this.onLandmarkChange) {
      this.onLandmarkChange(VIETNAM_LANDMARKS[this.currentIndex], this.currentIndex, VIETNAM_LANDMARKS.length);
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

    // Steady scenic sweep from right to left along curved ground
    const angularStep = Math.max(0.00028, speed) * deltaTime * 0.65;
    this.angle += angularStep;

    this.activeMesh.position.x = Math.cos(this.angle) * seaRadius;
    this.activeMesh.position.y = -seaRadius + Math.sin(this.angle) * seaRadius;
    this.activeMesh.position.z = this.zDepth;
    this.activeMesh.rotation.z = this.angle - Math.PI / 2;

    // Living landmark animations
    animateLandmark(this.activeMesh, performance.now());

    // Finished crossing screen -> advance immediately to NEXT Vietnamese heritage landmark!
    if (this.angle > this.endAngle) {
      this.activeMesh.visible = false;
      this.activeMesh = null;
      this.currentIndex = (this.currentIndex + 1) % VIETNAM_LANDMARKS.length;
      this.cooldown = 700;
    }
  };

  VietnamLandmarksDemo.prototype.reset = function () {
    if (this.activeMesh) {
      this.activeMesh.visible = false;
      this.activeMesh = null;
    }
    for (let i = 0; i < this.meshes.length; i++) {
      if (this.meshes[i]) this.meshes[i].visible = false;
    }
    this.currentIndex = 0;
    this.cooldown = 0;
  };

  window.VietnamLandmarksDemo = VietnamLandmarksDemo;
  window.VietnamLandmarksCatalog = {
    list: VIETNAM_LANDMARKS,
    buildByIndex: function (index) {
      if (index < 0 || index >= BUILDERS.length) return null;
      return BUILDERS[index]();
    },
    buildById: function (id) {
      for (let i = 0; i < VIETNAM_LANDMARKS.length; i++) {
        if (VIETNAM_LANDMARKS[i].id === id) {
          return BUILDERS[i]();
        }
      }
      return null;
    },
    animate: animateLandmark,
  };
})();
