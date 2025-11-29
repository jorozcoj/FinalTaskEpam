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
import InventoryPage from "../pages/inventoryPage";
import LoginPage from "../pages/login.page.js";

describe('Login form tests ', () => {

    beforeEach(async () => {
        await LoginPage.open("/")

    })

    it("Type any credential in username and password field, and then clear both ", async () => {
        
        await LoginPage.typeCredentials("anyValue", "password");
        await LoginPage.clearBothFields();
        await LoginPage.submit();
        await expect(await LoginPage.getErrorText())
            .toEqual("Epic sadface: Username is required");
    });

    it("Type any credential in username and password, then clear password field", async () => {
        await LoginPage.typeCredentials("anyValue", "password");
        await LoginPage.clearPassword();
        await LoginPage.submit();
        await expect(await LoginPage.getErrorText())
            .toEqual("Epic sadface: Password is required");
    });


    it(`Test loging form with credentials by passing accepted and password`, async () => {
        await LoginPage.typeCredentials("standard_user", "secret_sauce");
        await LoginPage.submit();
        await expect(await InventoryPage.isInventoryDisplayed()).toBeTruthy();
        await expect(await InventoryPage.getPageTitle()).toEqual("Swag Labs");

    });
});