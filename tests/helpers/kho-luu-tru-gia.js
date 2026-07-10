/**
 * Tạo storage giả dùng cho Unit Test và Business Test.
 * Mỗi lần gọi sẽ tạo một storage độc lập.
 *
 * API tương thích localStorage:
 * - getItem
 * - setItem
 * - removeItem
 * - clear
 * - key
 * - length
 */
export function taoKhoLuuTruGia() {
    const duLieu = new Map();

    return {

        /**
         * Số lượng khóa hiện có.
         */
        get length() {
            return duLieu.size;
        },

        /**
         * Lấy giá trị theo khóa.
         *
         * @param {string} khoa
         * @returns {string|null}
         */
        getItem(khoa) {
            if (!duLieu.has(khoa)) {
                return null;
            }

            return duLieu.get(khoa);
        },

        /**
         * Ghi giá trị.
         *
         * @param {string} khoa
         * @param {*} giaTri
         */
        setItem(khoa, giaTri) {
            duLieu.set(String(khoa), String(giaTri));
        },

        /**
         * Xóa một khóa.
         *
         * @param {string} khoa
         */
        removeItem(khoa) {
            duLieu.delete(khoa);
        },

        /**
         * Xóa toàn bộ dữ liệu.
         */
        clear() {
            duLieu.clear();
        },

        /**
         * Lấy tên khóa theo vị trí.
         *
         * @param {number} chiSo
         * @returns {string|null}
         */
        key(chiSo) {
            if (
                typeof chiSo !== "number" ||
                chiSo < 0 ||
                chiSo >= duLieu.size
            ) {
                return null;
            }

            return Array.from(duLieu.keys())[chiSo];
        },

        /**
         * Kiểm tra có tồn tại khóa hay không.
         *
         * @param {string} khoa
         * @returns {boolean}
         */
        has(khoa) {
            return duLieu.has(khoa);
        },

        /**
         * Trả về object để debug trong test.
         *
         * @returns {Object}
         */
        dump() {
            return Object.fromEntries(duLieu.entries());
        }
    };
}