/// <reference types="Cypress" />
const data = require('../../fixtures/bookdetail.json');

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


export function addAndRemoveBookSuccess()
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
      removeBookSuccess();
    })
})
}

export function removeBookSuccess()
{
    cy.request({
        method: 'DELETE',
        url: Cypress.env('BOOK_STORE'),
        body: 
         {
           "isbn": data.books.isbn,
           "userId":  Cypress.env('USERID'),
           "message": data.books.title
         },
    
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cypress.env('TOKEN')}`,
        }
      }).then((resp)=>{
        expect(resp.status).to.eq(204);
        
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