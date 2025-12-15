---
description: 'Playwright test generation instructions'
applyTo: '**'
---

## Test Writing Guidelines

### Code Quality Standards
- **Locators**: Prioritize user-facing, role-based locators (`getByRole`, `getByLabel`, `getByText`, etc.) for resilience and accessibility. Use `test.step()` to group interactions and improve test readability and reporting.
- **Assertions**: Use auto-retrying web-first assertions. These assertions start with the `await` keyword (e.g., `await expect(locator).toHaveText()`). Avoid `expect(locator).toBeVisible()` unless specifically testing for visibility changes.
- **Timeouts**: Rely on Playwright's built-in auto-waiting mechanisms. Avoid hard-coded waits or increased default timeouts.
- **Clarity**: Use descriptive test and step titles that clearly state the intent. Add comments only to explain complex logic or non-obvious interactions.


### Test Structure
- **Imports**: Start with `import { test, expect } from '@playwright/test';`.
- **Organization**: Group related tests for a feature under a `test.describe()` block.
- **Hooks**: Use `beforeEach` for setup actions common to all tests in a `describe` block (e.g., navigating to a page).
- **Titles**: Follow a clear naming convention, such as `Feature - Specific action or scenario`.


### File Organization

**Location**: Store all test files in the `tests/` directory.

**Recommended Structure:**

```
tests/
  hooks/         # Setup and teardown logic (e.g., TestSuiteSetup.hooks.ts)
  page/          # Page Object Models for each page (e.g., HomePage.page.ts)
  test/          # Actual test cases (e.g., homepage.test.ts)
```

**Folder Purposes:**
- `hooks/`: Shared setup/teardown logic, reusable across tests.
- `page/`: Page Object Model files, encapsulate selectors and page actions.
- `test/`: Test case files, grouped by feature or page.

**Naming Conventions:**
- Hooks: `<Feature>Setup.hooks.ts` (e.g., `TestSuiteSetup.hooks.ts`)
- Page Objects: `<PageName>.page.ts` (e.g., `HomePage.page.ts`)
- Tests: `<feature-or-page>.test.ts` (e.g., `homepage.test.ts`)

**Example Folder Structure:**
```
tests/
  hooks/
    TestSuiteSetup.hooks.ts
  page/
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
import { test, expect } from '@playwright/test';

test.describe('Movie Search Feature', () => {
    let testSuiteSetup: TestSuiteSetup;
    let homePage: HomePage;

    test.beforeAll(async ({ }, testInfo) => {   
        testSuiteSetup = new TestSuiteSetup();
        const projectName = testInfo.project.name; 
        await testSuiteSetup.beforeAll(projectName);
        homePage = new HomePage(testSuiteSetup.getPage());
    })

    test.beforeEach(async () => {
        await homePage.goto();
    })

    test("Verify that the DSTA logo should be displayed", async () => { 
            await expect(homePage.logoDTSA).toBeVisible();
    })

    test("Verify that the user can click on a social media feed in [Connect With Us] section", async () => {
        const homePageTitle = await homePage.getPageTitle();
        const newTab = await homePage.clickOnRandomSocialMedia();
        const socialTitle = await newTab.title();
        console.log(homePageTitle,'===',socialTitle);
        expect(homePageTitle).not.toEqual(socialTitle);
    })
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
- [ ] Assertions are meaningful and reflect user expectations
- [ ] Tests follow consistent naming conventions
- [ ] Code is properly formatted and commented