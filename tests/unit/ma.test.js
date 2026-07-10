import { describe, it, expect } from "vitest";

import {
    taoId,
    taoMaBenhNhan,
    taoMaDonThuoc
} from "../../src/js/utils/ma.js";

describe("Tiện ích sinh mã", () => {

    describe("taoMaBenhNhan", () => {

        it("Tạo mã bệnh nhân đúng định dạng", () => {

            // Arrange
            const thoiGian = new Date("2026-07-10T08:00:00Z");
            const ngauNhien = 1234;

            // Act
            const ketQua = taoMaBenhNhan(thoiGian, ngauNhien);

            // Assert
            expect(ketQua).toBe("BN-20260710-1234");

        });

        it("Mã bệnh nhân bắt đầu bằng BN", () => {

            // Arrange
            const thoiGian = new Date("2026-01-02");
            const ngauNhien = 1;

            // Act
            const ketQua = taoMaBenhNhan(thoiGian, ngauNhien);

            // Assert
            expect(ketQua.startsWith("BN-")).toBe(true);

        });

        it("Cùng đầu vào xác định sẽ cho cùng kết quả", () => {

            // Arrange
            const thoiGian = new Date("2025-12-31");
            const ngauNhien = 9999;

            // Act
            const ma1 = taoMaBenhNhan(thoiGian, ngauNhien);
            const ma2 = taoMaBenhNhan(thoiGian, ngauNhien);

            // Assert
            expect(ma1).toBe(ma2);

        });

    });

    describe("taoMaDonThuoc", () => {

        it("Tạo mã đơn thuốc đúng định dạng", () => {

            // Arrange
            const thoiGian = new Date("2026-07-10");
            const ngauNhien = 8888;

            // Act
            const ketQua = taoMaDonThuoc(thoiGian, ngauNhien);

            // Assert
            expect(ketQua).toBe("DT-20260710-8888");

        });

        it("Mã đơn thuốc bắt đầu bằng DT", () => {

            // Arrange
            const thoiGian = new Date("2024-03-15");
            const ngauNhien = 15;

            // Act
            const ketQua = taoMaDonThuoc(thoiGian, ngauNhien);

            // Assert
            expect(ketQua.startsWith("DT-")).toBe(true);

        });

        it("Cùng đầu vào xác định sẽ cho cùng kết quả", () => {

            // Arrange
            const thoiGian = new Date("2027-05-01");
            const ngauNhien = 4321;

            // Act
            const ma1 = taoMaDonThuoc(thoiGian, ngauNhien);
            const ma2 = taoMaDonThuoc(thoiGian, ngauNhien);

            // Assert
            expect(ma1).toBe(ma2);

        });

    });

    describe("taoId", () => {

        it("Tạo id khi truyền giá trị xác định", () => {

            // Arrange
            const thoiGian = 1700000000000;
            const ngauNhien = 123456;

            // Act
            const id = taoId(thoiGian, ngauNhien);

            // Assert
            expect(id).toContain(String(thoiGian));
            expect(id).toContain(String(ngauNhien));

        });

        it("Cùng đầu vào sẽ tạo cùng id", () => {

            // Arrange
            const thoiGian = 1111111111;
            const ngauNhien = 9999;

            // Act
            const id1 = taoId(thoiGian, ngauNhien);
            const id2 = taoId(thoiGian, ngauNhien);

            // Assert
            expect(id1).toBe(id2);

        });

        it("Khác giá trị ngẫu nhiên sẽ tạo id khác nhau", () => {

            // Arrange
            const thoiGian = 1111111111;

            // Act
            const id1 = taoId(thoiGian, 1000);
            const id2 = taoId(thoiGian, 1001);

            // Assert
            expect(id1).not.toBe(id2);

        });

        it("Khác thời gian sẽ tạo id khác nhau", () => {

            // Arrange
            const ngauNhien = 5555;

            // Act
            const id1 = taoId(1000, ngauNhien);
            const id2 = taoId(2000, ngauNhien);

            // Assert
            expect(id1).not.toBe(id2);

        });

    });

    describe("Kiểm tra biên", () => {

        it("Sinh mã với số ngẫu nhiên bằng 0", () => {

            // Arrange
            const thoiGian = new Date("2026-07-10");

            // Act
            const ketQua = taoMaBenhNhan(thoiGian, 0);

            // Assert
            expect(ketQua).toBe("BN-20260710-0000");

        });

        it("Sinh mã với số ngẫu nhiên lớn nhất 9999", () => {

            // Arrange
            const thoiGian = new Date("2026-07-10");

            // Act
            const ketQua = taoMaDonThuoc(thoiGian, 9999);

            // Assert
            expect(ketQua).toBe("DT-20260710-9999");

        });

    });

    describe("Dữ liệu đặc biệt", () => {

        it("Không ném lỗi khi thời gian là undefined", () => {

            // Arrange & Act
            const ham = () => taoMaBenhNhan(undefined, 1234);

            // Assert
            expect(ham).not.toThrow();

        });

        it("Không ném lỗi khi thời gian là null", () => {

            // Arrange & Act
            const ham = () => taoMaDonThuoc(null, 5678);

            // Assert
            expect(ham).not.toThrow();

        });

        it("taoId vẫn trả về chuỗi", () => {

            // Arrange & Act
            const ketQua = taoId();

            // Assert
            expect(typeof ketQua).toBe("string");
            expect(ketQua.length).toBeGreaterThan(0);

        });

    });

});