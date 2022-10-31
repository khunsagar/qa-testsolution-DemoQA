/// <reference types="Cypress" />
import { BROKENIMAGE as LOCATOR } from '../locator';

export function verifyBrokenImage()
{   cy.clickCategoryCard('Elements')
    clickBrokenLinkMenu();
    cy.get(LOCATOR.BROKEN_IMAGE).then(($img) => {
    cy.wrap($img).scrollIntoView().should('be.visible');
    expect($img[0].naturalWidth).to.be.greaterThan(-1);
    expect($img[0].naturalHeight).to.be.greaterThan(-1);
    });

}

export function clickBrokenLinkMenu()
{
  cy.clickElementWithText(LOCATOR.BROKENIMAGEMENU,'Broken Links - Images')
}