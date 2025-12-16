import { Page, Locator } from '@playwright/test';
import { step } from './base';

export class CartManagementPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly cartLink: Locator;
    readonly cartTitle: Locator;
    readonly itemName: Locator;
    readonly itemDescription: Locator;
    readonly itemPrice: Locator;
    readonly itemQuantity: Locator;
    readonly removeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.getByTestId('shopping-cart-link');
        this.cartTitle = page.getByText('Your Cart');
        this.itemName = page.getByText('Sauce Labs Backpack');
        this.itemDescription = page.getByText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
        this.itemPrice = page.getByText('$29.99');
        this.itemQuantity = page.getByTestId('item-quantity');
        this.removeButton = page.getByRole('button', { name: 'Remove' });
    }

    @step('Navigate to Cart Page')
    async gotoCart() {
        await this.cartLink.click();
    }

    @step('Verify Cart Page Loaded')
    async verifyCartPage() {
        await this.cartTitle.waitFor({ state: 'visible' });
    }

    @step('Verify Item Details in Cart')
    async verifyItemDetails() {
        await this.itemName.waitFor({ state: 'visible' });
        await this.itemDescription.waitFor({ state: 'visible' });
        await this.itemPrice.waitFor({ state: 'visible' });
        await this.itemQuantity.waitFor({ state: 'visible' });
    }

    @step('Verify Remove Button Available')
    async verifyRemoveButton() {
        await this.removeButton.waitFor({ state: 'visible' });
    }
}