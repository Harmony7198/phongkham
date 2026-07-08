/**
 * ============================================================
 * PHÒNG KHÁM MINI
 * File: src/js/repositories/benh-nhan-repository.js
 * Mô tả:
 * Repository quản lý dữ liệu bệnh nhân.
 * Chỉ thực hiện CRUD dữ liệu, không chứa quy tắc nghiệp vụ.
 * ============================================================
 */

import { KHOA_LUU_TRU } from "../constants/hang-so.js";
import { khoLuuTru } from "./kho-luu-tru.js";

/**
 * Lấy toàn bộ danh sách bệnh nhân.
 *
 * @returns {Array}
 */
export function layTatCaBenhNhan() {
    return khoLuuTru.docDanhSach(
        KHOA_LUU_TRU.BENH_NHAN
    );
}

/**
 * Tìm bệnh nhân theo id.
 *
 * @param {string} id
 * @returns {Object|null}
 */
export function timBenhNhanTheoId(id) {

    if (!id) {
        return null;
    }

    const danhSach = layTatCaBenhNhan();

    return (
        danhSach.find(
            (benhNhan) => benhNhan.id === id
        ) || null
    );

}

/**
 * Thêm bệnh nhân.
 *
 * Repository chỉ thêm dữ liệu,
 * không kiểm tra trùng hay validation.
 *
 * @param {Object} benhNhan
 * @returns {Object}
 */
export function themBenhNhan(benhNhan) {

    const danhSach = layTatCaBenhNhan();

    danhSach.push(benhNhan);

    khoLuuTru.ghiDanhSach(
        KHOA_LUU_TRU.BENH_NHAN,
        danhSach
    );

    return benhNhan;

}

/**
 * Cập nhật bệnh nhân.
 *
 * @param {Object} benhNhanMoi
 * @returns {Object|null}
 */
export function capNhatBenhNhan(
    benhNhanMoi
) {

    const danhSach = layTatCaBenhNhan();

    const viTri = danhSach.findIndex(
        (benhNhan) =>
            benhNhan.id === benhNhanMoi.id
    );

    if (viTri === -1) {
        return null;
    }

    danhSach[viTri] = {
        ...danhSach[viTri],
        ...benhNhanMoi
    };

    khoLuuTru.ghiDanhSach(
        KHOA_LUU_TRU.BENH_NHAN,
        danhSach
    );

    return danhSach[viTri];

}

/**
 * Xóa bệnh nhân theo id.
 *
 * Repository không kiểm tra
 * bệnh nhân đã có đơn thuốc hay chưa.
 *
 * @param {string} id
 * @returns {boolean}
 */
export function xoaBenhNhan(id) {

    const danhSach = layTatCaBenhNhan();

    const danhSachMoi =
        danhSach.filter(
            (benhNhan) =>
                benhNhan.id !== id
        );

    if (
        danhSachMoi.length ===
        danhSach.length
    ) {
        return false;
    }

    khoLuuTru.ghiDanhSach(
        KHOA_LUU_TRU.BENH_NHAN,
        danhSachMoi
    );

    return true;

}

/**
 * Thay đổi trạng thái bệnh nhân.
 *
 * Repository chỉ cập nhật dữ liệu.
 *
 * @param {string} id
 * @param {string} trangThai
 * @returns {Object|null}
 */
export function thayDoiTrangThaiBenhNhan(
    id,
    trangThai
) {

    const danhSach =
        layTatCaBenhNhan();

    const benhNhan =
        danhSach.find(
            (item) =>
                item.id === id
        );

    if (!benhNhan) {
        return null;
    }

    benhNhan.trangThai =
        trangThai;

    benhNhan.ngayCapNhat =
        new Date().toISOString();

    khoLuuTru.ghiDanhSach(
        KHOA_LUU_TRU.BENH_NHAN,
        danhSach
    );

    return benhNhan;

}