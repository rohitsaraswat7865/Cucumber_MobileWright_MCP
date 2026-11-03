import { expect } from '@mobilewright/test';
import { When, Then } from './fixtures.js';

// Google's search box is the first EditText in the tree; Chrome's own URL bar comes later.
const searchInput = (screen) => screen.getByType('android.widget.EditText').first();

Then('I should see the text {string}', async ({ screen }, text) => {
  await expect(screen.getByText(text, { exact: false }).first()).toBeVisible();
});

When('I click on input text field', async ({ screen }) => {
  await searchInput(screen).tap();
});

When('I type {string}', async ({ screen }, str) => {
  await searchInput(screen).fill(str);
  await screen.pressButton('ENTER');
});

Then('results should contain {string}', async ({ screen }, str) => {
  await expect(screen.getByText(str, { exact: false }).first()).toBeVisible();
});

When('I clear input text filed', async ({ screen }) => {
  await searchInput(screen).fill('');
});

When('I open new chrome tab in incognito mode', async ({ screen }) => {
  await screen.getByLabel('Customise and control Google Chrome', { exact: true }).tap();
  await screen.getByText('New Incognito tab', { exact: true }).tap();
  await expect(screen.getByText('You’ve gone Incognito', { exact: true })).toBeVisible();
});
