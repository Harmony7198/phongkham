import { describe, it, expect } from "vitest";

import {
    tinhTongSoLuongThuoc,
    taoThuocTrongDon,
    themThuocVaoDanhSach,
    xoaThuocKhoiDanhSach
} from "../../src/js/business/don-thuoc-business.js";

describe("Business - Đơn thuốc", () => {

    describe("tinhTongSoLuongThuoc", () => {

        it("Tính tổng số lượng thuốc đúng", () => {

            // Arrange
            const soLuongMoiLan = 2;
            const soLanMoiNgay = 3;
            const soNgayDung = 5;

            // Act
            const ketQua = tinhTongSoLuongThuoc(
                soLuongMoiLan,
                soLanMoiNgay,
                soNgayDung
            );

            // Assert
            expect(ketQua).toBe(30);

        });

        it("Từ chối số lượng mỗi lần bằng 0", () => {

            // Arrange

            // Act
            const ham = () =>
                tinhTongSoLuongThuoc(0, 3, 5);

            // Assert
            expect(ham).toThrow();

        });

        it("Từ chối số lần mỗi ngày âm", () => {

            // Arrange

            // Act
            const ham = () =>
                tinhTongSoLuongThuoc(1, -1, 5);

            // Assert
            expect(ham).toThrow();

        });

        it("Từ chối số ngày dùng bằng 0", () => {

            // Arrange

            // Act
            const ham = () =>
                tinhTongSoLuongThuoc(1, 2, 0);

            // Assert
            expect(ham).toThrow();

        });

        it("Từ chối giá trị null", () => {

            // Arrange

            // Act
            const ham = () =>
                tinhTongSoLuongThuoc(null, 2, 5);

            // Assert
            expect(ham).toThrow();

        });

        it("Từ chối undefined", () => {

            // Arrange

            // Act
            const ham = () =>
                tinhTongSoLuongThuoc(undefined, 2, 5);

            // Assert
            expect(ham).toThrow();

        });

    });

    describe("taoThuocTrongDon", () => {

        it("Tạo thuốc hợp lệ", () => {

            // Arrange
            const duLieu = {

                id: "T1",

                tenThuoc: "Paracetamol",

                hamLuong: "500mg",

                donVi: "Viên",

                soLuongMoiLan: 2,

                soLanMoiNgay: 3,

                soNgayDung: 5,

                cachDung: "Uống",

                thoiDiemDung: "Sau ăn"

            };

            // Act
            const thuoc =
                taoThuocTrongDon(duLieu);

            // Assert
            expect(thuoc.tenThuoc)
                .toBe("Paracetamol");

            expect(thuoc.tongSoLuong)
                .toBe(30);

        });

        it("Không làm thay đổi object đầu vào", () => {

            // Arrange
            const duLieu = {

                tenThuoc: "Vitamin C",

                hamLuong: "500mg",

                donVi: "Viên",

                soLuongMoiLan: 1,

                soLanMoiNgay: 2,

                soNgayDung: 7,

                cachDung: "Uống",

                thoiDiemDung: "Sau ăn"

            };

            const banSao =
                structuredClone(duLieu);

            // Act
            taoThuocTrongDon(duLieu);

            // Assert
            expect(duLieu)
                .toEqual(banSao);

        });

        it("Tự tính tổng số lượng", () => {

            // Arrange
            const duLieu = {

                tenThuoc: "Amoxicillin",

                hamLuong: "250mg",

                donVi: "Viên",

                soLuongMoiLan: 1,

                soLanMoiNgay: 3,

                soNgayDung: 10,

                cachDung: "Uống",

                thoiDiemDung: "Sau ăn"

            };

            // Act
            const ketQua =
                taoThuocTrongDon(duLieu);

            // Assert
            expect(ketQua.tongSoLuong)
                .toBe(30);

        });

    });

    describe("themThuocVaoDanhSach", () => {

        it("Thêm thuốc vào danh sách", () => {

            // Arrange
            const danhSach = [];

            const thuoc = {

                id: "T1",

                tenThuoc: "Paracetamol"

            };

            // Act
            const ketQua =
                themThuocVaoDanhSach(
                    danhSach,
                    thuoc
                );

            // Assert
            expect(ketQua)
                .toHaveLength(1);

            expect(ketQua[0].id)
                .toBe("T1");

        });

        it("Không thay đổi mảng đầu vào", () => {

            // Arrange
            const danhSach = [];

            const banSao =
                structuredClone(danhSach);

            const thuoc = {

                id: "T2",

                tenThuoc: "Vitamin C"

            };

            // Act
            themThuocVaoDanhSach(
                danhSach,
                thuoc
            );

            // Assert
            expect(danhSach)
                .toEqual(banSao);

        });

        it("Danh sách mới có nhiều hơn một phần tử", () => {

            // Arrange
            const danhSach = [

                {
                    id: "T1",
                    tenThuoc: "A"
                }

            ];

            const thuoc = {

                id: "T2",

                tenThuoc: "B"

            };

            // Act
            const ketQua =
                themThuocVaoDanhSach(
                    danhSach,
                    thuoc
                );

            // Assert
            expect(ketQua)
                .toHaveLength(2);

        });

    });

    describe("xoaThuocKhoiDanhSach", () => {

        it("Xóa thuốc khỏi danh sách", () => {

            // Arrange
            const danhSach = [

                {
                    id: "T1",
                    tenThuoc: "A"
                },

                {
                    id: "T2",
                    tenThuoc: "B"
                }

            ];

            // Act
            const ketQua =
                xoaThuocKhoiDanhSach(
                    danhSach,
                    "T1"
                );

            // Assert
            expect(ketQua)
                .toHaveLength(1);

            expect(ketQua[0].id)
                .toBe("T2");

        });

        it("Không thay đổi mảng đầu vào", () => {

            // Arrange
            const danhSach = [

                {
                    id: "T1"
                }

            ];

            const banSao =
                structuredClone(danhSach);

            // Act
            xoaThuocKhoiDanhSach(
                danhSach,
                "T1"
            );

            // Assert
            expect(danhSach)
                .toEqual(banSao);

        });

        it("Xóa id không tồn tại", () => {

            // Arrange
            const danhSach = [

                {
                    id: "T1"
                }

            ];

            // Act
            const ketQua =
                xoaThuocKhoiDanhSach(
                    danhSach,
                    "ABC"
                );

            // Assert
            expect(ketQua)
                .toHaveLength(1);

        });

        it("Danh sách rỗng", () => {

            // Arrange
            const danhSach = [];

            // Act
            const ketQua =
                xoaThuocKhoiDanhSach(
                    danhSach,
                    "T1"
                );

            // Assert
            expect(ketQua)
                .toEqual([]);

        });

    });

});
import { describe, it, expect } from "vitest";

