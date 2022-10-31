/// <reference types="Cypress" />
import { TOOLTIP as LOCATOR } from '../locator';


export function clickToolTip()
{   cy.clickElementWithText(LOCATOR.TOOLTIP_MENU,'Tool Tips')
    cy.get(LOCATOR.TOOLTIP_BUTTON).trigger('mouseover').click({force:true})
}

export function verifyTooltipText()
{
    cy.get(LOCATOR.TOOLTIP).should('have.text','You hovered over the Button')
}

export function verifyTooltip()
{
    cy.clickCategoryCard('Widgets')
    clickToolTip();
    verifyTooltipText();

}

