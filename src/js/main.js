/**
 * ============================================================
 * PHÒNG KHÁM MINI
 * File: src/js/main.js
 * ============================================================
 */

import {
    taoKhoLuuTru
} from "./repositories/kho-luu-tru.js";

import {
    taoBenhNhanRepository
} from "./repositories/benh-nhan-repository.js";

import {
    taoDonThuocRepository
} from "./repositories/don-thuoc-repository.js";

import {
    taoBenhNhanService
} from "./services/benh-nhan-service.js";

import {
    taoDonThuocService
} from "./services/don-thuoc-service.js";

import {
    taoId,
    taoMaBenhNhan,
    taoMaDonThuoc
} from "./utils/ma.js";

import {
    layNgayHienTai
} from "./utils/ngay-thang.js";

import {
    khoiTaoBenhNhanUI,
    taiLaiDanhSachBenhNhan
} from "./ui/benh-nhan-ui.js";

import {
    khoiTaoKhamBenhUI
} from "./ui/kham-benh-ui.js";

import {
    khoiTaoDonThuocUI,
    taiLaiDanhSachDonThuoc
} from "./ui/don-thuoc-ui.js";

import {
    hienThiThongBaoThanhCong,
    hienThiThongBaoLoi,
    xacNhanThaoTac
} from "./ui/thong-bao-ui.js";

/* ============================================================
 * KHO LƯU TRỮ
 * ============================================================
 */

const khoLuuTru =
    taoKhoLuuTru();

/* ============================================================
 * REPOSITORY
 * ============================================================
 */

const benhNhanRepository =
    taoBenhNhanRepository({
        khoLuuTru
    });

const donThuocRepository =
    taoDonThuocRepository({
        khoLuuTru
    });

/* ============================================================
 * SERVICE
 * ============================================================
 */

const benhNhanService =
    taoBenhNhanService({

        benhNhanRepository,

        donThuocRepository,

        taoId,

        taoMaBenhNhan,

        layThoiGianHienTai:
            layNgayHienTai

    });

const donThuocService =
    taoDonThuocService({

        donThuocRepository,

        benhNhanRepository,

        taoId,

        taoMaDonThuoc,

        layThoiGianHienTai:
            layNgayHienTai

    });

/* ============================================================
 * BIẾN TOÀN CỤC
 * ============================================================
 */

const DANH_SACH_KHU_VUC = [

    "tiep-nhan",

    "kham-benh",

    "lich-su"

];

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
 * Lấy tất cả phần tử DOM.
 *
 * @param {string} selector
 * @returns {NodeListOf<HTMLElement>}
 */
function layTatCa(selector) {

    return document.querySelectorAll(selector);

}

/**
 * Render lại toàn bộ dữ liệu trên giao diện.
 */
function taiLaiToanBoDuLieu() {

    taiLaiDanhSachBenhNhan();

    taiLaiDanhSachDonThuoc();

}

/**
 * Khởi tạo các module UI.
 */
function khoiTaoCacModuleUI() {

    khoiTaoBenhNhanUI({

        benhNhanService

    });

    khoiTaoKhamBenhUI({

        benhNhanService,

        donThuocService

    });

    khoiTaoDonThuocUI({

        benhNhanService,

        donThuocService

    });

}
/* ============================================================
 * NAVIGATION
 * ============================================================
 */

/**
 * Hiển thị một khu vực và ẩn các khu vực còn lại.
 *
 * @param {string} tenKhuVuc
 */
function hienThiKhuVuc(tenKhuVuc) {

    DANH_SACH_KHU_VUC.forEach((ten) => {

        const khuVuc =
            lay(`#${ten}`);

        if (!khuVuc) {
            return;
        }

        khuVuc.classList.toggle(
            "an",
            ten !== tenKhuVuc
        );

    });

    layTatCa("[data-section]").forEach((nut) => {

        const dangDuocChon =
            nut.dataset.section === tenKhuVuc;

        nut.classList.toggle(
            "active",
            dangDuocChon
        );

        nut.setAttribute(
            "aria-selected",
            String(dangDuocChon)
        );

    });

}

/**
 * Khởi tạo thanh điều hướng SPA.
 */
