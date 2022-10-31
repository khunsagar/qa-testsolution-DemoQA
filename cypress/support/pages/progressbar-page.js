/// <reference types="Cypress" />
import { PROGRESSBAR as LOCATOR } from '../locator';

export function clickProgressBarMEnu()
{   
    cy.clickCategoryCard('Widgets')
    cy.clickElementWithText(LOCATOR.PROGRESS_MENU,'Progress Bar').click();
    cy.get(LOCATOR.PROGRESS).should('be.visible')
    cy.get(LOCATOR.START_BUTTON).should('be.visible').click();
    cy.get(LOCATOR.RESET_BUTTON).should('have.text','Reset')
    cy.get(LOCATOR.PROGRESS_SUCCESS).then($e1 => {
      let asset = $e1
      expect(asset).to.have.css(LOCATOR.BG_COLOR, LOCATOR.COLOR_GREEN_RGB_VALUE)
    })
}