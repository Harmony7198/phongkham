import { describe, it, expect, beforeEach } from "vitest";

import { taoKhoLuuTruGia } from "../helpers/kho-luu-tru-gia.js";

import { taoKhoLuuTru } from "../../src/js/repositories/kho-luu-tru.js";
import { taoBenhNhanRepository } from "../../src/js/repositories/benh-nhan-repository.js";
import { taoDonThuocRepository } from "../../src/js/repositories/don-thuoc-repository.js";

import { taoDonThuocService } from "../../src/js/services/don-thuoc-service.js";

import {
    TRANG_THAI_BENH_NHAN,
    TRANG_THAI_DON_THUOC
} from "../../src/js/constants/hang-so.js";

describe("Business - DonThuocService", () => {

    let storage;
    let khoLuuTru;

    let benhNhanRepository;
    let donThuocRepository;

    let donThuocService;

    beforeEach(() => {

        storage = taoKhoLuuTruGia();

        khoLuuTru = taoKhoLuuTru(storage);

        benhNhanRepository =
            taoBenhNhanRepository(khoLuuTru);

        donThuocRepository =
            taoDonThuocRepository(khoLuuTru);

        donThuocService =
            taoDonThuocService({

                benhNhanRepository,

                donThuocRepository,

                taoId: () => "ID-001",

                taoMaDonThuoc: () =>
                    "DT-20260101-0001",

                layThoiGianHienTai: () =>
                    "2026-01-01T08:00:00"

            });

        benhNhanRepository.themBenhNhan({

            id: "BN1",

            maBenhNhan: "BN-20260101-0001",

            hoTen: "Nguyen Van A",

            ngaySinh: "2000-01-01",

            gioiTinh: "nam",

            soDienThoai: "0912345678",

            diaChi: "Can Tho",

            trieuChung: "Sot",

            tienSuBenh: "",

            diUngThuoc: "",

            trangThai:
                TRANG_THAI_BENH_NHAN.CHO_KHAM,

            ngayTiepNhan:
                "2026-01-01T08:00:00",

            ngayCapNhat:
                "2026-01-01T08:00:00"

        });

    });

    function taoThongTinKham() {

        return {

            tenBacSi: "Bac si A",

            chuanDoan: "Cam cum",

            loiDan: "Uong nhieu nuoc"

        };

    }

    function taoThuocHopLe() {

        return {

            tenThuoc: "Thuoc mau A",

            hamLuong: "500mg",

            donVi: "Vien",

            soLuongMoiLan: 2,

            soLanMoiNgay: 3,

            soNgayDung: 5,

            cachDung: "Sau an",

            thoiDiemDung: "Toi"

        };

    }

    it("1. Tạo đơn nháp cho bệnh nhân chờ khám", () => {

        // Arrange

        // Act
        const don =
            donThuocService.taoDonThuocNhap(

                "BN1",

                taoThongTinKham()

            );

        // Assert
        expect(don).toBeDefined();

        expect(don.maDonThuoc)
            .toBe("DT-20260101-0001");

        expect(don.trangThai)
            .toBe(TRANG_THAI_DON_THUOC.NHAP);

    });

    it("2. Chuyển bệnh nhân sang dang_kham", () => {

        // Arrange
        donThuocService.taoDonThuocNhap(
            "BN1",
            taoThongTinKham()
        );

        // Act
        const benhNhan =
            benhNhanRepository
                .timBenhNhanTheoId("BN1");

        // Assert
        expect(benhNhan.trangThai)
            .toBe(
                TRANG_THAI_BENH_NHAN.DANG_KHAM
            );

    });

    it("3. Không tạo đơn cho bệnh nhân không tồn tại", () => {

        // Arrange

        // Act + Assert
        expect(() => {

            donThuocService.taoDonThuocNhap(

                "KHONG_TON_TAI",

                taoThongTinKham()

            );

        }).toThrow(
            "Không tìm thấy bệnh nhân."
        );

    });

    it("4. Không tạo đơn cho bệnh nhân đã khám", () => {

        // Arrange

        benhNhanRepository.thayDoiTrangThaiBenhNhan(

            "BN1",

            TRANG_THAI_BENH_NHAN.DA_KHAM

        );

        // Act + Assert

        expect(() => {

            donThuocService.taoDonThuocNhap(

                "BN1",

                taoThongTinKham()

            );

        }).toThrow();

    });

    it("5. Thêm thuốc hợp lệ", () => {

        // Arrange

        const don =
            donThuocService.taoDonThuocNhap(

                "BN1",

                taoThongTinKham()

            );

        // Act

        const ketQua =
            donThuocService.themThuocVaoDon(

                don.id,

                taoThuocHopLe()

            );

        // Assert

        expect(
            ketQua.danhSachThuoc
        ).toHaveLength(1);

        expect(
            ketQua.danhSachThuoc[0].tenThuoc
        ).toBe("Thuoc mau A");

    });

    it("6. Từ chối thuốc thiếu tên", () => {

        // Arrange

        const don =
            donThuocService.taoDonThuocNhap(

                "BN1",

                taoThongTinKham()

            );

        const thuoc =
            taoThuocHopLe();

        thuoc.tenThuoc = "";

        // Act + Assert

        expect(() => {

            donThuocService.themThuocVaoDon(

                don.id,

                thuoc

            );

        }).toThrow("Tên thuốc không được để trống.");

    });

});
    it("7. Từ chối số lượng không hợp lệ", () => {

        // Arrange
        const don =
            donThuocService.taoDonThuocNhap(
                "BN1",
                taoThongTinKham()
            );

        const thuoc = taoThuocHopLe();

        thuoc.soLuongMoiLan = 0;

        // Act + Assert
        expect(() => {

            donThuocService.themThuocVaoDon(
                don.id,
                thuoc
            );

        }).toThrow();

    });

    it("8. Tính đúng tổng số lượng", () => {

        // Arrange
        const don =
            donThuocService.taoDonThuocNhap(
                "BN1",
                taoThongTinKham()
            );

        // Act
        const ketQua =
            donThuocService.themThuocVaoDon(
                don.id,
                taoThuocHopLe()
            );

        // Assert
        expect(
            ketQua.danhSachThuoc[0].tongSoLuong
        ).toBe(30);

    });

    it("9. Xóa thuốc khỏi đơn nháp", () => {

        // Arrange
        const don =
            donThuocService.taoDonThuocNhap(
                "BN1",
                taoThongTinKham()
            );

        const sauThem =
            donThuocService.themThuocVaoDon(
                don.id,
                taoThuocHopLe()
            );

        const thuocId =
            sauThem.danhSachThuoc[0].id;

        // Act
        const sauXoa =
            donThuocService.xoaThuocKhoiDon(
                don.id,
                thuocId
            );

        // Assert
        expect(
            sauXoa.danhSachThuoc
        ).toHaveLength(0);

    });

    it("10. Cập nhật tên bác sĩ", () => {

        // Arrange
        const don =
            donThuocService.taoDonThuocNhap(
                "BN1",
                taoThongTinKham()
            );

        // Act
        const ketQua =
            donThuocService.capNhatThongTinKham(
                don.id,
                {
                    tenBacSi: "Bác sĩ B",
                    chuanDoan: "Viêm họng",
                    loiDan: "Nghỉ ngơi"
                }
            );

        // Assert
        expect(
            ketQua.tenBacSi
        ).toBe("Bác sĩ B");

    });

    it("11. Cập nhật chẩn đoán", () => {

        // Arrange
        const don =
            donThuocService.taoDonThuocNhap(
                "BN1",
                taoThongTinKham()
            );

        // Act
        const ketQua =
            donThuocService.capNhatThongTinKham(
                don.id,
                {
                    tenBacSi: "Bác sĩ A",
                    chuanDoan: "Viêm phế quản",
                    loiDan: ""
                }
            );

        // Assert
        expect(
            ketQua.chuanDoan
        ).toBe("Viêm phế quản");

    });

    it("12. Lưu đơn nháp", () => {

        // Arrange
        const don =
            donThuocService.taoDonThuocNhap(
                "BN1",
                taoThongTinKham()
            );

        // Act
        const ketQua =
            donThuocService.luuNhapDonThuoc(
                don.id
            );

        // Assert
        expect(
            ketQua.trangThai
        ).toBe(
            TRANG_THAI_DON_THUOC.NHAP
        );

    });

    it("13. Không hoàn tất đơn không có thuốc", () => {

        // Arrange
        const don =
            donThuocService.taoDonThuocNhap(
                "BN1",
                taoThongTinKham()
            );

        // Act + Assert
        expect(() => {

            donThuocService.hoanTatDonThuoc(
                don.id
            );

        }).toThrow(
            "Đơn thuốc phải có ít nhất một thuốc."
        );

    });
        it("14. Không hoàn tất đơn thiếu bác sĩ", () => {

        // Arrange
        const don =
            donThuocService.taoDonThuocNhap(
                "BN1",
                {
                    tenBacSi: "",
                    chuanDoan: "Cảm cúm",
                    loiDan: ""
                }
            );

        donThuocService.themThuocVaoDon(
            don.id,
            taoThuocHopLe()
        );

        // Act + Assert
        expect(() => {

            donThuocService.hoanTatDonThuoc(
                don.id
            );

        }).toThrow(
            "Tên bác sĩ không được để trống."
        );

    });

    it("15. Không hoàn tất đơn thiếu chẩn đoán", () => {

        // Arrange
        const don =
            donThuocService.taoDonThuocNhap(
                "BN1",
                {
                    tenBacSi: "Bác sĩ A",
                    chuanDoan: "",
                    loiDan: ""
                }
            );

        donThuocService.themThuocVaoDon(
            don.id,
            taoThuocHopLe()
        );

        // Act + Assert
        expect(() => {

            donThuocService.hoanTatDonThuoc(
                don.id
            );

        }).toThrow(
            "Chẩn đoán không được để trống."
        );

    });

    it("16. Hoàn tất đơn hợp lệ", () => {

        // Arrange
        const don =
            donThuocService.taoDonThuocNhap(
                "BN1",
                taoThongTinKham()
            );

        donThuocService.themThuocVaoDon(
            don.id,
            taoThuocHopLe()
        );

        // Act
        const ketQua =
            donThuocService.hoanTatDonThuoc(
                don.id
            );

        // Assert
        expect(
            ketQua.trangThai
        ).toBe(
            TRANG_THAI_DON_THUOC.DA_HOAN_TAT
        );

    });

    it("17. Chuyển bệnh nhân sang da_kham", () => {

        // Arrange
        const don =
            donThuocService.taoDonThuocNhap(
                "BN1",
                taoThongTinKham()
            );

        donThuocService.themThuocVaoDon(
            don.id,
            taoThuocHopLe()
        );

        // Act
        donThuocService.hoanTatDonThuoc(
            don.id
        );

        const benhNhan =
            benhNhanRepository.timBenhNhanTheoId(
                "BN1"
            );

        // Assert
        expect(
            benhNhan.trangThai
        ).toBe(
            TRANG_THAI_BENH_NHAN.DA_KHAM
        );

    });

    it("18. Không sửa đơn đã hoàn tất", () => {

        // Arrange
        const don =
            donThuocService.taoDonThuocNhap(
                "BN1",
                taoThongTinKham()
            );

        donThuocService.themThuocVaoDon(
            don.id,
            taoThuocHopLe()
        );

        donThuocService.hoanTatDonThuoc(
            don.id
        );

        // Act + Assert
        expect(() => {

            donThuocService.capNhatThongTinKham(
                don.id,
                {
                    tenBacSi: "Bác sĩ khác",
                    chuanDoan: "Khác",
                    loiDan: ""
                }
            );

        }).toThrow(
            "Không thể sửa đơn thuốc đã hoàn tất."
        );

    });

    it("19. Không hủy đơn đã hoàn tất", () => {

        // Arrange
        const don =
            donThuocService.taoDonThuocNhap(
                "BN1",
                taoThongTinKham()
            );

        donThuocService.themThuocVaoDon(
            don.id,
            taoThuocHopLe()
        );

        donThuocService.hoanTatDonThuoc(
            don.id
        );

        // Act + Assert
        expect(() => {

            donThuocService.huyDonThuoc(
                don.id
            );

        }).toThrow(
            "Không thể hủy đơn thuốc đã hoàn tất."
        );

    });
        it("20. Hủy đơn nháp", () => {

        // Arrange
        const don =
            donThuocService.taoDonThuocNhap(
                "BN1",
                taoThongTinKham()
            );

        // Act
        const ketQua =
            donThuocService.huyDonThuoc(
                don.id
            );

        // Assert
        expect(
            ketQua.trangThai
        ).toBe(
            TRANG_THAI_DON_THUOC.DA_HUY
        );

    });

    it("21. Khi hủy đơn nháp, bệnh nhân trở về cho_kham", () => {

        // Arrange
        const don =
            donThuocService.taoDonThuocNhap(
                "BN1",
                taoThongTinKham()
            );

        // Act
        donThuocService.huyDonThuoc(
            don.id
        );

        const benhNhan =
            benhNhanRepository.timBenhNhanTheoId(
                "BN1"
            );

        // Assert
        expect(
            benhNhan.trangThai
        ).toBe(
            TRANG_THAI_BENH_NHAN.CHO_KHAM
        );

    });

    it("22. Tìm kiếm theo mã đơn", () => {

        // Arrange
        const don =
            donThuocService.taoDonThuocNhap(
                "BN1",
                taoThongTinKham()
            );

        // Act
        const ketQua =
            donThuocService.timKiemDonThuoc(
                don.maDonThuoc,
                ""
            );

        // Assert
        expect(ketQua).toHaveLength(1);
        expect(
            ketQua[0].maDonThuoc
        ).toBe(don.maDonThuoc);

    });

    it("23. Tìm kiếm theo tên bệnh nhân", () => {

        // Arrange
        donThuocService.taoDonThuocNhap(
            "BN1",
            taoThongTinKham()
        );

        // Act
        const ketQua =
            donThuocService.timKiemDonThuoc(
                "nguyen",
                ""
            );

        // Assert
        expect(ketQua).toHaveLength(1);

    });

    it("24. Tìm kiếm theo tên bác sĩ", () => {

        // Arrange
        const don =
            donThuocService.taoDonThuocNhap(
                "BN1",
                taoThongTinKham()
            );

        donThuocService.themThuocVaoDon(
            don.id,
            taoThuocHopLe()
        );

        donThuocService.hoanTatDonThuoc(
            don.id
        );

        // Act
        const ketQua =
            donThuocService.timKiemDonThuoc(
                "Bac si A",
                ""
            );

        // Assert
        expect(ketQua).toHaveLength(1);
        expect(
            ketQua[0].tenBacSi
        ).toBe("Bac si A");

    });

    it("25. Lọc theo trạng thái đơn", () => {

        // Arrange
        const don =
            donThuocService.taoDonThuocNhap(
                "BN1",
                taoThongTinKham()
            );

        donThuocService.themThuocVaoDon(
            don.id,
            taoThuocHopLe()
        );

        donThuocService.hoanTatDonThuoc(
            don.id
        );

        // Act
        const ketQua =
            donThuocService.timKiemDonThuoc(
                "",
                TRANG_THAI_DON_THUOC.DA_HOAN_TAT
            );

        // Assert
        expect(ketQua).toHaveLength(1);
        expect(
            ketQua[0].trangThai
        ).toBe(
            TRANG_THAI_DON_THUOC.DA_HOAN_TAT
        );

    });
