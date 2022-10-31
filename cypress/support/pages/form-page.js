/// <reference types="Cypress" />
import { FORM as LOCATOR } from '../locator';
const data = require('../../fixtures/userdetails.json');

export function clickOnForm()
{
  cy.clickCategoryCard('Forms')
  cy.clickElementWithText(LOCATOR.FORM_LIST,'Practice Form')
}

export function enterDetails ()
{
  cy.typeText(LOCATOR.FIRSTNAME,data.user_form_details.first_name)
  cy.typeText(LOCATOR.LASTNAME,data.user_form_details.last_name)
  cy.typeText(LOCATOR.EMAIL,data.user_form_details.email)
  cy.get(LOCATOR.GENDER_RADIO).check(data.user_form_details.gender,{force:true})
  cy.typeText(LOCATOR.PHONE_NUMBER,data.user_form_details.phone)
}

export function selectDate()
{
  cy.get(LOCATOR.DOB).then(($datePicker)=>{
    cy.wrap($datePicker).click();
    cy.get(LOCATOR.MONTH).select(data.user_form_details.month) //0 is for January 
    cy.get(LOCATOR.YEAR).select(data.user_form_details.year)
    cy.get(LOCATOR.CALENDER_TITLE).first().should('have.text',data.user_form_details.date_title)
    cy.get(LOCATOR.WEEK).each($date =>{
      if($date.text() == data.user_form_details.date)
      {
        cy.wrap($date).click();
      }
    });
    cy.get(LOCATOR.DOB).should('have.value',data.user_form_details.calender_title)
  })
}

export function verifyFormDetails()
{
  cy.get(LOCATOR.ROW_LABEL).each($label=>{
    const rowIndex = 1
    switch ($label.text())
    {
      case 'Student Name': 
        let name =  data.user_form_details.first_name +' '+data.user_form_details.last_name
        cy.get(LOCATOR.ROW_ELEMENT_HEAD+rowIndex+LOCATOR.ROW_ELEMENT_TAIL)
        .should('have.text',name)
        break; 
      case 'Student Email': 
        cy.get(LOCATOR.ROW_ELEMENT_HEAD+(rowIndex+parseInt(1))+LOCATOR.ROW_ELEMENT_TAIL).should('have.text',data.user_form_details.email)
        break; 
      case 'Gender': 
        cy.get(LOCATOR.ROW_ELEMENT_HEAD+(rowIndex+parseInt(2))+LOCATOR.ROW_ELEMENT_TAIL).should('have.text',data.user_form_details.gender)
        break; 
      case 'Mobile':
        cy.get(LOCATOR.ROW_ELEMENT_HEAD+(rowIndex+parseInt(3))+LOCATOR.ROW_ELEMENT_TAIL).should('have.text',data.user_form_details.phone)  
        break; 
      case 'Date of Birth': 
        cy.get(LOCATOR.ROW_ELEMENT_HEAD+(rowIndex+parseInt(4))+LOCATOR.ROW_ELEMENT_TAIL).should('have.text',data.user_form_details.complete_date)
        break; 
      case 'Subjects':
        cy.get(LOCATOR.ROW_ELEMENT_HEAD+(rowIndex+parseInt(5))+LOCATOR.ROW_ELEMENT_TAIL).should('have.text',data.user_form_details.subject)
        break; 
      case 'Hobbies': 
        cy.get(LOCATOR.ROW_ELEMENT_HEAD+(rowIndex+parseInt(6))+LOCATOR.ROW_ELEMENT_TAIL).should('have.text',data.user_form_details.hobby)
        break;
      case 'Picture': 
        cy.get(LOCATOR.ROW_ELEMENT_HEAD+(rowIndex+parseInt(7))+LOCATOR.ROW_ELEMENT_TAIL).should('have.text',LOCATOR.PICTUREPATH)
        break; 
      case 'Address': 
        cy.get(LOCATOR.ROW_ELEMENT_HEAD+(rowIndex+parseInt(8))+LOCATOR.ROW_ELEMENT_TAIL).should('have.text',data.user_form_details.address)
        break; 
      case 'State and City	': 
      let cityandstate = data.user_form_details.state+' '+data.user_form_details.city
        cy.get(LOCATOR.ROW_ELEMENT_HEAD+(rowIndex+parseInt(9))+LOCATOR.ROW_ELEMENT_TAIL).should('have.text',cityandstate)
        break; 
      default:
        break; 
    }    
  });
}

export function chooseCityAndState()
{
  cy.get(LOCATOR.STATE).type(data.user_form_details.state)
  cy.contains(LOCATOR.SUGGESTION,data.user_form_details.state).click();
  cy.get(LOCATOR.CITY).type(data.user_form_details.city)
  cy.contains(LOCATOR.SUGGESTION,data.user_form_details.city).click();
}

export function clickSubmit()
{
  cy.get(LOCATOR.SUBMIT).click();
}

export function chooseSubject()
{
  cy.get(LOCATOR.SUBJECT).click({force:true}).type(data.user_form_details.subject);
  cy.contains(LOCATOR.SUGGESTION,data.user_form_details.subject).click();
}

export function selectFile()
{
  cy.get(LOCATOR.UPLOADPICTURE).attachFile(LOCATOR.PATH)
}

export function typeAddress()
{
  cy.typeText(LOCATOR.ADDRESS,data.user_form_details.address)
}

export function selecthobby()
{
  cy.get(LOCATOR.HOBBY).each($hobby =>{
  if($hobby.text() == data.user_form_details.hobby)
  {
    cy.wrap($hobby).click();
  }
});
}