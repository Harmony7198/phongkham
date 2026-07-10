/**
 * ============================================================
 * PHÒNG KHÁM MINI
 * File: src/js/business/don-thuoc-business.js
 * Mô tả:
 * Chứa các hàm nghiệp vụ thuần (Pure Functions)
 * Không truy cập DOM.
 * Không truy cập LocalStorage.
 * Không thay đổi object đầu vào.
 * ============================================================
 */

import { TRANG_THAI_DON_THUOC } from "../constants/hang-so.js";
import {
    kiemTraThuocTrongDon,
    kiemTraThongTinKham,
    chuanHoaChuoi
} from "../utils/kiem-tra.js";

import {
    taoId,
    taoMaDonThuoc
} from "../utils/ma.js";

import {
    chuyenNgaySangISO
} from "../utils/ngay-thang.js";

/**
 * Tính tổng số lượng thuốc.
 *
 * @param {number} soLuongMoiLan
 * @param {number} soLanMoiNgay
 * @param {number} soNgayDung
 * @returns {number}
 */
export function tinhTongSoLuongThuoc(
    soLuongMoiLan,
    soLanMoiNgay,
    soNgayDung
) {

    const tong =
        Number(soLuongMoiLan) *
        Number(soLanMoiNgay) *
        Number(soNgayDung);

    if (!Number.isFinite(tong) || tong <= 0) {
        return 0;
    }

    return tong;

}

/**
 * Tạo thuốc trong đơn.
 *
 * @param {Object} duLieu
 * @param {Object} tuyChon
 * @returns {Object}
 */
export function taoThuocTrongDon(
    duLieu,
    {
        taoIdFn = taoId,
        thoiGian = new Date(),
        soNgauNhien = Math.floor(Math.random() * 10000)
    } = {}
) {

    const thuoc = {

        id: taoIdFn(
            thoiGian,
            soNgauNhien
        ),

        tenThuoc:
            chuanHoaChuoi(
                duLieu.tenThuoc
            ),

        hamLuong:
            chuanHoaChuoi(
                duLieu.hamLuong
            ),

        donVi:
            chuanHoaChuoi(
                duLieu.donVi
            ),

        soLuongMoiLan:
            Number(
                duLieu.soLuongMoiLan
            ),

        soLanMoiNgay:
            Number(
                duLieu.soLanMoiNgay
            ),

        soNgayDung:
            Number(
                duLieu.soNgayDung
            ),

        cachDung:
            chuanHoaChuoi(
                duLieu.cachDung
            ),

        thoiDiemDung:
            chuanHoaChuoi(
                duLieu.thoiDiemDung
            )

    };

    thuoc.tongSoLuong =
        tinhTongSoLuongThuoc(
            thuoc.soLuongMoiLan,
            thuoc.soLanMoiNgay,
            thuoc.soNgayDung
        );

    const ketQua =
        kiemTraThuocTrongDon(
            thuoc
        );

    if (!ketQua.hopLe) {
        throw new Error(
            Object.values(
                ketQua.loi
            )[0]
        );
    }

    return {

        ...thuoc

    };

}

/**
 * Tạo đơn thuốc mới.
 *
 * @param {string} benhNhanId
 * @param {Object} thongTinKham
 * @param {Object} tuyChon
 * @returns {Object}
 */
export function taoDonThuocMoi(
    benhNhanId,
    thongTinKham,
    {
        taoIdFn = taoId,
        taoMaDonThuocFn = taoMaDonThuoc,
        thoiGian = new Date(),
        soNgauNhien = Math.floor(Math.random() * 10000)
    } = {}
) {

    const ketQua =
        kiemTraThongTinKham(
            thongTinKham
        );

    if (!ketQua.hopLe) {
        throw new Error(
            Object.values(
                ketQua.loi
            )[0]
        );
    }

    const ngayISO =
        chuyenNgaySangISO(
            thoiGian
        );

    return {

        id: taoIdFn(
            thoiGian,
            soNgauNhien
        ),

        maDonThuoc:
            taoMaDonThuocFn(
                thoiGian,
                soNgauNhien
            ),

        benhNhanId,

        tenBacSi:
            chuanHoaChuoi(
                thongTinKham.tenBacSi
            ),

        chuanDoan:
            chuanHoaChuoi(
                thongTinKham.chuanDoan
            ),

        loiDan:
            chuanHoaChuoi(
                thongTinKham.loiDan
            ),

        ngayKeDon:
            ngayISO,

        danhSachThuoc: [],

        trangThai:
            TRANG_THAI_DON_THUOC.NHAP

    };

}

