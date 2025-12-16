// spec: specs/cart.plan.md
// seed: tests/seed.spec.ts

import { expect, test } from '../../page/base';
import testData from '../../../test-data/standard-data.json';

test.describe('Cart Management Suite', () => {
  test('View Cart Details', async ({ productPage, cartManagementPage }) => {
    // Add item to cart
    await productPage.addBackpackToCart();

    // Navigate to cart
    await cartManagementPage.gotoCart();

    // Verify cart page
    await cartManagementPage.verifyCartPage();

    // Verify item details
    await cartManagementPage.verifyItemDetails();

    // Verify remove button
    await cartManagementPage.verifyRemoveButton();
  });
});