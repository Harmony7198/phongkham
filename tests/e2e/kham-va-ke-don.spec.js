import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {

    await page.addInitScript(() => {
        window.localStorage.clear();
    });

    await page.goto("/");

});

async function taoBenhNhan(page) {

    await page.getByTestId("input-ho-ten")
        .fill("Nguyen Van A");

    await page.getByTestId("input-ngay-sinh")
        .fill("2000-05-10");

    await page.locator("#gioi-tinh")
        .selectOption("nam");

    await page.getByTestId("input-so-dien-thoai")
        .fill("0912345678");

    await page.locator("#dia-chi")
        .fill("Can Tho");

    await page.locator("#trieu-chung")
        .fill("Sot");

    await page.getByTestId("button-luu-benh-nhan")
        .click();

    await expect(
        page.getByTestId("danh-sach-benh-nhan")
    ).toContainText("Nguyen Van A");

}

async function moKhamBenh(page) {

    await page
        .getByTestId("danh-sach-benh-nhan")
        .getByRole("button", {
            name: /bắt đầu khám/i
        })
        .click();

    await page
        .getByRole("button", {
            name: /khám và kê đơn/i
        })
        .click();

    await expect(
        page.getByTestId("khu-vuc-kham-benh")
    ).toBeVisible();

}

async function themThuocThuNhat(page) {

    await page
        .getByTestId("input-ten-thuoc")
        .fill("Thuoc mau A");

    await page.locator("#ham-luong")
        .fill("500mg");

    await page.locator("#don-vi")
        .fill("Vien");

    await page.locator("#so-luong-moi-lan")
        .fill("2");

    await page.locator("#so-lan-moi-ngay")
        .fill("3");

    await page.locator("#so-ngay-dung")
        .fill("5");

    await page.locator("#cach-dung")
        .fill("Sau an");

    await page.locator("#thoi-diem-dung")
        .fill("Toi");

}

