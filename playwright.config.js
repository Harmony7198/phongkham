import { defineConfig, devices } from "@playwright/test";

const laMoiTruongCI = Boolean(process.env.CI);

export default defineConfig({
    testDir: "./tests/e2e",

    fullyParallel: false,

    forbidOnly: laMoiTruongCI,

    retries: laMoiTruongCI ? 2 : 0,

    workers: laMoiTruongCI ? 1 : undefined,

    reporter: [
        ["list"],
        ["html"]
    ],

    use: {
        baseURL: "http://127.0.0.1:4173",

        trace: "on-first-retry",

        screenshot: "only-on-failure",

        video: "retain-on-failure"
    },

    webServer: {
        command: "npm run build && npm run preview:test",

        url: "http://127.0.0.1:4173",

        reuseExistingServer: !laMoiTruongCI,

        timeout: 120000
    },

    projects: [
        {
            name: "chromium",

            use: {
                ...devices["Desktop Chrome"]
            }
        }
    ]
});