/// <reference types="Cypress" />
import { ELEMENTS as LOCATOR } from '../locator';
const data = require('../../fixtures/userdetails.json');
export function clickElement()
{
    cy.clickCategoryCard('Elements')
}

export function clickWebTable()
{
    cy.clickElementWithText(LOCATOR.WEBTABLE,'Web Tables')
}

export function clickSubmit()
{
    cy.clickElementWithText(LOCATOR.SUBMIT_BUTTON,'Submit')
}

export function clickAddRecordButton()
{
    cy.clickElementWithText(LOCATOR.ADDRECORD_BUTTON,'Add')
}

export function getRowCount()
{
    cy.returnLength(LOCATOR.ROWLENTH).then((rowcount)=>
    {
        cy.log(rowcount)
    })
}

export function addNewRecordAndVerify()
{
    cy.get('.action-buttons>span').its('length').then((rowLengthBeforeAddingNewRow) =>{
     clickAddRecordButton()
     enterDetails();
     clickSubmit();
     cy.get('.action-buttons>span').its('length').then((rowLengthAfterAddingNewRow) =>
     {
        compareNumberOfRow(rowLengthBeforeAddingNewRow,rowLengthAfterAddingNewRow)
     })
    })
}

export function enterDetails()
{
    cy.typeText(LOCATOR.FIRSTNAME,data.user_details.first_name)
    cy.typeText(LOCATOR.LASTNAME,data.user_details.last_name)
    cy.typeText(LOCATOR.EMAIL,data.user_details.email)
    cy.typeText(LOCATOR.AGE,data.user_details.age)
    cy.typeText(LOCATOR.SALARY,data.user_details.salary)
    cy.typeText(LOCATOR.DEPARTMENT,data.user_details.department)
}

export function compareNumberOfRow(rowCountBefore,rowcountAfter)
{
          expect(rowcountAfter).to.be.greaterThan(rowCountBefore)
          expect(rowcountAfter).to.be.not.eq(rowCountBefore)
}
export function editRowValueAndVerify()
{
    cy.get(LOCATOR.TABLE).contains(LOCATOR.ALLCELL,data.user_details.first_name).should('be.visible')
    cy.get(LOCATOR.ROW_2).contains(LOCATOR.CELL_1,data.user_details.first_name).as('firstNameValueBeforeEdit')
    cy.get('@firstNameValueBeforeEdit').should('be.visible')
    cy.get('@firstNameValueBeforeEdit').then(($e)=>{
      if($e.text() === data.user_details.first_name)
        cy.get(LOCATOR.EDIT_BUTTON).click();
    }).then(() =>
    {
      cy.get(LOCATOR.FIRSTNAME).should('have.value',data.user_details.first_name)
      cy.get(LOCATOR.LASTNAME).should('have.value',data.user_details.last_name)
      cy.get(LOCATOR.FIRSTNAME).clear().type(data.edit_details.first_name)
      cy.get(LOCATOR.LASTNAME).clear().type(data.edit_details.last_name)
      cy.get(LOCATOR.SUBMIT).click();
      cy.get(LOCATOR.FIRSTNAME_AFTER_EDIT).as('firstNameValueAfterEdit')
      cy.get('@firstNameValueAfterEdit').should('not.have.text',data.user_details.first_name)
      cy.get('@firstNameValueAfterEdit').should('have.text',data.edit_details.first_name)
      cy.get(LOCATOR.LASTNAME_AFTER_EDIT).as('LastNameValueAfterEdit')
      cy.get('@LastNameValueAfterEdit').should('not.have.text',data.user_details.last_name)
      cy.get('@LastNameValueAfterEdit').should('have.text',data.edit_details.last_name)
     
    });
}