function khoiTaoNavigation() {

    layTatCa("[data-section]").forEach((nut) => {

        nut.addEventListener(
            "click",
            () => {

                hienThiKhuVuc(
                    nut.dataset.section
                );

            }
        );

    });

    hienThiKhuVuc(
        "tiep-nhan"
    );

}

/* ============================================================
 * DỮ LIỆU MẪU
 * ============================================================
 */

/**
 * Sinh dữ liệu mẫu.
 */
function taoDuLieuMau() {

    const dongY =
        xacNhanThaoTac(
            "Tạo dữ liệu mẫu? Dữ liệu hiện tại vẫn được giữ nguyên."
        );

    if (!dongY) {
        return;
    }

    try {

        benhNhanService.taoDuLieuBenhNhanMau();

        taiLaiToanBoDuLieu();

        hienThiThongBaoThanhCong(
            "Đã tạo dữ liệu mẫu."
        );

    } catch (error) {

        hienThiThongBaoLoi(
            error.message
        );

    }

}

/**
 * Gắn sự kiện cho nút tạo dữ liệu mẫu.
 */
function khoiTaoNutDuLieuMau() {

    lay("#taoDuLieuMau")
        ?.addEventListener(
            "click",
            taoDuLieuMau
        );

}

/* ============================================================
 * XÓA DỮ LIỆU
 * ============================================================
 */

/**
 * Xóa toàn bộ dữ liệu LocalStorage.
 */
function xoaToanBoDuLieu() {

    const dongY =
        xacNhanThaoTac(
            "Toàn bộ dữ liệu sẽ bị xóa. Bạn có chắc chắn?"
        );

    if (!dongY) {
        return;
    }

    try {

        khoLuuTru.xoaToanBo();

        taiLaiToanBoDuLieu();

        hienThiThongBaoThanhCong(
            "Đã xóa toàn bộ dữ liệu."
        );

    } catch (error) {

        hienThiThongBaoLoi(
            error.message
        );

    }

}

/**
 * Gắn sự kiện cho nút xóa dữ liệu.
 */
function khoiTaoNutXoaDuLieu() {

    lay("#xoaDuLieu")
        ?.addEventListener(
            "click",
            xoaToanBoDuLieu
        );

}
/* ============================================================
 * KHỞI TẠO ỨNG DỤNG
 * ============================================================
 */

/**
 * Khởi tạo toàn bộ ứng dụng.
 */
function khoiTaoUngDung() {

    try {

        khoiTaoNavigation();

        khoiTaoCacModuleUI();

        khoiTaoNutDuLieuMau();

        khoiTaoNutXoaDuLieu();

        taiLaiToanBoDuLieu();

        hienThiThongBaoThanhCong(
            "Phòng khám Mini đã sẵn sàng."
        );

    } catch (error) {

        console.error(error);

        hienThiThongBaoLoi(
            error.message ||
            "Không thể khởi tạo ứng dụng."
        );

    }

}

/* ============================================================
 * GLOBAL ERROR HANDLER
 * ============================================================
 */

/**
 * Bắt lỗi JavaScript chưa được xử lý.
 */
window.addEventListener(
    "error",
    (event) => {

        console.error(
            "Global Error:",
            event.error
        );

        hienThiThongBaoLoi(
            event.error?.message ||
            "Đã xảy ra lỗi ngoài ý muốn."
        );

    }
);

/**
 * Bắt Promise bị reject nhưng chưa xử lý.
 */
window.addEventListener(
    "unhandledrejection",
    (event) => {

        console.error(
            "Unhandled Promise:",
            event.reason
        );

        let thongBao =
            "Đã xảy ra lỗi ngoài ý muốn.";

        if (
            event.reason instanceof Error
        ) {

            thongBao =
                event.reason.message;

        } else if (
            typeof event.reason ===
            "string"
        ) {

            thongBao =
                event.reason;

        }

        hienThiThongBaoLoi(
            thongBao
        );

    }
);

/* ============================================================
 * DOM READY
 * ============================================================
 */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        khoiTaoUngDung();

    }
);

/* ============================================================
 * EXPORT (PHỤC VỤ KIỂM THỬ)
 * ============================================================
 */

export {

    khoiTaoUngDung,

    hienThiKhuVuc,

    taiLaiToanBoDuLieu

};