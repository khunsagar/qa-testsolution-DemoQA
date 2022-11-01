/// <reference types="Cypress" />
const data = require('../../fixtures/bookdetail.json');
import * as API_REG from '../api/registeruser';

export function addBookError()
{
    cy.request({
        method: 'POST',
        url: Cypress.env('BOOK_STORE'),
        failOnStatusCode: false,
        body: 
          {
            "userId":Cypress.env('USERID'),
            "collectionOfIsbns": [
              {
                "isbn": data.books.isbn
              }
            ]
          
          },
      
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((responce)=>{
        cy.log(JSON.stringify(responce.status))
        expect(responce.status).to.eq(401)
      })
}

export function addAndRemoveBookSuccess(ISBN)
{
  cy.getCookie('token').then(($token) => {
  const token = $token.value;
  cy.log(token)
  
  cy.getCookie('userID').then(($id) => {
    const userId = $id.value;
    cy.log(userId)

    cy.request({
       method: 'POST',
       url: Cypress.env('BOOK_STORE'),

       body: 
         {
           'userId': userId,
           "collectionOfIsbns": [
             {
               "isbn": ISBN
             }
           ],
         },
       headers: {
         'accept': 'application/json',
         'Content-Type': 'application/json',
          Authorization: 'Bearer '+token,
       }
     }).then((responce)=>{
      expect(responce.status).to.eq(201);
      expect(responce.body.books[0].isbn).to.be.eq(ISBN)
    })
  })
})
}

export function removeBookSuccess(ISBN)
{
  cy.getCookie('token').then(($token) => {
    const token = $token.value; 
    cy.log("token remove :",token)
    cy.getCookie('userID').then(($id) => {
      const userId = $id.value;
      cy.log("remove book ", userId)
    cy.request({
        method: 'DELETE',
        url: Cypress.env('BOOK_STORE_DELETE')
        ,
        body: 
         {
           userId: userId,
           isbn: ISBN,
         },
    
        headers: {
          Authorization: 'Bearer '+token,
        }
      }).then((resp)=>{
        expect(resp.status).to.eq(204);
        
      })
    })
  })
  
}

export function removeBookErrorCheck()
{
  cy.generateToken(Cypress.env('USERNAME'),Cypress.env('PASSWORD')).then(($responce) =>{
    cy.request({
       method: 'POST',
       url: Cypress.env('BOOK_STORE'),

       body: 
         {
           'userId': Cypress.env('USERID'),
           "collectionOfIsbns": [
             {
               "isbn": data.books.isbn
             }
           ],
         },
       headers: {
         'accept': 'application/json',
         'Content-Type': 'application/json',
         Authorization: `Bearer ${Cypress.env('TOKEN')}`,
       }
     }).then((responce)=>{
      expect(responce.status).to.eq(201);
      expect(responce.body.books[0].isbn).to.be.eq(data.books.isbn)
    }).then(()=>{
      const userID = "0"
      const token =  `Bearer ${Cypress.env('TOKEN')}`
      this.removeBookWithError(userID,token);
    })
})
}
export function removeBookWithError(userID,token)
{
    cy.request({
        method: 'DELETE',
        url: Cypress.env('BOOK_STORE'),
        failOnStatusCode: false,
        body: 
         {
           "isbn": data.books.isbn,
           "userId": userID,
           "message": data.books.title
         },
    
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        }
      }).then((resp)=>{
        expect(resp.status).to.eq(401);
        
      })
}