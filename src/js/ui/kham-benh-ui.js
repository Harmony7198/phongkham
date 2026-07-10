/**
 * ============================================================
 * PHÒNG KHÁM MINI
 * File: src/js/ui/kham-benh-ui.js
 * ============================================================
 */

import {
    hienThiThongBaoThanhCong,
    hienThiThongBaoLoi,
    xacNhanThaoTac
} from "./thong-bao-ui.js";

let donThuocService = null;

let benhNhanService = null;

let donThuocDangKham = null;

let benhNhanDangKham = null;

/**
 * Lấy phần tử DOM.
 *
 * @param {string} selector
 * @returns {HTMLElement}
 */
function lay(selector) {

    return document.querySelector(selector);

}

/**
 * Gán text cho phần tử.
 *
 * @param {string} selector
 * @param {string} noiDung
 */
function ganNoiDung(selector, noiDung) {

    const element = lay(selector);

    if (!element) {
        return;
    }

    element.textContent = noiDung ?? "";

}

/**
 * Xóa thông tin bệnh nhân.
 */
function xoaThongTinBenhNhan() {

    ganNoiDung("#ttMaBenhNhan", "");
    ganNoiDung("#ttHoTen", "");
    ganNoiDung("#ttNgaySinh", "");
    ganNoiDung("#ttSoDienThoai", "");
    ganNoiDung("#ttTrieuChung", "");
    ganNoiDung("#ttTienSuBenh", "");
    ganNoiDung("#ttDiUngThuoc", "");

}

/**
 * Đọc thông tin khám từ form.
 *
 * @returns {Object}
 */
function docThongTinKham() {

    return {

        tenBacSi:
            lay("#tenBacSi").value.trim(),

        chuanDoan:
            lay("#chuanDoan").value.trim(),

        loiDan:
            lay("#loiDan").value.trim()

    };

}

/**
 * Ghi thông tin khám lên form.
 *
 * @param {Object} donThuoc
 */
function dienThongTinKham(donThuoc) {

    lay("#tenBacSi").value =
        donThuoc.tenBacSi ?? "";

    lay("#chuanDoan").value =
        donThuoc.chuanDoan ?? "";

    lay("#loiDan").value =
        donThuoc.loiDan ?? "";

}

/**
 * Khởi tạo module khám bệnh.
 *
 * @param {Object} options
 */
export function khoiTaoKhamBenhUI({

    donThuocService: serviceDonThuoc,

    benhNhanService: serviceBenhNhan

}) {

    donThuocService =
        serviceDonThuoc;

    benhNhanService =
        serviceBenhNhan;

    lay(
        '[data-testid="button-them-thuoc"]'
    )?.addEventListener(
        "click",
        xuLyThemThuoc
    );

    lay("#luuNhapDon")?.addEventListener(
        "click",
        xuLyLuuNhapDonThuoc
    );

    lay(
        '[data-testid="button-hoan-tat-don"]'
    )?.addEventListener(
        "click",
        xuLyHoanTatDonThuoc
    );

    lay("#huyKham")?.addEventListener(
        "click",
        xuLyHuyKham
    );

    xoaThongTinBenhNhan();

}

/**
 * Chọn bệnh nhân để khám.
 *
 * @param {string} benhNhanId
 */
export function chonBenhNhanDeKham(
    benhNhanId
) {

    try {

        const benhNhan =
            benhNhanService
                .layChiTietBenhNhan(
                    benhNhanId
                );

        benhNhanDangKham =
            benhNhan;

        const danhSachDon =
            donThuocService
                .layDanhSachDonThuoc();

        const donNhap =
            danhSachDon.find(
                (item) =>
                    item.benhNhanId === benhNhanId &&
                    item.trangThai === "nhap"
            );

        if (donNhap) {

            donThuocDangKham =
                donNhap;

        } else {

            donThuocDangKham =
                donThuocService
                    .taoDonThuocNhap(
                        benhNhanId,
                        {
                            tenBacSi: "",
                            chuanDoan: "",
                            loiDan: ""
                        }
                    );

        }

        hienThiBenhNhanDangKham();

    } catch (error) {

        hienThiThongBaoLoi(
            error.message
        );

    }

}

/**
 * Hiển thị bệnh nhân đang khám.
 */