import {
    kiemTraDonThuocCoTheHoanTat,
    coTheSuaDonThuoc,
    coTheHuyDonThuoc,
    timKiemDonThuoc,
    sapXepDonThuocMoiNhat
} from "../../src/js/business/don-thuoc-business.js";

import {
    TRANG_THAI_DON_THUOC
} from "../../src/js/constants/hang-so.js";

describe("Business - Quy tắc đơn thuốc", () => {

    describe("kiemTraDonThuocCoTheHoanTat", () => {

        it("Đơn không có thuốc không thể hoàn tất", () => {

            // Arrange
            const donThuoc = {
                tenBacSi: "Nguyễn Văn A",
                chuanDoan: "Cảm cúm",
                danhSachThuoc: []
            };

            // Act
            const ketQua =
                kiemTraDonThuocCoTheHoanTat(donThuoc);

            // Assert
            expect(ketQua).toBe(false);

        });

        it("Đơn thiếu bác sĩ không thể hoàn tất", () => {

            // Arrange
            const donThuoc = {
                tenBacSi: "",
                chuanDoan: "Cảm cúm",
                danhSachThuoc: [
                    { id: "T1" }
                ]
            };

            // Act
            const ketQua =
                kiemTraDonThuocCoTheHoanTat(donThuoc);

            // Assert
            expect(ketQua).toBe(false);

        });

        it("Đơn thiếu chẩn đoán không thể hoàn tất", () => {

            // Arrange
            const donThuoc = {
                tenBacSi: "Bác sĩ A",
                chuanDoan: "",
                danhSachThuoc: [
                    { id: "T1" }
                ]
            };

            // Act
            const ketQua =
                kiemTraDonThuocCoTheHoanTat(donThuoc);

            // Assert
            expect(ketQua).toBe(false);

        });

        it("Đơn hợp lệ có thể hoàn tất", () => {

            // Arrange
            const donThuoc = {
                tenBacSi: "Bác sĩ A",
                chuanDoan: "Viêm họng",
                danhSachThuoc: [
                    { id: "T1" }
                ]
            };

            // Act
            const ketQua =
                kiemTraDonThuocCoTheHoanTat(donThuoc);

            // Assert
            expect(ketQua).toBe(true);

        });

        it("Đơn null không thể hoàn tất", () => {

            // Arrange

            // Act
            const ketQua =
                kiemTraDonThuocCoTheHoanTat(null);

            // Assert
            expect(ketQua).toBe(false);

        });

        it("Đơn undefined không thể hoàn tất", () => {

            // Arrange

            // Act
            const ketQua =
                kiemTraDonThuocCoTheHoanTat(undefined);

            // Assert
            expect(ketQua).toBe(false);

        });

    });

    describe("coTheSuaDonThuoc", () => {

        it("Đơn nhập có thể sửa", () => {

            // Arrange
            const donThuoc = {
                trangThai: TRANG_THAI_DON_THUOC.NHAP
            };

            // Act
            const ketQua =
                coTheSuaDonThuoc(donThuoc);

            // Assert
            expect(ketQua).toBe(true);

        });

        it("Đơn đã hoàn tất không thể sửa", () => {

            // Arrange
            const donThuoc = {
                trangThai: TRANG_THAI_DON_THUOC.DA_HOAN_TAT
            };

            // Act
            const ketQua =
                coTheSuaDonThuoc(donThuoc);

            // Assert
            expect(ketQua).toBe(false);

        });

        it("Đơn đã hủy không thể sửa", () => {

            // Arrange
            const donThuoc = {
                trangThai: TRANG_THAI_DON_THUOC.DA_HUY
            };

            // Act
            const ketQua =
                coTheSuaDonThuoc(donThuoc);

            // Assert
            expect(ketQua).toBe(false);

        });

        it("Đơn null không thể sửa", () => {

            expect(
                coTheSuaDonThuoc(null)
            ).toBe(false);

        });

    });

    describe("coTheHuyDonThuoc", () => {

        it("Đơn nháp có thể hủy", () => {

            // Arrange
            const donThuoc = {
                trangThai: TRANG_THAI_DON_THUOC.NHAP
            };

            // Act
            const ketQua =
                coTheHuyDonThuoc(donThuoc);

            // Assert
            expect(ketQua).toBe(true);

        });

        it("Đơn đã hoàn tất không thể hủy", () => {

            // Arrange
            const donThuoc = {
                trangThai: TRANG_THAI_DON_THUOC.DA_HOAN_TAT
            };

            // Act
            const ketQua =
                coTheHuyDonThuoc(donThuoc);

            // Assert
            expect(ketQua).toBe(false);

        });

        it("Đơn đã hủy không thể hủy lần nữa", () => {

            // Arrange
            const donThuoc = {
                trangThai: TRANG_THAI_DON_THUOC.DA_HUY
            };

            // Act
            const ketQua =
                coTheHuyDonThuoc(donThuoc);

            // Assert
            expect(ketQua).toBe(false);

        });

    });

    describe("timKiemDonThuoc", () => {

        const danhSach = [

            {
                maDonThuoc: "DT001",
                tenBenhNhan: "Nguyễn Văn A",
                tenBacSi: "Bác sĩ Minh"
            },

            {
                maDonThuoc: "DT002",
                tenBenhNhan: "Trần Thị B",
                tenBacSi: "Bác sĩ Lan"
            }

        ];

        it("Tìm theo mã đơn", () => {

            const ketQua =
                timKiemDonThuoc(
                    danhSach,
                    "DT001"
                );

            expect(ketQua).toHaveLength(1);

        });

        it("Tìm theo tên bệnh nhân", () => {

            const ketQua =
                timKiemDonThuoc(
                    danhSach,
                    "Nguyễn"
                );

            expect(ketQua).toHaveLength(1);

        });

        it("Tìm theo tên bác sĩ", () => {

            const ketQua =
                timKiemDonThuoc(
                    danhSach,
                    "Lan"
                );

            expect(ketQua).toHaveLength(1);

        });

        it("Không phân biệt chữ hoa chữ thường", () => {

            const ketQua =
                timKiemDonThuoc(
                    danhSach,
                    "nguyễn"
                );

            expect(ketQua).toHaveLength(1);

        });

        it("Chuỗi rỗng trả về toàn bộ", () => {

            const ketQua =
                timKiemDonThuoc(
                    danhSach,
                    ""
                );

            expect(ketQua).toHaveLength(2);

        });

        it("Không tìm thấy dữ liệu", () => {

            const ketQua =
                timKiemDonThuoc(
                    danhSach,
                    "XYZ"
                );

            expect(ketQua).toHaveLength(0);

        });

    });

    describe("sapXepDonThuocMoiNhat", () => {

        it("Sắp xếp giảm dần theo ngày kê", () => {

            // Arrange
            const danhSach = [

                {
                    id: "1",
                    ngayKeDon: "2025-01-01T08:00:00"
                },

                {
                    id: "2",
                    ngayKeDon: "2025-01-03T08:00:00"
                },

                {
                    id: "3",
                    ngayKeDon: "2025-01-02T08:00:00"
                }

            ];

            // Act
            const ketQua =
                sapXepDonThuocMoiNhat(danhSach);

            // Assert
            expect(ketQua[0].id).toBe("2");
            expect(ketQua[1].id).toBe("3");
            expect(ketQua[2].id).toBe("1");

        });

        it("Không làm thay đổi mảng đầu vào", () => {

            // Arrange
            const danhSach = [
                {
                    id: "1",
                    ngayKeDon: "2025-01-01"
                },
                {
                    id: "2",
                    ngayKeDon: "2025-01-02"
                }
            ];

            const banSao =
                structuredClone(danhSach);

            // Act
            sapXepDonThuocMoiNhat(danhSach);

            // Assert
            expect(danhSach)
                .toEqual(banSao);

        });

        it("Danh sách rỗng", () => {

            const ketQua =
                sapXepDonThuocMoiNhat([]);

            expect(ketQua)
                .toEqual([]);

        });

    });

});