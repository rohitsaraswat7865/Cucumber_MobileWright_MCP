import 'dotenv/config';
import { defineConfig } from 'mobilewright';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: 'features/steps/**/*.js',
  
});

export default defineConfig({
  testDir,
  platform: 'android',
  deviceId: process.env.DEVICE_ID,
  bundleId: process.env.APP_ID,
  autoAppLaunch: false,
  timeout: 30_000,
  viewTree: 'on-failure',
  use: {
    actionTimeout: 15_000,
    video: 'on',
  },
  expect: { timeout: 10_000 },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
});