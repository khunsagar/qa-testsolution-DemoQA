/// <reference types="Cypress" />
import * as ELEMNT from '../support/pages/element-page';
import * as BROKENIMAGE from '../support/pages/brokenimage-page';
import * as FORM from '../support/pages/form-page';
import * as TOOLTIP from '../support/pages/tooltip-page';
import * as PROGRESSBAR from '../support/pages/progressbar-page';
import * as DRAGDROP from '../support/pages/dragdrop-page';


describe('Cypress UI Test for DemoQA Web site ', function () {
  beforeEach('visit  demoQA Web site ', function () {
    Cypress.config('defaultCommandTimeout', 50000);
    const ctx = Cypress.currentTest.title
    if(ctx === "TC01- Scenario B - Verify user can edit the row in a table")
    {
      this.skip
    }
    else
    {
    cy.visit('/')
    }
  });
  
  
  it('TC01- Scenario A - Verify user can enter new data into the table', function () {
    ELEMNT.clickElement();
    ELEMNT.clickWebTable();
    ELEMNT.addNewRecordAndVerify();
  });
  it("TC01- Scenario B - Verify user can edit the row in a table",function(){
    ELEMNT.editRowValueAndVerify();
  });

  it("TC02 - Verify broken image",function(){
    BROKENIMAGE.verifyBrokenImage()
  });
  it("TC03 - Verify user can submit the form.",function(){
    FORM.clickOnForm();
    FORM.enterDetails();
    FORM.selectDate();
    FORM.chooseSubject();
    FORM.selecthobby();
    FORM.selectFile();
    FORM.typeAddress()
    FORM.chooseCityAndState();
    FORM.clickSubmit();
    FORM.verifyFormDetails()
  });
    
  it("TC04 - Verify the progress bar",function(){
    
    PROGRESSBAR.clickProgressBarMEnu()
  });
  it("TC05 - Verify the tooltip",function(){
    TOOLTIP.verifyTooltip();
  });

  it("TC06 - Verify user can drag and drop",function(){
    DRAGDROP.dragAndDrop();
   
  });
});