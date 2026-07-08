/**
 * ============================================================
 * PHÒNG KHÁM MINI
 * File: src/js/constants/hang-so.js
 * Mô tả:
 * Chứa các hằng số dùng chung cho toàn bộ ứng dụng.
 * ============================================================
 */

/**
 * Khóa lưu trữ LocalStorage.
 * @readonly
 */
export const KHOA_LUU_TRU = Object.freeze({
    BENH_NHAN: "phongKhamMini.benhNhan",
    DON_THUOC: "phongKhamMini.donThuoc",
    PHIEN_BAN_DU_LIEU: "phongKhamMini.phienBanDuLieu"
});

/**
 * Trạng thái bệnh nhân.
 * @readonly
 */
export const TRANG_THAI_BENH_NHAN = Object.freeze({
    CHO_KHAM: "cho_kham",
    DANG_KHAM: "dang_kham",
    DA_KHAM: "da_kham"
});

/**
 * Trạng thái đơn thuốc.
 * @readonly
 */
export const TRANG_THAI_DON_THUOC = Object.freeze({
    NHAP: "nhap",
    DA_HOAN_TAT: "da_hoan_tat",
    DA_HUY: "da_huy"
});

/**
 * Phiên bản dữ liệu.
 * Có thể dùng để migrate dữ liệu LocalStorage trong tương lai.
 */
export const PHIEN_BAN_DU_LIEU = "1.0.0";

/**
 * Giá trị mặc định của một bệnh nhân mới.
 */
export const BENH_NHAN_MAC_DINH = Object.freeze({
    id: "",
    maBenhNhan: "",
    hoTen: "",
    ngaySinh: "",
    gioiTinh: "",
    soDienThoai: "",
    diaChi: "",
    trieuChung: "",
    tienSuBenh: "",
    diUngThuoc: "",
    trangThai: TRANG_THAI_BENH_NHAN.CHO_KHAM,
    ngayTiepNhan: "",
    ngayCapNhat: ""
});

/**
 * Giá trị mặc định của một thuốc trong đơn.
 */
export const THUOC_MAC_DINH = Object.freeze({
    id: "",
    tenThuoc: "",
    hamLuong: "",
    donVi: "",
    soLuongMoiLan: 1,
    soLanMoiNgay: 1,
    soNgayDung: 1,
    tongSoLuong: 1,
    cachDung: "",
    thoiDiemDung: ""
});

/**
 * Giá trị mặc định của một đơn thuốc.
 */
export const DON_THUOC_MAC_DINH = Object.freeze({
    id: "",
    maDonThuoc: "",
    benhNhanId: "",
    tenBacSi: "",
    chuanDoan: "",
    loiDan: "",
    ngayKeDon: "",
    danhSachThuoc: [],
    trangThai: TRANG_THAI_DON_THUOC.NHAP
});

/**
 * Danh sách trạng thái bệnh nhân.
 */
export const DANH_SACH_TRANG_THAI_BENH_NHAN = Object.freeze([
    TRANG_THAI_BENH_NHAN.CHO_KHAM,
    TRANG_THAI_BENH_NHAN.DANG_KHAM,
    TRANG_THAI_BENH_NHAN.DA_KHAM
]);

/**
 * Danh sách trạng thái đơn thuốc.
 */
export const DANH_SACH_TRANG_THAI_DON_THUOC = Object.freeze([
    TRANG_THAI_DON_THUOC.NHAP,
    TRANG_THAI_DON_THUOC.DA_HOAN_TAT,
    TRANG_THAI_DON_THUOC.DA_HUY
]);