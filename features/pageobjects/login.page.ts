//import { ChainablePromiseElement } from 'webdriverio';

import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get getBankingOption1() {
        return $('//h3/a[text()="Bank accounts"]');
    }

    public get getBankingOption2() {
        return $('//h3/a[text()="Credit cards"]');
    }

    public get getBankingOption3() {
        return $('//h3/a[text()="Personal loans"]');
    }

    public get getBankingOption4() {
        return $('//h3/a[text()="Travel and international payments"]');
    }

    public get btnBanking () {
        return $('//button[name="banking"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login (banking_option1, banking_option2, banking_option3, banking_option4) {
     
        await this.btnBanking.click();

        let b1= (await this.getBankingOption1).getText;
        if(b1 === banking_option1)
        console.log("banking_option1 is found");

        let b2= (await this.getBankingOption2).getText;
        if(b2 === banking_option2)
        console.log("banking_option2 is found");

        let b3= (await this.getBankingOption3).getText;
        if(b3 === banking_option3)
        console.log("banking_option3 is found");

        let b4= (await this.getBankingOption4).getText;
        if(b4 === banking_option4)
        console.log("banking_option4 is found");

    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open();
    }
}

export default new LoginPage();
