/**
 * ============================================================
 * PHÒNG KHÁM MINI
 * File: src/js/services/benh-nhan-service.js
 * Mô tả:
 * Service quản lý nghiệp vụ bệnh nhân.
 * Service nhận Repository qua Dependency Injection.
 * ============================================================
 */

import {
    TRANG_THAI_BENH_NHAN
} from "../constants/hang-so.js";

import {
    taoBenhNhanMoi,
    chuanHoaBenhNhan,
    timBenhNhanTrung,
    locBenhNhanTheoTuKhoa,
    locBenhNhanTheoTrangThai,
    sapXepBenhNhanMoiNhat
} from "../business/benh-nhan-business.js";

/**
 * Factory tạo service bệnh nhân.
 *
 * @param {Object} dependencies
 * @returns {Object}
 */
export function taoBenhNhanService({

    benhNhanRepository,

    donThuocRepository,

    taoId,

    taoMaBenhNhan,

    layThoiGianHienTai

}) {

    if (!benhNhanRepository) {
        throw new Error("Thiếu benhNhanRepository.");
    }

    if (!donThuocRepository) {
        throw new Error("Thiếu donThuocRepository.");
    }

    if (!taoId) {
        throw new Error("Thiếu hàm taoId.");
    }

    if (!taoMaBenhNhan) {
        throw new Error("Thiếu hàm taoMaBenhNhan.");
    }

    if (!layThoiGianHienTai) {
        throw new Error(
            "Thiếu hàm layThoiGianHienTai."
        );
    }

    /**
     * Lấy danh sách bệnh nhân
     *
     * @returns {Array}
     */
    function layDanhSachBenhNhan() {

        const danhSach =
            benhNhanRepository.layTatCaBenhNhan();

        return sapXepBenhNhanMoiNhat(
            danhSach
        );

    }

    /**
     * Lấy chi tiết bệnh nhân
     *
     * @param {string} id
     * @returns {Object}
     */
    function layChiTietBenhNhan(id) {

        const benhNhan =
            benhNhanRepository.timBenhNhanTheoId(
                id
            );

        if (!benhNhan) {
            throw new Error(
                "Không tìm thấy bệnh nhân."
            );
        }

        return {

            ...benhNhan

        };

    }

    /**
     * Tìm kiếm bệnh nhân
     *
     * @param {string} tuKhoa
     * @param {string} trangThai
     * @returns {Array}
     */
    function timKiemBenhNhan(

        tuKhoa = "",

        trangThai = ""

    ) {

        let ketQua =
            layDanhSachBenhNhan();

        ketQua =
            locBenhNhanTheoTuKhoa(
                ketQua,
                tuKhoa
            );

        ketQua =
            locBenhNhanTheoTrangThai(
                ketQua,
                trangThai
            );

        return ketQua;

    }
        /**
     * Thêm bệnh nhân.
     *
     * @param {Object} duLieu
     * @returns {Object}
     */
    function themBenhNhan(duLieu) {

        const thoiGian =
            layThoiGianHienTai();

        const benhNhanMoi =
            taoBenhNhanMoi(
                duLieu,
                {
                    taoIdFn: taoId,
                    taoMaBenhNhanFn: taoMaBenhNhan,
                    thoiGian
                }
            );

        const danhSach =
            benhNhanRepository.layTatCaBenhNhan();

        const trung =
            timBenhNhanTrung(
                danhSach,
                benhNhanMoi
            );

        if (trung) {
            throw new Error(
                "Bệnh nhân đã tồn tại."
            );
        }

        benhNhanRepository.themBenhNhan(
            benhNhanMoi
        );

        return {
            ...benhNhanMoi
        };

    }

    /**
     * Cập nhật bệnh nhân.
     *
     * @param {string} id
     * @param {Object} duLieu
     * @returns {Object}
     */
    function capNhatBenhNhan(
        id,
        duLieu
    ) {

        const benhNhanCu =
            benhNhanRepository.timBenhNhanTheoId(
                id
            );

        if (!benhNhanCu) {
            throw new Error(
                "Không tìm thấy bệnh nhân."
            );
        }

        const benhNhanMoi = {

            ...benhNhanCu,

            ...chuanHoaBenhNhan(
                duLieu
            ),

            id: benhNhanCu.id,

            maBenhNhan:
                benhNhanCu.maBenhNhan,

            ngayTiepNhan:
                benhNhanCu.ngayTiepNhan,

            ngayCapNhat:
                layThoiGianHienTai()
                    .toISOString()

        };

        const danhSach =
            benhNhanRepository.layTatCaBenhNhan();

        const trung =
            timBenhNhanTrung(
                danhSach,
                benhNhanMoi
            );

        if (trung) {
            throw new Error(
                "Bệnh nhân đã tồn tại."
            );
        }

        benhNhanRepository.capNhatBenhNhan(
            benhNhanMoi
        );

        return {
            ...benhNhanMoi
        };

    }

    /**
     * Xóa bệnh nhân.
     *
     * @param {string} id
     * @returns {boolean}
     */
    function xoaBenhNhan(id) {

        const benhNhan =
            benhNhanRepository.timBenhNhanTheoId(
                id
            );

        if (!benhNhan) {
            throw new Error(
                "Không tìm thấy bệnh nhân."
            );
        }

        const danhSachDonThuoc =
            donThuocRepository.timDonThuocTheoBenhNhan(
                id
            );

        const daCoDonHoanTat =
            danhSachDonThuoc.some(
                (donThuoc) =>
                    donThuoc.trangThai ===
                    "da_hoan_tat"
            );

        if (daCoDonHoanTat) {
            throw new Error(
                "Không thể xóa bệnh nhân đã có đơn thuốc hoàn tất."
            );
        }

        const thanhCong =
            benhNhanRepository.xoaBenhNhan(
                id
            );

        if (!thanhCong) {
            throw new Error(
                "Không thể xóa bệnh nhân."
            );
        }

        return true;

    }
        /**
     * Bắt đầu khám bệnh.
     *
     * @param {string} id
     * @returns {Object}
     */
    function batDauKham(id) {

        const benhNhan =
            benhNhanRepository.timBenhNhanTheoId(
                id
            );

        if (!benhNhan) {
            throw new Error(
                "Không tìm thấy bệnh nhân."
            );
        }

        if (
            benhNhan.trangThai !==
            TRANG_THAI_BENH_NHAN.CHO_KHAM
        ) {
            throw new Error(
                "Bệnh nhân không còn ở trạng thái chờ khám."
            );
        }

        const benhNhanCapNhat = {

            ...benhNhan,

            trangThai:
                TRANG_THAI_BENH_NHAN.DANG_KHAM,

            ngayCapNhat:
                layThoiGianHienTai().toISOString()

        };

        benhNhanRepository.capNhatBenhNhan(
            benhNhanCapNhat
        );

        return {

            ...benhNhanCapNhat

        };

    }

    /**
     * Đưa bệnh nhân trở về trạng thái chờ khám.
     *
     * @param {string} id
     * @returns {Object}
     */
    function duaVeChoKham(id) {

        const benhNhan =
            benhNhanRepository.timBenhNhanTheoId(
                id
            );

        if (!benhNhan) {
            throw new Error(
                "Không tìm thấy bệnh nhân."
            );
        }

        const benhNhanCapNhat = {

            ...benhNhan,

            trangThai:
                TRANG_THAI_BENH_NHAN.CHO_KHAM,

            ngayCapNhat:
                layThoiGianHienTai().toISOString()

        };

        benhNhanRepository.capNhatBenhNhan(
            benhNhanCapNhat
        );

        return {

            ...benhNhanCapNhat

        };

    }

    /**
     * Tạo dữ liệu bệnh nhân mẫu.
     *
     * Chỉ tạo khi chưa có dữ liệu.
     *
     * @returns {Array}
     */
    function taoDuLieuBenhNhanMau() {

        const danhSachHienTai =
            benhNhanRepository.layTatCaBenhNhan();

        if (danhSachHienTai.length > 0) {
            return [...danhSachHienTai];
        }

        const duLieuMau = [

            {
                hoTen: "Nguyễn Văn An",
                ngaySinh: "1998-05-10",
                gioiTinh: "Nam",
                soDienThoai: "0912345678",
                diaChi: "Cần Thơ",
                trieuChung: "Sốt",
                tienSuBenh: "",
                diUngThuoc: ""
            },

            {
                hoTen: "Trần Thị Bình",
                ngaySinh: "1995-11-20",
                gioiTinh: "Nữ",
                soDienThoai: "0988888888",
                diaChi: "Vĩnh Long",
                trieuChung: "Đau họng",
                tienSuBenh: "",
                diUngThuoc: "Penicillin"
            },

            {
                hoTen: "Lê Minh Khang",
                ngaySinh: "2000-02-15",
                gioiTinh: "Nam",
                soDienThoai: "0909999999",
                diaChi: "Sóc Trăng",
                trieuChung: "Ho",
                tienSuBenh: "Hen suyễn",
                diUngThuoc: ""
            }

        ];

        const ketQua = [];

        for (const duLieu of duLieuMau) {

            const benhNhan =
                taoBenhNhan(duLieu);

            ketQua.push(
                benhNhan
            );

        }

        return ketQua;

    }

    return {

        layDanhSachBenhNhan,

        layChiTietBenhNhan,

        themBenhNhan,

        capNhatBenhNhan,

        xoaBenhNhan,

        timKiemBenhNhan,

        batDauKham,

        duaVeChoKham,

        taoDuLieuBenhNhanMau

    };

}