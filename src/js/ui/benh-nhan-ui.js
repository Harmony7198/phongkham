/**
 * ============================================================
 * PHÒNG KHÁM MINI
 * File: src/js/ui/benh-nhan-ui.js
 * ============================================================
 */

import {
    hienThiThongBaoThanhCong,
    hienThiThongBaoLoi,
    hienThiLoiForm,
    xoaLoiForm,
    xacNhanThaoTac
} from "./thong-bao-ui.js";

let benhNhanService = null;
let callbackBatDauKham = null;

let benhNhanDangSua = null;

/**
 * Lấy phần tử.
 *
 * @param {string} selector
 * @returns {HTMLElement}
 */
function lay(selector) {
    return document.querySelector(selector);
}

/**
 * Đọc dữ liệu từ form.
 *
 * @returns {Object}
 */
function docDuLieuForm() {

    return {

        hoTen:
            lay("#hoTen").value,

        ngaySinh:
            lay("#ngaySinh").value,

        gioiTinh:
            lay("#gioiTinh").value,

        soDienThoai:
            lay("#soDienThoai").value,

        diaChi:
            lay("#diaChi").value,

        trieuChung:
            lay("#trieuChung").value,

        tienSuBenh:
            lay("#tienSuBenh").value,

        diUngThuoc:
            lay("#diUngThuoc").value

    };

}

/**
 * Đổ dữ liệu lên form.
 *
 * @param {Object} benhNhan
 */
export function dienDuLieuBenhNhanVaoForm(
    benhNhan
) {

    benhNhanDangSua =
        benhNhan.id;

    lay("#benhNhanId").value =
        benhNhan.id;

    lay("#hoTen").value =
        benhNhan.hoTen;

    lay("#ngaySinh").value =
        benhNhan.ngaySinh;

    lay("#gioiTinh").value =
        benhNhan.gioiTinh;

    lay("#soDienThoai").value =
        benhNhan.soDienThoai;

    lay("#diaChi").value =
        benhNhan.diaChi;

    lay("#trieuChung").value =
        benhNhan.trieuChung;

    lay("#tienSuBenh").value =
        benhNhan.tienSuBenh;

    lay("#diUngThuoc").value =
        benhNhan.diUngThuoc;

}

/**
 * Làm mới form.
 */
export function lamMoiFormBenhNhan() {

    benhNhanDangSua = null;

    const form =
        lay('[data-testid="form-benh-nhan"]');

    form.reset();

    lay("#benhNhanId").value = "";

    xoaLoiForm(form);

}

/**
 * Khởi tạo module.
 *
 * @param {Object} options
 */
export function khoiTaoBenhNhanUI({

    service,

    onBatDauKham

}) {

    benhNhanService =
        service;

    callbackBatDauKham =
        onBatDauKham;

    const form =
        lay('[data-testid="form-benh-nhan"]');

    form.addEventListener(
        "submit",
        xuLyLuuBenhNhan
    );

    lay("#lamMoiBenhNhan")
        .addEventListener(
            "click",
            lamMoiFormBenhNhan
        );

    lay('[data-testid="input-tim-benh-nhan"]')
        .addEventListener(
            "input",
            xuLyTimKiemBenhNhan
        );

    lay("#locTrangThaiBenhNhan")
        .addEventListener(
            "change",
            xuLyTimKiemBenhNhan
        );

    hienThiDanhSachBenhNhan();

}
/**
 * Tạo badge trạng thái.
 *
 * @param {string} trangThai
 * @returns {HTMLElement}
 */
function taoBadgeTrangThai(
    trangThai
) {

    const span =
        document.createElement("span");

    span.classList.add(
        "badge",
        `badge-${trangThai}`
    );

    switch (trangThai) {

        case "cho_kham":
            span.textContent = "Chờ khám";
            break;

        case "dang_kham":
            span.textContent = "Đang khám";
            break;

        case "da_kham":
            span.textContent = "Đã khám";
            break;

        default:
            span.textContent = trangThai;

    }

    return span;

}

/**
 * Tạo nút thao tác.
 *
 * @param {string} nhan
 * @param {string} className
 * @param {Function} callback
 * @returns {HTMLButtonElement}
 */
function taoNut(
    nhan,
    className,
    callback
) {

    const button =
        document.createElement("button");

    button.type = "button";
    button.textContent = nhan;
    button.className = className;

    button.addEventListener(
        "click",
        callback
    );

    return button;

}

/**
 * Tạo một dòng bệnh nhân.
 *
 * @param {Object} benhNhan
 * @returns {HTMLTableRowElement}
 */