export function hienThiBenhNhanDangKham() {

    if (
        !benhNhanDangKham
    ) {

        xoaThongTinBenhNhan();

        return;

    }

    ganNoiDung(
        "#ttMaBenhNhan",
        benhNhanDangKham.maBenhNhan
    );

    ganNoiDung(
        "#ttHoTen",
        benhNhanDangKham.hoTen
    );

    ganNoiDung(
        "#ttNgaySinh",
        benhNhanDangKham.ngaySinh
    );

    ganNoiDung(
        "#ttSoDienThoai",
        benhNhanDangKham.soDienThoai
    );

    ganNoiDung(
        "#ttTrieuChung",
        benhNhanDangKham.trieuChung
    );

    ganNoiDung(
        "#ttTienSuBenh",
        benhNhanDangKham.tienSuBenh
    );

    ganNoiDung(
        "#ttDiUngThuoc",
        benhNhanDangKham.diUngThuoc
    );

    if (donThuocDangKham) {

        dienThongTinKham(
            donThuocDangKham
        );

    }

    hienThiDanhSachThuoc();

}
/**
 * Đọc dữ liệu thuốc từ form.
 *
 * @returns {Object}
 */
function docDuLieuThuoc() {

    const soLuongMoiLan =
        Number(lay("#soLuongMoiLan")?.value || 0);

    const soLanMoiNgay =
        Number(lay("#soLanMoiNgay")?.value || 0);

    const soNgayDung =
        Number(lay("#soNgayDung")?.value || 0);

    return {
        tenThuoc: lay("#tenThuoc")?.value.trim() ?? "",
        hamLuong: lay("#hamLuong")?.value.trim() ?? "",
        donVi: lay("#donVi")?.value.trim() ?? "",
        soLuongMoiLan,
        soLanMoiNgay,
        soNgayDung,
        tongSoLuong:
            soLuongMoiLan *
            soLanMoiNgay *
            soNgayDung,
        cachDung: lay("#cachDung")?.value.trim() ?? "",
        thoiDiemDung:
            lay("#thoiDiemDung")?.value.trim() ?? ""
    };

}

/**
 * Tính tổng số lượng tự động.
 */
export function tinhTongSoLuong() {

    const duLieu =
        docDuLieuThuoc();

    const oTong =
        lay("#tongSoLuong");

    if (!oTong) {
        return;
    }

    oTong.value =
        duLieu.tongSoLuong > 0
            ? duLieu.tongSoLuong
            : "";

}

/**
 * Thêm thuốc vào đơn.
 */
export function xuLyThemThuoc() {

    if (!donThuocDangKham) {

        hienThiThongBaoLoi(
            "Chưa có đơn thuốc."
        );

        return;

    }

    try {

        const thuoc =
            docDuLieuThuoc();

        donThuocDangKham =
            donThuocService.themThuocVaoDon(
                donThuocDangKham.id,
                thuoc
            );

        hienThiThongBaoThanhCong(
            "Đã thêm thuốc."
        );

        hienThiDanhSachThuoc();

        [
            "#tenThuoc",
            "#hamLuong",
            "#donVi",
            "#soLuongMoiLan",
            "#soLanMoiNgay",
            "#soNgayDung",
            "#tongSoLuong",
            "#cachDung",
            "#thoiDiemDung"
        ].forEach((selector) => {

            const element =
                lay(selector);

            if (element) {
                element.value = "";
            }

        });

    } catch (error) {

        hienThiThongBaoLoi(
            error.message
        );

    }

}

/**
 * Xóa thuốc khỏi đơn.
 *
 * @param {string} thuocId
 */
function xoaThuoc(
    thuocId
) {

    const dongY =
        xacNhanThaoTac(
            "Bạn có chắc chắn muốn xóa thuốc này?"
        );

    if (!dongY) {
        return;
    }

    try {

        donThuocDangKham =
            donThuocService.xoaThuocKhoiDon(
                donThuocDangKham.id,
                thuocId
            );

        hienThiThongBaoThanhCong(
            "Đã xóa thuốc."
        );

        hienThiDanhSachThuoc();

    } catch (error) {

        hienThiThongBaoLoi(
            error.message
        );

    }

}

/**
 * Hiển thị danh sách thuốc.
 */
