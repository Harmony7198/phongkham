/**
 * ============================================================
 * PHÒNG KHÁM MINI
 * File: src/js/utils/ngay-thang.js
 * Mô tả:
 * Các hàm xử lý ngày tháng.
 * ============================================================
 */

/**
 * Kiểm tra Date hợp lệ.
 *
 * @param {Date} ngay
 * @returns {boolean}
 */
function laDateHopLe(ngay) {
    return ngay instanceof Date && !Number.isNaN(ngay.getTime());
}

/**
 * Chuyển dữ liệu sang Date.
 *
 * @param {Date|string|number} giaTri
 * @returns {Date|null}
 */
function chuyenThanhDate(giaTri) {
    if (giaTri instanceof Date) {
        return laDateHopLe(giaTri) ? giaTri : null;
    }

    const ngay = new Date(giaTri);

    return laDateHopLe(ngay) ? ngay : null;
}

/**
 * Thêm số 0 phía trước.
 *
 * @param {number} so
 * @returns {string}
 */
function boSungSo0(so) {
    return String(so).padStart(2, "0");
}

/**
 * Lấy ngày hiện tại.
 *
 * @param {Date} [ngay=new Date()]
 * @returns {string}
 */
export function layNgayHienTai(ngay = new Date()) {
    return chuyenNgaySangISO(ngay);
}

/**
 * Định dạng dd/MM/yyyy.
 *
 * @param {Date|string} giaTri
 * @returns {string}
 */
export function dinhDangNgay(giaTri) {
    const ngay = chuyenThanhDate(giaTri);

    if (!ngay) {
        return "";
    }

    const dd = boSungSo0(ngay.getDate());
    const mm = boSungSo0(ngay.getMonth() + 1);
    const yyyy = ngay.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
}

/**
 * Định dạng dd/MM/yyyy HH:mm.
 *
 * @param {Date|string} giaTri
 * @returns {string}
 */
export function dinhDangNgayGio(giaTri) {
    const ngay = chuyenThanhDate(giaTri);

    if (!ngay) {
        return "";
    }

    const dd = boSungSo0(ngay.getDate());
    const mm = boSungSo0(ngay.getMonth() + 1);
    const yyyy = ngay.getFullYear();

    const hh = boSungSo0(ngay.getHours());
    const phut = boSungSo0(ngay.getMinutes());

    return `${dd}/${mm}/${yyyy} ${hh}:${phut}`;
}

/**
 * Kiểm tra ngày có nằm trong tương lai.
 *
 * @param {Date|string} giaTri
 * @param {Date} [ngayHienTai=new Date()]
 * @returns {boolean}
 */
export function laNgayTrongTuongLai(
    giaTri,
    ngayHienTai = new Date()
) {
    const ngay = chuyenThanhDate(giaTri);

    if (!ngay) {
        return false;
    }

    return ngay.getTime() > ngayHienTai.getTime();
}

/**
 * Tính tuổi.
 *
 * @param {Date|string} ngaySinh
 * @param {Date} [ngayHienTai=new Date()]
 * @returns {number}
 */
export function tinhTuoi(
    ngaySinh,
    ngayHienTai = new Date()
) {
    const sinh = chuyenThanhDate(ngaySinh);

    if (!sinh) {
        return 0;
    }

    let tuoi = ngayHienTai.getFullYear() - sinh.getFullYear();

    const chuaDenSinhNhat =
        ngayHienTai.getMonth() < sinh.getMonth() ||
        (
            ngayHienTai.getMonth() === sinh.getMonth() &&
            ngayHienTai.getDate() < sinh.getDate()
        );

    if (chuaDenSinhNhat) {
        tuoi--;
    }

    return Math.max(0, tuoi);
}

/**
 * Chuyển Date sang ISO yyyy-MM-dd.
 *
 * @param {Date|string} giaTri
 * @returns {string}
 */
export function chuyenNgaySangISO(giaTri) {
    const ngay = chuyenThanhDate(giaTri);

    if (!ngay) {
        return "";
    }

    const yyyy = ngay.getFullYear();
    const mm = boSungSo0(ngay.getMonth() + 1);
    const dd = boSungSo0(ngay.getDate());

    return `${yyyy}-${mm}-${dd}`;
}