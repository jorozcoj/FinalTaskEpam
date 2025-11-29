//Page loaded after successful login

import BasePage from "./base.page.js";

class InventoryPage extends BasePage {
    get title() { return $('span[data-test="title"]'); }

    async isInventoryDisplayed() {
        return await this.title.waitForDisplayed();
    }

    async getPageTitle() {
        return await browser.getTitle();
    }
}

export default new InventoryPage();