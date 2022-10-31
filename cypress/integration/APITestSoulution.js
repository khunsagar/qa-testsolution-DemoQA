/// <reference types="Cypress" />
import * as API_REG from '../support/api/registeruser';
import * as API_BOOK from '../support/api/addbook';
const data = require('../fixtures/bookdetail.json')

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
 

  it('Add a list of books: Verify successfully adding book to user accounts and removing same ', function () {
    API_REG.registerUserSuccess();
    API_BOOK.addAndRemoveBookSuccess()    
    });
  
    it('Unauthorized Error: Add a list of books: Verify error when user try to delete Book', function () {
      API_REG.registerUserSuccess();
      API_BOOK.removeBookErrorCheck();
      });
  })