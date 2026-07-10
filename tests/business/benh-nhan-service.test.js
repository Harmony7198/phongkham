import { describe, it, expect, beforeEach } from "vitest";

import { taoKhoLuuTruGia } from "../helpers/kho-luu-tru-gia.js";

import { taoKhoLuuTru } from "../../src/js/repositories/kho-luu-tru.js";
import { taoBenhNhanRepository } from "../../src/js/repositories/benh-nhan-repository.js";
import { taoDonThuocRepository } from "../../src/js/repositories/don-thuoc-repository.js";

import { taoBenhNhanService } from "../../src/js/services/benh-nhan-service.js";

import {
    TRANG_THAI_BENH_NHAN
} from "../../src/js/constants/hang-so.js";

describe("Business - BenhNhanService", () => {

    let storage;
    let khoLuuTru;

    let benhNhanRepository;
    let donThuocRepository;

    let benhNhanService;

    beforeEach(() => {

        storage = taoKhoLuuTruGia();

        khoLuuTru = taoKhoLuuTru(storage);

        benhNhanRepository =
            taoBenhNhanRepository(khoLuuTru);

        donThuocRepository =
            taoDonThuocRepository(khoLuuTru);

        benhNhanService =
            taoBenhNhanService({

                benhNhanRepository,

                donThuocRepository,

                taoId: () => "ID-001",

                taoMaBenhNhan: () => "BN-20260101-0001",

                layThoiGianHienTai: () =>
                    "2026-01-01T08:00:00"

            });

    });

    function taoDuLieuHopLe() {

        return {

            hoTen: "   nguyen   van    an   ",

            ngaySinh: "2000-05-10",

            gioiTinh: "nam",

            soDienThoai: "0912345678",

            diaChi: "Can Tho",

            trieuChung: "Sot",

            tienSuBenh: "",

            diUngThuoc: ""

        };

    }

    it("1. Thêm bệnh nhân hợp lệ", () => {

        // Arrange
        const duLieu = taoDuLieuHopLe();

        // Act
        const ketQua =
            benhNhanService.themBenhNhan(duLieu);

        const danhSach =
            benhNhanService.layDanhSachBenhNhan();

        // Assert
        expect(ketQua).toBeDefined();
        expect(danhSach).toHaveLength(1);

    });

    it("2. Tự sinh id", () => {

        // Arrange
        const duLieu = taoDuLieuHopLe();

        // Act
        const benhNhan =
            benhNhanService.themBenhNhan(duLieu);

        // Assert
        expect(benhNhan.id)
            .toBe("ID-001");

    });

    it("3. Tự sinh mã bệnh nhân", () => {

        // Arrange
        const duLieu = taoDuLieuHopLe();

        // Act
        const benhNhan =
            benhNhanService.themBenhNhan(duLieu);

        // Assert
        expect(benhNhan.maBenhNhan)
            .toBe("BN-20260101-0001");

    });

    it("4. Tự đặt trạng thái chờ khám", () => {

        // Arrange
        const duLieu = taoDuLieuHopLe();

        // Act
        const benhNhan =
            benhNhanService.themBenhNhan(duLieu);

        // Assert
        expect(benhNhan.trangThai)
            .toBe(TRANG_THAI_BENH_NHAN.CHO_KHAM);

    });

    it("5. Chuẩn hóa họ tên", () => {

        // Arrange
        const duLieu = taoDuLieuHopLe();

        // Act
        const benhNhan =
            benhNhanService.themBenhNhan(duLieu);

        // Assert
        expect(benhNhan.hoTen)
            .toBe("nguyen van an");

    });

    it("6. Từ chối khi thiếu họ tên", () => {

        // Arrange
        const duLieu = taoDuLieuHopLe();

        duLieu.hoTen = "";

        // Act + Assert
        expect(() => {

            benhNhanService.themBenhNhan(duLieu);

        }).toThrow("Họ tên bệnh nhân không được để trống.");

    });

    it("7. Từ chối ngày sinh tương lai", () => {

        // Arrange
        const duLieu = taoDuLieuHopLe();

        duLieu.ngaySinh = "2100-01-01";

        // Act + Assert
        expect(() => {

            benhNhanService.themBenhNhan(duLieu);

        }).toThrow("Ngày sinh không được lớn hơn ngày hiện tại.");

    });

    it("8. Từ chối số điện thoại không hợp lệ", () => {

        // Arrange
        const duLieu = taoDuLieuHopLe();

        duLieu.soDienThoai = "123";

        // Act + Assert
        expect(() => {

            benhNhanService.themBenhNhan(duLieu);

        }).toThrow("Số điện thoại không hợp lệ.");

    });

    it("9. Từ chối bệnh nhân trùng số điện thoại và ngày sinh", () => {

        // Arrange
        const duLieu = taoDuLieuHopLe();

        benhNhanService.themBenhNhan(duLieu);

        // Act + Assert
        expect(() => {

            benhNhanService.themBenhNhan(duLieu);

        }).toThrow("Bệnh nhân đã tồn tại.");

    });

    it("10. Cập nhật bệnh nhân thành công", () => {

        // Arrange
        const duLieu = taoDuLieuHopLe();

        const benhNhan =
            benhNhanService.themBenhNhan(duLieu);

        // Act
        benhNhanService.capNhatBenhNhan(

            benhNhan.id,

            {

                hoTen: "Tran Van B",

                ngaySinh: "2000-05-10",

                gioiTinh: "nam",

                soDienThoai: "0912345678",

                diaChi: "Ha Noi",

                trieuChung: "Ho",

                tienSuBenh: "",

                diUngThuoc: ""

            }

        );

        const capNhat =
            benhNhanService.layChiTietBenhNhan(
                benhNhan.id
            );

        // Assert
        expect(capNhat.hoTen)
            .toBe("Tran Van B");

        expect(capNhat.diaChi)
            .toBe("Ha Noi");

        expect(capNhat.trieuChung)
            .toBe("Ho");

    });
    it("11. Không cập nhật bệnh nhân không tồn tại", () => {

        // Arrange

        // Act + Assert
        expect(() => {

            benhNhanService.capNhatBenhNhan(
                "KHONG_TON_TAI",
                {
                    hoTen: "ABC"
                }
            );

        }).toThrow("Không tìm thấy bệnh nhân.");

    });

    it("12. Tìm kiếm theo mã", () => {

        // Arrange
        const benhNhan =
            benhNhanService.themBenhNhan(
                taoDuLieuHopLe()
            );

        // Act
        const ketQua =
            benhNhanService.timKiemBenhNhan(
                benhNhan.maBenhNhan,
                ""
            );

        // Assert
        expect(ketQua).toHaveLength(1);
        expect(ketQua[0].id).toBe(benhNhan.id);

    });

    it("13. Tìm kiếm theo họ tên không phân biệt hoa thường", () => {

        // Arrange
        benhNhanService.themBenhNhan(
            taoDuLieuHopLe()
        );

        // Act
        const ketQua =
            benhNhanService.timKiemBenhNhan(
                "NGUYEN",
                ""
            );

        // Assert
        expect(ketQua).toHaveLength(1);

    });

    it("14. Tìm kiếm theo số điện thoại", () => {

        // Arrange
        benhNhanService.themBenhNhan(
            taoDuLieuHopLe()
        );

        // Act
        const ketQua =
            benhNhanService.timKiemBenhNhan(
                "0912345678",
                ""
            );

        // Assert
        expect(ketQua).toHaveLength(1);

    });

    it("15. Lọc trạng thái", () => {

        // Arrange
        benhNhanService.themBenhNhan(
            taoDuLieuHopLe()
        );

        // Act
        const ketQua =
            benhNhanService.timKiemBenhNhan(
                "",
                TRANG_THAI_BENH_NHAN.CHO_KHAM
            );

        // Assert
        expect(ketQua).toHaveLength(1);
        expect(ketQua[0].trangThai)
            .toBe(TRANG_THAI_BENH_NHAN.CHO_KHAM);

    });

    it("16. Bắt đầu khám chuyển trạng thái sang dang_kham", () => {

        // Arrange
        const benhNhan =
            benhNhanService.themBenhNhan(
                taoDuLieuHopLe()
            );

        // Act
        benhNhanService.batDauKham(
            benhNhan.id
        );

        const capNhat =
            benhNhanService.layChiTietBenhNhan(
                benhNhan.id
            );

        // Assert
        expect(capNhat.trangThai)
            .toBe(TRANG_THAI_BENH_NHAN.DANG_KHAM);

    });

    it("17. Không bắt đầu khám bệnh nhân đã khám", () => {

        // Arrange
        const benhNhan =
            benhNhanService.themBenhNhan(
                taoDuLieuHopLe()
            );

        benhNhanRepository.thayDoiTrangThaiBenhNhan(
            benhNhan.id,
            TRANG_THAI_BENH_NHAN.DA_KHAM
        );

        // Act + Assert
        expect(() => {

            benhNhanService.batDauKham(
                benhNhan.id
            );

        }).toThrow(
            "Bệnh nhân không còn ở trạng thái chờ khám."
        );

    });

    it("18. Xóa bệnh nhân chưa có đơn thuốc", () => {

        // Arrange
        const benhNhan =
            benhNhanService.themBenhNhan(
                taoDuLieuHopLe()
            );

        // Act
        benhNhanService.xoaBenhNhan(
            benhNhan.id
        );

        const danhSach =
            benhNhanService.layDanhSachBenhNhan();

        // Assert
        expect(danhSach).toHaveLength(0);

    });

    it("19. Không xóa bệnh nhân có đơn thuốc hoàn tất", () => {

        // Arrange
        const benhNhan =
            benhNhanService.themBenhNhan(
                taoDuLieuHopLe()
            );

        donThuocRepository.themDonThuoc({

            id: "DT-001",

            maDonThuoc: "DT-20260101-0001",

            benhNhanId: benhNhan.id,

            tenBacSi: "Bác sĩ A",

            chuanDoan: "Cảm cúm",

            loiDan: "",

            ngayKeDon: "2026-01-01T08:00:00",

            danhSachThuoc: [
                {
                    id: "T1",
                    tenThuoc: "Thuoc mau A"
                }
            ],

            trangThai: "da_hoan_tat"

        });

        // Act + Assert
        expect(() => {

            benhNhanService.xoaBenhNhan(
                benhNhan.id
            );

        }).toThrow(
            "Không thể xóa bệnh nhân đã có đơn thuốc hoàn tất."
        );

    });

});