test.describe("Khám và kê đơn", () => {

    test("1. Thêm bệnh nhân", async ({ page }) => {

        await taoBenhNhan(page);

        await expect(
            page.getByTestId("danh-sach-benh-nhan")
        ).toContainText("Nguyen Van A");

    });

    test("2. Bấm bắt đầu khám", async ({ page }) => {

        await taoBenhNhan(page);

        await page
            .getByTestId("danh-sach-benh-nhan")
            .getByRole("button", {
                name: /bắt đầu khám/i
            })
            .click();

        await expect(
            page.getByTestId("danh-sach-benh-nhan")
        ).toContainText("Đang khám");

    });

    test("3. Chuyển sang tab khám bệnh", async ({ page }) => {

        await taoBenhNhan(page);

        await moKhamBenh(page);

        await expect(
            page.getByTestId("khu-vuc-kham-benh")
        ).toBeVisible();

    });

    test("4. Hiển thị đúng bệnh nhân đang khám", async ({ page }) => {

        await taoBenhNhan(page);

        await moKhamBenh(page);

        await expect(
            page.getByTestId("khu-vuc-kham-benh")
        ).toContainText("Nguyen Van A");

        await expect(
            page.getByTestId("khu-vuc-kham-benh")
        ).toContainText("0912345678");

    });

    test("5. Nhập tên bác sĩ", async ({ page }) => {

        await taoBenhNhan(page);

        await moKhamBenh(page);

        await page
            .getByTestId("input-ten-bac-si")
            .fill("Bac si Nguyen");

        await expect(
            page.getByTestId("input-ten-bac-si")
        ).toHaveValue("Bac si Nguyen");

    });

    test("6. Nhập chẩn đoán", async ({ page }) => {

        await taoBenhNhan(page);

        await moKhamBenh(page);

        await page
            .getByTestId("input-chuan-doan")
            .fill("Cam cum");

        await expect(
            page.getByTestId("input-chuan-doan")
        ).toHaveValue("Cam cum");

    });

    test("7. Nhập lời dặn", async ({ page }) => {

        await taoBenhNhan(page);

        await moKhamBenh(page);

        await page
            .locator("#loi-dan")
            .fill("Nghi ngoi va uong nhieu nuoc");

        await expect(
            page.locator("#loi-dan")
        ).toHaveValue(
            "Nghi ngoi va uong nhieu nuoc"
        );

    });

    test("8. Thêm thuốc thứ nhất", async ({ page }) => {

        await taoBenhNhan(page);

        await moKhamBenh(page);

        await page
            .getByTestId("input-ten-bac-si")
            .fill("Bac si Nguyen");

        await page
            .getByTestId("input-chuan-doan")
            .fill("Cam cum");

        await themThuocThuNhat(page);

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await expect(
            page.getByTestId("danh-sach-thuoc")
        ).toContainText("Thuoc mau A");

    });

});
    test("9. Kiểm tra tổng số lượng được tính đúng", async ({ page }) => {

        await taoBenhNhan(page);
        await moKhamBenh(page);

        await page.getByTestId("input-ten-bac-si")
            .fill("Bac si Nguyen");

        await page.getByTestId("input-chuan-doan")
            .fill("Cam cum");

        await themThuocThuNhat(page);

        await expect(
            page.locator("#tong-so-luong")
        ).toHaveValue("30");

    });

    test("10. Thêm thuốc thứ hai", async ({ page }) => {

        await taoBenhNhan(page);
        await moKhamBenh(page);

        await page.getByTestId("input-ten-bac-si")
            .fill("Bac si Nguyen");

        await page.getByTestId("input-chuan-doan")
            .fill("Cam cum");

        await themThuocThuNhat(page);

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await page
            .getByTestId("input-ten-thuoc")
            .fill("Thuoc mau B");

        await page.locator("#ham-luong")
            .fill("250mg");

        await page.locator("#don-vi")
            .fill("Vien");

        await page.locator("#so-luong-moi-lan")
            .fill("1");

        await page.locator("#so-lan-moi-ngay")
            .fill("2");

        await page.locator("#so-ngay-dung")
            .fill("7");

        await page.locator("#cach-dung")
            .fill("Sau an");

        await page.locator("#thoi-diem-dung")
            .fill("Sang");

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await expect(
            page.getByTestId("danh-sach-thuoc")
        ).toContainText("Thuoc mau B");

    });

    test("11. Kiểm tra bảng có hai thuốc", async ({ page }) => {

        await taoBenhNhan(page);
        await moKhamBenh(page);

        await page.getByTestId("input-ten-bac-si")
            .fill("Bac si Nguyen");

        await page.getByTestId("input-chuan-doan")
            .fill("Cam cum");

        await themThuocThuNhat(page);

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await page
            .getByTestId("input-ten-thuoc")
            .fill("Thuoc mau B");

        await page.locator("#ham-luong")
            .fill("250mg");

        await page.locator("#don-vi")
            .fill("Vien");

        await page.locator("#so-luong-moi-lan")
            .fill("1");

        await page.locator("#so-lan-moi-ngay")
            .fill("2");

        await page.locator("#so-ngay-dung")
            .fill("7");

        await page.locator("#cach-dung")
            .fill("Sau an");

        await page.locator("#thoi-diem-dung")
            .fill("Sang");

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await expect(
            page.getByTestId("danh-sach-thuoc")
                .locator("tbody tr")
        ).toHaveCount(2);

    });

    test("12. Xóa một thuốc", async ({ page }) => {

        await taoBenhNhan(page);
        await moKhamBenh(page);

        await page.getByTestId("input-ten-bac-si")
            .fill("Bac si Nguyen");

        await page.getByTestId("input-chuan-doan")
            .fill("Cam cum");

        await themThuocThuNhat(page);

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await page
            .getByTestId("danh-sach-thuoc")
            .getByRole("button", {
                name: /xóa/i
            })
            .first()
            .click();

        await expect(
            page.getByTestId("danh-sach-thuoc")
        ).not.toContainText("Thuoc mau A");

    });

    test("13. Kiểm tra bảng còn một thuốc", async ({ page }) => {

        await taoBenhNhan(page);
        await moKhamBenh(page);

        await page.getByTestId("input-ten-bac-si")
            .fill("Bac si Nguyen");

        await page.getByTestId("input-chuan-doan")
            .fill("Cam cum");

        await themThuocThuNhat(page);

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await page
            .getByTestId("input-ten-thuoc")
            .fill("Thuoc mau B");

        await page.locator("#ham-luong")
            .fill("250mg");

        await page.locator("#don-vi")
            .fill("Vien");

        await page.locator("#so-luong-moi-lan")
            .fill("1");

        await page.locator("#so-lan-moi-ngay")
            .fill("2");

        await page.locator("#so-ngay-dung")
            .fill("7");

        await page.locator("#cach-dung")
            .fill("Sau an");

        await page.locator("#thoi-diem-dung")
            .fill("Sang");

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await page
            .getByTestId("danh-sach-thuoc")
            .getByRole("button", {
                name: /xóa/i
            })
            .first()
            .click();

        await expect(
            page.getByTestId("danh-sach-thuoc")
                .locator("tbody tr")
        ).toHaveCount(1);

    });

    test("14. Lưu nháp", async ({ page }) => {

        await taoBenhNhan(page);
        await moKhamBenh(page);

        await page.getByTestId("input-ten-bac-si")
            .fill("Bac si Nguyen");

        await page.getByTestId("input-chuan-doan")
            .fill("Cam cum");

        await themThuocThuNhat(page);

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await page
            .getByRole("button", {
                name: /lưu nháp/i
            })
            .click();

        await expect(
            page.getByTestId("thong-bao-he-thong")
        ).toContainText(/lưu/i);

    });

    test("15. Reload trang", async ({ page }) => {

        await taoBenhNhan(page);
        await moKhamBenh(page);

        await page.getByTestId("input-ten-bac-si")
            .fill("Bac si Nguyen");

        await page.getByTestId("input-chuan-doan")
            .fill("Cam cum");

        await themThuocThuNhat(page);

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await page.getByRole("button", {
            name: /lưu nháp/i
        }).click();

        await page.reload();

        await expect(
            page.getByRole("heading", {
                name: /Phòng khám Mini/i
            })
        ).toBeVisible();

    });

    test("16. Mở lại bệnh nhân đang khám", async ({ page }) => {

        await taoBenhNhan(page);
        await moKhamBenh(page);

        await page.getByTestId("input-ten-bac-si")
            .fill("Bac si Nguyen");

        await page.getByTestId("input-chuan-doan")
            .fill("Cam cum");

        await themThuocThuNhat(page);

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await page.getByRole("button", {
            name: /lưu nháp/i
        }).click();

        await page.reload();

        await page
            .getByRole("button", {
                name: /khám và kê đơn/i
            })
            .click();

        await expect(
            page.getByTestId("khu-vuc-kham-benh")
        ).toContainText("Nguyen Van A");

    });
        test("17. Kiểm tra đơn nháp vẫn còn", async ({ page }) => {

        await taoBenhNhan(page);
        await moKhamBenh(page);

        await page.getByTestId("input-ten-bac-si")
            .fill("Bac si Nguyen");

        await page.getByTestId("input-chuan-doan")
            .fill("Cam cum");

        await themThuocThuNhat(page);

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await page.getByRole("button", {
            name: /lưu nháp/i
        }).click();

        await page.reload();

        await page.getByRole("button", {
            name: /khám và kê đơn/i
        }).click();

        await expect(
            page.getByTestId("input-ten-bac-si")
        ).toHaveValue("Bac si Nguyen");

        await expect(
            page.getByTestId("input-chuan-doan")
        ).toHaveValue("Cam cum");

        await expect(
            page.getByTestId("danh-sach-thuoc")
        ).toContainText("Thuoc mau A");

    });

    test("18. Hoàn tất đơn thuốc", async ({ page }) => {

        await taoBenhNhan(page);
        await moKhamBenh(page);

        await page.getByTestId("input-ten-bac-si")
            .fill("Bac si Nguyen");

        await page.getByTestId("input-chuan-doan")
            .fill("Cam cum");

        await themThuocThuNhat(page);

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await page
            .getByRole("button", {
                name: /hoàn tất/i
            })
            .click();

        await expect(
            page.getByTestId("thong-bao-he-thong")
        ).toBeVisible();

    });

    test("19. Kiểm tra thông báo thành công", async ({ page }) => {

        await taoBenhNhan(page);
        await moKhamBenh(page);

        await page.getByTestId("input-ten-bac-si")
            .fill("Bac si Nguyen");

        await page.getByTestId("input-chuan-doan")
            .fill("Cam cum");

        await themThuocThuNhat(page);

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await page.getByRole("button", {
            name: /hoàn tất/i
        }).click();

        await expect(
            page.getByTestId("thong-bao-he-thong")
        ).toContainText(/thành công/i);

    });

    test("20. Kiểm tra bệnh nhân chuyển sang đã khám", async ({ page }) => {

        await taoBenhNhan(page);
        await moKhamBenh(page);

        await page.getByTestId("input-ten-bac-si")
            .fill("Bac si Nguyen");

        await page.getByTestId("input-chuan-doan")
            .fill("Cam cum");

        await themThuocThuNhat(page);

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await page.getByRole("button", {
            name: /hoàn tất/i
        }).click();

        await page.getByRole("button", {
            name: /tiếp nhận bệnh nhân/i
        }).click();

        await expect(
            page.getByTestId("danh-sach-benh-nhan")
        ).toContainText("Đã khám");

    });

    test("21. Kiểm tra đơn không còn được chỉnh sửa", async ({ page }) => {

        await taoBenhNhan(page);
        await moKhamBenh(page);

        await page.getByTestId("input-ten-bac-si")
            .fill("Bac si Nguyen");

        await page.getByTestId("input-chuan-doan")
            .fill("Cam cum");

        await themThuocThuNhat(page);

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await page.getByRole("button", {
            name: /hoàn tất/i
        }).click();

        await expect(
            page.getByTestId("button-them-thuoc")
        ).toBeDisabled();

        await expect(
            page.getByRole("button", {
                name: /lưu nháp/i
            })
        ).toBeDisabled();

        await expect(
            page.getByRole("button", {
                name: /hoàn tất/i
            })
        ).toBeDisabled();

    });
        test("Không hoàn tất khi chưa nhập bác sĩ", async ({ page }) => {

        await taoBenhNhan(page);
        await moKhamBenh(page);

        await page
            .getByTestId("input-chuan-doan")
            .fill("Cam cum");

        await themThuocThuNhat(page);

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await page
            .getByTestId("button-hoan-tat-don")
            .click();

        await expect(
            page.getByTestId("thong-bao-he-thong")
        ).toContainText(/bác sĩ/i);

    });

    test("Không hoàn tất khi chưa nhập chẩn đoán", async ({ page }) => {

        await taoBenhNhan(page);
        await moKhamBenh(page);

        await page
            .getByTestId("input-ten-bac-si")
            .fill("Bac si Nguyen");

        await themThuocThuNhat(page);

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await page
            .getByTestId("button-hoan-tat-don")
            .click();

        await expect(
            page.getByTestId("thong-bao-he-thong")
        ).toContainText(/chẩn đoán/i);

    });

    test("Không hoàn tất khi chưa có thuốc", async ({ page }) => {

        await taoBenhNhan(page);
        await moKhamBenh(page);

        await page
            .getByTestId("input-ten-bac-si")
            .fill("Bac si Nguyen");

        await page
            .getByTestId("input-chuan-doan")
            .fill("Cam cum");

        await page
            .getByTestId("button-hoan-tat-don")
            .click();

        await expect(
            page.getByTestId("thong-bao-he-thong")
        ).toContainText(/ít nhất một thuốc/i);

    });

    test("Không thêm thuốc khi số lượng bằng 0", async ({ page }) => {

        await taoBenhNhan(page);
        await moKhamBenh(page);

        await page
            .getByTestId("input-ten-bac-si")
            .fill("Bac si Nguyen");

        await page
            .getByTestId("input-chuan-doan")
            .fill("Cam cum");

        await page
            .getByTestId("input-ten-thuoc")
            .fill("Thuoc mau A");

        await page.locator("#ham-luong").fill("500mg");
        await page.locator("#don-vi").fill("Vien");

        await page.locator("#so-luong-moi-lan").fill("0");
        await page.locator("#so-lan-moi-ngay").fill("3");
        await page.locator("#so-ngay-dung").fill("5");

        await page.locator("#cach-dung").fill("Sau an");
        await page.locator("#thoi-diem-dung").fill("Toi");

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await expect(
            page.getByTestId("thong-bao-he-thong")
        ).toContainText(/số lượng/i);

        await expect(
            page.getByTestId("danh-sach-thuoc")
                .locator("tbody tr")
        ).toHaveCount(0);

    });

    test("Không thêm thuốc khi số ngày dùng âm", async ({ page }) => {

        await taoBenhNhan(page);
        await moKhamBenh(page);

        await page
            .getByTestId("input-ten-bac-si")
            .fill("Bac si Nguyen");

        await page
            .getByTestId("input-chuan-doan")
            .fill("Cam cum");

        await page
            .getByTestId("input-ten-thuoc")
            .fill("Thuoc mau A");

        await page.locator("#ham-luong").fill("500mg");
        await page.locator("#don-vi").fill("Vien");

        await page.locator("#so-luong-moi-lan").fill("1");
        await page.locator("#so-lan-moi-ngay").fill("3");
        await page.locator("#so-ngay-dung").fill("-5");

        await page.locator("#cach-dung").fill("Sau an");
        await page.locator("#thoi-diem-dung").fill("Toi");

        await page
            .getByTestId("button-them-thuoc")
            .click();

        await expect(
            page.getByTestId("thong-bao-he-thong")
        ).toContainText(/ngày dùng/i);

        await expect(
            page.getByTestId("danh-sach-thuoc")
                .locator("tbody tr")
        ).toHaveCount(0);

    });