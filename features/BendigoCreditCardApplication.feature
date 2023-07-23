Feature: Check eligibility for a credit card application - Bendigo 

  Scenario Outline: As a user, Check eligibility for a credit card application

    Given bendigo application url is launched 
    When banking button is clicked <banking_option1> and <banking_option2> and <banking_option3> and <banking_option4> options are displayed
    Then click on Credit cards option and scroll down and select Apply now for Bendigo Bright® Credit Card 
    Then Validate Check my eligibility screen is shown and click apply and validate correct screen is displayed <eligibility> and <getStarted> and <creditLimit> and <appDet> and <location> and <occupation> and <sOccupation> and <income> and <expenses> and <acceptText> 

    Then I should see a flash message saying <message>

    Examples:
      | banking_option1 | banking_option2 | banking_option3 | banking_option4                   | eligibility          | getStarted  | creditLimit | appDet              | location  | occupation   | sOccupation          | income | expenses | acceptText |
      | Bank accounts   | Credit cards    | Personal loans  | Travel and international payments | Check my eligibility | Get Started | 10000       | Application Details | Melbourne | Professional | Social Professionals | 20000  | 6000     | Yes        |
      
