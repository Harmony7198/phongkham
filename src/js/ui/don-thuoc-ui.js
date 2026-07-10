/**
 * ============================================================
 * PHÒNG KHÁM MINI
 * File: src/js/ui/don-thuoc-ui.js
 * ============================================================
 */

import {
    hienThiThongBaoLoi,
    hienThiThongBaoThanhCong,
    xacNhanThaoTac
} from "./thong-bao-ui.js";

let donThuocService = null;
let benhNhanService = null;

/**
 * Lấy phần tử DOM.
 *
 * @param {string} selector
 * @returns {HTMLElement|null}
 */
function lay(selector) {

    return document.querySelector(selector);

}

/**
 * Tạo badge trạng thái đơn.
 *
 * @param {string} trangThai
 * @returns {HTMLElement}
 */
function taoBadgeTrangThai(trangThai) {

    const span =
        document.createElement("span");

    span.classList.add("badge");

    switch (trangThai) {

        case "nhap":
            span.classList.add("badge-nhap");
            span.textContent = "Nháp";
            break;

        case "da_hoan_tat":
            span.classList.add("badge-da-hoan-tat");
            span.textContent = "Đã hoàn tất";
            break;

        case "da_huy":
            span.classList.add("badge-da-huy");
            span.textContent = "Đã hủy";
            break;

        default:
            span.textContent = trangThai;

    }

    return span;

}

/**
 * Khởi tạo UI lịch sử đơn thuốc.
 *
 * @param {Object} options
 */
export function khoiTaoDonThuocUI({

    donThuocService: serviceDonThuoc,

    benhNhanService: serviceBenhNhan

}) {

    donThuocService =
        serviceDonThuoc;

    benhNhanService =
        serviceBenhNhan;

    lay("#timDonThuoc")
        ?.addEventListener(
            "input",
            xuLyTimKiemDonThuoc
        );

    lay("#locTrangThaiDon")
        ?.addEventListener(
            "change",
            xuLyTimKiemDonThuoc
        );

    lay("#dongModalDonThuoc")
        ?.addEventListener(
            "click",
            dongChiTietDonThuoc
        );

    lay("#inDonThuoc")
        ?.addEventListener(
            "click",
            xuLyInDonThuoc
        );

    hienThiDanhSachDonThuoc();

}

/**
 * Hiển thị danh sách đơn thuốc.
 *
 * @param {Array} danhSach
 */
export function hienThiDanhSachDonThuoc(
    danhSach = null
) {

    const tbody =
        lay(
            '[data-testid="danh-sach-don-thuoc"]'
        );

    if (!tbody) {
        return;
    }

    tbody.replaceChildren();

    const duLieu =
        danhSach ??
        donThuocService
            .layDanhSachDonThuoc();

    duLieu.forEach((donThuoc) => {

        const benhNhan =
            benhNhanService
                .layChiTietBenhNhan(
                    donThuoc.benhNhanId
                );

        const tr =
            document.createElement("tr");

        const cotMa =
            document.createElement("td");

        cotMa.textContent =
            donThuoc.maDonThuoc;

        const cotBenhNhan =
            document.createElement("td");

        cotBenhNhan.textContent =
            benhNhan
                ? benhNhan.hoTen
                : "";

        const cotBacSi =
            document.createElement("td");

        cotBacSi.textContent =
            donThuoc.tenBacSi ?? "";

        const cotNgay =
            document.createElement("td");

        cotNgay.textContent =
            donThuoc.ngayKeDon ?? "";

        const cotTrangThai =
            document.createElement("td");

        cotTrangThai.appendChild(
            taoBadgeTrangThai(
                donThuoc.trangThai
            )
        );

        const cotTacVu =
            document.createElement("td");

        const nutXem =
            document.createElement("button");

        nutXem.type = "button";
        nutXem.className =
            "btn btn-primary btn-sm";
        nutXem.textContent =
            "Chi tiết";

        nutXem.addEventListener(
            "click",
            () => {

                hienThiChiTietDonThuoc(
                    donThuoc.id
                );

            }
        );

        cotTacVu.appendChild(
            nutXem
        );

        if (
            donThuoc.trangThai ===
            "nhap"
        ) {

            const nutHuy =
                document.createElement(
                    "button"
                );

            nutHuy.type =
                "button";

            nutHuy.className =
                "btn btn-danger btn-sm";

            nutHuy.textContent =
                "Hủy";

            nutHuy.addEventListener(
                "click",
                () => {

                    xuLyHuyDonThuoc(
                        donThuoc.id
                    );

                }
            );

            cotTacVu.appendChild(
                document.createTextNode(
                    " "
                )
            );

            cotTacVu.appendChild(
                nutHuy
            );

        }

        tr.append(
            cotMa,
            cotBenhNhan,
            cotBacSi,
            cotNgay,
            cotTrangThai,
            cotTacVu
        );

        tbody.appendChild(tr);

    });

}
/**
 * Tìm kiếm và lọc đơn thuốc.
 */
