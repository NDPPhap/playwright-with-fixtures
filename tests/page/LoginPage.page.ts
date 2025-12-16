import { Locator, Page } from "@playwright/test";
import { step } from "./base";

export class LoginPage {
    readonly page : Page;
    readonly name: string;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page, name = 'Login Page POM') {
        this.page = page;
        this.name = name;
        this.usernameInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
    }
    @step('Navigate to Login Page')
    async goto() {
        await this.page.goto(process.env.BASE_URL || 'https://www.saucedemo.com/');
    }
    
    @step('Perform Login Action')
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}