export function hienThiDanhSachThuoc() {

    const tbody =
        lay('[data-testid="danh-sach-thuoc"]');

    if (!tbody) {
        return;
    }

    tbody.replaceChildren();

    if (
        !donThuocDangKham ||
        !Array.isArray(
            donThuocDangKham.danhSachThuoc
        )
    ) {
        return;
    }

    donThuocDangKham.danhSachThuoc.forEach(
        (
            thuoc,
            index
        ) => {

            const tr =
                document.createElement("tr");

            const cotSTT =
                document.createElement("td");
            cotSTT.textContent =
                String(index + 1);

            const cotTen =
                document.createElement("td");
            cotTen.textContent =
                thuoc.tenThuoc;

            const cotHamLuong =
                document.createElement("td");
            cotHamLuong.textContent =
                thuoc.hamLuong;

            const cotLieu =
                document.createElement("td");
            cotLieu.textContent =
                `${thuoc.soLuongMoiLan} ${thuoc.donVi} × ${thuoc.soLanMoiNgay}/ngày`;

            const cotNgay =
                document.createElement("td");
            cotNgay.textContent =
                String(thuoc.soNgayDung);

            const cotTong =
                document.createElement("td");
            cotTong.textContent =
                String(thuoc.tongSoLuong);

            const cotCachDung =
                document.createElement("td");
            cotCachDung.textContent =
                thuoc.cachDung;

            const cotTacVu =
                document.createElement("td");

            const nutXoa =
                document.createElement("button");

            nutXoa.type = "button";
            nutXoa.className =
                "btn btn-danger btn-sm";
            nutXoa.textContent = "Xóa";

            nutXoa.addEventListener(
                "click",
                () => {
                    xoaThuoc(
                        thuoc.id
                    );
                }
            );

            cotTacVu.appendChild(
                nutXoa
            );

            tr.append(
                cotSTT,
                cotTen,
                cotHamLuong,
                cotLieu,
                cotNgay,
                cotTong,
                cotCachDung,
                cotTacVu
            );

            tbody.appendChild(
                tr
            );

        }
    );

}
/**
 * Làm mới toàn bộ màn hình khám.
 */
function lamMoiManHinhKham() {

    benhNhanDangKham = null;
    donThuocDangKham = null;

    xoaThongTinBenhNhan();

    [
        "#tenBacSi",
        "#chuanDoan",
        "#loiDan",
        "#tenThuoc",
        "#hamLuong",
        "#donVi",
        "#soLuongMoiLan",
        "#soLanMoiNgay",
        "#soNgayDung",
        "#tongSoLuong",
        "#cachDung",
        "#thoiDiemDung"
    ].forEach((selector) => {

        const element =
            lay(selector);

        if (element) {
            element.value = "";
        }

    });

    hienThiDanhSachThuoc();

}

/**
 * Lưu đơn thuốc ở trạng thái nháp.
 */
export function xuLyLuuNhapDonThuoc() {

    if (!donThuocDangKham) {

        hienThiThongBaoLoi(
            "Chưa có đơn thuốc."
        );

        return;

    }

    try {

        donThuocDangKham =
            donThuocService.capNhatThongTinKham(
                donThuocDangKham.id,
                docThongTinKham()
            );

        donThuocDangKham =
            donThuocService.luuNhapDonThuoc(
                donThuocDangKham.id
            );

        hienThiThongBaoThanhCong(
            "Đã lưu đơn thuốc nháp."
        );

    } catch (error) {

        hienThiThongBaoLoi(
            error.message
        );

    }

}

/**
 * Hoàn tất đơn thuốc.
 */
export function xuLyHoanTatDonThuoc() {

    if (!donThuocDangKham) {

        hienThiThongBaoLoi(
            "Chưa có đơn thuốc."
        );

        return;

    }

    try {

        donThuocDangKham =
            donThuocService.capNhatThongTinKham(
                donThuocDangKham.id,
                docThongTinKham()
            );

        donThuocDangKham =
            donThuocService.hoanTatDonThuoc(
                donThuocDangKham.id
            );

        hienThiThongBaoThanhCong(
            "Hoàn tất đơn thuốc thành công."
        );

        lamMoiManHinhKham();

    } catch (error) {

        hienThiThongBaoLoi(
            error.message
        );

    }

}

/**
 * Hủy thao tác khám.
 */
export function xuLyHuyKham() {

    if (!donThuocDangKham) {

        lamMoiManHinhKham();

        return;

    }

    const dongY =
        xacNhanThaoTac(
            "Bạn có chắc chắn muốn hủy thao tác khám?"
        );

    if (!dongY) {
        return;
    }

    try {

        if (
            donThuocDangKham.trangThai ===
            "nhap"
        ) {

            donThuocService.huyDonThuoc(
                donThuocDangKham.id
            );

        }

        lamMoiManHinhKham();

        hienThiThongBaoThanhCong(
            "Đã hủy thao tác khám."
        );

    } catch (error) {

        hienThiThongBaoLoi(
            error.message
        );

    }

}

/**
 * Trả về bệnh nhân đang khám.
 *
 * @returns {Object|null}
 */
export function layBenhNhanDangKham() {

    return benhNhanDangKham;

}

/**
 * Trả về đơn thuốc hiện tại.
 *
 * @returns {Object|null}
 */
export function layDonThuocDangKham() {

    return donThuocDangKham;

}

/**
 * Làm mới module khám từ bên ngoài.
 */
export function lamMoiKhamBenh() {

    lamMoiManHinhKham();

}