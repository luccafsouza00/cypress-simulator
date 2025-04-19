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

Cypress.Commands.add("login", () => {
  const setup = () => {
    cy.visit("./src/index.html?skipCaptcha=true");
    cy.contains("button", "Login").click();
  };

  const validate = () => {
    cy.visit("./src/index.html");
    cy.contains("button", "Login", { timeout: 1000 }).should("not.be.visible");
  };

  const options = {
    cacheAcrossSpecs: true,
    validate,
  };

  cy.session("sessionId", setup, options);
});

Cypress.Commands.add("fillTextAreaAndRun", (string) => {
  cy.get("#codeInput").type(string);
  cy.get("#runButton").click();
});

Cypress.Commands.add("validateOutputText", (status, text) => {
  cy.get("#outputArea", { timeout: 6000 })
    .should("contain.text", status)
    .and("contain.text", text)
    .and("be.visible");
});
