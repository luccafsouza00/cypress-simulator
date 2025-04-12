describe("Cypress simulator", () => {
  beforeEach(() => {
    cy.visit("./src/index.html?skipCaptcha=true", {
      onBeforeLoad: (window) => {
        window.localStorage.setItem("cookieConsent", "accepted");
      },
    });
    cy.contains("button", "Login").click();
  });

  it("successfully simulates a cypress command", () => {
    const cypressComand = "cy.get('button')";

    cy.fillInputAndRun(cypressComand);

    cy.validateOutputText("Success", cypressComand);
  });

  it("shows an error when entering and running an invalid Cypress command", () => {
    const invalidCypressCommand = "cy.run()";

    cy.fillInputAndRun(invalidCypressCommand);

    cy.validateOutputText("Error", invalidCypressCommand);
  });

  it("shows a warning when entering and running a not-implemented Cypress", () => {
    const cypressCommandNotImplemented = "cy.contains('button')";

    cy.fillInputAndRun(cypressCommandNotImplemented);

    cy.validateOutputText(
      "Warning",
      cypressCommandNotImplemented.split("(")[0]
    );
  });

  it("shows an error when entering and running a valid cypress command without parentheses", () => {
    const cypressCommandWithoutParentheses = "cy.get";

    cy.fillInputAndRun(cypressCommandWithoutParentheses);

    cy.validateOutputText("Error", cypressCommandWithoutParentheses);
  });

  it("asks for help and gets common Cypress commands and examples with a link to the docs", () => {
    cy.fillInputAndRun("help");

    cy.validateOutputText(
      "Common Cypress commands and examples:",
      "For more commands and details, visit the official Cypress API documentation."
    );

    cy.contains("a", "official Cypress API documentation")
      .should("have.attr", "target", "_blank")
      .and("have.attr", "href", "https://docs.cypress.io/api/table-of-contents")
      .and("be.visible");
  });

  it("maximizes and minimizes a simulation result", () => {
    cy.fillInputAndRun("help");

    cy.validateOutputText(
      "Common Cypress commands and examples:",
      "For more commands and details, visit the official Cypress API documentation."
    );

    cy.get(".expand-collapse").click();

    cy.get("#collapseIcon").should("be.visible");

    cy.get(".expand-collapse").click();

    cy.get("#expandIcon").should("be.visible");
  });

  it("logs out successfully", () => {
    cy.get("#sandwich-menu").click();
    cy.get("#logoutButton").click();

    cy.contains("button", "Login").should("be.visible");
  });

  it.only("shows and hides the logout button", () => {
    cy.get("#sandwich-menu").click();

    cy.get("#logoutButton").should("be.visible");

    cy.get("#sandwich-menu").click();
    
    cy.get("#logoutButton").should("not.be.visible");
  });

  // it("comando help");

  // // Redirecionamentos
  // it("Deve redirecionar corretamente os links exibidos no output");

  // it("Deve redirecionar corretamente ao clicar em links da página");

  // // Cookies
  // it("Deve armazenar os cookies corretamente após o login");

  // it("Deve limpar os cookies corretamente após o logout");

  // // Logout
  // it("Deve realizar o logout e redirecionar para a tela de login");

  // it("running state");
});
