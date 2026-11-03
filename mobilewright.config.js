import { defineConfig } from 'mobilewright';
import { defineBddConfig } from 'playwright-bdd';

// Load .env natively (Node >= 20.12); existing env vars are not overridden.
try {
  process.loadEnvFile();
} catch {
  // .env is optional
}

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: 'features/steps/**/*.js',
});

export default defineConfig({
  testDir,
  platform: 'android',
  deviceId: process.env.DEVICE_ID,
  bundleId: process.env.APP_ID,
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  viewTree: 'on-failure',
  use: {
    actionTimeout: 15_000,
    video: 'retain-on-failure',
  },
  expect: { timeout: 10_000 },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
});
