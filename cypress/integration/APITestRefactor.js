/// <reference types="cypress" />


/**
 * Note that API does not feature Method Not Allowed protection so we do not
 * test for 405 return.
 */

  describe('DemoQA Book Store App', () => {
    const book = {
      title: 'Designing Evolvable Web APIs with ASP.NET',
      ISBN: '9781449337711',
    };
    const bookCollection = [
      {
        isbn: '9781449337711',
      },
      {
        isbn: '9781449331818',
      },
      {
        isbn: '9781593275846',
      },
    ];
    const user = {
      username: Cypress.env('USERNAME').username,
      password: Cypress.env('PASSWORD').password,
    };

    context('Authentication Tests', () => {
      context('Successful Tests', () => {
        specify('Generate Token via API', () => {
          cy.request({
            method: 'POST',
            url: `${Cypress.config('baseUrl')}/Account/v1/GenerateToken`,
            body: {
              userName: user.username,
              password: user.password,
            },
          }).then(($response) => {
            expect($response.status).to.eq(200);
            expect($response.body.token).to.exist;
            expect($response.body.status).to.eq('Success');
          });
        });
      });

    context('Add Book Tests', () => {
      beforeEach('Login via API', () => {
        cy.authenticate(user);
      });

      context('Successful Tests', () => {
        afterEach('Delete the book via API', () => {
          cy.deleteBook(book.ISBN);
        });

        specify('Add a book via API', () => {
          cy.getCookie('token').then(($token) => {
            const token = $token.value;

            cy.getCookie('userID').then(($id) => {
              const userId = $id.value;

              cy.request({
                method: 'POST',
                url: `${Cypress.config('baseUrl')}/BookStore/v1/Books`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: {
                  userId,
                  collectionOfIsbns: [{ isbn: book.ISBN }],
                },
              }).then(($response) => {
                expect($response.status).to.eq(201);
              });
            });
          });
        });
      });

      context('Failure Tests', () => {
        specify('Add a book with invalid input', () => {
          cy.getCookie('token').then(($token) => {
            const token = $token.value;

            cy.getCookie('userID').then(($id) => {
              const userId = $id.value;

              cy.request({
                method: 'POST',
                url: `${Cypress.config('baseUrl')}/BookStore/v1/Books`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: {
                  userId,
                  collectionOfIsbns: [{ isbn: 90210 }],
                },
                failOnStatusCode: false,
              }).then(($response) => {
                expect($response.status).to.eq(400);
              });
            });
          });
        });

        specify('Add a book with null authorization', () => {
          cy.request({
            method: 'POST',
            url: `${Cypress.config('baseUrl')}/BookStore/v1/Books`,
            headers: {
              Authorization: null,
            },
            body: {
              userId: null,
              collectionOfIsbns: [{ isbn: book.ISBN }],
            },
            failOnStatusCode: false,
          }).then(($response) => {
            expect($response.status).to.eq(401);
          });
        });
      });
    });

    context('Delete All Books Tests', () => {
      beforeEach('Login via API', () => {
        cy.authenticate(user);
        cy.addBooks(bookCollection);
      });

      context('Successful Tests', () => {
        specify('Delete all books via API', () => {
          cy.getCookie('token').then(($token) => {
            const token = $token.value;

            cy.getCookie('userID').then(($id) => {
              const userId = $id.value;

              cy.request({
                method: 'DELETE',
                url: `${Cypress.config('baseUrl')}/BookStore/v1/Books?UserId=${userId}`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }).then(($response) => {
                expect($response.status).to.eq(204);
              });
            });
          });
        });
      });

      context('Failure Tests', () => {
        afterEach('Delete all books', () => {
          cy.deleteAllBooks();
        });

        specify('Delete all books with invalid input', () => {
          cy.getCookie('token').then(($token) => {
            const token = $token.value;

            cy.request({
              method: 'DELETE',
              url: `${Cypress.config('baseUrl')}/BookStore/v1/Books?UserId=555`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
              failOnStatusCode: false,
            }).then(($response) => {
              expect($response.status).to.eq(401);
            });
          });
        });

        specify('Delete all books with null authorization', () => {
          cy.getCookie('userID').then(($id) => {
            const userId = $id.value;

            cy.request({
              method: 'DELETE',
              url: `${Cypress.config('baseUrl')}/BookStore/v1/Books?UserId=${userId}`,
              headers: {
                Authorization: null,
              },
              failOnStatusCode: false,
            }).then(($response) => {
              expect($response.status).to.eq(401);
            });
          });
        });
      });
    });

    context('Delete Book Tests', () => {
      beforeEach('Login and add a book via API', () => {
        cy.authenticate(user);
        cy.addBook(book.ISBN);
      });

      context('Successful Tests', () => {
        specify('Delete a book via API', () => {
          cy.getCookie('token').then(($token) => {
            const token = $token.value;

            cy.getCookie('userID').then(($id) => {
              const userId = $id.value;

              cy.request({
                method: 'DELETE',
                url: `${Cypress.config('baseUrl')}/BookStore/v1/Book`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: {
                  userId,
                  isbn: book.ISBN,
                },
              }).then(($response) => {
                expect($response.status).to.eq(204);
              });
            });
          });
        });
      });

      context('Failure Tests', () => {
        afterEach('Delete the book', () => {
          cy.deleteBook(book.ISBN);
        });

        specify('Delete a book with invalid input', () => {
          cy.getCookie('token').then(($token) => {
            const token = $token.value;

            cy.getCookie('userID').then(($id) => {
              const userId = $id.value;

              cy.request({
                method: 'DELETE',
                url: `${Cypress.config('baseUrl')}/BookStore/v1/Book`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: {
                  userId,
                  isbn: 'testing',
                },
                failOnStatusCode: false,
              }).then(($response) => {
                expect($response.status).to.eq(400);
              });
            });
          });
        });

        specify('Delete a book with null authorization', () => {
          cy.request({
            method: 'DELETE',
            url: `${Cypress.config('baseUrl')}/BookStore/v1/Book`,
            headers: {
              Authorization: null,
            },
            body: {
              userId: null,
              isbn: book.ISBN,
            },
            failOnStatusCode: false,
          }).then(($response) => {
            expect($response.status).to.eq(401);
          });
        });
      });
    });
  });
});
