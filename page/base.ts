import { test as base } from '@playwright/test';
import { LoginPage } from './LoginPage.page';

type setUpFixtures = {
    loginPage: LoginPage;
}

export const test = base.extend<setUpFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
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