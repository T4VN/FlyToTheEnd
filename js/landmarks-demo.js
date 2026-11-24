/**
 * FLY TO THE END - 63 Vietnamese Cultural Heritage & Architectural Wonders (3D Low-Poly)
 * Compatible with Three.js r90 (Web Demo & 360° Interactive Showcase)
 * Synced directly with FlyToTheEnd-Modern v3.0.0 (src/landmarks.ts)
 */
(function () {
  'use strict';

  if (typeof THREE === 'undefined') return;

  const VIETNAM_LANDMARKS = [
    { id: 'cot_co_lung_cu', nameVi: 'Cột Cờ Lũng Cú', locationVi: 'Hà Giang' },
    { id: 'hang_pac_bo', nameVi: 'Khu Di Tích Pác Bó', locationVi: 'Cao Bằng' },
    { id: 'thac_ban_gioc', nameVi: 'Thác Bản Giốc', locationVi: 'Cao Bằng' },
    { id: 'tan_trao', nameVi: 'Khu Di Tích Tân Trào', locationVi: 'Tuyên Quang' },
    { id: 'ai_chi_lang', nameVi: 'Ải Chi Lăng', locationVi: 'Lạng Sơn' },
    { id: 'atk_dinh_hoa', nameVi: 'ATK Định Hóa', locationVi: 'Thái Nguyên' },
    { id: 'dinh_fansipan', nameVi: 'Đỉnh Fansipan', locationVi: 'Sa Pa, Lào Cai' },
    { id: 'mu_cang_chai', nameVi: 'Ruộng Bậc Thang Mù Cang Chải', locationVi: 'Yên Bái' },
    { id: 'dien_bien_phu', nameVi: 'Tượng Đài Điện Biên Phủ', locationVi: 'Điện Biên' },
    { id: 'den_hung', nameVi: 'Khu Di Tích Đền Hùng', locationVi: 'Phú Thọ' },
    { id: 'den_do_bac_ninh', nameVi: 'Đền Đô (Lý Bát Đế)', locationVi: 'Bắc Ninh' },
    { id: 'chua_mot_cot', nameVi: 'Chùa Một Cột', locationVi: 'Hà Nội' },
    { id: 'ho_guom', nameVi: 'Tháp Rùa - Hồ Gươm', locationVi: 'Hà Nội' },
    { id: 'khue_van_cac', nameVi: 'Văn Miếu - Khuê Văn Các', locationVi: 'Hà Nội' },
    { id: 'cau_long_bien', nameVi: 'Cầu Long Biên', locationVi: 'Hà Nội' },
    { id: 'con_son_kiep_bac', nameVi: 'Côn Sơn - Kiếp Bạc', locationVi: 'Hải Dương' },
    { id: 'bai_coc_bach_dang', nameVi: 'Bãi Cọc Bạch Đằng', locationVi: 'Hải Phòng' },
    { id: 'vinh_ha_long', nameVi: 'Vịnh Hạ Long', locationVi: 'Quảng Ninh' },
    { id: 'chua_dong_yen_tu', nameVi: 'Chùa Đồng - Yên Tử', locationVi: 'Quảng Ninh' },
    { id: 'den_tran_nam_dinh', nameVi: 'Khu Di Tích Đền Trần', locationVi: 'Nam Định' },
    { id: 'trang_an', nameVi: 'Danh Thắng Tràng An', locationVi: 'Ninh Bình' },
    { id: 'chua_bai_dinh', nameVi: 'Bảo Tháp Chùa Bái Đính', locationVi: 'Ninh Bình' },
    { id: 'thanh_nha_ho', nameVi: 'Thành Nhà Hồ', locationVi: 'Thanh Hóa' },
    { id: 'lang_sen_que_bac', nameVi: 'Làng Sen Quê Bác', locationVi: 'Nam Đàn, Nghệ An' },
    { id: 'nga_ba_dong_loc', nameVi: 'Ngã Ba Đồng Lộc', locationVi: 'Hà Tĩnh' },
    { id: 'phong_nha', nameVi: 'Động Phong Nha - Kẻ Bàng', locationVi: 'Quảng Bình' },
    { id: 'dia_dao_vinh_moc', nameVi: 'Địa Đạo Vịnh Mốc', locationVi: 'Quảng Trị' },
    { id: 'cau_hien_luong', nameVi: 'Cầu Hiền Lương - Bến Hải', locationVi: 'Quảng Trị' },
    { id: 'thanh_co_quang_tri', nameVi: 'Thành Cổ Quảng Trị', locationVi: 'Quảng Trị' },
    { id: 'kinh_thanh_hue', nameVi: 'Kinh Thành Huế (Ngọ Môn)', locationVi: 'Thừa Thiên Huế' },
    { id: 'chua_thien_mu', nameVi: 'Chùa Thiên Mụ', locationVi: 'Huế' },
    { id: 'cau_rong', nameVi: 'Cầu Rồng', locationVi: 'Đà Nẵng' },
    { id: 'cau_vang', nameVi: 'Cầu Vàng - Bà Nà Hills', locationVi: 'Đà Nẵng' },
    { id: 'pho_co_hoi_an', nameVi: 'Phố Cổ Hội An', locationVi: 'Quảng Nam' },
    { id: 'thanh_dia_my_son', nameVi: 'Thánh Địa Mỹ Sơn', locationVi: 'Quảng Nam' },
    { id: 'dao_ly_son', nameVi: 'Cổng Tò Vò - Đảo Lý Sơn', locationVi: 'Quảng Ngãi' },
    { id: 'bao_tang_quang_trung', nameVi: 'Bảo Tàng Quang Trung', locationVi: 'Tây Sơn, Bình Định' },
    { id: 'ganh_da_dia', nameVi: 'Gành Đá Đĩa', locationVi: 'Phú Yên' },
    { id: 'vung_ro_tau_khong_so', nameVi: 'Di Tích Tàu Không Số Vũng Rô', locationVi: 'Phú Yên' },
    { id: 'thap_cham', nameVi: 'Tháp Chăm Po Nagar', locationVi: 'Nha Trang, Khánh Hòa' },
    { id: 'thap_po_klong_garai', nameVi: 'Tháp Chăm Pô Klong Garai', locationVi: 'Ninh Thuận' },
    { id: 'nha_rong_kon_tum', nameVi: 'Nhà Rông Kon Tum', locationVi: 'Kon Tum' },
    { id: 'dak_to_tan_canh', nameVi: 'Chiến Thắng Đắk Tô - Tân Cảnh', locationVi: 'Kon Tum' },
    { id: 'bien_ho_tnung', nameVi: "Biển Hồ T'Nưng", locationVi: 'Pleiku, Gia Lai' },
    { id: 'bao_tang_ca_phe', nameVi: 'Bảo Tàng Thế Giới Cà Phê', locationVi: 'Buôn Ma Thuột, Đắk Lắk' },
    { id: 'quang_truong_lam_vien', nameVi: 'Quảng Trường Lâm Viên', locationVi: 'Đà Lạt, Lâm Đồng' },
    { id: 'doi_cat_mui_ne', nameVi: 'Đồi Cát Bay Mũi Né', locationVi: 'Bình Thuận' },
    { id: 'nui_ba_den_tay_ninh', nameVi: 'Núi Bà Đen - Căn Cứ TW Cục', locationVi: 'Tây Ninh' },
    { id: 'chien_khu_d', nameVi: 'Chiến Khu Đ', locationVi: 'Đồng Nai' },
    { id: 'dia_dao_cu_chi', nameVi: 'Địa Đạo Củ Chi', locationVi: 'TP. Hồ Chí Minh' },
    { id: 'tuong_chua_vung_tau', nameVi: 'Tượng Chúa Kitô Vua', locationVi: 'Vũng Tàu' },
    { id: 'nha_tu_con_dao', nameVi: 'Di Tích Nhà Tù Côn Đảo', locationVi: 'Bà Rịa - Vũng Tàu' },
    { id: 'nha_tho_duc_ba', nameVi: 'Nhà Thờ Đức Bà', locationVi: 'TP. Hồ Chí Minh' },
    { id: 'cho_ben_thanh', nameVi: 'Chợ Bến Thành', locationVi: 'TP. Hồ Chí Minh' },
    { id: 'dinh_doc_lap', nameVi: 'Dinh Độc Lập', locationVi: 'TP. Hồ Chí Minh' },
    { id: 'landmark_81', nameVi: 'Tòa Tháp Landmark 81', locationVi: 'TP. Hồ Chí Minh' },
    { id: 'cau_my_thuan', nameVi: 'Cầu Mỹ Thuận', locationVi: 'Tiền Giang - Vĩnh Long' },
    { id: 'dong_khoi_ben_tre', nameVi: 'Di Tích Đồng Khởi', locationVi: 'Bến Tre' },
    { id: 'cho_noi_cai_rang', nameVi: 'Chợ Nổi Cái Răng', locationVi: 'Cần Thơ' },
    { id: 'dien_gio_bac_lieu', nameVi: 'Cánh Đồng Điện Gió', locationVi: 'Bạc Liêu' },
    { id: 'dao_phu_quoc', nameVi: 'Đảo Ngọc Phú Quốc', locationVi: 'Kiên Giang' },
    { id: 'cot_moc_truong_sa', nameVi: 'Cột Mốc Chủ Quyền Trường Sa', locationVi: 'Khánh Hòa' },
    { id: 'mui_ca_mau', nameVi: 'Mũi Cà Mau', locationVi: 'Cà Mau' },
  ];

  // Shared material cache for lightweight WebGL rendering across all 63 landmarks
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

  // ============================================================
  // 43. KHU DI TÍCH PÁC BÓ — CAO BẰNG (Hang Cốc Bó & Suối Lê-nin)
  // ============================================================
  function buildHangPacBo() {
      const g = new THREE.Object3D();
      const stream = mat(0x06b6d4, 0x0891b2, 0.15);
      const bank = mat(0x15803d);
      const rock = mat(0x57534e);
      const caveDark = mat(0x1c1917);
      const foliage = mat(0x166534);
      const stoneTable = mat(0xd6d3d1);
      const flagRed = mat(0xdc2626, 0xb91c1c, 0.25);

      // Emerald Lenin Stream base
      addBox(g, 92, 14, 48, 0, -6, 0, stream);
      // Rocky green mountain bank
      addBox(g, 82, 10, 28, 0, 2, -10, bank);

      // Karl Marx Limestone Mountain backdrop
      const peakMain = new THREE.Mesh(new THREE.ConeGeometry(34, 52, 7), rock);
      peakMain.position.set(-10, 28, -14);
      g.add(peakMain);
      const peakSide = new THREE.Mesh(new THREE.ConeGeometry(24, 38, 6), foliage);
      peakSide.position.set(22, 22, -16);
      g.add(peakSide);

      // Coc Bo Cave dark arched opening
      const caveArch = new THREE.Mesh(new THREE.CylinderGeometry(11, 13, 14, 8), caveDark);
      caveArch.rotation.x = Math.PI / 2;
      caveArch.position.set(-10, 12, -2);
      g.add(caveArch);

      // Uncle Ho's stone working table by the stream
      const tablePed = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 3.2, 4, 6), stoneTable);
      tablePed.position.set(16, 8, 8);
      g.add(tablePed);
      const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(6, 5.5, 1.8, 8), stoneTable);
      tableTop.position.set(16, 10.5, 8);
      g.add(tableTop);

      // Bamboo & forest trees
      for (const [tx, tz, h] of [[-32, 4, 16], [28, 4, 18], [4, 2, 14], [34, -6, 15]]) {
          const trunk = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.4, h * 0.5, 5), mat(0x78350f));
          trunk.position.set(tx, 7 + h * 0.2, tz);
          g.add(trunk);
          const crown = new THREE.Mesh(new THREE.DodecahedronGeometry(6, 0), foliage);
          crown.position.set(tx, 10 + h * 0.45, tz);
          g.add(crown);
      }

      // Waving red flag at historical site
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.7, 22, 6), mat(0xe2e8f0));
      pole.position.set(-28, 18, 10);
      g.add(pole);
      const flagGroup = new THREE.Object3D();
      flagGroup.name = 'anim_flag';
      flagGroup.position.set(-27.6, 25, 10);
      addBox(flagGroup, 12, 8, 0.7, 6, 0, 0, flagRed);
      g.add(flagGroup);

      return g;
  }

  // ============================================================
  // 44. KHU DI TÍCH TÂN TRÀO — TUYÊN QUANG (Cây Đa & Lán Nà Nưa)
  // ============================================================
  function buildTanTrao() {
      const g = new THREE.Object3D();
      const grass = mat(0x15803d);
      const trunkMat = mat(0x78350f);
      const canopy1 = mat(0x166534);
      const canopy2 = mat(0x22c55e);
      const wood = mat(0x92400e);
      const thatch = mat(0xd97706);
      const tileRed = mat(0xb91c1c);
      const flagRed = mat(0xdc2626, 0xb91c1c, 0.25);

      addBox(g, 92, 16, 48, 0, -6, 0, grass);

      // Giant Iconic Tan Trao Banyan Tree (Cây đa Tân Trào)
      const mainTrunk = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 7, 22, 7), trunkMat);
      mainTrunk.position.set(-16, 13, 0);
      g.add(mainTrunk);
      // Hanging aerial roots
      for (const [rx, rz] of [[-24, 5], [-8, 6], [-22, -6], [-10, -5]]) {
          const root = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.3, 18, 5), trunkMat);
          root.position.set(rx, 11, rz);
          g.add(root);
      }
      for (const [cx, cy, cz, r, m] of [
          [-16, 28, 0, 14, canopy1],
          [-27, 24, 4, 10, canopy2],
          [-5, 25, 3, 10.5, canopy2],
          [-16, 24, -8, 10, canopy1],
      ]) {
          const puff = new THREE.Mesh(new THREE.DodecahedronGeometry(r, 0), m);
          puff.scale.set(1.2, 0.72, 1.05);
          puff.position.set(cx, cy, cz);
          g.add(puff);
      }

      // Dinh Tan Trao communal pavilion (right side)
      for (const [px, pz] of [[12, -5], [28, -5], [12, 7], [28, 7]]) {
          const col = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.2, 10, 6), wood);
          col.position.set(px, 7, pz);
          g.add(col);
      }
      addBox(g, 20, 2, 15, 20, 4, 1, wood);
      const dinhRoof = new THREE.Mesh(new THREE.ConeGeometry(16, 10, 4), tileRed);
      dinhRoof.rotation.y = Math.PI / 4;
      dinhRoof.scale.set(1.25, 1, 0.85);
      dinhRoof.position.set(20, 16, 1);
      g.add(dinhRoof);

      // Lan Na Nua small thatched stilt hut (front-right)
      addBox(g, 11, 5, 8, 22, 6, 14, thatch);
      const hutRoof = new THREE.Mesh(new THREE.ConeGeometry(9.5, 5.5, 4), thatch);
      hutRoof.rotation.y = Math.PI / 4;
      hutRoof.position.set(22, 11, 14);
      g.add(hutRoof);

      // Revolutionary red flag
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.7, 26, 6), mat(0xe2e8f0));
      pole.position.set(2, 15, 10);
      g.add(pole);
      const flagGroup = new THREE.Object3D();
      flagGroup.name = 'anim_flag';
      flagGroup.position.set(2.4, 24, 10);
      addBox(flagGroup, 13, 8.5, 0.7, 6.5, 0, 0, flagRed);
      g.add(flagGroup);

      return g;
  }

  // ============================================================
  // 45. ẢI CHI LĂNG — LẠNG SƠN (Núi Mặt Quỷ & Cửa Ải Đá)
  // ============================================================
  function buildAiChiLang() {
      const g = new THREE.Object3D();
      const valley = mat(0x15803d);
      const road = mat(0x9ca3af);
      const cliff = mat(0x475569);
      const cliffDark = mat(0x334155);
      const wallStone = mat(0xd6d3d1);
      const gateDark = mat(0x1e293b);
      const roofRed = mat(0xb91c1c);
      const flagRed = mat(0xdc2626, 0xb91c1c, 0.25);

      addBox(g, 96, 16, 48, 0, -6, 0, valley);
      addBox(g, 18, 2.5, 46, 0, 2.5, 0, road);

      // Towering flanking limestone cliffs forming the narrow pass
      const cliffL1 = new THREE.Mesh(new THREE.ConeGeometry(24, 58, 6), cliff);
      cliffL1.position.set(-30, 28, -4);
      g.add(cliffL1);
      const cliffL2 = new THREE.Mesh(new THREE.ConeGeometry(18, 40, 6), cliffDark);
      cliffL2.position.set(-22, 19, 10);
      g.add(cliffL2);

      const cliffR1 = new THREE.Mesh(new THREE.ConeGeometry(26, 62, 6), cliff);
      cliffR1.position.set(30, 30, -4);
      g.add(cliffR1);
      const cliffR2 = new THREE.Mesh(new THREE.ConeGeometry(18, 42, 6), cliffDark);
      cliffR2.position.set(22, 20, 10);
      g.add(cliffR2);

      // Ancient stone fortress wall & arched gate across the pass
      addBox(g, 30, 16, 9, 0, 10, 0, wallStone);
      addBox(g, 9, 10, 10, 0, 7, 0, gateDark);
      // Watchtower on top of the gate
      addBox(g, 15, 7, 8, 0, 21, 0, mat(0xfef3c7));
      const watchRoof = new THREE.Mesh(new THREE.ConeGeometry(13, 6.5, 4), roofRed);
      watchRoof.rotation.y = Math.PI / 4;
      watchRoof.scale.set(1.2, 1, 0.8);
      watchRoof.position.set(0, 27.5, 0);
      g.add(watchRoof);

      // Victory banner
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 16, 6), mat(0xe2e8f0));
      pole.position.set(10, 26, 2);
      g.add(pole);
      const flagGroup = new THREE.Object3D();
      flagGroup.name = 'anim_flag';
      flagGroup.position.set(10.3, 31, 2);
      addBox(flagGroup, 11, 7, 0.6, 5.5, 0, 0, flagRed);
      g.add(flagGroup);

      return g;
  }

  // ============================================================
  // 46. ATK ĐỊNH HÓA — THÁI NGUYÊN (Nhà Sàn Đồi Tỉn Keo)
  // ============================================================
  function buildAtkDinhHoa() {
      const g = new THREE.Object3D();
      const hill = mat(0x166534);
      const hillLight = mat(0x15803d);
      const wood = mat(0x78350f);
      const bamboo = mat(0xb45309);
      const palmRoof = mat(0x854d0e);
      const stone = mat(0xd6d3d1);
      const flagRed = mat(0xdc2626, 0xb91c1c, 0.25);

      // Viet Bac layered green hills
      const mainHill = new THREE.Mesh(new THREE.CylinderGeometry(34, 46, 18, 10), hill);
      mainHill.position.set(0, 1, 0);
      g.add(mainHill);
      const backPeak = new THREE.Mesh(new THREE.ConeGeometry(28, 38, 7), hillLight);
      backPeak.position.set(-22, 22, -16);
      g.add(backPeak);

      // Stone steps climbing up Tin Keo Hill
      for (let i = 0; i < 4; i++) {
          addBox(g, 10, 2.2, 3.2, 0, 2 + i * 2, 22 - i * 3, stone);
      }

      // Stilt house (Nhà sàn Bác Hồ tại Tỉn Keo)
      for (const [sx, sz] of [[-12, -6], [0, -6], [12, -6], [-12, 6], [0, 6], [12, 6]]) {
          const stilt = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.0, 11, 6), wood);
          stilt.position.set(sx, 15, sz);
          g.add(stilt);
      }
      addBox(g, 28, 2, 15, 0, 20, 0, wood);
      addBox(g, 25, 8, 12, 0, 25, 0, bamboo);
      const roof = new THREE.Mesh(new THREE.ConeGeometry(22, 11, 4), palmRoof);
      roof.rotation.y = Math.PI / 4;
      roof.scale.set(1.2, 1, 0.78);
      roof.position.set(0, 34, 0);
      g.add(roof);

      // Forest trees & red flag
      for (const [tx, tz] of [[-24, 8], [24, 6], [22, -10]]) {
          const t = new THREE.Mesh(new THREE.ConeGeometry(7, 18, 6), hillLight);
          t.position.set(tx, 18, tz);
          g.add(t);
      }
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 22, 6), mat(0xe2e8f0));
      pole.position.set(20, 21, 12);
      g.add(pole);
      const flagGroup = new THREE.Object3D();
      flagGroup.name = 'anim_flag';
      flagGroup.position.set(20.4, 29, 12);
      addBox(flagGroup, 11, 7.5, 0.6, 5.5, 0, 0, flagRed);
      g.add(flagGroup);

      return g;
  }

  // ============================================================
  // 47. ĐỀN ĐÔ (LÝ BÁT ĐẾ) — BẮC NINH (Thủy Đình & Hồ Bán Nguyệt)
  // ============================================================
  function buildDenDoBacNinh() {
      const g = new THREE.Object3D();
      const lake = mat(0x0284c7);
      const court = mat(0xd6d3d1);
      const wallYellow = mat(0xfef3c7);
      const pillarRed = mat(0x991b1b);
      const roofRed = mat(0xb91c1c);
      const gold = mat(0xfacc15);

      // Half-moon lotus pond
      const pond = new THREE.Mesh(new THREE.CylinderGeometry(44, 48, 14, 12), lake);
      pond.position.set(0, -6, 0);
      g.add(pond);

      // Rear royal courtyard & main temple hall
      addBox(g, 64, 8, 22, 0, 4, -12, court);
      addBox(g, 42, 11, 14, 0, 13.5, -13, wallYellow);
      const mainRoof = new THREE.Mesh(new THREE.ConeGeometry(30, 11, 4), roofRed);
      mainRoof.rotation.y = Math.PI / 4;
      mainRoof.scale.set(1.25, 1, 0.62);
      mainRoof.position.set(0, 24, -13);
      g.add(mainRoof);

      // Iconic Thuy Dinh water pavilion in the middle of the lake
      addBox(g, 18, 4, 16, 0, 3, 12, court);
      for (const [px, pz] of [[-6, 7], [6, 7], [-6, 17], [6, 17]]) {
          const col = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.0, 9, 6), pillarRed);
          col.position.set(px, 9.5, pz);
          g.add(col);
      }
      const r1 = new THREE.Mesh(new THREE.ConeGeometry(14, 6, 4), roofRed);
      r1.rotation.y = Math.PI / 4;
      r1.position.set(0, 16.5, 12);
      g.add(r1);
      const r2 = new THREE.Mesh(new THREE.ConeGeometry(9.5, 5.5, 4), roofRed);
      r2.rotation.y = Math.PI / 4;
      r2.position.set(0, 22, 12);
      g.add(r2);
      const finial = new THREE.Mesh(new THREE.OctahedronGeometry(1.8, 0), gold);
      finial.position.set(0, 26, 12);
      g.add(finial);

      // Stone bridge connecting pavilion to main hall
      addBox(g, 6, 2.2, 10, 0, 3.5, 1, court);

      return g;
  }

  // ============================================================
  // 48. CÔN SƠN - KIẾP BẠC — HẢI DƯƠNG (Tam Quan & Rừng Thông)
  // ============================================================
  function buildConSonKiepBac() {
      const g = new THREE.Object3D();
      const ground = mat(0x15803d);
      const pine = mat(0x14532d);
      const wall = mat(0xfef3c7);
      const roofRed = mat(0xb91c1c);
      const stone = mat(0x94a3b8);
      const gold = mat(0xeab308);

      addBox(g, 92, 16, 48, 0, -6, 0, ground);

      // Con Son pine mountain backdrop
      const mtL = new THREE.Mesh(new THREE.ConeGeometry(28, 44, 7), pine);
      mtL.position.set(-24, 24, -14);
      g.add(mtL);
      const mtR = new THREE.Mesh(new THREE.ConeGeometry(30, 48, 7), pine);
      mtR.position.set(22, 26, -15);
      g.add(mtR);

      // Kiep Bac / Con Son Temple main hall
      addBox(g, 38, 11, 16, 0, 9.5, -4, wall);
      const hallRoof = new THREE.Mesh(new THREE.ConeGeometry(28, 10, 4), roofRed);
      hallRoof.rotation.y = Math.PI / 4;
      hallRoof.scale.set(1.25, 1, 0.72);
      hallRoof.position.set(0, 20, -4);
      g.add(hallRoof);

      // Three-arched Tam Quan entrance gate in front
      addBox(g, 30, 12, 5.5, 0, 8, 12, wall);
      addBox(g, 6, 7.5, 6.2, 0, 5.5, 12, mat(0x451a03));
      addBox(g, 4, 6, 6.2, -9.5, 5, 12, mat(0x451a03));
      addBox(g, 4, 6, 6.2, 9.5, 5, 12, mat(0x451a03));
      const gateRoof = new THREE.Mesh(new THREE.ConeGeometry(16, 6.5, 4), roofRed);
      gateRoof.rotation.y = Math.PI / 4;
      gateRoof.scale.set(1.3, 1, 0.55);
      gateRoof.position.set(0, 17, 12);
      g.add(gateRoof);

      // Bronze incense burner
      const burner = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.0, 4.5, 8), gold);
      burner.position.set(0, 4.5, 5);
      g.add(burner);

      // Pine trees flanking the temple
      for (const [px, pz] of [[-28, 8], [28, 8], [-34, -2], [34, -2]]) {
          const tree = new THREE.Mesh(new THREE.ConeGeometry(6.5, 22, 6), pine);
          tree.position.set(px, 13, pz);
          g.add(tree);
      }
      addBox(g, 8, 1.2, 16, 0, 2.2, 18, stone);

      return g;
  }

  // ============================================================
  // 49. BÃI CỌC BẠCH ĐẰNG — HẢI PHÒNG (Cọc Gỗ Lim & Chiến Thuyền)
  // ============================================================
  function buildBaiCocBachDang() {
      const g = new THREE.Object3D();
      const river = mat(0x0369a1);
      const bank = mat(0x15803d);
      const stakeWood = mat(0x78350f);
      const ironTip = mat(0xe2e8f0);
      const pavWall = mat(0xfef3c7);
      const roofRed = mat(0xb91c1c);
      const boatWood = mat(0x92400e);
      const sailCream = mat(0xfef9c3);
      const flagRed = mat(0xdc2626, 0xb91c1c, 0.25);

      // Historic Bach Dang River
      const water = new THREE.Mesh(new THREE.CylinderGeometry(48, 54, 15, 12), river);
      water.position.set(0, -6.5, 0);
      g.add(water);

      // Riverbank & Victory Pavilion on left-back
      addBox(g, 38, 12, 22, -24, 4, -12, bank);
      addBox(g, 20, 9, 12, -24, 14, -12, pavWall);
      const pavRoof = new THREE.Mesh(new THREE.ConeGeometry(16, 8, 4), roofRed);
      pavRoof.rotation.y = Math.PI / 4;
      pavRoof.position.set(-24, 22.5, -12);
      g.add(pavRoof);

      // Rows of iconic iron-tipped wooden stakes rising from the river
      const stakeCoords = [
          [-22, 12, 12], [-12, 16, 14], [-2, 11, 13], [8, 15, 15], [18, 10, 12],
          [-16, 2, 13], [-4, 0, 15], [6, 3, 14], [16, -2, 13], [26, 6, 12],
          [4, -10, 14], [16, -12, 13], [28, -6, 12],
      ];
      for (const [sx, sz, sh] of stakeCoords) {
          const stake = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.5, sh, 6), stakeWood);
          stake.position.set(sx, sh * 0.5 - 1, sz);
          stake.rotation.z = -0.14;
          g.add(stake);
          const tip = new THREE.Mesh(new THREE.ConeGeometry(1.15, 3.2, 5), ironTip);
          tip.position.set(sx + 0.9, sh + 0.3, sz);
          tip.rotation.z = -0.14;
          g.add(tip);
      }

      // Animated ancient Vietnamese war junk on the river
      const boat = new THREE.Object3D();
      boat.name = 'anim_boat';
      boat.position.set(16, 3, 18);
      addBox(boat, 18, 4.2, 6.5, 0, 0, 0, boatWood);
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.55, 15, 5), stakeWood);
      mast.position.set(0, 9, 0);
      boat.add(mast);
      addBox(boat, 9, 10, 0.7, 2.5, 10, 0, sailCream);
      g.add(boat);

      // Crimson battle banner on shore
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.7, 24, 6), mat(0xe2e8f0));
      pole.position.set(-10, 21, -8);
      g.add(pole);
      const flagGroup = new THREE.Object3D();
      flagGroup.name = 'anim_flag';
      flagGroup.position.set(-9.6, 29, -8);
      addBox(flagGroup, 13, 8.5, 0.7, 6.5, 0, 0, flagRed);
      g.add(flagGroup);

      return g;
  }

  // ============================================================
  // 50. KHU DI TÍCH ĐỀN TRẦN — NAM ĐỊNH (Ngũ Môn & Đền Thiên Trường)
  // ============================================================
  function buildDenTranNamDinh() {
      const g = new THREE.Object3D();
      const yard = mat(0xd6d3d1);
      const wallYellow = mat(0xfde68a);
      const roofRed = mat(0xb91c1c);
      const doorDark = mat(0x451a03);
      const pondBlue = mat(0x0284c7);
      const gold = mat(0xfacc15);

      addBox(g, 92, 16, 48, 0, -6, 0, yard);
      // Front lotus pond
      addBox(g, 52, 2.5, 12, 0, 2.2, 17, pondBlue);
      addBox(g, 10, 3, 13, 0, 2.8, 17, yard); // bridge

      // Grand Five-Gate (Ngũ Môn) front entrance
      addBox(g, 56, 13, 6.5, 0, 8.5, 6, wallYellow);
      for (const gx of [-18, -9, 0, 9, 18]) {
          const gw = gx === 0 ? 6.5 : 4.2;
          const gh = gx === 0 ? 8.5 : 6.5;
          addBox(g, gw, gh, 7.2, gx, 5.5, 6, doorDark);
      }
      const centerGateRoof = new THREE.Mesh(new THREE.ConeGeometry(13, 7, 4), roofRed);
      centerGateRoof.rotation.y = Math.PI / 4;
      centerGateRoof.scale.set(1.2, 1, 0.6);
      centerGateRoof.position.set(0, 18.5, 6);
      g.add(centerGateRoof);
      for (const sx of [-19, 19]) {
          const sideRoof = new THREE.Mesh(new THREE.ConeGeometry(10, 5.5, 4), roofRed);
          sideRoof.rotation.y = Math.PI / 4;
          sideRoof.scale.set(1.1, 1, 0.6);
          sideRoof.position.set(sx, 17, 6);
          g.add(sideRoof);
      }

      // Main Thien Truong Temple behind
      addBox(g, 48, 12, 16, 0, 8, -11, wallYellow);
      const mainRoof = new THREE.Mesh(new THREE.ConeGeometry(34, 11, 4), roofRed);
      mainRoof.rotation.y = Math.PI / 4;
      mainRoof.scale.set(1.25, 1, 0.62);
      mainRoof.position.set(0, 19.5, -11);
      g.add(mainRoof);

      // Golden finial & stone steles
      const finial = new THREE.Mesh(new THREE.OctahedronGeometry(2, 0), gold);
      finial.position.set(0, 25.5, -11);
      g.add(finial);

      return g;
  }

  // ============================================================
  // 51. NGÃ BA ĐỒNG LỘC — HÀ TĨNH (Tượng Đài Chiến Thắng & 10 Cô Gái)
  // ============================================================
  function buildNgaBaDongLoc() {
      const g = new THREE.Object3D();
      const redEarth = mat(0xb45309);
      const grass = mat(0x15803d);
      const road = mat(0x475569);
      const monumentWhite = mat(0xf1f5f9);
      const granite = mat(0x94a3b8);
      const gold = mat(0xfacc15, 0xeab308, 0.35);
      const flagRed = mat(0xdc2626, 0xb91c1c, 0.25);

      // Red-earth hill base with green edges
      addBox(g, 92, 16, 48, 0, -6, 0, grass);
      const hill = new THREE.Mesh(new THREE.CylinderGeometry(36, 44, 6, 10), redEarth);
      hill.position.set(0, 3, -2);
      g.add(hill);

      // Iconic Y-shaped strategic crossroads
      addBox(g, 11, 1.6, 26, 0, 6.2, 12, road);
      const branchL = new THREE.Mesh(new THREE.BoxGeometry(10, 1.6, 26), road);
      branchL.position.set(-12, 6.2, -9);
      branchL.rotation.y = 0.55;
      g.add(branchL);
      const branchR = new THREE.Mesh(new THREE.BoxGeometry(10, 1.6, 26), road);
      branchR.position.set(12, 6.2, -9);
      branchR.rotation.y = -0.55;
      g.add(branchR);

      // Soaring Dong Loc Victory Monument
      addBox(g, 20, 6, 16, 0, 9, -6, granite);
      const spireMain = new THREE.Mesh(new THREE.ConeGeometry(7.5, 36, 4), monumentWhite);
      spireMain.rotation.y = Math.PI / 4;
      spireMain.position.set(0, 30, -6);
      g.add(spireMain);
      const spireSide = new THREE.Mesh(new THREE.ConeGeometry(4.8, 24, 4), flagRed);
      spireSide.rotation.y = Math.PI / 4;
      spireSide.position.set(-6, 23, -4);
      g.add(spireSide);
      const star = new THREE.Mesh(new THREE.OctahedronGeometry(3, 0), gold);
      star.position.set(0, 49, -6);
      g.add(star);

      // 10 white memorial lotus steles honoring the 10 female youth volunteers
      for (let i = 0; i < 10; i++) {
          const angle = -Math.PI * 0.78 + (i / 9) * (Math.PI * 0.56);
          const mx = Math.cos(angle) * 26;
          const mz = -4 + Math.sin(angle) * 16;
          addBox(g, 2.4, 5.5, 1.6, mx, 8.8, mz, monumentWhite);
      }

      // Waving red flag
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 22, 6), mat(0xe2e8f0));
      pole.position.set(16, 17, 6);
      g.add(pole);
      const flagGroup = new THREE.Object3D();
      flagGroup.name = 'anim_flag';
      flagGroup.position.set(16.4, 24, 6);
      addBox(flagGroup, 11, 7.5, 0.6, 5.5, 0, 0, flagRed);
      g.add(flagGroup);

      return g;
  }

  // ============================================================
  // 52. ĐỊA ĐẠO VỊNH MỐC — QUẢNG TRỊ (Hầm Ven Biển & Cửa Địa Đạo)
  // ============================================================
  function buildDiaDaoVinhMoc() {
      const g = new THREE.Object3D();
      const sea = mat(0x0284c7);
      const sand = mat(0xfde68a);
      const redCliff = mat(0x9a3412);
      const tunnelDark = mat(0x1c1917);
      const timber = mat(0x78350f);
      const bambooGreen = mat(0x16a34a);
      const flagRed = mat(0xdc2626, 0xb91c1c, 0.25);

      // East Sea coast & sandy beach
      addBox(g, 96, 14, 48, 0, -6, 0, sea);
      addBox(g, 88, 4, 22, 0, 2, 12, sand);

      // Red basalt coastal bluff containing the 3-level tunnels
      addBox(g, 82, 26, 26, 0, 14, -8, redCliff);
      addBox(g, 76, 6, 24, 0, 28, -8, mat(0x15803d)); // green hilltop

      // 3 arched tunnel mouths facing the sea, reinforced with timber frames
      for (const [tx, ty] of [[-24, 9], [0, 12], [24, 9]]) {
          addBox(g, 11, 11, 4, tx, ty, 5, timber);
          const opening = new THREE.Mesh(new THREE.CylinderGeometry(4, 4.4, 5, 8), tunnelDark);
          opening.rotation.x = Math.PI / 2;
          opening.position.set(tx, ty - 0.5, 5.8);
          g.add(opening);
      }

      // Coastal bamboo grove on top of the bluff
      for (const [bx, bz] of [[-28, -10], [-14, -14], [6, -12], [22, -10], [32, -6]]) {
          const bush = new THREE.Mesh(new THREE.DodecahedronGeometry(6.5, 0), bambooGreen);
          bush.position.set(bx, 34, bz);
          g.add(bush);
      }

      // Waving flag on the coastal bluff
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.7, 22, 6), mat(0xe2e8f0));
      pole.position.set(0, 41, -6);
      g.add(pole);
      const flagGroup = new THREE.Object3D();
      flagGroup.name = 'anim_flag';
      flagGroup.position.set(0.4, 48, -6);
      addBox(flagGroup, 13, 8.5, 0.7, 6.5, 0, 0, flagRed);
      g.add(flagGroup);

      return g;
  }

  // ============================================================
  // 53. THÀNH CỔ QUẢNG TRỊ — QUẢNG TRỊ (Đài Tưởng Niệm 81 Ngày Đêm)
  // ============================================================
  function buildThanhCoQuangTri() {
      const g = new THREE.Object3D();
      const moat = mat(0x0369a1);
      const grass = mat(0x15803d);
      const brickOld = mat(0x9a3412);
      const stone = mat(0xd6d3d1);
      const memorialRed = mat(0x991b1b);
      const flameGold = mat(0xfacc15, 0xf59e0b, 0.65);

      // Outer moat & citadel grounds
      addBox(g, 92, 14, 52, 0, -6, 0, moat);
      addBox(g, 76, 6, 40, 0, 2, 0, grass);

      // Square ancient brick ramparts
      addBox(g, 72, 9, 4, 0, 8, -18, brickOld);
      addBox(g, 4, 9, 36, -34, 8, 0, brickOld);
      addBox(g, 4, 9, 36, 34, 8, 0, brickOld);
      // Front wall with historic arched gate
      addBox(g, 26, 9, 4, -21, 8, 18, brickOld);
      addBox(g, 26, 9, 4, 21, 8, 18, brickOld);
      addBox(g, 16, 13, 5.5, 0, 10, 18, brickOld);
      addBox(g, 7, 8, 6.2, 0, 7.5, 18, mat(0x1c1917));

      // Central Octagonal Memorial Monument (Đài Tưởng niệm Trung tâm)
      const base1 = new THREE.Mesh(new THREE.CylinderGeometry(16, 19, 4, 8), stone);
      base1.position.set(0, 7, -2);
      g.add(base1);
      const base2 = new THREE.Mesh(new THREE.CylinderGeometry(12, 14, 5, 8), memorialRed);
      base2.position.set(0, 11.5, -2);
      g.add(base2);
      const obelisk = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 7.5, 22, 8), stone);
      obelisk.position.set(0, 25, -2);
      g.add(obelisk);
      // Glowing eternal memorial flame atop the monument
      const flame = new THREE.Mesh(new THREE.OctahedronGeometry(4.2, 0), flameGold);
      flame.scale.set(0.85, 1.45, 0.85);
      flame.position.set(0, 39, -2);
      g.add(flame);

      return g;
  }

  // ============================================================
  // 54. BẢO TÀNG QUANG TRUNG — TÂY SƠN, BÌNH ĐỊNH
  // ============================================================
  function buildBaoTangQuangTrung() {
      const g = new THREE.Object3D();
      const plaza = mat(0xd6d3d1);
      const roofRed = mat(0xb91c1c);
      const wallCream = mat(0xfef3c7);
      const bronze = mat(0x92400e);
      const bronzeLight = mat(0xd97706);
      const stone = mat(0x78716c);
      const treeGreen = mat(0x166534);
      const flagRed = mat(0xdc2626, 0xb91c1c, 0.25);

      addBox(g, 92, 16, 48, 0, -6, 0, plaza);

      // Traditional Tay Son Temple Hall in back
      addBox(g, 48, 12, 16, 0, 8, -12, wallCream);
      const mainRoof = new THREE.Mesh(new THREE.ConeGeometry(34, 11, 4), roofRed);
      mainRoof.rotation.y = Math.PI / 4;
      mainRoof.scale.set(1.25, 1, 0.65);
      mainRoof.position.set(0, 19.5, -12);
      g.add(mainRoof);

      // Heroic Bronze Statue of Emperor Quang Trung - Nguyen Hue in center courtyard
      addBox(g, 14, 8, 12, 0, 6, 8, stone);
      addBox(g, 10, 3, 9, 0, 11.5, 8, mat(0x475569));
      // Statue torso, cloak & raised sword
      const cloak = new THREE.Mesh(new THREE.ConeGeometry(5.2, 15, 6), bronze);
      cloak.position.set(0, 20.5, 8);
      g.add(cloak);
      const head = new THREE.Mesh(new THREE.DodecahedronGeometry(2.6, 0), bronzeLight);
      head.position.set(0, 29.5, 8);
      g.add(head);
      const sword = new THREE.Mesh(new THREE.BoxGeometry(1.1, 11, 0.9), bronzeLight);
      sword.position.set(5.2, 29, 9);
      sword.rotation.z = -0.35;
      g.add(sword);

      // Iconic Ancient Tamarind Tree (Cây me cổ thụ nhà Tây Sơn) on left
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 3.2, 14, 6), mat(0x78350f));
      trunk.position.set(-28, 9, 6);
      g.add(trunk);
      const crown = new THREE.Mesh(new THREE.DodecahedronGeometry(10, 0), treeGreen);
      crown.scale.set(1.2, 0.78, 1.0);
      crown.position.set(-28, 19, 6);
      g.add(crown);

      // Tay Son War Drum (Trống trận Tây Sơn) on right
      const drum = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.2, 8, 8), mat(0x991b1b));
      drum.rotation.z = Math.PI / 2;
      drum.position.set(26, 8, 8);
      g.add(drum);

      // Waving Tay Son crimson banner
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 24, 6), mat(0xe2e8f0));
      pole.position.set(26, 20, -4);
      g.add(pole);
      const flagGroup = new THREE.Object3D();
      flagGroup.name = 'anim_flag';
      flagGroup.position.set(26.4, 28, -4);
      addBox(flagGroup, 12, 8, 0.7, 6, 0, 0, flagRed);
      g.add(flagGroup);

      return g;
  }

  // ============================================================
  // 55. DI TÍCH TÀU KHÔNG SỐ VŨNG RÔ — PHÚ YÊN
  // ============================================================
  function buildVungRoTauKhongSo() {
      const g = new THREE.Object3D();
      const bay = mat(0x0284c7);
      const mountain = mat(0x15803d);
      const rock = mat(0x64748b);
      const pier = mat(0xd6d3d1);
      const hullGrey = mat(0x475569);
      const cabinWhite = mat(0xf1f5f9);
      const monumentWhite = mat(0xf8fafc);
      const flagRed = mat(0xdc2626, 0xb91c1c, 0.25);

      // Sheltered blue Vung Ro Bay
      const water = new THREE.Mesh(new THREE.CylinderGeometry(48, 54, 15, 12), bay);
      water.position.set(0, -6.5, 0);
      g.add(water);

      // Deo Ca / Da Bia mountain cove hugging the bay
      const mt1 = new THREE.Mesh(new THREE.ConeGeometry(28, 46, 7), mountain);
      mt1.position.set(-24, 21, -14);
      g.add(mt1);
      const mt2 = new THREE.Mesh(new THREE.ConeGeometry(24, 38, 6), rock);
      mt2.position.set(24, 17, -16);
      g.add(mt2);
      addBox(g, 56, 10, 18, -6, 4, -12, mountain);

      // Concrete pier jutting into the cove
      addBox(g, 10, 3.5, 24, -14, 3, 2, pier);

      // Iconic "Tàu Không Số" historic cargo vessel (animated bobbing)
      const ship = new THREE.Object3D();
      ship.name = 'anim_boat';
      ship.position.set(10, 3, 8);
      addBox(ship, 28, 5.5, 9, 0, 1, 0, hullGrey);
      addBox(ship, 26, 1.8, 8.2, 0, 4.2, 0, mat(0x991b1b));
      addBox(ship, 10, 7, 7, -4, 8, 0, cabinWhite);
      const funnel = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.8, 6, 6), mat(0x1e293b));
      funnel.position.set(-5, 13.5, 0);
      ship.add(funnel);
      // Cargo crane mast
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.55, 12, 5), pier);
      mast.position.set(7, 10, 0);
      ship.add(mast);
      g.add(ship);

      // Vung Ro Historical Monument & waving flag on hillside
      const stele = new THREE.Mesh(new THREE.ConeGeometry(4.5, 20, 4), monumentWhite);
      stele.rotation.y = Math.PI / 4;
      stele.position.set(-14, 19, -12);
      g.add(stele);
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 18, 6), pier);
      pole.position.set(2, 17, -10);
      g.add(pole);
      const flagGroup = new THREE.Object3D();
      flagGroup.name = 'anim_flag';
      flagGroup.position.set(2.4, 23, -10);
      addBox(flagGroup, 11, 7.5, 0.6, 5.5, 0, 0, flagRed);
      g.add(flagGroup);

      return g;
  }

  // ============================================================
  // 56. THÁP CHĂM PÔ KLONG GARAI — NINH THUẬN
  // ============================================================
  function buildThapPoKlongGarai() {
      const g = new THREE.Object3D();
      const hill = mat(0xb45309);
      const rock = mat(0x78716c);
      const brick = mat(0xc2410c);
      const brickDark = mat(0x9a3412);
      const sandstone = mat(0xfde68a);
      const cactus = mat(0x15803d);

      // Sun-baked Trau Hill base
      const baseHill = new THREE.Mesh(new THREE.CylinderGeometry(36, 48, 18, 9), hill);
      baseHill.position.set(0, 0, 0);
      g.add(baseHill);

      // Main Kalan Tower (Center)
      addBox(g, 16, 18, 16, 0, 18, -2, brick);
      addBox(g, 12.5, 9, 12.5, 0, 31, -2, brickDark);
      addBox(g, 9, 7, 9, 0, 39, -2, brick);
      const topSpire = new THREE.Mesh(new THREE.ConeGeometry(5.5, 9, 4), sandstone);
      topSpire.rotation.y = Math.PI / 4;
      topSpire.position.set(0, 47, -2);
      g.add(topSpire);
      // Sandstone entrance portico
      addBox(g, 7, 10, 5, 0, 14, 7.5, sandstone);
      addBox(g, 4.2, 6.5, 5.6, 0, 12.5, 7.8, mat(0x1c1917));

      // Gate Tower (Tháp Cổng — Right)
      addBox(g, 10, 13, 10, 20, 15.5, 6, brick);
      const gateTop = new THREE.Mesh(new THREE.ConeGeometry(6.5, 10, 4), brickDark);
      gateTop.rotation.y = Math.PI / 4;
      gateTop.position.set(20, 27, 6);
      g.add(gateTop);

      // Fire Tower with saddle roof (Tháp Lửa — Left)
      addBox(g, 13, 10, 9, -20, 14, 5, brickDark);
      const saddleRoof = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 14, 6), brick);
      saddleRoof.rotation.z = Math.PI / 2;
      saddleRoof.position.set(-20, 21.5, 5);
      g.add(saddleRoof);

      // Arid boulders & cacti
      for (const [cx, cz] of [[-30, 14], [30, 12], [-12, 18], [14, -16]]) {
          const b = new THREE.Mesh(new THREE.DodecahedronGeometry(3.5, 0), rock);
          b.position.set(cx, 10, cz);
          g.add(b);
          const c = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 6, 5), cactus);
          c.position.set(cx + 3, 12, cz + 1);
          g.add(c);
      }

      return g;
  }

  // ============================================================
  // 57. CHIẾN THẮNG ĐẮK TÔ - TÂN CẢNH — KON TUM (Xe Tăng 377)
  // ============================================================
  function buildDakToTanCanh() {
      const g = new THREE.Object3D();
      const basalt = mat(0x9a3412);
      const grass = mat(0x15803d);
      const stone = mat(0xd6d3d1);
      const stoneDark = mat(0x64748b);
      const tankGreen = mat(0x3f6212);
      const trackDark = mat(0x1e293b);
      const flagRed = mat(0xdc2626, 0xb91c1c, 0.25);
      const starYellow = mat(0xfacc15, 0xeab308, 0.45);

      // Central Highlands red-basalt plateau
      addBox(g, 92, 16, 48, 0, -6, 0, grass);
      addBox(g, 74, 4, 36, 0, 3.5, 0, basalt);

      // Stepped stone monument pedestal
      addBox(g, 42, 5, 24, 0, 8, 2, stoneDark);
      addBox(g, 32, 4, 18, 0, 12.5, 2, stone);

      // Iconic Historic T-54 Tank #377 mounted on the pedestal
      addBox(g, 20, 4.5, 11, 0, 17.5, 2, tankGreen); // hull
      addBox(g, 21, 3.2, 2.6, 0, 16.2, 7.2, trackDark); // left track
      addBox(g, 21, 3.2, 2.6, 0, 16.2, -3.2, trackDark); // right track
      const turret = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 5.2, 4.2, 8), tankGreen);
      turret.position.set(-1, 21.8, 2);
      g.add(turret);
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.85, 15, 6), tankGreen);
      barrel.rotation.z = Math.PI / 2 - 0.14;
      barrel.position.set(9, 23.2, 2);
      g.add(barrel);

      // Towering Victory Stele behind Tank 377
      addBox(g, 12, 34, 5, -16, 24, -12, stone);
      addBox(g, 7, 26, 4, -7, 20, -12, flagRed);
      const star = new THREE.Mesh(new THREE.OctahedronGeometry(3.2, 0), starYellow);
      star.position.set(-16, 43, -12);
      g.add(star);

      // Waving Victory Flag
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.7, 24, 6), mat(0xe2e8f0));
      pole.position.set(22, 20, -10);
      g.add(pole);
      const flagGroup = new THREE.Object3D();
      flagGroup.name = 'anim_flag';
      flagGroup.position.set(22.4, 28, -10);
      addBox(flagGroup, 13, 8.5, 0.7, 6.5, 0, 0, flagRed);
      g.add(flagGroup);

      return g;
  }

  // ============================================================
  // 58. NÚI BÀ ĐEN - CĂN CỨ TW CỤC — TÂY NINH (Nóc Nhà Nam Bộ)
  // ============================================================
  function buildNuiBaDenTayNinh() {
      const g = new THREE.Object3D();
      const plain = mat(0x22c55e);
      const mountain = mat(0x166534);
      const rock = mat(0x57534e);
      const bronze = mat(0xd97706, 0xb45309, 0.25);
      const lotusWhite = mat(0xf8fafc);
      const cableDark = mat(0x334155);
      const cabinRed = mat(0xdc2626);
      const caveDark = mat(0x1c1917);

      addBox(g, 92, 14, 48, 0, -6, 0, plain);

      // Conical volcanic Ba Den Mountain ("Roof of Southern Vietnam")
      const peak = new THREE.Mesh(new THREE.ConeGeometry(40, 48, 9), mountain);
      peak.position.set(0, 22, -2);
      g.add(peak);
      const summit = new THREE.Mesh(new THREE.CylinderGeometry(10, 14, 6, 8), rock);
      summit.position.set(0, 44, -2);
      g.add(summit);

      // Iconic Giant Bronze Bodhisattva Statue (Tượng Phật Bà Tây Bổ Đà Sơn) atop summit
      const lotus = new THREE.Mesh(new THREE.CylinderGeometry(6.5, 5, 3, 8), lotusWhite);
      lotus.position.set(0, 48.5, -2);
      g.add(lotus);
      const body = new THREE.Mesh(new THREE.ConeGeometry(4.2, 14, 7), bronze);
      body.position.set(0, 56.5, -2);
      g.add(body);
      const head = new THREE.Mesh(new THREE.DodecahedronGeometry(2.4, 0), bronze);
      head.position.set(0, 64.5, -2);
      g.add(head);

      // Historical resistance cave base (Động Kim Quang) on the lower flank
      const cave = new THREE.Mesh(new THREE.CylinderGeometry(5, 5.5, 6, 7), caveDark);
      cave.rotation.x = Math.PI / 2;
      cave.position.set(16, 10, 14);
      g.add(cave);

      // Animated cable car line ascending the mountain
      const cable = new THREE.Mesh(new THREE.BoxGeometry(38, 0.7, 0.7), cableDark);
      cable.position.set(-20, 28, 10);
      cable.rotation.z = 0.62;
      g.add(cable);
      const cabin = new THREE.Object3D();
      cabin.name = 'anim_cablecar';
      cabin.position.set(-20, 26, 10);
      cabin.userData = { baseX: -20, baseY: 26 };
      addBox(cabin, 0.7, 3.5, 0.7, 0, 1.8, 0, cableDark);
      addBox(cabin, 6.5, 4.5, 4.2, 0, -1.5, 0, cabinRed);
      g.add(cabin);

      return g;
  }

  // ============================================================
  // 59. CHIẾN KHU Đ — ĐỒNG NAI (Rừng Chiến Khu & Tượng Đài Chiến Thắng)
  // ============================================================
  function buildChienKhuD() {
      const g = new THREE.Object3D();
      const forestFloor = mat(0x14532d);
      const canopy1 = mat(0x166534);
      const canopy2 = mat(0x15803d);
      const stone = mat(0xd6d3d1);
      const stoneDark = mat(0x64748b);
      const thatch = mat(0xb45309);
      const wood = mat(0x78350f);
      const flagRed = mat(0xdc2626, 0xb91c1c, 0.25);
      const starYellow = mat(0xfacc15, 0xeab308, 0.4);

      addBox(g, 92, 16, 48, 0, -6, 0, forestFloor);

      // Grand War Zone D Victory Monument & Relief Wall
      addBox(g, 34, 5, 18, 0, 4.5, -2, stoneDark);
      addBox(g, 28, 14, 5, 0, 14, -6, stone);
      const obelisk = new THREE.Mesh(new THREE.ConeGeometry(5.5, 34, 4), stone);
      obelisk.rotation.y = Math.PI / 4;
      obelisk.position.set(0, 26, -2);
      g.add(obelisk);
      const emblem = new THREE.Mesh(new THREE.OctahedronGeometry(3.2, 0), starYellow);
      emblem.position.set(0, 44, -2);
      g.add(emblem);

      // Camouflaged Command Bunker Hut (Hầm chỉ huy trong rừng)
      addBox(g, 14, 6, 10, 24, 5, 10, wood);
      const hutRoof = new THREE.Mesh(new THREE.ConeGeometry(11, 6, 4), thatch);
      hutRoof.rotation.y = Math.PI / 4;
      hutRoof.position.set(24, 11, 10);
      g.add(hutRoof);

      // Dense tropical rainforest trees framing the base
      for (const [tx, tz, h, m] of [
          [-34, -8, 22, canopy1], [-26, 10, 18, canopy2], [-18, -14, 24, canopy1],
          [20, -14, 23, canopy1], [34, -6, 20, canopy2], [36, 10, 17, canopy1],
      ]) {
          const tr = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.7, h * 0.5, 5), wood);
          tr.position.set(tx, 2 + h * 0.25, tz);
          g.add(tr);
          const cr = new THREE.Mesh(new THREE.DodecahedronGeometry(7.5, 0), m);
          cr.position.set(tx, 4 + h * 0.55, tz);
          g.add(cr);
      }

      // Waving red flag
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 22, 6), mat(0xe2e8f0));
      pole.position.set(-18, 16, 10);
      g.add(pole);
      const flagGroup = new THREE.Object3D();
      flagGroup.name = 'anim_flag';
      flagGroup.position.set(-17.6, 23, 10);
      addBox(flagGroup, 12, 8, 0.7, 6, 0, 0, flagRed);
      g.add(flagGroup);

      return g;
  }

  // ============================================================
  // 60. ĐỊA ĐẠO CỦ CHI — TP. HỒ CHÍ MINH (Đất Thép Thành Đồng & Hầm Ngầm)
  // ============================================================
  function buildDiaDaoCuChi() {
      const g = new THREE.Object3D();
      const earthUpper = mat(0x9a3412);
      const earthDeep = mat(0x7c2d12);
      const tunnelDark = mat(0x1c1917);
      const tunnelGlow = mat(0xf59e0b, 0xd97706, 0.45);
      const jungle = mat(0x15803d);
      const bamboo = mat(0x16a34a);
      const timber = mat(0x78350f);
      const templeCream = mat(0xfef3c7);
      const roofRed = mat(0xb91c1c);
      const flagRed = mat(0xdc2626, 0xb91c1c, 0.25);
      const starYellow = mat(0xfacc15, 0xeab308, 0.5);
      const mistWhite = mat(0xe2e8f0);

      // Cutaway Earth Cross-Section showing multi-level underground Cu Chi tunnels!
      addBox(g, 92, 14, 44, 0, -6, 0, earthDeep);
      addBox(g, 88, 18, 40, 0, 10, -2, earthUpper);
      addBox(g, 90, 4, 42, 0, 20, -2, jungle); // jungle surface layer

      // Exposed Underground Tunnel Cutaway on front face (2 levels + connecting shafts)
      // Level 1 horizontal gallery
      addBox(g, 58, 5, 3, -4, 12, 18, tunnelDark);
      // Level 2 deeper command bunker chamber
      addBox(g, 24, 6.5, 3.5, 4, 2, 18, tunnelDark);
      addBox(g, 18, 4.5, 3, -24, 3, 18, tunnelDark);
      // Vertical connecting air/access shafts
      addBox(g, 4.5, 12, 3, -18, 12, 18, tunnelDark);
      addBox(g, 4.5, 11, 3, 10, 8, 18, tunnelDark);
      // Warm oil-lamp glow inside underground command bunker
      const lamp = new THREE.Mesh(new THREE.OctahedronGeometry(2.1, 0), tunnelGlow);
      lamp.position.set(4, 2.2, 18.8);
      g.add(lamp);

      // Iconic Camouflaged Secret Trapdoor Entrance on jungle surface
      addBox(g, 7, 2.2, 7, -18, 22.8, 10, timber);
      const lid = new THREE.Mesh(new THREE.BoxGeometry(6.5, 1.2, 6.5), mat(0x166534));
      lid.position.set(-20.5, 25.5, 10);
      lid.rotation.z = 0.65;
      g.add(lid);

      // Hoang Cam Smokeless Kitchen chimney with subtle animated mist
      addBox(g, 5, 4, 5, -32, 23, 2, earthUpper);
      const mist = new THREE.Object3D();
      mist.name = 'anim_mist';
      mist.position.set(-32, 28, 2);
      for (const [mx, my, sc] of [[0, 0, 1], [3, 3, 0.85], [-2, 5.5, 0.7]]) {
          const puff = new THREE.Mesh(new THREE.DodecahedronGeometry(3.2 * sc, 0), mistWhite);
          puff.scale.set(1.3, 0.7, 1);
          puff.position.set(mx, my, 0);
          mist.add(puff);
      }
      g.add(mist);

      // Ben Duoc Memorial Temple Tower (Tháp Đền Bến Dược) on right side
      addBox(g, 18, 12, 16, 22, 28, -6, templeCream);
      const r1 = new THREE.Mesh(new THREE.ConeGeometry(15, 7, 4), roofRed);
      r1.rotation.y = Math.PI / 4;
      r1.position.set(22, 37, -6);
      g.add(r1);
      addBox(g, 11, 9, 10, 22, 42, -6, templeCream);
      const r2 = new THREE.Mesh(new THREE.ConeGeometry(10.5, 7.5, 4), roofRed);
      r2.rotation.y = Math.PI / 4;
      r2.position.set(22, 49.5, -6);
      g.add(r2);

      // Jungle bamboo & trees on top
      for (const [tx, tz] of [[-28, -10], [-10, -12], [2, -10], [-4, 4], [36, 4]]) {
          const bush = new THREE.Mesh(new THREE.DodecahedronGeometry(6.5, 0), bamboo);
          bush.position.set(tx, 26, tz);
          g.add(bush);
      }

      // Proud Waving Vietnam Flag on the "Land of Steel"
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.7, 26, 6), mat(0xe2e8f0));
      pole.position.set(-2, 35, -2);
      g.add(pole);
      const flagGroup = new THREE.Object3D();
      flagGroup.name = 'anim_flag';
      flagGroup.position.set(-1.5, 43, -2);
      addBox(flagGroup, 14, 9.5, 0.7, 7, 0, 0, flagRed);
      const star = new THREE.Mesh(new THREE.OctahedronGeometry(2.4, 0), starYellow);
      star.scale.set(1, 1, 0.45);
      star.position.set(7, 0, 0);
      flagGroup.add(star);
      g.add(flagGroup);

      return g;
  }

  // ============================================================
  // 61. DI TÍCH NHÀ TÙ CÔN ĐẢO — BÀ RỊA - VŨNG TÀU
  // ============================================================
  function buildNhaTuConDao() {
      const g = new THREE.Object3D();
      const ocean = mat(0x0284c7);
      const island = mat(0x15803d);
      const ochre = mat(0xf59e0b);
      const wallCream = mat(0xfef3c7);
      const roofTile = mat(0x9a3412);
      const stone = mat(0x94a3b8);
      const monumentWhite = mat(0xf1f5f9);
      const flameGold = mat(0xfacc15, 0xf59e0b, 0.65);

      // Turquoise Con Dao sea & island base
      const sea = new THREE.Mesh(new THREE.CylinderGeometry(48, 54, 15, 12), ocean);
      sea.position.set(0, -6.5, 0);
      g.add(sea);
      const land = new THREE.Mesh(new THREE.CylinderGeometry(36, 40, 8, 10), island);
      land.position.set(0, 2, -4);
      g.add(land);

      // Historic Pier 914 (Cầu tàu lịch sử 914) jutting into the ocean
      addBox(g, 11, 3.5, 22, 0, 3, 24, stone);

      // Phu Hai Prison Colonial Compound (Yellow-ochre walls, arched gate & watchtower)
      addBox(g, 44, 11, 20, -4, 11.5, -4, wallCream);
      addBox(g, 46, 3, 22, -4, 18, -4, roofTile);
      addBox(g, 9, 8, 21, -4, 10, -4, mat(0x1c1917)); // main arched portal
      addBox(g, 12, 16, 10, -24, 14, 4, ochre); // corner watchtower
      const towerRoof = new THREE.Mesh(new THREE.ConeGeometry(8.5, 5.5, 4), roofTile);
      towerRoof.rotation.y = Math.PI / 4;
      towerRoof.position.set(-24, 24.5, 4);
      g.add(towerRoof);

      // Hang Duong Cemetery Memorial Obelisk & eternal flame on right
      addBox(g, 12, 4, 12, 24, 8, -2, stone);
      const obelisk = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 4.4, 24, 6), monumentWhite);
      obelisk.position.set(24, 22, -2);
      g.add(obelisk);
      const flame = new THREE.Mesh(new THREE.OctahedronGeometry(3.2, 0), flameGold);
      flame.scale.set(0.85, 1.4, 0.85);
      flame.position.set(24, 36.5, -2);
      g.add(flame);

      return g;
  }

  // ============================================================
  // 62. DI TÍCH ĐỒNG KHỞI — BẾN TRE (Xứ Dừa & Tượng Đài Đồng Khởi)
  // ============================================================
  function buildDongKhoiBenTre() {
      const g = new THREE.Object3D();
      const river = mat(0x0ea5e9);
      const island = mat(0x16a34a);
      const trunk = mat(0x78350f);
      const palm = mat(0x15803d);
      const stone = mat(0xd6d3d1);
      const bronze = mat(0xb45309);
      const torchFlame = mat(0xf97316, 0xea580c, 0.55);
      const boatWood = mat(0x92400e);
      const flagRed = mat(0xdc2626, 0xb91c1c, 0.25);

      // Ham Luong / Mekong River & Coconut Island
      const water = new THREE.Mesh(new THREE.CylinderGeometry(48, 54, 15, 12), river);
      water.position.set(0, -6.5, 0);
      g.add(water);
      const islet = new THREE.Mesh(new THREE.CylinderGeometry(32, 36, 7, 10), island);
      islet.position.set(0, 2, -4);
      g.add(islet);

      // Iconic Dong Khoi 1960 Uprising Monument (Torch & Banner)
      addBox(g, 20, 6, 16, 0, 8, -4, stone);
      const body = new THREE.Mesh(new THREE.CylinderGeometry(3.8, 5.8, 22, 6), bronze);
      body.position.set(0, 22, -4);
      g.add(body);
      // Burning coconut-leaf torch (Đuốc lá dừa Đồng Khởi)
      const torch = new THREE.Mesh(new THREE.ConeGeometry(4.5, 12, 6), torchFlame);
      torch.position.set(0, 38, -4);
      g.add(torch);

      // Signature Ben Tre Coconut Palms
      for (const [px, pz, lean] of [[-22, -6, -0.18], [-16, 6, -0.1], [22, -6, 0.18], [18, 5, 0.12]]) {
          const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.4, 20, 5), trunk);
          stem.position.set(px, 14, pz);
          stem.rotation.z = lean;
          g.add(stem);
          const frond = new THREE.Mesh(new THREE.ConeGeometry(7.5, 5, 6), palm);
          frond.position.set(px - lean * 10, 24, pz);
          g.add(frond);
      }

      // Animated Mekong sampan boat on the river
      const boat = new THREE.Object3D();
      boat.name = 'anim_boat';
      boat.position.set(0, 3, 24);
      addBox(boat, 18, 3.2, 5.5, 0, 0, 0, boatWood);
      addBox(boat, 7, 3.5, 4.5, -2, 3, 0, mat(0xd97706));
      g.add(boat);

      // Waving red flag
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 22, 6), mat(0xe2e8f0));
      pole.position.set(14, 16, -6);
      g.add(pole);
      const flagGroup = new THREE.Object3D();
      flagGroup.name = 'anim_flag';
      flagGroup.position.set(14.4, 24, -6);
      addBox(flagGroup, 11, 7.5, 0.6, 5.5, 0, 0, flagRed);
      g.add(flagGroup);

      return g;
  }

  // ============================================================
  // 63. CỘT MỐC CHỦ QUYỀN TRƯỜNG SA — KHÁNH HÒA (Biển Đảo Thiêng Liêng)
  // ============================================================
  function buildCotMocTruongSa() {
      const g = new THREE.Object3D();
      const sea = mat(0x0284c7);
      const reef = mat(0x22d3ee, 0x06b6d4, 0.18);
      const sand = mat(0xfef3c7);
      const white = mat(0xf8fafc);
      const flagRed = mat(0xdc2626, 0xb91c1c, 0.25);
      const starYellow = mat(0xfacc15, 0xeab308, 0.55);
      const beaconGlow = mat(0xfef08a, 0xfacc15, 0.8);
      const bangVuong = mat(0x15803d);

      // Deep East Sea & turquoise coral reef atoll
      const ocean = new THREE.Mesh(new THREE.CylinderGeometry(50, 56, 15, 12), sea);
      ocean.position.set(0, -6.5, 0);
      g.add(ocean);
      const coral = new THREE.Mesh(new THREE.CylinderGeometry(36, 40, 4, 12), reef);
      coral.position.set(0, 1, 0);
      g.add(coral);
      const islet = new THREE.Mesh(new THREE.CylinderGeometry(28, 31, 5, 10), sand);
      islet.position.set(0, 4, 0);
      g.add(islet);

      // Iconic Truong Sa Sovereignty Landmark (Cột mốc chủ quyền Trường Sa)
      addBox(g, 14, 4, 14, -8, 8.5, 4, white);
      addBox(g, 9, 18, 9, -8, 19.5, 4, white);
      addBox(g, 9.4, 3, 9.4, -8, 25, 4, flagRed);
      const markerCap = new THREE.Mesh(new THREE.ConeGeometry(7.2, 6, 4), flagRed);
      markerCap.rotation.y = Math.PI / 4;
      markerCap.position.set(-8, 31.5, 4);
      g.add(markerCap);
      const emblem = new THREE.Mesh(new THREE.OctahedronGeometry(2.4, 0), starYellow);
      emblem.position.set(-8, 20, 8.8);
      g.add(emblem);

      // Truong Sa Lighthouse (Hải đăng Trường Sa) on right
      const lhBase = new THREE.Mesh(new THREE.CylinderGeometry(5, 6.5, 12, 8), white);
      lhBase.position.set(14, 12, -4);
      g.add(lhBase);
      const lhMid = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 5, 12, 8), flagRed);
      lhMid.position.set(14, 24, -4);
      g.add(lhMid);
      const lhTop = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 4.2, 10, 8), white);
      lhTop.position.set(14, 35, -4);
      g.add(lhTop);
      const lantern = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.2, 4.5, 8), beaconGlow);
      lantern.position.set(14, 42, -4);
      g.add(lantern);
      const dome = new THREE.Mesh(new THREE.ConeGeometry(4, 4.5, 8), flagRed);
      dome.position.set(14, 46.5, -4);
      g.add(dome);

      // Sea-almond trees (Cây bàng vuông Trường Sa)
      for (const [tx, tz] of [[-20, -6], [4, -14], [22, 8]]) {
          const tree = new THREE.Mesh(new THREE.DodecahedronGeometry(5.5, 0), bangVuong);
          tree.position.set(tx, 10, tz);
          g.add(tree);
      }

      // Tall Proud Vietnam National Flag waving over the East Sea
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.8, 34, 6), white);
      pole.position.set(-8, 48, 4);
      g.add(pole);
      const flagGroup = new THREE.Object3D();
      flagGroup.name = 'anim_flag';
      flagGroup.position.set(-7.5, 59, 4);
      addBox(flagGroup, 16, 10.5, 0.8, 8, 0, 0, flagRed);
      const star = new THREE.Mesh(new THREE.OctahedronGeometry(2.8, 0), starYellow);
      star.scale.set(1, 1, 0.45);
      star.position.set(8, 0, 0);
      flagGroup.add(star);
      g.add(flagGroup);

      return g;
  }


  const BUILDERS = [
    buildCotCoLungCu,
    buildHangPacBo,
    buildThacBanGioc,
    buildTanTrao,
    buildAiChiLang,
    buildAtkDinhHoa,
    buildFansipan,
    buildMuCangChai,
    buildDienBienPhu,
    buildDenHung,
    buildDenDoBacNinh,
    buildChuaMotCot,
    buildHoGuom,
    buildKhueVanCac,
    buildCauLongBien,
    buildConSonKiepBac,
    buildBaiCocBachDang,
    buildVinhHaLong,
    buildChuaDongYenTu,
    buildDenTranNamDinh,
    buildTrangAn,
    buildChuaBaiDinh,
    buildThanhNhaHo,
    buildLangSenQueBac,
    buildNgaBaDongLoc,
    buildPhongNha,
    buildDiaDaoVinhMoc,
    buildCauHienLuong,
    buildThanhCoQuangTri,
    buildKinhThanhHue,
    buildChuaThienMu,
    buildCauRong,
    buildCauVang,
    buildPhoCoHoiAn,
    buildThanhDiaMySon,
    buildDaoLySon,
    buildBaoTangQuangTrung,
    buildGanhDaDia,
    buildVungRoTauKhongSo,
    buildThapCham,
    buildThapPoKlongGarai,
    buildNhaRongKonTum,
    buildDakToTanCanh,
    buildBienHoTNung,
    buildBaoTangCaPhe,
    buildQuangTruongLamVien,
    buildDoiCatMuiNe,
    buildNuiBaDenTayNinh,
    buildChienKhuD,
    buildDiaDaoCuChi,
    buildTuongChuaVungTau,
    buildNhaTuConDao,
    buildNhaThoDucBa,
    buildChoBenThanh,
    buildDinhDocLap,
    buildLandmark81,
    buildCauMyThuan,
    buildDongKhoiBenTre,
    buildChoNoiCaiRang,
    buildDienGioBacLieu,
    buildDaoPhuQuoc,
    buildCotMocTruongSa,
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
