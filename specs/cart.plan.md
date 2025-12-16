# Cart Functionality Test Plan

## Application Overview

This test plan covers the add to cart, remove from cart, and cart details verification functionality on the Sauce Labs demo e-commerce website. The site allows users to browse products, add items to their shopping cart, remove items, and view detailed cart contents including item names, descriptions, prices, and quantities.

## Test Scenarios

### 1. Cart Management Suite

**Seed:** `tests/seed.spec.ts`

#### 1.1. Add Single Item to Cart

**File:** `tests/cart/add-single-item.spec.ts`

**Steps:**
  1. Navigate to the inventory page after login.
  2. Click the 'Add to cart' button for 'Sauce Labs Backpack'.
  3. Verify the button text changes to 'Remove'.
  4. Verify the shopping cart badge in the header shows '1'.

**Expected Results:**
  - The 'Add to cart' button for the selected item changes to 'Remove'.
  - A shopping cart badge appears in the header displaying '1'.

#### 1.2. View Cart Details

**File:** `tests/cart/view-cart-details.spec.ts`

**Steps:**
  1. Ensure at least one item is in the cart (e.g., 'Sauce Labs Backpack').
  2. Click on the shopping cart badge in the header.
  3. Verify navigation to the cart page.
  4. Verify the item details are displayed correctly: name 'Sauce Labs Backpack', description matches the product description, price '$29.99', quantity '1'.
  5. Verify 'Remove' button is available for the item.

**Expected Results:**
  - The page navigates to the cart page (URL contains 'cart.html').
  - The cart displays the added item with correct name, description, price ($29.99), and quantity (1).
  - A 'Remove' button is present for the item.

#### 1.3. Remove Item from Cart

**File:** `tests/cart/remove-from-cart.spec.ts`

**Steps:**
  1. Navigate to the cart page with at least one item.
  2. Click the 'Remove' button for the item in the cart.
  3. Verify the item is no longer displayed in the cart.
  4. Verify the cart is empty.
  5. Click 'Continue Shopping' to return to inventory.
  6. Verify the item's button is back to 'Add to cart'.
  7. Verify no shopping cart badge is present.

**Expected Results:**
  - The item is removed from the cart.
  - The cart is empty (no items displayed).
  - The shopping cart badge disappears or shows '0'.

#### 1.4. Add Multiple Items to Cart

**File:** `tests/cart/add-multiple-items.spec.ts`

**Steps:**
  1. Start with an empty cart.
  2. Click 'Add to cart' for 'Sauce Labs Backpack'.
  3. Click 'Add to cart' for 'Sauce Labs Bike Light'.
  4. Verify the shopping cart badge shows '2'.
  5. Navigate to the cart page.
  6. Verify both items are listed with correct names, descriptions, prices ($29.99 and $9.99), and quantities (1 each).

**Expected Results:**
  - The shopping cart badge updates to '2'.
  - Both items are displayed in the cart with correct details.

#### 1.5. Remove One Item from Cart with Multiple Items

**File:** `tests/cart/remove-one-from-multiple.spec.ts`

**Steps:**
  1. Add two items to the cart (e.g., Backpack and Bike Light).
  2. Navigate to the cart page.
  3. Click 'Remove' for one item (e.g., Bike Light).
  4. Verify the removed item is gone.
  5. Verify the other item remains.
  6. Verify the shopping cart badge shows '1'.

**Expected Results:**
  - The removed item is no longer in the cart.
  - The remaining item stays in the cart.
  - The shopping cart badge updates to '1'.

#### 1.6. Attempt to View Cart When Empty

**File:** `tests/cart/attempt-remove-empty-cart.spec.ts`

**Steps:**
  1. Ensure the cart is empty.
  2. Attempt to navigate to the cart page (if possible, or verify no badge).
  3. Verify the cart page shows no items.
  4. Verify 'Continue Shopping' button is present.

**Expected Results:**
  - The cart remains empty.
  - No error occurs.
  - Shopping cart badge does not appear.
