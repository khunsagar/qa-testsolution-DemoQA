// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';
require('@4tw/cypress-drag-drop')

/// <reference types="Cypress" />

Cypress.Commands.add('clickElementWithText', (pagelocator,text) => {
    cy.get(pagelocator).should('be.visible');
    cy.contains(pagelocator,text).first().click();
  });

  Cypress.Commands.add('returnLength', (pagelocator) => {
    cy.get(pagelocator).should('be.visible');
    cy.get(pagelocator).its('length').then((length)=>{
        return length
    })
    return length
})

    Cypress.Commands.add('typeText', (pagelocator,text) => {
        cy.get(pagelocator).should('be.visible');
        cy.get(pagelocator).clear().type(text).should('have.value',text)
  });
  Cypress.Commands.add('clickCategoryCard',(text) => {
    cy.get('.card-body>h5').should('be.visible');
    cy.get('.card-body>h5').contains(text).click();
});

Cypress.Commands.add('generateToken',() => {
     return cy.request({
        method: 'POST',
        url: Cypress.env('GENERATETOKEN'),
        body: 
                  {
                    "userName": Cypress.env('USERNAME'),
                    "password": Cypress.env('PASSWORD')
                  },
              
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        }
    }).then((token) =>{
            Cypress.env('TOKEN',token.body.token)
            cy.log('TOKEN command ',token.body.token)
            cy.setCookie('token', token.body.token);
        })
});

