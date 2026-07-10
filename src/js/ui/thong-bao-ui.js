/**
 * ============================================================
 * PHÒNG KHÁM MINI
 * File: src/js/ui/thong-bao-ui.js
 * Mô tả:
 * Quản lý thông báo hệ thống và hiển thị lỗi form.
 * Không chứa logic nghiệp vụ.
 * ============================================================
 */

const THOI_GIAN_MAC_DINH = 3000;

/**
 * Lấy phần tử thông báo hệ thống.
 *
 * @returns {HTMLElement}
 */
function layVungThongBao() {
    const element = document.querySelector(
        '[data-testid="thong-bao-he-thong"]'
    );

    if (!element) {
        throw new Error(
            'Không tìm thấy vùng thông báo hệ thống.'
        );
    }

    return element;
}

/**
 * Hiển thị thông báo.
 *
 * @param {string} noiDung
 * @param {string} loai
 * @param {number} thoiGian
 */
function hienThiThongBao(
    noiDung,
    loai,
    thoiGian = THOI_GIAN_MAC_DINH
) {
    const vungThongBao = layVungThongBao();

    vungThongBao.textContent = noiDung;

    vungThongBao.className = "";

    vungThongBao.classList.add(
        "thong-bao",
        loai
    );

    if (thoiGian > 0) {
        window.clearTimeout(
            vungThongBao._timerId
        );

        vungThongBao._timerId =
            window.setTimeout(() => {
                xoaThongBao();
            }, thoiGian);
    }
}

/**
 * Thông báo thành công.
 *
 * @param {string} noiDung
 * @param {number} thoiGian
 */
export function hienThiThongBaoThanhCong(
    noiDung,
    thoiGian = THOI_GIAN_MAC_DINH
) {
    hienThiThongBao(
        noiDung,
        "thanh-cong",
        thoiGian
    );
}

/**
 * Thông báo lỗi.
 *
 * @param {string} noiDung
 * @param {number} thoiGian
 */
export function hienThiThongBaoLoi(
    noiDung,
    thoiGian = 0
) {
    hienThiThongBao(
        noiDung,
        "loi",
        thoiGian
    );
}

/**
 * Thông báo cảnh báo.
 *
 * @param {string} noiDung
 * @param {number} thoiGian
 */
export function hienThiThongBaoCanhBao(
    noiDung,
    thoiGian = THOI_GIAN_MAC_DINH
) {
    hienThiThongBao(
        noiDung,
        "canh-bao",
        thoiGian
    );
}

/**
 * Xóa thông báo.
 */
export function xoaThongBao() {
    const vungThongBao =
        layVungThongBao();

    window.clearTimeout(
        vungThongBao._timerId
    );

    vungThongBao.textContent = "";
    vungThongBao.className = "";
}

/**
 * Xóa toàn bộ lỗi của form.
 *
 * @param {HTMLElement|string} form
 */
export function xoaLoiForm(
    form
) {

    const formElement =
        typeof form === "string"
            ? document.querySelector(form)
            : form;

    if (!formElement) {
        return;
    }

    formElement
        .querySelectorAll(".loi-form")
        .forEach((element) => {

            element.textContent = "";

        });

    formElement
        .querySelectorAll(".co-loi")
        .forEach((element) => {

            element.classList.remove(
                "co-loi"
            );

        });

}

/**
 * Hiển thị lỗi form.
 *
 * HTML:
 * <span class="loi-form"
 * data-loi="hoTen"></span>
 *
 * @param {HTMLElement|string} form
 * @param {Object} loi
 */
export function hienThiLoiForm(
    form,
    loi
) {

    const formElement =
        typeof form === "string"
            ? document.querySelector(form)
            : form;

    if (!formElement) {
        return;
    }

    xoaLoiForm(
        formElement
    );

    Object.entries(loi).forEach(
        ([tenTruong, thongBao]) => {

            const oLoi =
                formElement.querySelector(
                    `[data-loi="${tenTruong}"]`
                );

            if (oLoi) {

                oLoi.textContent =
                    thongBao;

            }

            const input =
                formElement.querySelector(
                    `[name="${tenTruong}"]`
                );

            if (input) {

                input.classList.add(
                    "co-loi"
                );

            }

        }
    );

}

/**
 * Xác nhận thao tác.
 *
 * @param {string} noiDung
 * @returns {boolean}
 */
export function xacNhanThaoTac(
    noiDung
) {
    return window.confirm(
        noiDung
    );
}