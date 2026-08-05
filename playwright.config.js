// Basic Playwright config for e2e tests
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5000,
    ignoreHTTPSErrors: true
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } }
  ]
});
