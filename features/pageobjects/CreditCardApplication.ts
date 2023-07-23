

//import { keys } from 'webdriverio/build/commands/browser';
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CreditCardApplication extends Page {
    /**
     * define selectors using getter methods
     */
    public get getBankingOption1() {
        return $('//h3/a[text()="Bank accounts"]');
    }

    public get btnCreditCards () {
        return $('//h3/a[text()="Credit cards"]');
    }

    public get btnApplyNow () {
        return $('(//a[@aria-label="Apply now for a bendigo bright credit card"])[4]');
    }

    public get lblEligibility () {
        return $('//h1[contains(text(),"Check my eligibility")]');
    }

    public get clk_ApplyNow () {
        return $('(//a[text()="Continue to apply"])[1]');
    }

    public get lbl_getStarted () {
        return $('//h2[text()="Getting Started"]');
    }

    public get txt_creditLimit () {
        return $('//input[@type="text"]');
    }

    public get btn_generalPurpose () {
        return $('//button[text()="General purpose use"]');
    }

    public get btn_Continue () {
        return $('//button[@name="contBtn"]');
    }

    public get lbl_AppDet () {
        return $('//div[@id="sstAnchorScroll"]/h2');
    }

    public get opt_MartialStatus () {
        return $('//button[@name="isPrimaryApplicantExistingCustomer" and text()="No"]');
    }

    public get opt_Promocode () {
        return $('//button[@name="hasPromoCode"]/span[text()="No"]');
    }

    public get btn_Criteria () {
        return $('(//button[@name="hasApplicantConformToEligibilityCriteria"])[1]');
    }

    public get inp_Branch () {
        return $('//input[@name="branchSearch"]');
    }

    public get btn_Find () {
        return $('//span[contains(@class,"glyphicon glyphicon-search")]');
    }

    public get option_MelPlace () {
        return $('//span[contains(text(),"101-103 Queens Parade, Clifton Hill VIC 3068")]');
    }

    public get lbl_IncomeDetails () {
        return $('//h2[text()="Income Details"]');
    }

    public get inp_Occupation () {
        return $('//input[@name="occupationSearch"]');
    }

    public get inp_Income () {
        return $('//input[@name="incomeAmount"]');
    }

    public get lbl_Expenses () {
        return $('//h3[text()="Expenses"]');
    }

    public get inp_Expenses () {
        return $('//input[@name="expenseAmount"]');
    }

    public get btn_Cancel () {
        return $('//button[@name="cancelBtn"]');
    }

    public get lbl_CancelMeassage () {
        return $('//*[text()="Your application "]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to click on credit cards option, scroll down and click on apply now
     */
    public async cc_Click () {
        await this.btnCreditCards.click();

        window.addEventListener('scroll' , () => {
            const scrollposition = document.documentElement.scrollHeight - window.innerHeight;
            window.scrollTo(Math.ceil(scrollposition), 50)
        });

        await this.btnApplyNow.click();

       

    }

    public async eligibilityCheckApply (eligibility,getStarted,creditLimit,appDet,location, occupation, sOccupation,income,expenses,acceptText) {
        
        let elgble= (await this.lblEligibility).getText;
        if(elgble === eligibility)
        console.log("Check my Eligibility screen is found");

        let parentWindow= await browser.getWindowHandle();
        console.log(parentWindow.trim);
        
        await this.clk_ApplyNow.click();

        let windows = await browser.getWindowHandles();
        await browser.switchToWindow(windows[1]);
        if ((await browser.getTitle()).includes("Product Details")){
            console.log("New Product details for Bendigo Credit card is opened and displayed");
                }

        // validate Getting started section is displayed
        let getSt= (await this.lbl_getStarted).getText;
        if(getSt === getStarted)
        console.log("Check my Eligibility screen is found");

        //input $10000
        (await this.txt_creditLimit).sendKeys(creditLimit);

        //select - General purpose use
        (await this.btn_generalPurpose).click();

        //click Continue
        (await this.btn_Continue).click();

        //validate application details
        let det= (await this.lbl_AppDet).getText;
        if(det === appDet)
        console.log("Application details section is displayed");

        //select Martial status
        let mSel= document.getElementsByName('maritalStatus');
        mSel.entries[1].click();

        //Select No for next two entries
        (await this.opt_MartialStatus).click();
        (await this.opt_Promocode).click();

         //click Continue 
         (await this.btn_Continue).click();

         //select yes as Criteria and continue
         (await this.btn_Criteria).click();
         (await this.btn_Continue).click();
         
         //input location and find Clifton hill
         (await this.inp_Branch).sendKeys(location);
         (await this.btn_Find).click();
         (await this.option_MelPlace).click();
         (await this.btn_Continue).click();

         //validate income details and select Casual
         let incomeDetails= (await this.lbl_IncomeDetails).getText;
        if(incomeDetails != null)
        console.log("Income section is displayed successfully");
        let empStatus= document.getElementsByName('employmentStatus');
        empStatus.entries[4].click();

        //input occupation
        (await this.inp_Occupation).sendKeys(occupation);

        //select Social Professionals value from dropdown
        let sValues= document.getElementsByName("occupationSearch").values.name;
        for(let i of sValues){
            if(i.toString === sOccupation)
            browser.moveToElement[i].click();
        }
        
        //input income and frequency as Anually and continue
        (await this.inp_Income).sendKeys(income);
        let inc = document.getElementsByName('incomeFrequency');
        inc.entries[3].click();
        (await this.btn_Continue).click();

        //validate Expenses section
        let expensesSec= (await this.lbl_Expenses).getText;
        if(expensesSec != null)
        console.log("Expenses section is displayed successfully");

        //input expenses and frequency as monthly
        (await this.inp_Expenses).sendKeys(expenses);
        let expFreq = document.getElementsByName('frequency');
        expFreq.entries[2].click();
        (await this.btn_Continue).click();

        //click Cancel and accept alert with Yes option
        (await this.btn_Cancel).click();
        let aText= await browser.getAlertText();
        if(aText.toString == acceptText){
            await browser.acceptAlert();
        }

        //validate cancel success message
        let cancelMSG= (await this.lbl_CancelMeassage).getText;
        if(cancelMSG != null && cancelMSG.name.includes("has been cancelled")){
            console.log("Bendigo Credit card application cancelled successfully");
        }
        
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open();
    }
}

export default new CreditCardApplication();
