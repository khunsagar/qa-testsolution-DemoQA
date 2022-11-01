/// <reference types="Cypress" />
import * as API_REG from '../support/api/registeruser';
import * as API_BOOK from '../support/api/addbook';
const data = require('../fixtures/bookdetail.json')
const ISBN = ['9781491950296','9781593275846','9781593277574','9781449325862','9781449331818','9781449337711','9781449365035','9781491904244']
describe('Cypress API  Test for DemoQA Web site ', function () {
  beforeEach('', function () {
    Cypress.config('defaultCommandTimeout', 4000);
  });
    
  it('Creation of user account: Verify user will  be created successfully ', function () {
    API_REG.registerUserSuccess();
  });
  it('Creation of user account: Verify Error message when already register user try to register again', function () {
    API_REG.registerUserError();
  });

  it('Add a list of books: Verify Error while adding books when user is not authorized ', function () {
    API_BOOK.addBookError()
  });
 

  it.only('Add a list of books: Verify successfully adding book to user accounts and removing same ', function () {
    API_REG.registerUserSuccess();
    cy.generateToken()
    //API_BOOK.addAndRemoveBookSuccess();
    
    const length = ISBN.length;
   for(let i =0;i<length;i++)
   {
    API_BOOK.addAndRemoveBookSuccess(ISBN[i])
   }
     API_BOOK.removeBookSuccess(ISBN[length-1])
    });
  
    it('Unauthorized Error: Add a list of books: Verify error when user try to delete Book', function () {
      API_REG.registerUserSuccess();
      API_BOOK.removeBookErrorCheck();
      });
  })