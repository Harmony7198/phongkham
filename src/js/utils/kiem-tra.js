/**
 * ============================================================
 * PHÒNG KHÁM MINI
 * File: src/js/utils/kiem-tra.js
 * Mô tả:
 * Các hàm kiểm tra dữ liệu đầu vào.
 * (PHẦN 1)
 * ============================================================
 */

/**
 * Tạo kết quả kiểm tra hợp lệ.
 *
 * @returns {{hopLe: boolean, loi: Object}}
 */
function taoKetQuaHopLe() {
    return {
        hopLe: true,
        loi: {}
    };
}

/**
 * Tạo kết quả kiểm tra không hợp lệ.
 *
 * @param {string} tenTruong
 * @param {string} thongBao
 * @returns {{hopLe: boolean, loi: Object}}
 */
function taoKetQuaKhongHopLe(tenTruong, thongBao) {
    return {
        hopLe: false,
        loi: {
            [tenTruong]: thongBao
        }
    };
}

/**
 * Kiểm tra chuỗi có rỗng hay không.
 *
 * undefined
 * null
 * ""
 * "     "
 * đều được xem là rỗng.
 *
 * @param {*} giaTri
 * @returns {boolean}
 */
export function laChuoiRong(giaTri) {
    if (giaTri === null || giaTri === undefined) {
        return true;
    }

    return String(giaTri).trim().length === 0;
}

/**
 * Chuẩn hóa chuỗi.
 *
 * - Loại bỏ khoảng trắng đầu/cuối.
 * - Gom nhiều khoảng trắng thành một.
 *
 * @param {*} giaTri
 * @returns {string}
 */
export function chuanHoaChuoi(giaTri) {
    if (giaTri === null || giaTri === undefined) {
        return "";
    }

    return String(giaTri)
        .trim()
        .replace(/\s+/g, " ");
}

/**
 * Kiểm tra số điện thoại Việt Nam.
 *
 * Chấp nhận:
 * 03xxxxxxxx
 * 05xxxxxxxx
 * 07xxxxxxxx
 * 08xxxxxxxx
 * 09xxxxxxxx
 *
 * Trả về:
 * {
 *   hopLe,
 *   loi
 * }
 *
 * @param {string} soDienThoai
 * @returns {{hopLe:boolean, loi:Object}}
 */
export function kiemTraSoDienThoai(soDienThoai) {

    const so = chuanHoaChuoi(soDienThoai);

    if (laChuoiRong(so)) {
        return taoKetQuaKhongHopLe(
            "soDienThoai",
            "Số điện thoại không được để trống."
        );
    }

    const mau =
        /^(03|05|07|08|09)\d{8}$/;

    if (!mau.test(so)) {
        return taoKetQuaKhongHopLe(
            "soDienThoai",
            "Số điện thoại không hợp lệ."
        );
    }

    return taoKetQuaHopLe();
}

/**
 * Kiểm tra số dương.
 *
 * @param {*} giaTri
 * @param {string} tenTruong
 * @returns {{hopLe:boolean, loi:Object}}
 */
export function kiemTraSoDuong(
    giaTri,
    tenTruong = "giaTri"
) {

    if (
        giaTri === null ||
        giaTri === undefined ||
        giaTri === ""
    ) {
        return taoKetQuaKhongHopLe(
            tenTruong,
            "Giá trị không được để trống."
        );
    }

    const so = Number(giaTri);

    if (!Number.isFinite(so)) {
        return taoKetQuaKhongHopLe(
            tenTruong,
            "Giá trị phải là số."
        );
    }

    if (so <= 0) {
        return taoKetQuaKhongHopLe(
            tenTruong,
            "Giá trị phải lớn hơn 0."
        );
    }

    return taoKetQuaHopLe();
}
/**
 * ============================================================
 * PHÒNG KHÁM MINI
 * File: src/js/utils/kiem-tra.js
 * (PHẦN 2)
 * ============================================================
 */

import { laNgayTrongTuongLai } from "./ngay-thang.js";

