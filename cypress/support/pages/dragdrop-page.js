/// <reference types="Cypress" />
import { DRAGDROP as LOCATOR } from '../locator';

export function dragAndDrop()
{
    cy.clickCategoryCard('Interactions')
    cy.clickElementWithText(LOCATOR.MENU,'Droppable')
    cy.get(LOCATOR.DRAGGABLE).drag(LOCATOR.DROPABBLE,{force:true}).then((success) => {
        assert.isTrue(success)
      })
   
}