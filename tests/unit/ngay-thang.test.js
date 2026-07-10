import { describe, it, expect } from "vitest";

import {
    layNgayHienTai,
    dinhDangNgay,
    dinhDangNgayGio,
    laNgayTrongTuongLai,
    tinhTuoi,
    chuyenNgaySangISO
} from "../../src/js/utils/ngay-thang.js";

describe("Tiện ích ngày tháng", () => {

    describe("laNgayTrongTuongLai", () => {

        it("Nhận biết ngày trong tương lai", () => {

            // Arrange
            const ngay = "2100-01-01";

            // Act
            const ketQua = laNgayTrongTuongLai(ngay);

            // Assert
            expect(ketQua).toBe(true);

        });

        it("Ngày hiện tại không phải ngày tương lai", () => {

            // Arrange
            const homNay = new Date();

            // Act
            const ketQua = laNgayTrongTuongLai(homNay);

            // Assert
            expect(ketQua).toBe(false);

        });

        it("Ngày quá khứ không phải ngày tương lai", () => {

            // Arrange
            const ngay = "2000-01-01";

            // Act
            const ketQua = laNgayTrongTuongLai(ngay);

            // Assert
            expect(ketQua).toBe(false);

        });

        it("Ngày không hợp lệ trả về false", () => {

            // Arrange
            const ngay = "abcxyz";

            // Act
            const ketQua = laNgayTrongTuongLai(ngay);

            // Assert
            expect(ketQua).toBe(false);

        });

    });

    describe("tinhTuoi", () => {

        it("Tính đúng tuổi sau sinh nhật", () => {

            // Arrange
            const ngaySinh = "2000-01-01";
            const homNay = new Date("2026-07-10");

            // Act
            const tuoi = tinhTuoi(ngaySinh, homNay);

            // Assert
            expect(tuoi).toBe(26);

        });

        it("Tính đúng tuổi trước sinh nhật", () => {

            // Arrange
            const ngaySinh = "2000-12-31";
            const homNay = new Date("2026-07-10");

            // Act
            const tuoi = tinhTuoi(ngaySinh, homNay);

            // Assert
            expect(tuoi).toBe(25);

        });

        it("Ngày sinh đúng hôm nay", () => {

            // Arrange
            const ngaySinh = "2026-07-10";
            const homNay = new Date("2026-07-10");

            // Act
            const tuoi = tinhTuoi(ngaySinh, homNay);

            // Assert
            expect(tuoi).toBe(0);

        });

        it("Ngày sinh không hợp lệ", () => {

            // Arrange
            const ngaySinh = "abc";

            // Act
            const tuoi = tinhTuoi(ngaySinh);

            // Assert
            expect(tuoi).toBeNull();

        });

        it("Ngày sinh null", () => {

            // Arrange

            // Act
            const tuoi = tinhTuoi(null);

            // Assert
            expect(tuoi).toBeNull();

        });

    });

    describe("dinhDangNgay", () => {

        it("Định dạng đúng YYYY-MM-DD", () => {

            // Arrange
            const ngay = new Date("2026-07-10");

            // Act
            const ketQua = dinhDangNgay(ngay);

            // Assert
            expect(ketQua).toBe("2026-07-10");

        });

        it("Ngày dạng chuỗi ISO", () => {

            // Arrange
            const ngay = "2026-07-10T10:20:30";

            // Act
            const ketQua = dinhDangNgay(ngay);

            // Assert
            expect(ketQua).toBe("2026-07-10");

        });

        it("Ngày không hợp lệ", () => {

            // Arrange

            // Act
            const ketQua = dinhDangNgay("abc");

            // Assert
            expect(ketQua).toBe("");

        });

    });

    describe("dinhDangNgayGio", () => {

        it("Có chứa ngày", () => {

            // Arrange
            const ngay = new Date("2026-07-10T08:30:15");

            // Act
            const ketQua = dinhDangNgayGio(ngay);

            // Assert
            expect(ketQua).toContain("2026");

        });

        it("Ngày không hợp lệ", () => {

            // Arrange

            // Act
            const ketQua = dinhDangNgayGio(undefined);

            // Assert
            expect(ketQua).toBe("");

        });

    });

    describe("chuyenNgaySangISO", () => {

        it("Chuyển Date sang ISO", () => {

            // Arrange
            const ngay = new Date("2026-07-10");

            // Act
            const ketQua = chuyenNgaySangISO(ngay);

            // Assert
            expect(ketQua).toContain("2026-07-10");

        });

        it("Giữ nguyên chuỗi ISO hợp lệ", () => {

            // Arrange
            const ngay = "2026-07-10";

            // Act
            const ketQua = chuyenNgaySangISO(ngay);

            // Assert
            expect(ketQua).toContain("2026-07-10");

        });

        it("Ngày không hợp lệ", () => {

            // Arrange

            // Act
            const ketQua = chuyenNgaySangISO("abc");

            // Assert
            expect(ketQua).toBe("");

        });

    });

    describe("layNgayHienTai", () => {

        it("Trả về đối tượng Date", () => {

            // Arrange

            // Act
            const ketQua = layNgayHienTai();

            // Assert
            expect(ketQua).toBeInstanceOf(Date);

        });

    });

});