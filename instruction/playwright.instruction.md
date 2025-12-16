---
description: 'Playwright test generation instructions'
applyTo: '**'
---

## Test Writing Guidelines

### Code Quality Standards
- **Locators**: Prioritize user-facing, role-based locators (`getByTestId`,`getByRole`, `getByLabel`, `getByText`, etc.) for resilience and accessibility. Use `@step` decorator in `<base.ts>` to group interactions and improve test readability and reporting.
- **Assertions**: Use auto-retrying web-first assertions. These assertions start with the `await` keyword (e.g., `await expect(locator).toHaveText()`). Avoid `expect(locator).toBeVisible()` unless specifically testing for visibility changes.
- **Timeouts**: Rely on Playwright's built-in auto-waiting mechanisms. Avoid hard-coded waits or increased default timeouts.
- **Clarity**: Use descriptive test and step titles that clearly state the intent. Add comments only to explain complex logic or non-obvious interactions.


### Test Structure
- **Imports**: Start with `import { test, expect } from '../../page/base';`. For data test `import testData from "../../test-data/standard-data.json";`
- **Organization**: Group related tests for a feature under a `test.describe()` block.
- **Titles**: Follow a clear naming convention, such as `Feature - Specific action or scenario`.


### File Organization

**Location**: Store all test files in the `tests/` directory.

**Recommended Structure:**

```
tests/
  page/          # Page Object Models for each page (e.g., HomePage.page.ts)
                 # and a base file for setting up fixtures
  test/          # Actual test cases (e.g., homepage.test.ts)
```

**Folder Purposes:**
- `helper` : All typescripts functions using for handle/support the test cases as random number, random email/user,...
- `test-data/standard-data.json`: Use for dynamic test data (e.g., usernames, passwords, product names, prices) to make tests reusable and avoid hardcoding values.
- `page/`: Page Object Model files (e.g., LoginPage.page.ts) to encapsulate selectors and page actions, and a base file for setting up fixtures.
- `test/`: Test case files, grouped by feature or page.

**Naming Conventions:**
- Page Objects: `<PageName>.page.ts` (e.g., `HomePage.page.ts`)
- Tests: `<feature-or-page>.test.ts` (e.g., `homepage.test.ts`)

**Example Folder Structure:**
```
tests/
  page/
    base.ts
    HomePage.page.ts
  test/
    homepage.test.ts
```

**Scope:**
- Aim for one test file per major application feature or page.

### Assertion Best Practices
- **UI Structure**: Use `toMatchAriaSnapshot` to verify the accessibility tree structure of a component. This provides a comprehensive and accessible snapshot.
- **Element Counts**: Use `toHaveCount` to assert the number of elements found by a locator.
- **Text Content**: Use `toHaveText` for exact text matches and `toContainText` for partial matches.
- **Navigation**: Use `toHaveURL` to verify the page URL after an action.


## Example Test Structure

```typescript
import { expect, test } from "../page/base";
import testData from "../../test-data/standard-data.json";

test.describe('Login Test Suite', () => {
   test('should logged in successfully with standard user', async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(testData.credentials.standard_user, testData.credentials.password);
        // Add assertions here to verify successful login
        await expect(loginPage.page).toHaveURL(/inventory.html/);
    });
});
```

## Test Execution Strategy

1. **Initial Run**: Execute tests with `npx playwright test`
2. **Debug Failures**: Analyze test failures and identify root causes
3. **Iterate**: Refine locators, assertions, or test logic as needed
4. **Validate**: Ensure tests pass consistently and cover the intended functionality
5. **Report**: Provide feedback on test results and any issues discovered

## Quality Checklist

Before finalizing tests, ensure:
- [ ] All locators are accessible and specific and avoid strict mode violations
- [ ] Tests are grouped logically and follow a clear structure
- [ ] Ensure all Page Objects are added as fixtures in the `<base.ts>` file (e.g., extend the `test.extend` object with new POM instances)
- [ ] Assertions are meaningful and reflect user expectations
- [ ] Tests follow consistent naming conventions
- [ ] Code is properly formatted and commented