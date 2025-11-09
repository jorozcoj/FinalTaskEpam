//launch URL https://www.saucedemo.com/ 
/*
  UC-1 
  test Login form with empty credentials:
  Type any credentials into "Username" and "Password"  fields
  Clear the inputs.
  Hit the "Login Button
  Check the error messages "Username is required"
  */

/* 
UC-2 
Test loging form with credentials by passing:
Username: Type any credentials in username
Enter password
Clear the "Password" input 
Hit the "Login" button
Check the error messages "Password is required"
*/

/* 
UC -3 
Test Login form with credentials by passing Username & Password:
Type credentials in username which are under Accepted username are sections
Enter password as secret_sauce
Click on login and validate the title "Swag Labs in the dashboard
*/

describe('Test login form with empty credentials', () => {

    beforeEach(async () => {
        await browser.url("/")
        //console.log(await browser.getTitle());

    })

    it("Type any credential in username and password field, and then clear both ", async () => {
        const userNameField = await $("input[placeholder='Username']");
        const passwordField = await $("input[placeholder='Password']");
        const submitButton = await $(".submit-button")

        await userNameField.setValue("anyValue");

        await passwordField.setValue("password");

        /*  await userNameField.clearValue();
         await passwordField.clearValue(); */
        await userNameField.click();
        await browser.keys(["Control", "a"]);
        await browser.keys("Backspace");

        await passwordField.click();
        await browser.keys(["Control", "a"]);
        await browser.keys("Backspace");

        //I didn't use .clearValue due in some versions of WdIO this methods doesn't complety clear 
        //the value on certain input types, especially when driven by React, Angular or similar frameworks

        //I tried using a stop but it still didn't clear the fields completely before clicking

        /*
        await userNameField.clearValue(); 
        await passwordField.clearValue();  
        
        await browser.waitUntil(async () => {
             const clearedUser = await userNameField.getValue();
             const clearedPassword = await passwordField.getValue();
             return clearedPassword === "" && clearedUser === ""
         }, {
             timeout: 2000,
             timeoutMsg: "The fields have been cleared"
         }) */


        await submitButton.click();

        await $("div.error-message-container").isDisplayed();
        await expect(await $(".error-message-container>h3").getText()).toEqual('Epic sadface: Username is required');

    });

    it("Type any credential in username and password, then clear password field", async () => {
        const userNameField = await $("input[placeholder='Username']");
        const passwordField = await $("input[placeholder='Password']");
        const submitButton = await $(".submit-button")

        await userNameField.setValue("anyValue");

        await passwordField.setValue("password");

        await passwordField.click();
        await browser.keys(["Control", "a"]);
        await browser.keys("Backspace");

        await submitButton.click();

        await $("div.error-message-container").isDisplayed();
        await expect(await $(".error-message-container>h3").getText()).toEqual('Epic sadface: Password is required');

    })


    it(`Test loging form with credentials by passing accepted and password`, async () => {
        const userNameField = await $("input[placeholder='Username']");
        const passwordField = await $("input[placeholder='Password']");
        const submitButton = await $(".submit-button");


        await userNameField.setValue('standard_user');
        await passwordField.setValue("secret_sauce");

        await submitButton.click();


        //Await until the elements of the next page displayed
        try {
            await $('div[id="contents_wrapper"]').waitForDisplayed({ timeout: 3000 })

        } catch (error) {
            console.error("Page content not displayed in time.");
            throw new Error("Page did not load properly.");
        }

        await expect(await browser.getTitle()).toEqual('Swag Labs');

    });
});