import { Given, When, Then } from '@wdio/cucumber-framework';

import LoginPage from '../pageobjects/login.page';
import SecurePage from '../pageobjects/secure.page';
import CreditCardApplication from '../pageobjects/CreditCardApplication';

const pages = {
    login: LoginPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
});

Given(/^bendigo application url is launched$/, async (page) => {
    await pages[page].open()
});

When(/^banking button is clicked (\w+) and (\w+) and (\w+) and (.*) options are displayed$/, async (banking_option1, banking_option2, banking_option3, banking_option4) => {
    await LoginPage.login(banking_option1, banking_option2, banking_option3, banking_option4)
});

Then(/^click on Credit cards option and scroll down and select Apply now for Bendigo Bright® Credit Card$/, async () => {
        await CreditCardApplication.cc_Click()
});

Then(/^Validate Check my eligibility screen is shown and click apply and validate correct screen is displayed (\w+) and (\w+) and (\w+) and (\w+) and (\w+) and (\w+) and (\w+) and (\w+) and (.*)$/, async (eligibility, getStarted, creditLimit,appDet,location,occupation, sOccupation,income,expenses,acceptText) => {
      await CreditCardApplication.eligibilityCheckApply(eligibility,getStarted, creditLimit,appDet,location,occupation,sOccupation,income,expenses,acceptText)
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveTextContaining(message);
});

