/**
 * ============================================================
 * PHÒNG KHÁM MINI
 * File: src/js/repositories/don-thuoc-repository.js
 * Mô tả:
 * Repository quản lý dữ liệu đơn thuốc.
 * Chỉ thực hiện CRUD dữ liệu, không chứa quy tắc nghiệp vụ.
 * ============================================================
 */

import { KHOA_LUU_TRU } from "../constants/hang-so.js";
import { khoLuuTru } from "./kho-luu-tru.js";

/**
 * Lấy toàn bộ danh sách đơn thuốc.
 *
 * @returns {Array}
 */
export function layTatCaDonThuoc() {
    return khoLuuTru.docDanhSach(
        KHOA_LUU_TRU.DON_THUOC
    );
}

/**
 * Tìm đơn thuốc theo id.
 *
 * @param {string} id
 * @returns {Object|null}
 */
export function timDonThuocTheoId(id) {

    if (!id) {
        return null;
    }

    const danhSach = layTatCaDonThuoc();

    return (
        danhSach.find(
            (donThuoc) => donThuoc.id === id
        ) || null
    );

}

/**
 * Tìm tất cả đơn thuốc của một bệnh nhân.
 *
 * @param {string} benhNhanId
 * @returns {Array}
 */
export function timDonThuocTheoBenhNhan(
    benhNhanId
) {

    if (!benhNhanId) {
        return [];
    }

    const danhSach = layTatCaDonThuoc();

    return danhSach.filter(
        (donThuoc) =>
            donThuoc.benhNhanId === benhNhanId
    );

}

/**
 * Thêm đơn thuốc.
 *
 * Repository chỉ lưu dữ liệu.
 *
 * @param {Object} donThuoc
 * @returns {Object}
 */
export function themDonThuoc(
    donThuoc
) {

    const danhSach =
        layTatCaDonThuoc();

    danhSach.push(donThuoc);

    khoLuuTru.ghiDanhSach(
        KHOA_LUU_TRU.DON_THUOC,
        danhSach
    );

    return donThuoc;

}

/**
 * Cập nhật đơn thuốc.
 *
 * @param {Object} donThuocMoi
 * @returns {Object|null}
 */
export function capNhatDonThuoc(
    donThuocMoi
) {

    const danhSach =
        layTatCaDonThuoc();

    const viTri =
        danhSach.findIndex(
            (donThuoc) =>
                donThuoc.id === donThuocMoi.id
        );

    if (viTri === -1) {
        return null;
    }

    danhSach[viTri] = {
        ...danhSach[viTri],
        ...donThuocMoi
    };

    khoLuuTru.ghiDanhSach(
        KHOA_LUU_TRU.DON_THUOC,
        danhSach
    );

    return danhSach[viTri];

}

/**
 * Xóa đơn thuốc theo id.
 *
 * Repository không kiểm tra
 * trạng thái đơn thuốc.
 *
 * @param {string} id
 * @returns {boolean}
 */
export function xoaDonThuoc(id) {

    const danhSach =
        layTatCaDonThuoc();

    const danhSachMoi =
        danhSach.filter(
            (donThuoc) =>
                donThuoc.id !== id
        );

    if (
        danhSachMoi.length ===
        danhSach.length
    ) {
        return false;
    }

    khoLuuTru.ghiDanhSach(
        KHOA_LUU_TRU.DON_THUOC,
        danhSachMoi
    );

    return true;

}