import { expect } from '@mobilewright/test';
import { Given, When, Then } from './fixtures.js';

Then('I should see the text {string}', async ({ screen }, text) => {
  await expect(screen.getByRole('text')).toBeVisible();
});


When("I click on input text field", async ({screen}) => {
  await screen.getByRole('textfield').tap();
  await expect(screen.getByRole('textfield')).toBeEnabled();
});

When("I type {string}", async ({screen}, str) => {
  await screen.getByRole('textfield').fill(str);
  await screen.pressButton('ENTER');
});

Then("results should contain {string}", async ({screen}, str) => {  
  await expect(screen.getByWebView().getByText(str)).toBeVisible();  
});

Given("Launch app", async ({}) => {
  await screen.pressButton('HOME');
  await device.launchApp(bundleId);
});
