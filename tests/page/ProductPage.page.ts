import { Locator, Page } from "@playwright/test";
import { step } from "./base";

export class ProductPage {
    readonly page: Page;
    readonly addToCartBackpackButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartBackpackButton = page.getByTestId('add-to-cart-sauce-labs-backpack');
    }

    @step('Add Sauce Labs Backpack to Cart')
    async addBackpackToCart() {
        await this.addToCartBackpackButton.waitFor({ state: 'visible' });
        await this.addToCartBackpackButton.click();
    }
}
