import BasePage from "./base.page";

class LoginPage extends BasePage {
    get userNameField() { return $("input[placeholder='Username']"); }
    get passwordField() { return $("input[placeholder='Password']"); }
    get submitButton() { return $(".submit-button"); }
    get errorMessage() { return $(".error-message-container > h3"); }

    async typeCredentials(username, password) {
        await this.type(this.userNameField, username);
        await this.type(this.passwordField, password);
    }

    async clearBothFields() {
        await this.clearInputFeld(this.userNameField);
        await this.clearInputFeld(this.passwordField);
    }

    async clearPassword() {
        await this.clearInputFeld(this.passwordField);
    }

    async submit() {
        await this.click(this.submitButton);
    }

    async getErrorText() {
        return await this.getText(this.errorMessage);
    }
}

export default new LoginPage();