/**
 * ============================================================
 * PHÒNG KHÁM MINI
 * File: src/js/utils/ma.js
 * Mô tả:
 * Các hàm tạo ID và mã nghiệp vụ.
 * Không phụ thuộc trực tiếp vào Date.now() hoặc Math.random()
 * để dễ Unit Test.
 * ============================================================
 */

/**
 * Chuyển số thành chuỗi có đủ số chữ số.
 *
 * @param {number|string} giaTri
 * @param {number} doDai
 * @returns {string}
 */
function boSungSo0(giaTri, doDai = 2) {
    return String(giaTri).padStart(doDai, "0");
}

/**
 * Chuyển Date thành YYYYMMDD.
 *
 * @param {Date} ngay
 * @returns {string}
 */
function dinhDangNgayMa(ngay) {
    const nam = ngay.getFullYear();
    const thang = boSungSo0(ngay.getMonth() + 1);
    const ngayTrongThang = boSungSo0(ngay.getDate());

    return `${nam}${thang}${ngayTrongThang}`;
}

/**
 * Sinh chuỗi ngẫu nhiên.
 *
 * @param {number|string} giaTri
 * @returns {string}
 */
function taoPhanNgauNhien(giaTri) {
    return String(giaTri)
        .replace(/\D/g, "")
        .padStart(4, "0")
        .slice(-4);
}

/**
 * Sinh ID duy nhất.
 *
 * @param {Date} [thoiGian=new Date()]
 * @param {number|string} [phanNgauNhien=Math.floor(Math.random()*1000000)]
 * @returns {string}
 */
export function taoId(
    thoiGian = new Date(),
    phanNgauNhien = Math.floor(Math.random() * 1000000)
) {
    const time = Number(thoiGian.getTime()).toString(36);
    const random = Number(phanNgauNhien).toString(36);

    return `${time}-${random}`;
}

/**
 * Sinh mã bệnh nhân.
 *
 * Dạng:
 * BN-YYYYMMDD-XXXX
 *
 * @param {Date} [thoiGian=new Date()]
 * @param {number|string} [phanNgauNhien=Math.floor(Math.random()*10000)]
 * @returns {string}
 */
export function taoMaBenhNhan(
    thoiGian = new Date(),
    phanNgauNhien = Math.floor(Math.random() * 10000)
) {
    return `BN-${dinhDangNgayMa(thoiGian)}-${taoPhanNgauNhien(
        phanNgauNhien
    )}`;
}

/**
 * Sinh mã đơn thuốc.
 *
 * Dạng:
 * DT-YYYYMMDD-XXXX
 *
 * @param {Date} [thoiGian=new Date()]
 * @param {number|string} [phanNgauNhien=Math.floor(Math.random()*10000)]
 * @returns {string}
 */
export function taoMaDonThuoc(
    thoiGian = new Date(),
    phanNgauNhien = Math.floor(Math.random() * 10000)
) {
    return `DT-${dinhDangNgayMa(thoiGian)}-${taoPhanNgauNhien(
        phanNgauNhien
    )}`;
}