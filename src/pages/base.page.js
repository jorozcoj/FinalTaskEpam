export default class BasePage {
    async open(path = "/") {
        await browser.url(path)
    }

    async click(element){
        await element.waitForClickable();
        await element.click()   
    }

    async type(element, text){
        await element.waitForDisplayed();
        await element.setValue(text);
    }

    async clearInputFeld(element,) {        
        await element.click();
        await browser.keys(["Control", "a"]);
        await browser.keys("Backspace");
    }

    async getText(element) {
        await element.waitForDisplayed();
        return await element.getText();
    }
}