/**
 * Kiểm tra thông tin bệnh nhân.
 *
 * @param {Object} benhNhan
 * @returns {{hopLe:boolean, loi:Object}}
 */
export function kiemTraBenhNhan(benhNhan = {}) {

    const loi = {};

    const hoTen = chuanHoaChuoi(benhNhan.hoTen);
    const ngaySinh = benhNhan.ngaySinh;
    const soDienThoai = chuanHoaChuoi(benhNhan.soDienThoai);

    if (laChuoiRong(hoTen)) {
        loi.hoTen = "Họ tên không được để trống.";
    }

    if (laChuoiRong(ngaySinh)) {
        loi.ngaySinh = "Ngày sinh không được để trống.";
    }
    else if (laNgayTrongTuongLai(ngaySinh)) {
        loi.ngaySinh = "Ngày sinh không được lớn hơn ngày hiện tại.";
    }

    const ketQuaSoDienThoai = kiemTraSoDienThoai(soDienThoai);

    if (!ketQuaSoDienThoai.hopLe) {
        loi.soDienThoai =
            ketQuaSoDienThoai.loi.soDienThoai;
    }

    return {
        hopLe: Object.keys(loi).length === 0,
        loi
    };
}

/**
 * Kiểm tra một thuốc trong đơn.
 *
 * @param {Object} thuoc
 * @returns {{hopLe:boolean, loi:Object}}
 */
export function kiemTraThuocTrongDon(thuoc = {}) {

    const loi = {};

    if (laChuoiRong(thuoc.tenThuoc)) {
        loi.tenThuoc = "Tên thuốc không được để trống.";
    }

    if (laChuoiRong(thuoc.hamLuong)) {
        loi.hamLuong = "Hàm lượng không được để trống.";
    }

    if (laChuoiRong(thuoc.donVi)) {
        loi.donVi = "Đơn vị không được để trống.";
    }

    const soLuongMoiLan =
        kiemTraSoDuong(
            thuoc.soLuongMoiLan,
            "soLuongMoiLan"
        );

    if (!soLuongMoiLan.hopLe) {
        loi.soLuongMoiLan =
            soLuongMoiLan.loi.soLuongMoiLan;
    }

    const soLanMoiNgay =
        kiemTraSoDuong(
            thuoc.soLanMoiNgay,
            "soLanMoiNgay"
        );

    if (!soLanMoiNgay.hopLe) {
        loi.soLanMoiNgay =
            soLanMoiNgay.loi.soLanMoiNgay;
    }

    const soNgayDung =
        kiemTraSoDuong(
            thuoc.soNgayDung,
            "soNgayDung"
        );

    if (!soNgayDung.hopLe) {
        loi.soNgayDung =
            soNgayDung.loi.soNgayDung;
    }

    return {
        hopLe: Object.keys(loi).length === 0,
        loi
    };
}

/**
 * Kiểm tra thông tin khám bệnh.
 *
 * @param {Object} thongTin
 * @returns {{hopLe:boolean, loi:Object}}
 */
export function kiemTraThongTinKham(thongTin = {}) {

    const loi = {};

    if (laChuoiRong(thongTin.tenBacSi)) {
        loi.tenBacSi =
            "Tên bác sĩ không được để trống.";
    }

    if (laChuoiRong(thongTin.chuanDoan)) {
        loi.chuanDoan =
            "Chẩn đoán không được để trống.";
    }

    if (
        !Array.isArray(thongTin.danhSachThuoc) ||
        thongTin.danhSachThuoc.length === 0
    ) {
        loi.danhSachThuoc =
            "Đơn thuốc phải có ít nhất một loại thuốc.";
    }
    else {

        thongTin.danhSachThuoc.forEach((thuoc, index) => {

            const ketQua =
                kiemTraThuocTrongDon(thuoc);

            if (!ketQua.hopLe) {
                loi[`thuoc_${index}`] =
                    ketQua.loi;
            }

        });

    }

    return {
        hopLe: Object.keys(loi).length === 0,
        loi
    };
}