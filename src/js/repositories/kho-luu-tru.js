/**
 * ============================================================
 * PHÒNG KHÁM MINI
 * File: src/js/repositories/kho-luu-tru.js
 * Mô tả:
 * Repository lưu trữ LocalStorage.
 * Có thể inject storage giả để Unit Test.
 * ============================================================
 */

import {
    KHOA_LUU_TRU,
    PHIEN_BAN_DU_LIEU
} from "../constants/hang-so.js";

/**
 * Tạo kho lưu trữ.
 *
 * @param {Storage} [storage]
 * @returns {Object}
 */
export function taoKhoLuuTru(
    storage = globalThis.localStorage
) {

    if (!storage) {
        throw new Error("Storage không tồn tại.");
    }

    /**
     * Đọc một giá trị.
     *
     * @param {string} khoa
     * @param {*} giaTriMacDinh
     * @returns {*}
     */
    function docGiaTri(
        khoa,
        giaTriMacDinh = null
    ) {

        const duLieu = storage.getItem(khoa);

        if (duLieu === null) {
            return giaTriMacDinh;
        }

        try {
            return JSON.parse(duLieu);
        }
        catch (loi) {
            throw new Error(
                `Không thể đọc dữ liệu của khóa "${khoa}": ${loi.message}`
            );
        }

    }

    /**
     * Ghi một giá trị.
     *
     * @param {string} khoa
     * @param {*} giaTri
     */
    function ghiGiaTri(
        khoa,
        giaTri
    ) {

        storage.setItem(
            khoa,
            JSON.stringify(giaTri)
        );

    }

    /**
     * Đọc danh sách.
     *
     * @param {string} khoa
     * @returns {Array}
     */
    function docDanhSach(khoa) {

        const ketQua = docGiaTri(khoa, []);

        return Array.isArray(ketQua)
            ? ketQua
            : [];

    }

    /**
     * Ghi danh sách.
     *
     * @param {string} khoa
     * @param {Array} danhSach
     */
    function ghiDanhSach(
        khoa,
        danhSach
    ) {

        if (!Array.isArray(danhSach)) {
            throw new Error(
                "Danh sách phải là Array."
            );
        }

        ghiGiaTri(
            khoa,
            danhSach
        );

    }

    /**
     * Xóa một khóa.
     *
     * @param {string} khoa
     */
    function xoaTheoKhoa(khoa) {

        storage.removeItem(khoa);

    }

    /**
     * Xóa toàn bộ dữ liệu ứng dụng.
     */
    function xoaToanBo() {

        xoaTheoKhoa(
            KHOA_LUU_TRU.BENH_NHAN
        );

        xoaTheoKhoa(
            KHOA_LUU_TRU.DON_THUOC
        );

        xoaTheoKhoa(
            KHOA_LUU_TRU.PHIEN_BAN_DU_LIEU
        );

    }

    /**
     * Khởi tạo dữ liệu mặc định.
     */
    function khoiTaoDuLieuMau() {

        if (
            storage.getItem(KHOA_LUU_TRU.BENH_NHAN) === null
        ) {

            ghiDanhSach(
                KHOA_LUU_TRU.BENH_NHAN,
                []
            );

        }

        if (
            storage.getItem(KHOA_LUU_TRU.DON_THUOC) === null
        ) {

            ghiDanhSach(
                KHOA_LUU_TRU.DON_THUOC,
                []
            );

        }

        if (
            storage.getItem(
                KHOA_LUU_TRU.PHIEN_BAN_DU_LIEU
            ) === null
        ) {

            ghiGiaTri(
                KHOA_LUU_TRU.PHIEN_BAN_DU_LIEU,
                PHIEN_BAN_DU_LIEU
            );

        }

    }

    return {

        docDanhSach,

        ghiDanhSach,

        docGiaTri,

        ghiGiaTri,

        xoaTheoKhoa,

        xoaToanBo,

        khoiTaoDuLieuMau

    };

}

/**
 * Kho lưu trữ mặc định của ứng dụng.
 */
export const khoLuuTru = taoKhoLuuTru();