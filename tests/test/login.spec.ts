import { expect, test } from "../page/base";
import testData from "../../test-data/standard-data.json";

test.describe('Login Test Suite', () => {
    test('should logged in successfully with standard user', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(testData.credentials.standard_user, testData.credentials.password);
        // Add assertions here to verify successful login
        await expect(loginPage.page).toHaveURL(/inventory.html/);
    });

    test('should show error message with locked out user', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(testData.credentials.locked_out_user, testData.credentials.password); 
        // Add assertions here to verify error message
        const errorMessage = loginPage.page.getByTestId('error');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

    test('should show error message with invalid credentials', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login('invalid_user', 'invalid_password');
        // Add assertions here to verify error message  
        const errorMessage = loginPage.page.getByTestId('error');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });
    
    test('should show the error message when username is missing', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login('', testData.credentials.password);
        // Add assertions here to verify error message
        const errorMessage = loginPage.page.getByTestId('error');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Epic sadface: Username is required');
    });

    test.only('should show the error message when password is missing', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(testData.credentials.standard_user, '');
        // Add assertions here to verify error message
        const errorMessage = loginPage.page.getByTestId('error');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Epic sadface: Password is required');
    });
});