function taoDongBenhNhan(
    benhNhan
) {

    const tr =
        document.createElement("tr");

    function taoCell(
        noiDung
    ) {

        const td =
            document.createElement("td");

        td.textContent =
            noiDung ?? "";

        return td;

    }

    tr.appendChild(
        taoCell(
            benhNhan.maBenhNhan
        )
    );

    tr.appendChild(
        taoCell(
            benhNhan.hoTen
        )
    );

    tr.appendChild(
        taoCell(
            benhNhan.soDienThoai
        )
    );

    const tdTrangThai =
        document.createElement("td");

    tdTrangThai.appendChild(
        taoBadgeTrangThai(
            benhNhan.trangThai
        )
    );

    tr.appendChild(
        tdTrangThai
    );

    const tdTacVu =
        document.createElement("td");

    tdTacVu.className =
        "cot-thao-tac";

    tdTacVu.appendChild(

        taoNut(
            "Sửa",
            "btn btn-sua",
            () => {

                dienDuLieuBenhNhanVaoForm(
                    benhNhan
                );

            }

        )

    );

    tdTacVu.appendChild(

        taoNut(
            "Xóa",
            "btn btn-xoa",
            () => {

                xuLyXoaBenhNhan(
                    benhNhan.id
                );

            }

        )

    );

    tdTacVu.appendChild(

        taoNut(
            "Khám",
            "btn btn-kham",
            () => {

                if (
                    callbackBatDauKham
                ) {

                    callbackBatDauKham(
                        benhNhan.id
                    );

                }

            }

        )

    );

    tr.appendChild(
        tdTacVu
    );

    return tr;

}

/**
 * Render danh sách bệnh nhân.
 */
export function hienThiDanhSachBenhNhan() {

    const tbody =
        lay(
            '[data-testid="danh-sach-benh-nhan"] tbody'
        );

    if (!tbody) {
        return;
    }

    tbody.replaceChildren();

    const danhSach =
        benhNhanService
            .layDanhSachBenhNhan();

    for (const benhNhan of danhSach) {

        tbody.appendChild(
            taoDongBenhNhan(
                benhNhan
            )
        );

    }

}

/**
 * Xử lý tìm kiếm và lọc.
 */
export function xuLyTimKiemBenhNhan() {

    const tuKhoa =
        lay(
            '[data-testid="input-tim-benh-nhan"]'
        ).value;

    const trangThai =
        lay(
            "#locTrangThaiBenhNhan"
        ).value;

    const tbody =
        lay(
            '[data-testid="danh-sach-benh-nhan"] tbody'
        );

    tbody.replaceChildren();

    const ketQua =
        benhNhanService
            .timKiemBenhNhan(
                tuKhoa,
                trangThai
            );

    for (const benhNhan of ketQua) {

        tbody.appendChild(
            taoDongBenhNhan(
                benhNhan
            )
        );

    }

}
/**
 * Lưu hoặc cập nhật bệnh nhân.
 *
 * @param {SubmitEvent} event
 */
export function xuLyLuuBenhNhan(
    event
) {

    event.preventDefault();

    const form =
        event.currentTarget;

    xoaLoiForm(form);

    const duLieu =
        docDuLieuForm();

    try {

        if (benhNhanDangSua) {

            benhNhanService.capNhatBenhNhan(
                benhNhanDangSua,
                duLieu
            );

            hienThiThongBaoThanhCong(
                "Cập nhật bệnh nhân thành công."
            );

        } else {

            benhNhanService.themBenhNhan(
                duLieu
            );

            hienThiThongBaoThanhCong(
                "Thêm bệnh nhân thành công."
            );

        }

        lamMoiFormBenhNhan();

        hienThiDanhSachBenhNhan();

    } catch (error) {

        if (
            error.loi &&
            typeof error.loi === "object"
        ) {

            hienThiLoiForm(
                form,
                error.loi
            );

        }

        hienThiThongBaoLoi(
            error.message
        );

    }

}

/**
 * Đưa dữ liệu bệnh nhân vào form sửa.
 *
 * @param {string} id
 */
export function xuLySuaBenhNhan(
    id
) {

    try {

        const benhNhan =
            benhNhanService
                .layChiTietBenhNhan(
                    id
                );

        dienDuLieuBenhNhanVaoForm(
            benhNhan
        );

    } catch (error) {

        hienThiThongBaoLoi(
            error.message
        );

    }

}

/**
 * Xóa bệnh nhân.
 *
 * @param {string} id
 */
export function xuLyXoaBenhNhan(
    id
) {

    const dongY =
        xacNhanThaoTac(
            "Bạn có chắc chắn muốn xóa bệnh nhân?"
        );

    if (!dongY) {
        return;
    }

    try {

        benhNhanService.xoaBenhNhan(
            id
        );

        hienThiThongBaoThanhCong(
            "Đã xóa bệnh nhân."
        );

        hienThiDanhSachBenhNhan();

        if (benhNhanDangSua === id) {

            lamMoiFormBenhNhan();

        }

    } catch (error) {

        hienThiThongBaoLoi(
            error.message
        );

    }

}

/**
 * Làm mới toàn bộ danh sách.
 */
export function taiLaiDanhSachBenhNhan() {

    hienThiDanhSachBenhNhan();

}

/**
 * Lấy bệnh nhân đang sửa.
 *
 * @returns {string|null}
 */
export function layBenhNhanDangSua() {

    return benhNhanDangSua;

}