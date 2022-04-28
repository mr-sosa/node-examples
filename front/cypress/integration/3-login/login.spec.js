/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Login', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/login');
  });

  it('displays form', () => {
    cy.get('#username').type('isis3710');
    cy.get('#password').type('isis3710');

    cy.get('.btn.btn-primary').click();
    //TODO expect here
    cy.get('#user-data').should('include.text', 'token');
  });
  
  //Add new test
  it('Error Credentials', () => {
    cy.get('#username').type('isis3710');
    cy.get('#password').type('contrasena');

    cy.get('.btn.btn-primary').click();
    //TODO expect here
    cy.get('#user-data').should('have.text', 'No data');
  });
});
