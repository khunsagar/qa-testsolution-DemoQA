import './commands';
import 'cypress-file-upload';

// Alternatively you can use CommonJS syntax:
// require('./commands')
/* eslint-disable no-unused-vars */
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});


/* eslint-enable no-unused-vars */
