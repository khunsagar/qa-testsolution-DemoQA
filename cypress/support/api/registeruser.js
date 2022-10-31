/// <reference types="Cypress" />

export function registerUserSuccess(password)
{
  Cypress.env('USERNAME',(+new Date * Math.random()).toString(36).substring(0,6))
    cy.request({
        method: 'POST',
        url: Cypress.env('REGISTER_USER'),
        body: {
          "userName": Cypress.env('USERNAME'),
          "password": Cypress.env('PASSWORD')
        },
    
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'

        }
      }).then((responce)=>{
        expect(responce.status).to.eq(201)
        expect(responce.isOkStatusCode).to.be.true
        cy.log(JSON.stringify(responce.body))
        expect(responce.body).has.property("userID")
        expect(responce.body).has.property("username")
        expect(responce.body).has.property("books")
        Cypress.env('USERID',responce.body.userID)
      })
}
export function registerUserError()
{
    cy.request({
        method: 'POST',
        url: Cypress.env('REGISTER_USER'),
        failOnStatusCode: false,
        body: {
          "code": 0,
          "message": "string"
        },
      
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((responce)=>{
        cy.log(responce)
        expect(responce.status).to.eq(400)
    
      })
    }