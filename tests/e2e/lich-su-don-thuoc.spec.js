import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {

    await page.addInitScript(() => {
        window.localStorage.clear();
    });

    await page.goto("/");

});

async function taoDonThuocDaHoanTat(page) {

    // ===== Thêm bệnh nhân =====

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

    await page
        .getByTestId("button-luu-benh-nhan")
        .click();

    // ===== Bắt đầu khám =====

    await page
        .getByTestId("danh-sach-benh-nhan")
        .getByRole("button", {
            name: /bắt đầu khám/i
        })
        .click();

    await page
        .getByTestId("tab-kham-benh")
        .click();

    // ===== Thông tin khám =====

    await page
        .getByTestId("input-ten-bac-si")
        .fill("Bac si Nguyen");

    await page
        .getByTestId("input-chuan-doan")
        .fill("Cam cum");

    await page
        .locator("#loi-dan")
        .fill("Nghi ngoi");

    // ===== Thuốc =====

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

    await page
        .getByTestId("button-them-thuoc")
        .click();

    // ===== Hoàn tất =====

    await page
        .getByTestId("button-hoan-tat-don")
        .click();

    await expect(
        page.getByTestId("thong-bao-he-thong")
    ).toContainText(/thành công/i);

}

test.describe("Lịch sử đơn thuốc", () => {

    test("1. Tạo và hoàn tất một đơn thuốc", async ({ page }) => {

        await taoDonThuocDaHoanTat(page);

        await page
            .getByTestId("tab-lich-su-don-thuoc")
            .click();

        await expect(
            page.getByTestId("danh-sach-don-thuoc")
        ).toHaveCount(1);

    });

    test("2. Mở tab lịch sử đơn", async ({ page }) => {

        await taoDonThuocDaHoanTat(page);

        await page
            .getByTestId("tab-lich-su-don-thuoc")
            .click();

        await expect(
            page.getByTestId("khu-vuc-lich-su-don-thuoc")
        ).toBeVisible();

    });

    test("3. Hiển thị đúng mã đơn", async ({ page }) => {

        await taoDonThuocDaHoanTat(page);

        await page
            .getByTestId("tab-lich-su-don-thuoc")
            .click();

        await expect(
            page.getByTestId("danh-sach-don-thuoc")
        ).toContainText("DT-");

    });

    test("4. Hiển thị đúng bệnh nhân", async ({ page }) => {

        await taoDonThuocDaHoanTat(page);

        await page
            .getByTestId("tab-lich-su-don-thuoc")
            .click();

        await expect(
            page.getByTestId("danh-sach-don-thuoc")
        ).toContainText("Nguyen Van A");

    });

    test("5. Hiển thị đúng bác sĩ", async ({ page }) => {

        await taoDonThuocDaHoanTat(page);

        await page
            .getByTestId("tab-lich-su-don-thuoc")
            .click();

        await expect(
            page.getByTestId("danh-sach-don-thuoc")
        ).toContainText("Bac si Nguyen");

    });

    test("6. Xem chi tiết đơn", async ({ page }) => {

        await taoDonThuocDaHoanTat(page);

        await page
            .getByTestId("tab-lich-su-don-thuoc")
            .click();

        await page
            .getByTestId("button-xem-chi-tiet")
            .click();

        await expect(
            page.getByTestId("modal-chi-tiet-don")
        ).toBeVisible();

    });

});
    test("7. Chi tiết có chẩn đoán", async ({ page }) => {

        await taoDonThuocDaHoanTat(page);

        await page
            .getByTestId("tab-lich-su-don-thuoc")
            .click();

        await page
            .getByTestId("button-xem-chi-tiet")
            .click();

        await expect(
            page.getByTestId("modal-chi-tiet-don")
        ).toContainText("Cam cum");

    });

    test("8. Chi tiết có danh sách thuốc", async ({ page }) => {

        await taoDonThuocDaHoanTat(page);

        await page
            .getByTestId("tab-lich-su-don-thuoc")
            .click();

        await page
            .getByTestId("button-xem-chi-tiet")
            .click();

        await expect(
            page.getByTestId("modal-chi-tiet-don")
        ).toContainText("Thuoc mau A");

    });

    test("9. Tìm kiếm theo tên bệnh nhân", async ({ page }) => {

        await taoDonThuocDaHoanTat(page);

        await page
            .getByTestId("tab-lich-su-don-thuoc")
            .click();

        await page
            .getByTestId("input-tim-don-thuoc")
            .fill("Nguyen");

        await expect(
            page.getByTestId("danh-sach-don-thuoc")
        ).toContainText("Nguyen Van A");

    });

    test("10. Tìm kiếm theo tên bác sĩ", async ({ page }) => {

        await taoDonThuocDaHoanTat(page);

        await page
            .getByTestId("tab-lich-su-don-thuoc")
            .click();

        await page
            .getByTestId("input-tim-don-thuoc")
            .fill("Bac si Nguyen");

        await expect(
            page.getByTestId("danh-sach-don-thuoc")
        ).toContainText("Bac si Nguyen");

    });

    test("11. Lọc đơn đã hoàn tất", async ({ page }) => {

        await taoDonThuocDaHoanTat(page);

        await page
            .getByTestId("tab-lich-su-don-thuoc")
            .click();

        await page
            .locator("#loc-trang-thai-don")
            .selectOption("da_hoan_tat");

        await expect(
            page.getByTestId("danh-sach-don-thuoc")
        ).toContainText("Đã hoàn tất");

    });

    test("12. Đơn đã hoàn tất không có nút hủy", async ({ page }) => {

        await taoDonThuocDaHoanTat(page);

        await page
            .getByTestId("tab-lich-su-don-thuoc")
            .click();

        await expect(
            page.getByRole("button", {
                name: /hủy đơn/i
            })
        ).toHaveCount(0);

    });

    test("13. Đóng modal chi tiết", async ({ page }) => {

        await taoDonThuocDaHoanTat(page);

        await page
            .getByTestId("tab-lich-su-don-thuoc")
            .click();

        await page
            .getByTestId("button-xem-chi-tiet")
            .click();

        await expect(
            page.getByTestId("modal-chi-tiet-don")
        ).toBeVisible();

        await page
            .getByRole("button", {
                name: /đóng/i
            })
            .click();

        await expect(
            page.getByTestId("modal-chi-tiet-don")
        ).toBeHidden();

    });

    test("14. Gọi window.print khi bấm nút in", async ({ page }) => {

        await taoDonThuocDaHoanTat(page);

        await page
            .getByTestId("tab-lich-su-don-thuoc")
            .click();

        await page
            .getByTestId("button-xem-chi-tiet")
            .click();

        await page.evaluate(() => {

            window.__printCalled = false;

            window.print = () => {
                window.__printCalled = true;
            };

        });

        await page
            .getByRole("button", {
                name: /^in$/i
            })
            .click();

        const daGoiPrint = await page.evaluate(() => {

            return window.__printCalled;

        });

        expect(daGoiPrint).toBe(true);

    });