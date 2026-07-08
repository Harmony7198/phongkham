import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node",

        include: [
            "tests/unit/**/*.test.js",
            "tests/business/**/*.test.js"
        ],

        exclude: [
            "tests/e2e/**",
            "dist/**",
            "playwright-report/**",
            "test-results/**",
            "node_modules/**"
        ],

        coverage: {
            enabled: false,

            provider: "v8",

            reporter: [
                "text",
                "html",
                "json-summary"
            ],

            reportsDirectory: "./coverage",

            exclude: [
                "tests/e2e/**",
                "dist/**",
                "playwright-report/**",
                "test-results/**",
                "node_modules/**",
                "coverage/**"
            ]
        }
    }
});