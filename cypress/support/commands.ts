/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login', (username) => {
  let password = ""
  if (username == "lightspeed-org-admin") {
    password = Cypress.env('passwordAdmin')
  } else {
    password = Cypress.env('passwordUser')
  }
  
  cy.visit(Cypress.config('baseUrl'));
  cy.get('#username-verification', { timeout: 30000 }).should('be.visible').type(username);
  cy.get('#login-show-step2', { timeout: 30000 }).should('be.visible').click();
  cy.get('#password', { timeout: 30000 }).should('be.visible').type(password);
  cy.get('#rh-password-verification-submit-button').click();
});
