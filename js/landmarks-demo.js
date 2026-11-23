/**
 * FLY TO THE END - 42 Vietnamese Cultural Heritage & Architectural Wonders (3D Low-Poly)
 * Compatible with Three.js r90 (Web Demo & 360° Interactive Showcase)
 * Synced directly with FlyToTheEnd-Modern v3.0.0 (src/landmarks.ts)
 */
(function () {
  'use strict';

  if (typeof THREE === 'undefined') return;

  const VIETNAM_LANDMARKS = [
    // === MIỀN BẮC (14) ===
    { id: 'cot_co_lung_cu', nameVi: 'Cột Cờ Lũng Cú', locationVi: 'Hà Giang' },
    { id: 'thac_ban_gioc', nameVi: 'Thác Bản Giốc', locationVi: 'Cao Bằng' },
    { id: 'dinh_fansipan', nameVi: 'Đỉnh Fansipan', locationVi: 'Sa Pa, Lào Cai' },
    { id: 'mu_cang_chai', nameVi: 'Ruộng Bậc Thang Mù Cang Chải', locationVi: 'Yên Bái' },
    { id: 'dien_bien_phu', nameVi: 'Tượng Đài Điện Biên Phủ', locationVi: 'Điện Biên' },
    { id: 'den_hung', nameVi: 'Khu Di Tích Đền Hùng', locationVi: 'Phú Thọ' },
    { id: 'chua_mot_cot', nameVi: 'Chùa Một Cột', locationVi: 'Hà Nội' },
    { id: 'ho_guom', nameVi: 'Tháp Rùa - Hồ Gươm', locationVi: 'Hà Nội' },
    { id: 'khue_van_cac', nameVi: 'Văn Miếu - Khuê Văn Các', locationVi: 'Hà Nội' },
    { id: 'cau_long_bien', nameVi: 'Cầu Long Biên', locationVi: 'Hà Nội' },
    { id: 'vinh_ha_long', nameVi: 'Vịnh Hạ Long', locationVi: 'Quảng Ninh' },
    { id: 'chua_dong_yen_tu', nameVi: 'Chùa Đồng - Yên Tử', locationVi: 'Quảng Ninh' },
    { id: 'trang_an', nameVi: 'Danh Thắng Tràng An', locationVi: 'Ninh Bình' },
    { id: 'chua_bai_dinh', nameVi: 'Bảo Tháp Chùa Bái Đính', locationVi: 'Ninh Bình' },

    // === BẮC TRUNG BỘ & DUYÊN HẢI MIỀN TRUNG (13) ===
    { id: 'thanh_nha_ho', nameVi: 'Thành Nhà Hồ', locationVi: 'Thanh Hóa' },
    { id: 'lang_sen_que_bac', nameVi: 'Làng Sen Quê Bác', locationVi: 'Nam Đàn, Nghệ An' },
    { id: 'phong_nha', nameVi: 'Động Phong Nha - Kẻ Bàng', locationVi: 'Quảng Bình' },
    { id: 'cau_hien_luong', nameVi: 'Cầu Hiền Lương - Bến Hải', locationVi: 'Quảng Trị' },
    { id: 'kinh_thanh_hue', nameVi: 'Kinh Thành Huế (Ngọ Môn)', locationVi: 'Thừa Thiên Huế' },
    { id: 'chua_thien_mu', nameVi: 'Chùa Thiên Mụ', locationVi: 'Huế' },
    { id: 'cau_rong', nameVi: 'Cầu Rồng', locationVi: 'Đà Nẵng' },
    { id: 'cau_vang', nameVi: 'Cầu Vàng - Bà Nà Hills', locationVi: 'Đà Nẵng' },
    { id: 'pho_co_hoi_an', nameVi: 'Phố Cổ Hội An', locationVi: 'Quảng Nam' },
    { id: 'thanh_dia_my_son', nameVi: 'Thánh Địa Mỹ Sơn', locationVi: 'Quảng Nam' },
    { id: 'dao_ly_son', nameVi: 'Cổng Tò Vò - Đảo Lý Sơn', locationVi: 'Quảng Ngãi' },
    { id: 'ganh_da_dia', nameVi: 'Gành Đá Đĩa', locationVi: 'Phú Yên' },
    { id: 'thap_cham', nameVi: 'Tháp Chăm Po Nagar', locationVi: 'Nha Trang, Khánh Hòa' },

    // === TÂY NGUYÊN (4) ===
    { id: 'nha_rong_kon_tum', nameVi: 'Nhà Rông Kon Tum', locationVi: 'Kon Tum' },
    { id: 'bien_ho_tnung', nameVi: "Biển Hồ T'Nưng", locationVi: 'Pleiku, Gia Lai' },
    { id: 'bao_tang_ca_phe', nameVi: 'Bảo Tàng Thế Giới Cà Phê', locationVi: 'Buôn Ma Thuột, Đắk Lắk' },
    { id: 'quang_truong_lam_vien', nameVi: 'Quảng Trường Lâm Viên', locationVi: 'Đà Lạt, Lâm Đồng' },

    // === ĐÔNG NAM BỘ, TÂY NAM BỘ & BIỂN ĐẢO (11) ===
    { id: 'doi_cat_mui_ne', nameVi: 'Đồi Cát Bay Mũi Né', locationVi: 'Bình Thuận' },
    { id: 'tuong_chua_vung_tau', nameVi: 'Tượng Chúa Kitô Vua', locationVi: 'Vũng Tàu' },
    { id: 'nha_tho_duc_ba', nameVi: 'Nhà Thờ Đức Bà', locationVi: 'TP. Hồ Chí Minh' },
    { id: 'cho_ben_thanh', nameVi: 'Chợ Bến Thành', locationVi: 'TP. Hồ Chí Minh' },
    { id: 'dinh_doc_lap', nameVi: 'Dinh Độc Lập', locationVi: 'TP. Hồ Chí Minh' },
    { id: 'landmark_81', nameVi: 'Tòa Tháp Landmark 81', locationVi: 'TP. Hồ Chí Minh' },
    { id: 'cau_my_thuan', nameVi: 'Cầu Mỹ Thuận', locationVi: 'Tiền Giang - Vĩnh Long' },
    { id: 'cho_noi_cai_rang', nameVi: 'Chợ Nổi Cái Răng', locationVi: 'Cần Thơ' },
    { id: 'dien_gio_bac_lieu', nameVi: 'Cánh Đồng Điện Gió', locationVi: 'Bạc Liêu' },
    { id: 'dao_phu_quoc', nameVi: 'Đảo Ngọc Phú Quốc', locationVi: 'Kiên Giang' },
    { id: 'mui_ca_mau', nameVi: 'Mũi Cà Mau', locationVi: 'Cà Mau' },
  ];

  // Shared material cache for lightweight WebGL rendering across all 42 landmarks
  const MATERIAL_CACHE = Object.create(null);

  function mat(color, emissive, emissiveIntensity) {
    const em = emissive || 0x000000;
    const ei = emissiveIntensity || 0;
    const key = color + '_' + em + '_' + ei;
    if (!MATERIAL_CACHE[key]) {
      MATERIAL_CACHE[key] = new THREE.MeshLambertMaterial({
        color: color,
        emissive: em,
        emissiveIntensity: ei,
        flatShading: THREE.FlatShading,
      });
    }
    return MATERIAL_CACHE[key];
  }

  function addBox(parent, w, h, d, x, y, z, material) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    m.position.set(x, y, z);
    parent.add(m);
    return m;
  }

  // 1. CỘT CỜ LŨNG CÚ — HÀ GIANG
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

  // 2. THÁC BẢN GIỐC — CAO BẰNG
  function buildThacBanGioc() {
    const g = new THREE.Object3D();
    const river = mat(0x0d9488);
    const cliff = mat(0x64748b);
    const forest = mat(0x15803d);
    const waterFall = mat(0x7dd3fc, 0x38bdf8, 0.2);
    const foam = mat(0xf8fafc, 0xe0f2fe, 0.25);

    const pool = new THREE.Mesh(new THREE.CylinderGeometry(48, 54, 15, 12), river);
    pool.position.set(0, -6.5, 0);
    g.add(pool);

    addBox(g, 76, 36, 20, 0, 18, -10, cliff);
    addBox(g, 50, 18, 16, -12, 26, -6, cliff);
    const karstL = new THREE.Mesh(new THREE.ConeGeometry(20, 44, 6), forest);
    karstL.position.set(-32, 30, -16);
    g.add(karstL);
    const karstR = new THREE.Mesh(new THREE.ConeGeometry(22, 48, 6), forest);
    karstR.position.set(30, 32, -16);
    g.add(karstR);

    [[-22, 37], [0, 38], [22, 35], [-4, 22]].forEach(function (p) {
      const bush = new THREE.Mesh(new THREE.DodecahedronGeometry(8, 0), forest);
      bush.position.set(p[0], p[1], -8);
      g.add(bush);
    });

    addBox(g, 16, 34, 4, -22, 18, 2, waterFall);
    addBox(g, 20, 32, 4.5, 0, 17, 3, waterFall);
    addBox(g, 15, 28, 4, 22, 15, 2, waterFall);

    const mist = new THREE.Object3D();
    mist.name = 'anim_mist';
    mist.position.set(0, 3, 7);
    [[-22, 1], [-8, 1.2], [6, 1.15], [22, 0.95]].forEach(function (p) {
      const puff = new THREE.Mesh(new THREE.DodecahedronGeometry(5.5 * p[1], 0), foam);
      puff.scale.set(1.4, 0.65, 0.9);
      puff.position.set(p[0], 0, 0);
      mist.add(puff);
    });
    g.add(mist);
    return g;
  }

  // 3. ĐỈNH FANSIPAN — SA PA, LÀO CAI
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
    cabin.userData.baseX = -14;
    cabin.userData.baseY = 28;
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

  // 4. RUỘNG BẬC THANG MÙ CANG CHẢI — YÊN BÁI
  function buildMuCangChai() {
    const g = new THREE.Object3D();
    const gold1 = mat(0xeab308);
    const gold2 = mat(0xfacc15);
    const olive = mat(0x65a30d);
    const greenDark = mat(0x15803d);
    const wood = mat(0x7c2d12);
    const thatch = mat(0xb45309);

    for (let i = 0; i < 6; i++) {
      const r = 46 - i * 6.2;
      const tierMat = i % 3 === 0 ? gold1 : (i % 3 === 1 ? gold2 : olive);
      const step = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.93, r, 6.2, 10), tierMat);
      step.position.set(i * 1.2 - 3, -5 + i * 5.6, 0);
      g.add(step);
    }

    const ridge = new THREE.Mesh(new THREE.ConeGeometry(22, 34, 6), greenDark);
    ridge.position.set(-22, 26, -14);
    g.add(ridge);

    addBox(g, 9, 6, 7, 4, 29, 0, wood);
    const hutRoof = new THREE.Mesh(new THREE.ConeGeometry(8.5, 6.5, 4), thatch);
    hutRoof.rotation.y = Math.PI / 4;
    hutRoof.position.set(4, 35, 0);
    g.add(hutRoof);
    return g;
  }

  // 5. TƯỢNG ĐÀI ĐIỆN BIÊN PHỦ — ĐIỆN BIÊN
  function buildDienBienPhu() {
    const g = new THREE.Object3D();
    const hill = mat(0x15803d);
    const stone = mat(0xd6d3d1);
    const stoneDark = mat(0x78716c);
    const bronze = mat(0x92400e);
    const bronzeLight = mat(0xb45309);
    const flagRed = mat(0xdc2626, 0xb91c1c, 0.25);
    const starGold = mat(0xfacc15, 0xeab308, 0.4);

    const hillBase = new THREE.Mesh(new THREE.CylinderGeometry(36, 46, 18, 8), hill);
    hillBase.position.set(0, -5, 0);
    g.add(hillBase);
    addBox(g, 30, 8, 22, 0, 8, 0, stoneDark);
    addBox(g, 20, 12, 14, 0, 17, 0, stone);

    addBox(g, 5.5, 19, 5, -4, 32, 2, bronze);
    addBox(g, 6, 22, 5.5, 1, 34, 0, bronzeLight);
    addBox(g, 5.5, 17, 5, 6, 31, 2, bronze);
    const wreath = new THREE.Mesh(new THREE.OctahedronGeometry(3.2, 0), starGold);
    wreath.position.set(-7, 42, 2);
    g.add(wreath);

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, 26, 6), stone);
    pole.position.set(1, 52, 0);
    g.add(pole);

    const flagGroup = new THREE.Object3D();
    flagGroup.name = 'anim_flag';
    flagGroup.position.set(1.5, 60, 0);
    addBox(flagGroup, 16, 10, 0.8, 8, 0, 0, flagRed);
    const star = new THREE.Mesh(new THREE.OctahedronGeometry(2.6, 0), starGold);
    star.scale.set(1, 1, 0.45);
    star.position.set(8, 0, 0);
    flagGroup.add(star);
    g.add(flagGroup);
    return g;
  }

  // 6. KHU DI TÍCH ĐỀN HÙNG — PHÚ THỌ
  function buildDenHung() {
    const g = new THREE.Object3D();
    const mountain = mat(0x14532d);
    const stone = mat(0xd6d3d1);
    const wallCream = mat(0xfef3c7);
    const redPillar = mat(0x991b1b);
    const tile = mat(0xb45309);
    const gold = mat(0xf59e0b, 0xd97706, 0.25);

    const hill = new THREE.Mesh(new THREE.CylinderGeometry(38, 48, 16, 10), mountain);
    hill.position.set(0, -6, 0);
    g.add(hill);

    addBox(g, 20, 5, 32, 0, 4.5, 8, stone);
    addBox(g, 16, 5, 20, 0, 9.5, 2, stone);
    addBox(g, 48, 4, 24, 0, 14, -4, stone);

    addBox(g, 10, 18, 10, -14, 24, -4, wallCream);
    addBox(g, 10, 18, 10, 14, 24, -4, wallCream);
    addBox(g, 38, 7, 10, 0, 32, -4, redPillar);
    addBox(g, 12, 5, 11, 0, 32, -4, gold);

    const roof1 = new THREE.Mesh(new THREE.ConeGeometry(28, 8, 4), tile);
    roof1.rotation.y = Math.PI / 4;
    roof1.scale.set(1.25, 1, 0.55);
    roof1.position.set(0, 39.5, -4);
    g.add(roof1);

    const roof2 = new THREE.Mesh(new THREE.ConeGeometry(18, 7, 4), tile);
    roof2.rotation.y = Math.PI / 4;
    roof2.scale.set(1.2, 1, 0.55);
    roof2.position.set(0, 46, -4);
    g.add(roof2);

    [-28, 28].forEach(function (tx) {
      const crown = new THREE.Mesh(new THREE.DodecahedronGeometry(9, 0), mat(0x166534));
      crown.position.set(tx, 22, -6);
      g.add(crown);
    });
    return g;
  }

  // 7. CHÙA MỘT CỘT — HÀ NỘI
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

  // 8. THÁP RÙA — HỒ GƯƠM, HÀ NỘI
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

  // 9. VĂN MIẾU - KHUÊ VĂN CÁC — HÀ NỘI
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

  // 10. CẦU LONG BIÊN — HÀ NỘI
  function buildCauLongBien() {
    const g = new THREE.Object3D();
    const redRiver = mat(0xb45309);
    const pier = mat(0x78716c);
    const iron = mat(0x57534e);
    const rustIron = mat(0x7c2d12);
    const deck = mat(0x475569);

    addBox(g, 112, 16, 36, 0, -6, 0, redRiver);
    addBox(g, 108, 3.5, 13, 0, 15, 0, deck);

    [-36, 0, 36].forEach(function (px) {
      addBox(g, 8, 17, 15, px, 7, 0, pier);
      const peakL = new THREE.Mesh(new THREE.BoxGeometry(20, 2.2, 12), rustIron);
      peakL.position.set(px - 8, 24, 0);
      peakL.rotation.z = 0.58;
      g.add(peakL);

      const peakR = new THREE.Mesh(new THREE.BoxGeometry(20, 2.2, 12), rustIron);
      peakR.position.set(px + 8, 24, 0);
      peakR.rotation.z = -0.58;
      g.add(peakR);

      addBox(g, 2.2, 15, 11, px, 23, 0, iron);
    });
    addBox(g, 104, 1.8, 11, 0, 19.5, 0, iron);
    return g;
  }

  // 11. VỊNH HẠ LONG — QUẢNG NINH
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

  // 12. CHÙA ĐỒNG — YÊN TỬ, QUẢNG NINH
  function buildChuaDongYenTu() {
    const g = new THREE.Object3D();
    const rock = mat(0x57534e);
    const pine = mat(0x14532d);
    const bronze = mat(0xb45309, 0x92400e, 0.25);
    const bronzeBright = mat(0xf59e0b, 0xd97706, 0.35);
    const cloud = mat(0xf8fafc);

    const peak = new THREE.Mesh(new THREE.ConeGeometry(42, 46, 7), rock);
    peak.position.set(0, 14, 0);
    g.add(peak);
    const shoulder = new THREE.Mesh(new THREE.ConeGeometry(24, 30, 6), pine);
    shoulder.position.set(-24, 8, -8);
    g.add(shoulder);

    addBox(g, 20, 4, 16, 0, 38, 0, bronze);
    addBox(g, 15, 10, 12, 0, 45, 0, bronzeBright);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(16, 8, 4), bronzeBright);
    roof.rotation.y = Math.PI / 4;
    roof.position.set(0, 54, 0);
    g.add(roof);
    const lotus = new THREE.Mesh(new THREE.OctahedronGeometry(2.3, 0), bronzeBright);
    lotus.position.set(0, 59.5, 0);
    g.add(lotus);

    [[-24, 24], [24, 28]].forEach(function (p) {
      const c = new THREE.Mesh(new THREE.DodecahedronGeometry(6.5, 0), cloud);
      c.scale.set(1.6, 0.6, 0.9);
      c.position.set(p[0], p[1], 10);
      g.add(c);
    });
    return g;
  }

  // 13. DANH THẮNG TRÀNG AN — NINH BÌNH
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

  // 14. BẢO THÁP CHÙA BÁI ĐÍNH — NINH BÌNH
  function buildChuaBaiDinh() {
    const g = new THREE.Object3D();
    const courtyard = mat(0xd6d3d1);
    const terracotta = mat(0xb45309);
    const eaveDark = mat(0x78350f);
    const gold = mat(0xfacc15, 0xd97706, 0.3);

    addBox(g, 72, 16, 38, 0, -6, 0, courtyard);
    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(20, 24, 7, 6), courtyard);
    plinth.position.set(0, 5.5, 0);
    g.add(plinth);

    let y = 9;
    for (let i = 0; i < 8; i++) {
      const r = 13 - i * 1.1;
      const h = 5.6 - i * 0.22;
      const tier = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.94, r, h, 6), terracotta);
      tier.position.set(0, y + h / 2, 0);
      g.add(tier);

      const eave = new THREE.Mesh(new THREE.ConeGeometry(r + 2.8, 2.4, 6), eaveDark);
      eave.position.set(0, y + h + 0.8, 0);
      g.add(eave);
      y += h + 1.2;
    }

    const spire = new THREE.Mesh(new THREE.ConeGeometry(2.4, 10, 6), gold);
    spire.position.set(0, y + 4.5, 0);
    g.add(spire);
    return g;
  }

  // 15. THÀNH NHÀ HỒ — THANH HÓA
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

  // 16. LÀNG SEN QUÊ BÁC — NAM ĐÀN, NGHỆ AN
  function buildLangSenQueBac() {
    const g = new THREE.Object3D();
    const earth = mat(0xd6c7a1);
    const pond = mat(0x0d9488);
    const thatch = mat(0xb45309);
    const wood = mat(0x7c2d12);
    const bamboo = mat(0x15803d);
    const lotus = mat(0xf472b6);

    addBox(g, 84, 16, 42, 0, -6, 0, earth);
    addBox(g, 34, 3, 14, -20, 2.5, 13, pond);
    [[-28, 13], [-18, 15], [-10, 11]].forEach(function (p) {
      const fl = new THREE.Mesh(new THREE.ConeGeometry(1.7, 3, 5), lotus);
      fl.position.set(p[0], 5.2, p[1]);
      g.add(fl);
    });

    addBox(g, 42, 11, 16, 8, 8.5, -2, wood);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(28, 11, 4), thatch);
    roof.rotation.y = Math.PI / 4;
    roof.scale.set(1.3, 1, 0.72);
    roof.position.set(8, 19, -2);
    g.add(roof);

    [[-28, -10, 28], [-22, -13, 24], [32, -8, 26]].forEach(function (b) {
      const stalk = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.4, b[2], 5), bamboo);
      stalk.position.set(b[0], b[2] / 2 + 2, b[1]);
      g.add(stalk);
      const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(7.5, 0), mat(0x16a34a));
      foliage.position.set(b[0], b[2] + 2, b[1]);
      g.add(foliage);
    });
    return g;
  }

  // 17. ĐỘNG PHONG NHA - KẺ BÀNG — QUẢNG BÌNH
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
      const st = new THREE.Mesh(new THREE.ConeGeometry(2.2, 9, 5), sx === -3 || sx === 3 ? amberGlow : stalactite);
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

  // 18. CẦU HIỀN LƯƠNG - SÔNG BẾN HẢI — QUẢNG TRỊ
  function buildCauHienLuong() {
    const g = new THREE.Object3D();
    const river = mat(0x0369a1);
    const blueHalf = mat(0x2563eb);
    const yellowHalf = mat(0xeab308);
    const pier = mat(0x94a3b8);
    const tower = mat(0xe2e8f0);
    const flagRed = mat(0xdc2626, 0xb91c1c, 0.25);
    const starGold = mat(0xfacc15, 0xeab308, 0.5);

    addBox(g, 104, 16, 36, 0, -6, 0, river);
    [-30, 0, 30].forEach(function (px) { addBox(g, 5, 14, 12, px, 6, 0, pier); });

    addBox(g, 46, 3.5, 12, -23, 14, 0, blueHalf);
    addBox(g, 46, 3.5, 12, 23, 14, 0, yellowHalf);
    addBox(g, 44, 6, 1.4, -22, 18, 5.5, blueHalf);
    addBox(g, 44, 6, 1.4, 22, 18, 5.5, yellowHalf);

    addBox(g, 12, 16, 12, -38, 12, -10, tower);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.1, 34, 6), tower);
    pole.position.set(-38, 36, -10);
    g.add(pole);

    const flagGroup = new THREE.Object3D();
    flagGroup.name = 'anim_flag';
    flagGroup.position.set(-37.5, 48, -10);
    addBox(flagGroup, 16, 10.5, 0.8, 8, 0, 0, flagRed);
    const star = new THREE.Mesh(new THREE.OctahedronGeometry(2.6, 0), starGold);
    star.scale.set(1, 1, 0.45);
    star.position.set(8, 0, 0);
    flagGroup.add(star);
    g.add(flagGroup);
    return g;
  }

  // 19. KINH THÀNH HUẾ — NGỌ MÔN
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

  // 20. CHÙA THIÊN MỤ — HUẾ
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

  // 21. CẦU RỒNG — ĐÀ NẴNG
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

  // 22. CẦU VÀNG — BÀ NÀ HILLS, ĐÀ NẴNG
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

  // 23. PHỐ CỔ HỘI AN — QUẢNG NAM
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

  // 24. THÁNH ĐỊA MỸ SƠN — QUẢNG NAM
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

  // 25. CỔNG TÒ VÒ — ĐẢO LÝ SƠN, QUẢNG NGÃI
  function buildDaoLySon() {
    const g = new THREE.Object3D();
    const ocean = mat(0x0284c7);
    const basalt = mat(0x334155);
    const basaltDark = mat(0x1e293b);
    const sand = mat(0xfde68a);
    const white = mat(0xf8fafc);
    const lightRed = mat(0xdc2626);
    const beacon = mat(0xfef08a, 0xfacc15, 0.9);

    const sea = new THREE.Mesh(new THREE.CylinderGeometry(48, 54, 15, 12), ocean);
    sea.position.set(0, -6.5, 0);
    g.add(sea);
    addBox(g, 62, 5, 28, 0, 3, 0, sand);

    addBox(g, 12, 22, 12, -20, 14, 2, basalt);
    addBox(g, 12, 20, 12, 18, 13, 2, basalt);
    addBox(g, 44, 7, 11, -1, 25, 2, basaltDark);
    const archCrest = new THREE.Mesh(new THREE.DodecahedronGeometry(9, 0), basalt);
    archCrest.scale.set(2.2, 0.6, 0.9);
    archCrest.position.set(-1, 29, 2);
    g.add(archCrest);

    const lh = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 4.5, 26, 8), white);
    lh.position.set(28, 18, -8);
    g.add(lh);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 4.0, 6, 8), lightRed);
    band.position.set(28, 22, -8);
    g.add(band);
    const lamp = new THREE.Mesh(new THREE.OctahedronGeometry(3.2, 0), beacon);
    lamp.position.set(28, 33, -8);
    g.add(lamp);
    return g;
  }

  // 26. GÀNH ĐÁ ĐĨA — PHÚ YÊN
  function buildGanhDaDia() {
    const g = new THREE.Object3D();
    const ocean = mat(0x0284c7);
    const mats = [mat(0x334155), mat(0x1e293b), mat(0x475569)];
    const grass = mat(0x15803d);

    const sea = new THREE.Mesh(new THREE.CylinderGeometry(48, 54, 15, 12), ocean);
    sea.position.set(0, -6.5, 0);
    g.add(sea);

    [
      [-28, -4, 30, 0], [-18, -6, 36, 1], [-8, -5, 34, 2], [2, -6, 28, 0], [12, -4, 24, 1],
      [-24, 6, 20, 2], [-14, 7, 25, 0], [-4, 8, 22, 1], [6, 7, 17, 2], [16, 6, 14, 0],
      [-18, 16, 12, 1], [-8, 17, 14, 2], [2, 16, 10, 0], [14, 15, 8, 1], [24, 2, 16, 2],
    ].forEach(function (c) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 5.4, c[2], 6), mats[c[3]]);
      col.position.set(c[0], c[2] / 2, c[1]);
      g.add(col);
    });

    const bluff = new THREE.Mesh(new THREE.DodecahedronGeometry(12, 0), grass);
    bluff.scale.set(1.8, 0.7, 1);
    bluff.position.set(-16, 37, -10);
    g.add(bluff);
    return g;
  }

  // 27. THÁP CHĂM PO NAGAR — NHA TRANG, KHÁNH HÒA
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

  // 28. NHÀ RÔNG KON TUM — TÂY NGUYÊN
  function buildNhaRongKonTum() {
    const g = new THREE.Object3D();
    const redSoil = mat(0x9a3412);
    const grass = mat(0x15803d);
    const wood = mat(0x59332e);
    const thatch = mat(0xb45309);
    const thatchLight = mat(0xd97706);
    const bamboo = mat(0xfde68a);
    const redRibbon = mat(0xdc2626);

    addBox(g, 82, 16, 40, 0, -6, 0, redSoil);
    addBox(g, 76, 3, 34, 0, 3, 0, grass);

    [-14, 0, 14].forEach(function (sx) {
      [-7, 7].forEach(function (sz) {
        addBox(g, 2.5, 14, 2.5, sx, 10, sz, wood);
      });
    });
    addBox(g, 34, 3, 18, 0, 17, 0, wood);
    addBox(g, 28, 9, 14, 0, 22, 0, wood);

    const roofMain = new THREE.Mesh(new THREE.ConeGeometry(24, 42, 4), thatch);
    roofMain.rotation.y = Math.PI / 4;
    roofMain.scale.set(1.2, 1, 0.52);
    roofMain.position.set(0, 45, 0);
    g.add(roofMain);

    addBox(g, 20, 3, 2, 0, 65, 0, thatchLight);

    const neuPole = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.9, 36, 5), bamboo);
    neuPole.position.set(28, 21, 8);
    g.add(neuPole);
    addBox(g, 8, 2.2, 2.2, 28, 35, 8, redRibbon);
    return g;
  }

  // 29. BIỂN HỒ T'NƯNG — PLEIKU, GIA LAI
  function buildBienHoTNung() {
    const g = new THREE.Object3D();
    const emerald = mat(0x0d9488);
    const pineDark = mat(0x14532d);
    const pine = mat(0x166534);
    const stone = mat(0xd6d3d1);
    const roofTile = mat(0x991b1b);

    const lake = new THREE.Mesh(new THREE.CylinderGeometry(48, 54, 15, 12), emerald);
    lake.position.set(0, -6.5, 0);
    g.add(lake);

    [[-32, -16, 22, 34], [0, -22, 26, 40], [32, -16, 22, 32]].forEach(function (h) {
      const hill = new THREE.Mesh(new THREE.ConeGeometry(h[2], h[3], 7), pineDark);
      hill.position.set(h[0], h[3] / 2 - 4, h[1]);
      g.add(hill);
    });
    [[-24, 4], [24, 2], [30, 8]].forEach(function (p) {
      const tree = new THREE.Mesh(new THREE.ConeGeometry(5.5, 18, 6), pine);
      tree.position.set(p[0], 12, p[1]);
      g.add(tree);
    });

    addBox(g, 10, 4, 24, 0, 4, 12, stone);
    addBox(g, 14, 10, 14, 0, 11, 20, stone);
    const gazeboRoof = new THREE.Mesh(new THREE.ConeGeometry(13, 8, 6), roofTile);
    gazeboRoof.position.set(0, 20, 20);
    g.add(gazeboRoof);
    return g;
  }

  // 30. BẢO TÀNG THẾ GIỚI CÀ PHÊ — BUÔN MA THUỘT, ĐẮK LẮK
  function buildBaoTangCaPhe() {
    const g = new THREE.Object3D();
    const lawn = mat(0x15803d);
    const basaltWall = mat(0x475569);
    const roofSlate = mat(0x334155);
    const coffeeBean = mat(0x7c2d12);
    const warmWindow = mat(0xfbbf24, 0xd97706, 0.35);

    addBox(g, 92, 16, 40, 0, -6, 0, lawn);

    [[-28, 22, 18, 0.14], [-10, 28, 26, -0.06], [10, 26, 24, 0.08], [28, 20, 17, -0.14]].forEach(function (h) {
      const hx = h[0], w = h[1], hh = h[2], tilt = h[3];
      addBox(g, w * 0.72, hh * 0.55, 16, hx, hh * 0.28 + 2, 0, basaltWall);
      addBox(g, w * 0.35, hh * 0.35, 16.5, hx, hh * 0.25 + 2, 0, warmWindow);
      const roof = new THREE.Mesh(new THREE.ConeGeometry(w * 0.65, hh * 0.9, 4), roofSlate);
      roof.rotation.y = Math.PI / 4;
      roof.rotation.z = tilt;
      roof.scale.set(1.1, 1, 0.75);
      roof.position.set(hx, hh * 0.78 + 3, 0);
      g.add(roof);
    });

    const bean = new THREE.Mesh(new THREE.DodecahedronGeometry(6.5, 0), coffeeBean);
    bean.scale.set(1.3, 0.9, 0.8);
    bean.position.set(0, 7, 15);
    g.add(bean);
    return g;
  }

  // 31. QUẢNG TRƯỜNG LÂM VIÊN — ĐÀ LẠT
  function buildQuangTruongLamVien() {
    const g = new THREE.Object3D();
    const lake = mat(0x0284c7);
    const plaza = mat(0xe2e8f0);
    const artichokeGreen = mat(0x16a34a, 0x15803d, 0.25);
    const artichokeLeaf = mat(0x22c55e, 0x16a34a, 0.2);
    const sunflowerGold = mat(0xfacc15, 0xeab308, 0.35);
    const sunflowerCore = mat(0x92400e);
    const pine = mat(0x14532d);

    addBox(g, 92, 16, 42, 0, -6, 0, lake);
    addBox(g, 82, 5, 30, 0, 3.5, -2, plaza);

    const bud = new THREE.Mesh(new THREE.ConeGeometry(14, 32, 8), artichokeGreen);
    bud.position.set(-18, 22, 0);
    g.add(bud);
    const budCrown = new THREE.Mesh(new THREE.DodecahedronGeometry(10, 0), artichokeLeaf);
    budCrown.scale.set(1, 1.35, 1);
    budCrown.position.set(-18, 20, 0);
    g.add(budCrown);

    const petal = new THREE.Mesh(new THREE.CylinderGeometry(16, 13, 9, 10), sunflowerGold);
    petal.rotation.z = -0.35;
    petal.rotation.x = 0.25;
    petal.position.set(18, 18, 0);
    g.add(petal);
    const core = new THREE.Mesh(new THREE.CylinderGeometry(7.5, 7.5, 10, 8), sunflowerCore);
    core.rotation.z = -0.35;
    core.rotation.x = 0.25;
    core.position.set(18, 18.5, 1);
    g.add(core);

    [-36, 36].forEach(function (px) {
      const tree = new THREE.Mesh(new THREE.ConeGeometry(5, 18, 6), pine);
      tree.position.set(px, 14, -10);
      g.add(tree);
    });
    return g;
  }

  // 32. ĐỒI CÁT BAY MŨI NÉ — BÌNH THUẬN
  function buildDoiCatMuiNe() {
    const g = new THREE.Object3D();
    const sea = mat(0x0284c7);
    const sandGold = mat(0xf59e0b);
    const sandRed = mat(0xea580c);
    const sandLight = mat(0xfbbf24);
    const trunkMat = mat(0x78350f);
    const palmLeaf = mat(0x16a34a);

    const base = new THREE.Mesh(new THREE.CylinderGeometry(48, 54, 15, 12), sea);
    base.position.set(0, -6.5, 0);
    g.add(base);

    const dune1 = new THREE.Mesh(new THREE.ConeGeometry(34, 34, 7), sandRed);
    dune1.scale.set(1.3, 1, 0.75);
    dune1.position.set(-14, 14, -4);
    g.add(dune1);

    const dune2 = new THREE.Mesh(new THREE.ConeGeometry(30, 26, 7), sandGold);
    dune2.scale.set(1.35, 1, 0.8);
    dune2.position.set(16, 11, 2);
    g.add(dune2);

    const dune3 = new THREE.Mesh(new THREE.ConeGeometry(24, 16, 6), sandLight);
    dune3.position.set(-4, 7, 10);
    g.add(dune3);

    [[28, 12, 0.2], [35, 8, -0.15]].forEach(function (p) {
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.4, 16, 5), trunkMat);
      trunk.position.set(p[0], 10, p[1]);
      trunk.rotation.z = p[2];
      g.add(trunk);
      const crown = new THREE.Mesh(new THREE.DodecahedronGeometry(5.5, 0), palmLeaf);
      crown.scale.set(1.4, 0.65, 1.4);
      crown.position.set(p[0] - p[2] * 8, 18, p[1]);
      g.add(crown);
    });
    return g;
  }

  // 33. TƯỢNG CHÚA KITÔ VUA — VŨNG TÀU
  function buildTuongChuaVungTau() {
    const g = new THREE.Object3D();
    const sea = mat(0x0284c7);
    const hill = mat(0x15803d);
    const white = mat(0xf8fafc);
    const pedestal = mat(0xe2e8f0);

    const bay = new THREE.Mesh(new THREE.CylinderGeometry(46, 52, 15, 12), sea);
    bay.position.set(0, -6.5, 0);
    g.add(bay);

    const mountain = new THREE.Mesh(new THREE.ConeGeometry(38, 34, 8), hill);
    mountain.position.set(0, 10, 0);
    g.add(mountain);

    addBox(g, 14, 10, 12, 0, 29, 0, pedestal);
    const robe = new THREE.Mesh(new THREE.CylinderGeometry(3.8, 5.8, 28, 8), white);
    robe.position.set(0, 48, 0);
    g.add(robe);
    addBox(g, 34, 3.6, 3.6, 0, 56, 0, white);
    const head = new THREE.Mesh(new THREE.DodecahedronGeometry(3.5, 0), white);
    head.position.set(0, 64.5, 0);
    g.add(head);
    return g;
  }

  // 34. NHÀ THỜ ĐỨC BÀ — TP. HỒ CHÍ MINH
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

  // 35. CHỢ BẾN THÀNH — TP. HỒ CHÍ MINH
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

  // 36. DINH ĐỘC LẬP — TP. HỒ CHÍ MINH
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

  // 37. TÒA THÁP LANDMARK 81 — TP. HỒ CHÍ MINH
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
      [-12, 0, 26, false], [12, 0, 28, false], [-8, 6, 36, true], [8, 6, 38, true],
      [-8, -6, 34, false], [8, -6, 32, false], [-4, 0, 52, true], [4, 0, 56, false],
      [0, 4, 62, true], [0, -4, 58, false], [0, 0, 72, true],
    ].forEach(function (t) {
      addBox(g, 5.5, t[2], 5.5, t[0], t[2] / 2 + 4, t[1], t[3] ? glassLight : glassBlue);
      addBox(g, 5.7, 1.2, 5.7, t[0], t[2] + 4.2, t[1], steel);
    });

    const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 1.3, 18, 6), spireGlow);
    spire.position.set(0, 84, 0);
    g.add(spire);
    return g;
  }

  // 38. CẦU MỸ THUẬN — TIỀN GIANG - VĨNH LONG
  function buildCauMyThuan() {
    const g = new THREE.Object3D();
    const river = mat(0x0e7490);
    const concrete = mat(0xf1f5f9);
    const road = mat(0x475569);
    const cable = mat(0x38bdf8, 0x0ea5e9, 0.2);

    addBox(g, 114, 16, 36, 0, -6, 0, river);
    addBox(g, 110, 3.8, 14, 0, 16, 0, road);

    [-26, 26].forEach(function (px) {
      addBox(g, 4, 56, 3.5, px, 29, 7, concrete);
      addBox(g, 4, 56, 3.5, px, 29, -7, concrete);
      addBox(g, 4.5, 3, 15, px, 48, 0, concrete);
      addBox(g, 4.5, 3, 15, px, 28, 0, concrete);

      [-1, 1].forEach(function (side) {
        for (let k = 1; k <= 3; k++) {
          const stay = new THREE.Mesh(new THREE.BoxGeometry(16 + k * 7, 0.7, 0.7), cable);
          stay.position.set(px + side * (k * 6.5), 34 - k * 3.5, 6);
          stay.rotation.z = -side * (0.95 - k * 0.14);
          g.add(stay);
        }
      });
    });
    return g;
  }

  // 39. CHỢ NỔI CÁI RĂNG — CẦN THƠ
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

  // 40. CÁNH ĐỒNG ĐIỆN GIÓ BẠC LIÊU
  function buildDienGioBacLieu() {
    const g = new THREE.Object3D();
    const ocean = mat(0x0284c7);
    const bridge = mat(0xd6d3d1);
    const white = mat(0xf8fafc);
    const accent = mat(0x0ea5e9);

    const sea = new THREE.Mesh(new THREE.CylinderGeometry(48, 54, 15, 12), ocean);
    sea.position.set(0, -6.5, 0);
    g.add(sea);

    addBox(g, 84, 3, 7, 0, 5, 0, bridge);

    [[-28, -4, 40], [0, -2, 48], [28, -4, 42]].forEach(function (p) {
      const tx = p[0], tz = p[1], h = p[2];
      const tower = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 2.6, h, 7), white);
      tower.position.set(tx, h / 2 + 4, tz);
      g.add(tower);

      const hub = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 4, 6), accent);
      hub.rotation.x = Math.PI / 2;
      hub.position.set(tx, h + 4, tz + 1);
      g.add(hub);

      const rotor = new THREE.Object3D();
      rotor.name = 'anim_windmill';
      rotor.position.set(tx, h + 4, tz + 3.2);
      for (let b = 0; b < 3; b++) {
        const arm = new THREE.Object3D();
        arm.rotation.z = (b * Math.PI * 2) / 3;
        addBox(arm, 2, 17, 0.7, 0, 8.5, 0, white);
        rotor.add(arm);
      }
      g.add(rotor);
    });
    return g;
  }

  // 41. ĐẢO NGỌC PHÚ QUỐC — KIÊN GIANG
  function buildDaoPhuQuoc() {
    const g = new THREE.Object3D();
    const turquoise = mat(0x06b6d4);
    const sand = mat(0xfde68a);
    const hill = mat(0x16a34a);
    const trunk = mat(0x78350f);
    const tower = mat(0xe2e8f0);
    const cableDark = mat(0x334155);
    const cabinGold = mat(0xf59e0b);

    const sea = new THREE.Mesh(new THREE.CylinderGeometry(50, 56, 15, 12), turquoise);
    sea.position.set(0, -6.5, 0);
    g.add(sea);

    const beach = new THREE.Mesh(new THREE.CylinderGeometry(30, 36, 6, 10), sand);
    beach.position.set(-10, 2, 0);
    g.add(beach);

    const islandPeak = new THREE.Mesh(new THREE.ConeGeometry(24, 30, 7), hill);
    islandPeak.position.set(-16, 17, -6);
    g.add(islandPeak);

    addBox(g, 6, 48, 6, 24, 24, 0, tower);
    addBox(g, 14, 3, 6, 24, 46, 0, tower);

    const wire = new THREE.Mesh(new THREE.BoxGeometry(50, 0.7, 0.7), cableDark);
    wire.position.set(0, 38, 4);
    wire.rotation.z = 0.25;
    g.add(wire);

    const cabin = new THREE.Object3D();
    cabin.name = 'anim_cablecar';
    cabin.position.set(0, 35, 4);
    cabin.userData.baseX = 0;
    cabin.userData.baseY = 35;
    addBox(cabin, 0.8, 4, 0.8, 0, 2, 0, cableDark);
    addBox(cabin, 7.5, 5, 4.8, 0, -1.5, 0, cabinGold);
    g.add(cabin);

    [[-26, 10], [-14, 14]].forEach(function (p) {
      const st = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.2, 13, 5), trunk);
      st.position.set(p[0], 10, p[1]);
      g.add(st);
      const leaf = new THREE.Mesh(new THREE.DodecahedronGeometry(4.8, 0), mat(0x15803d));
      leaf.scale.set(1.4, 0.6, 1.4);
      leaf.position.set(p[0], 17, p[1]);
      g.add(leaf);
    });
    return g;
  }

  // 42. MŨI CÀ MAU — CÀ MAU
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

    [[-24, -6], [-28, 5], [-18, -9]].forEach(function (p) {
      const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(6.5, 0), mangrove);
      foliage.position.set(p[0], 10, p[1]);
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
    buildCotCoLungCu,
    buildThacBanGioc,
    buildFansipan,
    buildMuCangChai,
    buildDienBienPhu,
    buildDenHung,
    buildChuaMotCot,
    buildHoGuom,
    buildKhueVanCac,
    buildCauLongBien,
    buildVinhHaLong,
    buildChuaDongYenTu,
    buildTrangAn,
    buildChuaBaiDinh,
    buildThanhNhaHo,
    buildLangSenQueBac,
    buildPhongNha,
    buildCauHienLuong,
    buildKinhThanhHue,
    buildChuaThienMu,
    buildCauRong,
    buildCauVang,
    buildPhoCoHoiAn,
    buildThanhDiaMySon,
    buildDaoLySon,
    buildGanhDaDia,
    buildThapCham,
    buildNhaRongKonTum,
    buildBienHoTNung,
    buildBaoTangCaPhe,
    buildQuangTruongLamVien,
    buildDoiCatMuiNe,
    buildTuongChuaVungTau,
    buildNhaThoDucBa,
    buildChoBenThanh,
    buildDinhDocLap,
    buildLandmark81,
    buildCauMyThuan,
    buildChoNoiCaiRang,
    buildDienGioBacLieu,
    buildDaoPhuQuoc,
    buildMuiCaMau,
  ];

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
