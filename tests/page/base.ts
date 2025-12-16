import { test as base } from '@playwright/test';
import { LoginPage } from './LoginPage.page';
import { ProductPage } from './ProductPage.page';
import { CartManagementPage } from './CartManagementPage.page';
import testData from '../../test-data/standard-data.json';

type setUpFixtures = {
    loginPage: LoginPage;
    productPage: ProductPage;
    cartManagementPage: CartManagementPage;
}

export const test = base.extend<setUpFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));

        await page.close();
        await page.context().close();
    },
    productPage: async ({ loginPage }, use) => {
        // Navigate to login page and log in
        await loginPage.goto();
        await loginPage.login(testData.credentials.standard_user, testData.credentials.password);

        await use(new ProductPage(loginPage.page));
    },
    cartManagementPage: async ({ page }, use) => {
        await use(new CartManagementPage(page));
    },

    
});

export { expect } from '@playwright/test';

export function step(stepName?: string) {
    return function decorator(
        target: Function,
        context: ClassMethodDecoratorContext
    ) {
        return function replacementMethod(...args: any) {
            const name = `${stepName || (context.name as string)} (${this.constructor.name})`
            return test.step(name, async () => {
                return await target.call(this, ...args)
            })
        }
    }
}