/**
 * Thêm thuốc vào danh sách.
 *
 * @param {Array} danhSach
 * @param {Object} thuoc
 * @returns {Array}
 */
export function themThuocVaoDanhSach(
    danhSach,
    thuoc
) {

    return [
        ...danhSach,
        {
            ...thuoc
        }
    ];

}

/**
 * Xóa thuốc khỏi danh sách.
 *
 * @param {Array} danhSach
 * @param {string} thuocId
 * @returns {Array}
 */
export function xoaThuocKhoiDanhSach(
    danhSach,
    thuocId
) {

    return danhSach.filter(
        (item) =>
            item.id !== thuocId
    );

}

/**
 * Kiểm tra đơn thuốc
 * có thể hoàn tất.
 *
 * @param {Object} donThuoc
 * @returns {Object}
 */
export function kiemTraDonThuocCoTheHoanTat(
    donThuoc
) {

    const loi = {};

    const kham =
        kiemTraThongTinKham(
            donThuoc
        );

    Object.assign(
        loi,
        kham.loi
    );

    if (
        !Array.isArray(
            donThuoc.danhSachThuoc
        ) ||
        donThuoc.danhSachThuoc.length === 0
    ) {

        loi.danhSachThuoc =
            "Đơn thuốc phải có ít nhất một loại thuốc.";

    } else {

        for (const thuoc of donThuoc.danhSachThuoc) {

            const ketQua =
                kiemTraThuocTrongDon(
                    thuoc
                );

            if (!ketQua.hopLe) {

                Object.assign(
                    loi,
                    ketQua.loi
                );

                break;

            }

        }

    }

    return {

        hopLe:
            Object.keys(loi).length === 0,

        loi

    };

}

/**
 * Có thể sửa đơn?
 *
 * @param {Object} donThuoc
 * @returns {boolean}
 */
export function coTheSuaDonThuoc(
    donThuoc
) {

    return ![
        TRANG_THAI_DON_THUOC.DA_HOAN_TAT,
        TRANG_THAI_DON_THUOC.DA_HUY
    ].includes(
        donThuoc.trangThai
    );

}

/**
 * Có thể hủy đơn?
 *
 * @param {Object} donThuoc
 * @returns {boolean}
 */
export function coTheHuyDonThuoc(
    donThuoc
) {

    return (
        donThuoc.trangThai ===
        TRANG_THAI_DON_THUOC.NHAP
    );

}

/**
 * Tìm kiếm đơn thuốc.
 *
 * @param {Array} danhSach
 * @param {string} tuKhoa
 * @returns {Array}
 */
export function timKiemDonThuoc(
    danhSach,
    tuKhoa = ""
) {

    const keyword =
        chuanHoaChuoi(
            tuKhoa
        ).toLowerCase();

    if (!keyword) {
        return [...danhSach];
    }

    return danhSach.filter(
        (item) =>
            item.maDonThuoc
                ?.toLowerCase()
                .includes(keyword) ||

            item.tenBacSi
                ?.toLowerCase()
                .includes(keyword) ||

            item.tenBenhNhan
                ?.toLowerCase()
                .includes(keyword)
    );

}

/**
 * Sắp xếp đơn thuốc mới nhất.
 *
 * @param {Array} danhSach
 * @returns {Array}
 */
export function sapXepDonThuocMoiNhat(
    danhSach
) {

    return [...danhSach].sort(
        (a, b) =>
            new Date(
                b.ngayKeDon
            ) -
            new Date(
                a.ngayKeDon
            )
    );

}