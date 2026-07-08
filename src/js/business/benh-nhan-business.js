/**
 * ============================================================
 * PHÒNG KHÁM MINI
 * File: src/js/business/benh-nhan-business.js
 * Mô tả:
 * Chứa các hàm nghiệp vụ thuần (Pure Functions)
 * Không truy cập DOM.
 * Không truy cập LocalStorage.
 * Không thay đổi object đầu vào.
 * ============================================================
 */

import {
    TRANG_THAI_BENH_NHAN,
    TRANG_THAI_DON_THUOC
} from "../constants/hang-so.js";

import {
    chuanHoaChuoi,
    kiemTraBenhNhan
} from "../utils/kiem-tra.js";

import {
    taoId,
    taoMaBenhNhan
} from "../utils/ma.js";

import {
    chuyenNgaySangISO
} from "../utils/ngay-thang.js";

/**
 * Chuẩn hóa dữ liệu bệnh nhân.
 *
 * @param {Object} benhNhan
 * @returns {Object}
 */
export function chuanHoaBenhNhan(benhNhan = {}) {

    return {
        ...benhNhan,
        hoTen: chuanHoaChuoi(benhNhan.hoTen),
        diaChi: chuanHoaChuoi(benhNhan.diaChi),
        trieuChung: chuanHoaChuoi(benhNhan.trieuChung),
        tienSuBenh: chuanHoaChuoi(benhNhan.tienSuBenh),
        diUngThuoc: chuanHoaChuoi(benhNhan.diUngThuoc),
        soDienThoai: chuanHoaChuoi(benhNhan.soDienThoai)
    };

}

/**
 * Tạo bệnh nhân mới.
 *
 * @param {Object} duLieu
 * @param {Object} tuyChon
 * @returns {Object}
 */
export function taoBenhNhanMoi(
    duLieu,
    {
        taoIdFn = taoId,
        taoMaBenhNhanFn = taoMaBenhNhan,
        thoiGian = new Date(),
        soNgauNhien = Math.floor(Math.random() * 10000)
    } = {}
) {

    const benhNhan = chuanHoaBenhNhan(duLieu);

    const ketQua = kiemTraBenhNhan(benhNhan);

    if (!ketQua.hopLe) {
        throw new Error(
            Object.values(ketQua.loi)[0]
        );
    }

    const ngayISO =
        chuyenNgaySangISO(thoiGian);

    return {

        id: taoIdFn(
            thoiGian,
            soNgauNhien
        ),

        maBenhNhan: taoMaBenhNhanFn(
            thoiGian,
            soNgauNhien
        ),

        hoTen: benhNhan.hoTen,

        ngaySinh: benhNhan.ngaySinh,

        gioiTinh: benhNhan.gioiTinh ?? "",

        soDienThoai: benhNhan.soDienThoai,

        diaChi: benhNhan.diaChi,

        trieuChung: benhNhan.trieuChung,

        tienSuBenh: benhNhan.tienSuBenh,

        diUngThuoc: benhNhan.diUngThuoc,

        trangThai:
            TRANG_THAI_BENH_NHAN.CHO_KHAM,

        ngayTiepNhan: ngayISO,

        ngayCapNhat: ngayISO

    };

}

/**
 * Tìm bệnh nhân trùng.
 *
 * Trùng khi:
 * - cùng số điện thoại
 * - cùng ngày sinh
 *
 * @param {Array} danhSach
 * @param {Object} benhNhan
 * @returns {Object|null}
 */
export function timBenhNhanTrung(
    danhSach,
    benhNhan
) {

    return (
        danhSach.find(
            (item) =>
                item.soDienThoai ===
                    benhNhan.soDienThoai &&
                item.ngaySinh ===
                    benhNhan.ngaySinh &&
                item.id !== benhNhan.id
        ) || null
    );

}

/**
 * Lọc theo từ khóa.
 *
 * @param {Array} danhSach
 * @param {string} tuKhoa
 * @returns {Array}
 */
export function locBenhNhanTheoTuKhoa(
    danhSach,
    tuKhoa = ""
) {

    const keyword =
        chuanHoaChuoi(tuKhoa).toLowerCase();

    if (!keyword) {
        return [...danhSach];
    }

    return danhSach.filter((item) => {

        return (
            item.maBenhNhan
                ?.toLowerCase()
                .includes(keyword) ||

            item.hoTen
                ?.toLowerCase()
                .includes(keyword) ||

            item.soDienThoai
                ?.includes(keyword)
        );

    });

}

/**
 * Lọc theo trạng thái.
 *
 * @param {Array} danhSach
 * @param {string} trangThai
 * @returns {Array}
 */
export function locBenhNhanTheoTrangThai(
    danhSach,
    trangThai
) {

    if (!trangThai) {
        return [...danhSach];
    }

    return danhSach.filter(
        (item) =>
            item.trangThai === trangThai
    );

}

/**
 * Sắp xếp mới nhất trước.
 *
 * @param {Array} danhSach
 * @returns {Array}
 */
export function sapXepBenhNhanMoiNhat(
    danhSach
) {

    return [...danhSach].sort(
        (a, b) =>
            new Date(b.ngayTiepNhan) -
            new Date(a.ngayTiepNhan)
    );

}

/**
 * Có thể xóa bệnh nhân?
 *
 * @param {Object} benhNhan
 * @param {Array} danhSachDonThuoc
 * @returns {boolean}
 */
export function coTheXoaBenhNhan(
    benhNhan,
    danhSachDonThuoc
) {

    return !danhSachDonThuoc.some(

        (donThuoc) =>

            donThuoc.benhNhanId ===
                benhNhan.id &&

            donThuoc.trangThai ===
                TRANG_THAI_DON_THUOC.DA_HOAN_TAT

    );

}

/**
 * Có thể bắt đầu khám?
 *
 * @param {Object} benhNhan
 * @returns {boolean}
 */
export function coTheBatDauKham(
    benhNhan
) {

    return (
        benhNhan.trangThai ===
        TRANG_THAI_BENH_NHAN.CHO_KHAM
    );

}

/**
 * Có thể lập đơn?
 *
 * @param {Object} benhNhan
 * @returns {boolean}
 */
export function coTheLapDonThuoc(
    benhNhan
) {

    return [

        TRANG_THAI_BENH_NHAN.CHO_KHAM,

        TRANG_THAI_BENH_NHAN.DANG_KHAM

    ].includes(
        benhNhan.trangThai
    );

}