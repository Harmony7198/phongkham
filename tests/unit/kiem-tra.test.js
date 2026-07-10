import { describe, it, expect } from "vitest";

import {
    laChuoiRong,
    chuanHoaChuoi,
    kiemTraSoDienThoai,
    kiemTraSoDuong,
    kiemTraBenhNhan,
    kiemTraThuocTrongDon,
    kiemTraThongTinKham
} from "../../src/js/utils/kiem-tra.js";

describe("Các hàm kiểm tra dữ liệu", () => {

    describe("laChuoiRong", () => {

        it("Chuỗi rỗng", () => {

            expect(laChuoiRong("")).toBe(true);

        });

        it("Chuỗi chỉ có khoảng trắng", () => {

            expect(laChuoiRong("     ")).toBe(true);

        });

        it("Null", () => {

            expect(laChuoiRong(null)).toBe(true);

        });

        it("Undefined", () => {

            expect(laChuoiRong(undefined)).toBe(true);

        });

        it("Chuỗi hợp lệ", () => {

            expect(laChuoiRong("Nguyen Van A")).toBe(false);

        });

    });

    describe("chuanHoaChuoi", () => {

        it("Loại bỏ khoảng trắng thừa", () => {

            expect(
                chuanHoaChuoi("   Nguyen    Van    A   ")
            ).toBe("Nguyen Van A");

        });

        it("Null trả về chuỗi rỗng", () => {

            expect(chuanHoaChuoi(null)).toBe("");

        });

        it("Undefined trả về chuỗi rỗng", () => {

            expect(chuanHoaChuoi(undefined)).toBe("");

        });

    });

    describe("kiemTraSoDienThoai", () => {

        it("Số điện thoại hợp lệ", () => {

            const ketQua = kiemTraSoDienThoai("0912345678");

            expect(ketQua.hopLe).toBe(true);

        });

        it("Số điện thoại quá ngắn", () => {

            const ketQua = kiemTraSoDienThoai("123");

            expect(ketQua.hopLe).toBe(false);

        });

        it("Số điện thoại chứa ký tự", () => {

            const ketQua = kiemTraSoDienThoai("09ABC12345");

            expect(ketQua.hopLe).toBe(false);

        });

        it("Null", () => {

            const ketQua = kiemTraSoDienThoai(null);

            expect(ketQua.hopLe).toBe(false);

        });

    });

    describe("kiemTraSoDuong", () => {

        it("Số dương", () => {

            expect(
                kiemTraSoDuong(5).hopLe
            ).toBe(true);

        });

        it("Bằng 0", () => {

            expect(
                kiemTraSoDuong(0).hopLe
            ).toBe(false);

        });

        it("Số âm", () => {

            expect(
                kiemTraSoDuong(-1).hopLe
            ).toBe(false);

        });

        it("Không phải số", () => {

            expect(
                kiemTraSoDuong("abc").hopLe
            ).toBe(false);

        });

        it("Undefined", () => {

            expect(
                kiemTraSoDuong(undefined).hopLe
            ).toBe(false);

        });

    });

    describe("kiemTraBenhNhan", () => {

        it("Họ tên rỗng", () => {

            const ketQua = kiemTraBenhNhan({

                hoTen: "",
                ngaySinh: "2000-01-01",
                soDienThoai: "0912345678"

            });

            expect(ketQua.hopLe).toBe(false);
            expect(ketQua.loi).toHaveProperty("hoTen");

        });

        it("Họ tên chỉ có khoảng trắng", () => {

            const ketQua = kiemTraBenhNhan({

                hoTen: "      ",
                ngaySinh: "2000-01-01",
                soDienThoai: "0912345678"

            });

            expect(ketQua.hopLe).toBe(false);

        });

        it("Ngày sinh ở tương lai", () => {

            const ketQua = kiemTraBenhNhan({

                hoTen: "Nguyen Van A",
                ngaySinh: "2100-01-01",
                soDienThoai: "0912345678"

            });

            expect(ketQua.hopLe).toBe(false);
            expect(ketQua.loi).toHaveProperty("ngaySinh");

        });

        it("Số điện thoại không hợp lệ", () => {

            const ketQua = kiemTraBenhNhan({

                hoTen: "Nguyen Van A",
                ngaySinh: "2000-01-01",
                soDienThoai: "123"

            });

            expect(ketQua.hopLe).toBe(false);
            expect(ketQua.loi).toHaveProperty("soDienThoai");

        });

        it("Bệnh nhân hợp lệ", () => {

            const ketQua = kiemTraBenhNhan({

                hoTen: "Nguyen Van A",
                ngaySinh: "2000-01-01",
                soDienThoai: "0912345678"

            });

            expect(ketQua.hopLe).toBe(true);

        });

    });

    describe("kiemTraThongTinKham", () => {

        it("Tên bác sĩ rỗng", () => {

            const ketQua = kiemTraThongTinKham({

                tenBacSi: "",
                chuanDoan: "Cam cum"

            });

            expect(ketQua.hopLe).toBe(false);
            expect(ketQua.loi).toHaveProperty("tenBacSi");

        });

        it("Chẩn đoán rỗng", () => {

            const ketQua = kiemTraThongTinKham({

                tenBacSi: "BS A",
                chuanDoan: ""

            });

            expect(ketQua.hopLe).toBe(false);
            expect(ketQua.loi).toHaveProperty("chuanDoan");

        });

        it("Thông tin khám hợp lệ", () => {

            const ketQua = kiemTraThongTinKham({

                tenBacSi: "BS Nguyen",
                chuanDoan: "Viem hong"

            });

            expect(ketQua.hopLe).toBe(true);

        });

    });

    describe("kiemTraThuocTrongDon", () => {

        it("Tên thuốc rỗng", () => {

            const ketQua = kiemTraThuocTrongDon({

                tenThuoc: "",
                soLuongMoiLan: 1,
                soLanMoiNgay: 2,
                soNgayDung: 5

            });

            expect(ketQua.hopLe).toBe(false);
            expect(ketQua.loi).toHaveProperty("tenThuoc");

        });

        it("Số lượng mỗi lần bằng 0", () => {

            const ketQua = kiemTraThuocTrongDon({

                tenThuoc: "Paracetamol",
                soLuongMoiLan: 0,
                soLanMoiNgay: 2,
                soNgayDung: 5

            });

            expect(ketQua.hopLe).toBe(false);
            expect(ketQua.loi).toHaveProperty("soLuongMoiLan");

        });

        it("Số lần mỗi ngày âm", () => {

            const ketQua = kiemTraThuocTrongDon({

                tenThuoc: "Paracetamol",
                soLuongMoiLan: 1,
                soLanMoiNgay: -1,
                soNgayDung: 5

            });

            expect(ketQua.hopLe).toBe(false);
            expect(ketQua.loi).toHaveProperty("soLanMoiNgay");

        });

        it("Số ngày dùng không phải số", () => {

            const ketQua = kiemTraThuocTrongDon({

                tenThuoc: "Paracetamol",
                soLuongMoiLan: 1,
                soLanMoiNgay: 2,
                soNgayDung: "abc"

            });

            expect(ketQua.hopLe).toBe(false);
            expect(ketQua.loi).toHaveProperty("soNgayDung");

        });

        it("Thuốc hợp lệ", () => {

            const ketQua = kiemTraThuocTrongDon({

                tenThuoc: "Paracetamol",
                hamLuong: "500mg",
                donVi: "Vien",
                soLuongMoiLan: 1,
                soLanMoiNgay: 3,
                soNgayDung: 5,
                cachDung: "Uong",
                thoiDiemDung: "Sau an"

            });

            expect(ketQua.hopLe).toBe(true);

        });

    });

});