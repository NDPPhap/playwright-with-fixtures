import { test, expect } from '../page/base';
import testData from "../../test-data/standard-data.json";

test.describe('Test group', () => {
  test('seed', async ({ loginPage }) => {
    // generate code here.
    await loginPage.goto();
    await loginPage.login(testData.credentials.standard_user, testData.credentials.password);
    // Add assertions here to verify successful login
    await expect(loginPage.page).toHaveURL(/inventory.html/);
  });
});
