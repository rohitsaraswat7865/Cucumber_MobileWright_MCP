import { mergeTests } from '@playwright/test';
import { test as bddTest, createBdd } from 'playwright-bdd';
import { test as mobileTest } from '@mobilewright/test';

export const test = mergeTests(bddTest, mobileTest);
export const { Given, When, Then, AfterStep } = createBdd(test);

const delay = Number(process.env.STEP_DELAY_MS || 0);

AfterStep(async () => {
  if (delay > 0) await new Promise((r) => setTimeout(r, delay));
});