export function xuLyTimKiemDonThuoc() {

    const tuKhoa =
        lay("#timDonThuoc")?.value.trim() ?? "";

    const trangThai =
        lay("#locTrangThaiDon")?.value ?? "";

    try {

        const ketQua =
            donThuocService.timKiemDonThuoc(
                tuKhoa,
                trangThai
            );

        hienThiDanhSachDonThuoc(
            ketQua
        );

    } catch (error) {

        hienThiThongBaoLoi(
            error.message
        );

    }

}

/**
 * Render bảng thuốc trong modal.
 *
 * @param {Array} danhSachThuoc
 */
function hienThiDanhSachThuocTrongModal(
    danhSachThuoc
) {

    const tbody =
        lay("#chiTietDanhSachThuoc");

    if (!tbody) {
        return;
    }

    tbody.replaceChildren();

    (danhSachThuoc ?? []).forEach(
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
                String(
                    thuoc.soNgayDung
                );

            const cotTong =
                document.createElement("td");
            cotTong.textContent =
                String(
                    thuoc.tongSoLuong
                );

            const cotCachDung =
                document.createElement("td");
            cotCachDung.textContent =
                thuoc.cachDung;

            tr.append(
                cotSTT,
                cotTen,
                cotHamLuong,
                cotLieu,
                cotNgay,
                cotTong,
                cotCachDung
            );

            tbody.appendChild(
                tr
            );

        }
    );

}

/**
 * Hiển thị chi tiết đơn thuốc.
 *
 * @param {string} id
 */
export function hienThiChiTietDonThuoc(
    id
) {

    try {

        const donThuoc =
            donThuocService
                .layDonThuocTheoId(
                    id
                );

        const benhNhan =
            benhNhanService
                .layChiTietBenhNhan(
                    donThuoc.benhNhanId
                );

        lay("#modalDonThuoc")
            ?.classList.remove(
                "an"
            );

        lay("#ctMaDon").textContent =
            donThuoc.maDonThuoc;

        lay("#ctNgayKe").textContent =
            donThuoc.ngayKeDon ?? "";

        lay("#ctTenBenhNhan").textContent =
            benhNhan?.hoTen ?? "";

        lay("#ctMaBenhNhan").textContent =
            benhNhan?.maBenhNhan ?? "";

        lay("#ctNgaySinh").textContent =
            benhNhan?.ngaySinh ?? "";

        lay("#ctSoDienThoai").textContent =
            benhNhan?.soDienThoai ?? "";

        lay("#ctDiaChi").textContent =
            benhNhan?.diaChi ?? "";

        lay("#ctTenBacSi").textContent =
            donThuoc.tenBacSi ?? "";

        lay("#ctChuanDoan").textContent =
            donThuoc.chuanDoan ?? "";

        lay("#ctLoiDan").textContent =
            donThuoc.loiDan ?? "";

        lay("#ctTrangThai")
            .replaceChildren(
                taoBadgeTrangThai(
                    donThuoc.trangThai
                )
            );

        hienThiDanhSachThuocTrongModal(
            donThuoc.danhSachThuoc
        );

    } catch (error) {

        hienThiThongBaoLoi(
            error.message
        );

    }

}
/**
 * Hủy đơn thuốc nháp.
 *
 * @param {string} id
 */
export function xuLyHuyDonThuoc(id) {

    const dongY = xacNhanThaoTac(
        "Bạn có chắc chắn muốn hủy đơn thuốc này?"
    );

    if (!dongY) {
        return;
    }

    try {

        donThuocService.huyDonThuoc(id);

        hienThiThongBaoThanhCong(
            "Đã hủy đơn thuốc."
        );

        hienThiDanhSachDonThuoc();

    } catch (error) {

        hienThiThongBaoLoi(
            error.message
        );

    }

}

/**
 * Đóng modal chi tiết đơn thuốc.
 */
export function dongChiTietDonThuoc() {

    const modal =
        lay("#modalDonThuoc");

    if (!modal) {
        return;
    }

    modal.classList.add("an");

}

/**
 * In đơn thuốc.
 */
export function xuLyInDonThuoc() {

    try {

        window.print();

    } catch (error) {

        hienThiThongBaoLoi(
            "Không thể in đơn thuốc."
        );

    }

}

/**
 * Tải lại toàn bộ danh sách đơn thuốc.
 */
export function taiLaiDanhSachDonThuoc() {

    hienThiDanhSachDonThuoc();

}

/**
 * Đóng modal khi bấm nền tối.
 */
const modal = lay("#modalDonThuoc");

if (modal) {

    modal.addEventListener(
        "click",
        (event) => {

            if (event.target === modal) {

                dongChiTietDonThuoc();

            }

        }
    );

}

/**
 * Đóng modal bằng phím Escape.
 */
document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            const modalHienThi =
                lay("#modalDonThuoc");

            if (
                modalHienThi &&
                !modalHienThi.classList.contains("an")
            ) {

                dongChiTietDonThuoc();

            }

        }

    }
);