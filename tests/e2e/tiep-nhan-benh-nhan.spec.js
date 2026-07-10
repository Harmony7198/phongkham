import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {

    await page.addInitScript(() => {

        window.localStorage.clear();

    });

    await page.goto("/");

});

async function taoBenhNhanHopLe(page) {

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

    await page.locator("#tien-su-benh")
        .fill("");

    await page.locator("#di-ung-thuoc")
        .fill("");

}

test.describe("Tiếp nhận bệnh nhân", () => {

    test("1. Mở ứng dụng thành công", async ({ page }) => {

        await expect(page).toHaveTitle(/Phòng khám Mini/i);

        await expect(
            page.getByRole("heading", {
                name: /Phòng khám Mini/i
            })
        ).toBeVisible();

        await expect(
            page.getByTestId("form-benh-nhan")
        ).toBeVisible();

    });

    test("2. Thêm bệnh nhân hợp lệ", async ({ page }) => {

        await taoBenhNhanHopLe(page);

        await page
            .getByTestId("button-luu-benh-nhan")
            .click();

        const bang =
            page.getByTestId("danh-sach-benh-nhan");

        await expect(bang)
            .toContainText("Nguyen Van A");

        await expect(bang)
            .toContainText("0912345678");

    });

    test("3. Hiển thị mã bệnh nhân sau khi thêm", async ({ page }) => {

        await taoBenhNhanHopLe(page);

        await page
            .getByTestId("button-luu-benh-nhan")
            .click();

        await expect(
            page.getByTestId("danh-sach-benh-nhan")
        ).toContainText("BN-");

    });

    test("4. Hiển thị trạng thái chờ khám", async ({ page }) => {

        await taoBenhNhanHopLe(page);

        await page
            .getByTestId("button-luu-benh-nhan")
            .click();

        await expect(
            page.getByTestId("danh-sach-benh-nhan")
        ).toContainText("Chờ khám");

    });

    test("5. Từ chối form thiếu họ tên", async ({ page }) => {

        await page
            .getByTestId("input-ngay-sinh")
            .fill("2000-05-10");

        await page
            .getByTestId("input-so-dien-thoai")
            .fill("0912345678");

        await page
            .getByTestId("button-luu-benh-nhan")
            .click();

        const thongBao =
            page.getByTestId("thong-bao-he-thong");

        await expect(thongBao)
            .toBeVisible();

        await expect(thongBao)
            .toContainText(/Họ tên/i);

    });

});
    test("6. Từ chối số điện thoại không hợp lệ", async ({ page }) => {

        await taoBenhNhanHopLe(page);

        await page
            .getByTestId("input-so-dien-thoai")
            .fill("12345");

        await page
            .getByTestId("button-luu-benh-nhan")
            .click();

        const thongBao =
            page.getByTestId("thong-bao-he-thong");

        await expect(thongBao)
            .toBeVisible();

        await expect(thongBao)
            .toContainText(/điện thoại/i);

    });

    test("7. Từ chối ngày sinh tương lai", async ({ page }) => {

        await taoBenhNhanHopLe(page);

        await page
            .getByTestId("input-ngay-sinh")
            .fill("2100-01-01");

        await page
            .getByTestId("button-luu-benh-nhan")
            .click();

        const thongBao =
            page.getByTestId("thong-bao-he-thong");

        await expect(thongBao)
            .toContainText(/Ngày sinh/i);

    });

    test("8. Từ chối bệnh nhân trùng", async ({ page }) => {

        await taoBenhNhanHopLe(page);

        await page
            .getByTestId("button-luu-benh-nhan")
            .click();

        await taoBenhNhanHopLe(page);

        await page
            .getByTestId("button-luu-benh-nhan")
            .click();

        const thongBao =
            page.getByTestId("thong-bao-he-thong");

        await expect(thongBao)
            .toContainText(/đã tồn tại/i);

    });

    test("9. Sửa thông tin bệnh nhân", async ({ page }) => {

        await taoBenhNhanHopLe(page);

        await page
            .getByTestId("button-luu-benh-nhan")
            .click();

        const bang =
            page.getByTestId("danh-sach-benh-nhan");

        await bang
            .getByRole("button", {
                name: /sửa/i
            })
            .click();

        await page
            .getByTestId("input-ho-ten")
            .fill("Tran Van B");

        await page
            .getByTestId("button-luu-benh-nhan")
            .click();

        await expect(bang)
            .toContainText("Tran Van B");

        await expect(bang)
            .not.toContainText("Nguyen Van A");

    });

    test("10. Tìm kiếm theo họ tên", async ({ page }) => {

        await taoBenhNhanHopLe(page);

        await page
            .getByTestId("button-luu-benh-nhan")
            .click();

        await page
            .getByTestId("input-tim-benh-nhan")
            .fill("Nguyen");

        const bang =
            page.getByTestId("danh-sach-benh-nhan");

        await expect(bang)
            .toContainText("Nguyen Van A");

        await page
            .getByTestId("input-tim-benh-nhan")
            .fill("KhongTonTai");

        await expect(bang)
            .not.toContainText("Nguyen Van A");

    });
        test("11. Tìm kiếm theo số điện thoại", async ({ page }) => {

        await taoBenhNhanHopLe(page);

        await page
            .getByTestId("button-luu-benh-nhan")
            .click();

        await page
            .getByTestId("input-tim-benh-nhan")
            .fill("0912345678");

        const bang =
            page.getByTestId("danh-sach-benh-nhan");

        await expect(bang)
            .toContainText("Nguyen Van A");

        await page
            .getByTestId("input-tim-benh-nhan")
            .fill("0999999999");

        await expect(bang)
            .not.toContainText("Nguyen Van A");

    });

    test("12. Lọc bệnh nhân theo trạng thái", async ({ page }) => {

        await taoBenhNhanHopLe(page);

        await page
            .getByTestId("button-luu-benh-nhan")
            .click();

        await page
            .locator("#loc-trang-thai-benh-nhan")
            .selectOption("cho_kham");

        const bang =
            page.getByTestId("danh-sach-benh-nhan");

        await expect(bang)
            .toContainText("Chờ khám");

        await expect(bang)
            .toContainText("Nguyen Van A");

    });

    test("13. Xóa bệnh nhân", async ({ page }) => {

        await taoBenhNhanHopLe(page);

        await page
            .getByTestId("button-luu-benh-nhan")
            .click();

        page.once("dialog", async (dialog) => {

            expect(dialog.type()).toBe("confirm");

            await dialog.accept();

        });

        await page
            .getByTestId("danh-sach-benh-nhan")
            .getByRole("button", {
                name: /xóa/i
            })
            .click();

        await expect(
            page.getByTestId("danh-sach-benh-nhan")
        ).not.toContainText("Nguyen Van A");

    });

    test("14. Dữ liệu vẫn tồn tại sau khi reload trang", async ({ page }) => {

        await taoBenhNhanHopLe(page);

        await page
            .getByTestId("button-luu-benh-nhan")
            .click();

        await page.reload();

        await expect(
            page.getByTestId("danh-sach-benh-nhan")
        ).toContainText("Nguyen Van A");

        await expect(
            page.getByTestId("danh-sach-benh-nhan")
        ).toContainText("0912345678");

    });