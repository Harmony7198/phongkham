/**
 * ============================================================
 * PHÒNG KHÁM MINI
 * File: src/js/services/don-thuoc-service.js
 * Mô tả:
 * Service quản lý nghiệp vụ đơn thuốc.
 * Sử dụng Dependency Injection.
 * ============================================================
 */

import {
    TRANG_THAI_BENH_NHAN,
    TRANG_THAI_DON_THUOC
} from "../constants/hang-so.js";

import {
    taoDonThuocMoi,
    sapXepDonThuocMoiNhat,
    coTheSuaDonThuoc,
    coTheHuyDonThuoc,
    kiemTraDonThuocCoTheHoanTat
} from "../business/don-thuoc-business.js";

/**
 * Factory tạo service đơn thuốc.
 *
 * @param {Object} dependencies
 * @returns {Object}
 */
export function taoDonThuocService({

    donThuocRepository,

    benhNhanRepository,

    taoId,

    taoMaDonThuoc,

    layThoiGianHienTai

}) {

    if (!donThuocRepository) {
        throw new Error(
            "Thiếu donThuocRepository."
        );
    }

    if (!benhNhanRepository) {
        throw new Error(
            "Thiếu benhNhanRepository."
        );
    }

    if (!taoId) {
        throw new Error(
            "Thiếu hàm taoId."
        );
    }

    if (!taoMaDonThuoc) {
        throw new Error(
            "Thiếu hàm taoMaDonThuoc."
        );
    }

    if (!layThoiGianHienTai) {
        throw new Error(
            "Thiếu hàm layThoiGianHienTai."
        );
    }

    /**
     * Tạo đơn thuốc nháp.
     *
     * @param {string} benhNhanId
     * @param {Object} thongTinKham
     * @returns {Object}
     */
    function taoDonThuocNhap(
        benhNhanId,
        thongTinKham
    ) {

        const benhNhan =
            benhNhanRepository.timBenhNhanTheoId(
                benhNhanId
            );

        if (!benhNhan) {
            throw new Error(
                "Không tìm thấy bệnh nhân."
            );
        }

        if (
            ![
                TRANG_THAI_BENH_NHAN.CHO_KHAM,
                TRANG_THAI_BENH_NHAN.DANG_KHAM
            ].includes(
                benhNhan.trangThai
            )
        ) {

            throw new Error(
                "Bệnh nhân không đủ điều kiện lập đơn thuốc."
            );

        }

        const thoiGian =
            layThoiGianHienTai();

        const donThuoc =
            taoDonThuocMoi(
                benhNhanId,
                thongTinKham,
                {
                    taoIdFn: taoId,
                    taoMaDonThuocFn:
                        taoMaDonThuoc,
                    thoiGian
                }
            );

        donThuocRepository.themDonThuoc(
            donThuoc
        );

        benhNhanRepository.thayDoiTrangThaiBenhNhan(
            benhNhanId,
            TRANG_THAI_BENH_NHAN.DANG_KHAM
        );

        return {

            ...donThuoc

        };

    }

    /**
     * Lấy đơn thuốc theo id.
     *
     * @param {string} id
     * @returns {Object}
     */
    function layDonThuocTheoId(
        id
    ) {

        const donThuoc =
            donThuocRepository.timDonThuocTheoId(
                id
            );

        if (!donThuoc) {
            throw new Error(
                "Không tìm thấy đơn thuốc."
            );
        }

        return {

            ...donThuoc,

            danhSachThuoc:
                [...donThuoc.danhSachThuoc]

        };

    }

    /**
     * Lấy toàn bộ danh sách đơn thuốc.
     *
     * @returns {Array}
     */
    function layDanhSachDonThuoc() {

        const danhSach =
            donThuocRepository.layTatCaDonThuoc();

        return sapXepDonThuocMoiNhat(
            danhSach
        );

    }
        /**
     * Thêm thuốc vào đơn thuốc.
     *
     * @param {string} donThuocId
     * @param {Object} duLieuThuoc
     * @returns {Object}
     */
    function themThuocVaoDon(
        donThuocId,
        duLieuThuoc
    ) {

        const donThuoc =
            donThuocRepository.timDonThuocTheoId(
                donThuocId
            );

        if (!donThuoc) {
            throw new Error(
                "Không tìm thấy đơn thuốc."
            );
        }

        if (!coTheSuaDonThuoc(donThuoc)) {
            throw new Error(
                "Không thể sửa đơn thuốc."
            );
        }

        const thuocMoi = {
            ...duLieuThuoc
        };

        const danhSachThuocMoi = [
            ...donThuoc.danhSachThuoc,
            thuocMoi
        ];

        const donThuocCapNhat = {
            ...donThuoc,
            danhSachThuoc: danhSachThuocMoi
        };

        donThuocRepository.capNhatDonThuoc(
            donThuocCapNhat
        );

        return {
            ...donThuocCapNhat,
            danhSachThuoc: [...danhSachThuocMoi]
        };

    }

    /**
     * Xóa thuốc khỏi đơn thuốc.
     *
     * @param {string} donThuocId
     * @param {string} thuocId
     * @returns {Object}
     */
    function xoaThuocKhoiDon(
        donThuocId,
        thuocId
    ) {

        const donThuoc =
            donThuocRepository.timDonThuocTheoId(
                donThuocId
            );

        if (!donThuoc) {
            throw new Error(
                "Không tìm thấy đơn thuốc."
            );
        }

        if (!coTheSuaDonThuoc(donThuoc)) {
            throw new Error(
                "Không thể sửa đơn thuốc."
            );
        }

        const danhSachThuocMoi =
            donThuoc.danhSachThuoc.filter(
                (thuoc) =>
                    thuoc.id !== thuocId
            );

        const donThuocCapNhat = {
            ...donThuoc,
            danhSachThuoc: danhSachThuocMoi
        };

        donThuocRepository.capNhatDonThuoc(
            donThuocCapNhat
        );

        return {
            ...donThuocCapNhat,
            danhSachThuoc: [...danhSachThuocMoi]
        };

    }

    /**
     * Cập nhật thông tin khám bệnh.
     *
     * @param {string} donThuocId
     * @param {Object} thongTinKham
     * @returns {Object}
     */
    function capNhatThongTinKham(
        donThuocId,
        thongTinKham
    ) {

        const donThuoc =
            donThuocRepository.timDonThuocTheoId(
                donThuocId
            );

        if (!donThuoc) {
            throw new Error(
                "Không tìm thấy đơn thuốc."
            );
        }

        if (!coTheSuaDonThuoc(donThuoc)) {
            throw new Error(
                "Không thể sửa đơn thuốc."
            );
        }

        const donThuocCapNhat = {

            ...donThuoc,

            tenBacSi:
                thongTinKham.tenBacSi,

            chuanDoan:
                thongTinKham.chuanDoan,

            loiDan:
                thongTinKham.loiDan

        };

        donThuocRepository.capNhatDonThuoc(
            donThuocCapNhat
        );

        return {
            ...donThuocCapNhat
        };

    }

    /**
     * Lưu đơn thuốc ở trạng thái nháp.
     *
     * @param {string} donThuocId
     * @returns {Object}
     */
    function luuNhapDonThuoc(
        donThuocId
    ) {

        const donThuoc =
            donThuocRepository.timDonThuocTheoId(
                donThuocId
            );

        if (!donThuoc) {
            throw new Error(
                "Không tìm thấy đơn thuốc."
            );
        }

        if (!coTheSuaDonThuoc(donThuoc)) {
            throw new Error(
                "Không thể lưu đơn thuốc."
            );
        }

        const donThuocCapNhat = {

            ...donThuoc,

            trangThai:
                TRANG_THAI_DON_THUOC.NHAP

        };

        donThuocRepository.capNhatDonThuoc(
            donThuocCapNhat
        );

        return {
            ...donThuocCapNhat,
            danhSachThuoc: [
                ...donThuocCapNhat.danhSachThuoc
            ]
        };

    }
        /**
     * Hoàn tất đơn thuốc.
     *
     * @param {string} donThuocId
     * @returns {Object}
     */
    function hoanTatDonThuoc(
        donThuocId
    ) {

        const donThuoc =
            donThuocRepository.timDonThuocTheoId(
                donThuocId
            );

        if (!donThuoc) {
            throw new Error(
                "Không tìm thấy đơn thuốc."
            );
        }

        if (!coTheSuaDonThuoc(donThuoc)) {
            throw new Error(
                "Không thể hoàn tất đơn thuốc."
            );
        }

        const ketQua =
            kiemTraDonThuocCoTheHoanTat(
                donThuoc
            );

        if (!ketQua.hopLe) {
            throw new Error(
                Object.values(
                    ketQua.loi
                )[0]
            );
        }

        const donThuocCapNhat = {

            ...donThuoc,

            trangThai:
                TRANG_THAI_DON_THUOC.DA_HOAN_TAT

        };

        donThuocRepository.capNhatDonThuoc(
            donThuocCapNhat
        );

        benhNhanRepository.thayDoiTrangThaiBenhNhan(
            donThuoc.benhNhanId,
            TRANG_THAI_BENH_NHAN.DA_KHAM
        );

        return {

            ...donThuocCapNhat,

            danhSachThuoc: [
                ...donThuocCapNhat.danhSachThuoc
            ]

        };

    }

    /**
     * Hủy đơn thuốc.
     *
     * @param {string} donThuocId
     * @returns {Object}
     */
    function huyDonThuoc(
        donThuocId
    ) {

        const donThuoc =
            donThuocRepository.timDonThuocTheoId(
                donThuocId
            );

        if (!donThuoc) {
            throw new Error(
                "Không tìm thấy đơn thuốc."
            );
        }

        if (!coTheHuyDonThuoc(donThuoc)) {
            throw new Error(
                "Không thể hủy đơn thuốc đã hoàn tất."
            );
        }

        const donThuocCapNhat = {

            ...donThuoc,

            trangThai:
                TRANG_THAI_DON_THUOC.DA_HUY

        };

        donThuocRepository.capNhatDonThuoc(
            donThuocCapNhat
        );

        benhNhanRepository.thayDoiTrangThaiBenhNhan(
            donThuoc.benhNhanId,
            TRANG_THAI_BENH_NHAN.CHO_KHAM
        );

        return {

            ...donThuocCapNhat,

            danhSachThuoc: [
                ...donThuocCapNhat.danhSachThuoc
            ]

        };

    }

    /**
     * Tìm kiếm đơn thuốc.
     *
     * @param {string} tuKhoa
     * @param {string} trangThai
     * @returns {Array}
     */
    function timKiemDonThuoc(
        tuKhoa = "",
        trangThai = ""
    ) {

        let danhSach =
            donThuocRepository.layTatCaDonThuoc();

        if (tuKhoa) {

            const keyword =
                tuKhoa.trim().toLowerCase();

            danhSach =
                danhSach.filter(
                    (item) =>

                        item.maDonThuoc
                            ?.toLowerCase()
                            .includes(keyword)

                        ||

                        item.tenBacSi
                            ?.toLowerCase()
                            .includes(keyword)

                        ||

                        item.tenBenhNhan
                            ?.toLowerCase()
                            .includes(keyword)
                );

        }

        if (trangThai) {

            danhSach =
                danhSach.filter(
                    (item) =>
                        item.trangThai ===
                        trangThai
                );

        }

        return sapXepDonThuocMoiNhat(
            danhSach
        );

    }

    return {

        taoDonThuocNhap,

        layDonThuocTheoId,

        layDanhSachDonThuoc,

        themThuocVaoDon,

        xoaThuocKhoiDon,

        capNhatThongTinKham,

        luuNhapDonThuoc,

        hoanTatDonThuoc,

        huyDonThuoc,

        timKiemDonThuoc

    };

}