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

  it("shows and hides the logout button", () => {
    cy.get("#sandwich-menu").click();
    cy.get("#logoutButton").should("be.visible");

    cy.get("#sandwich-menu").click();
    cy.get("#logoutButton").should("not.be.visible");
  });

  it("shows the running state before showing the final result", () => {
    cy.fillInputAndRun("test");
    cy.get("#runButton")
      .should("contain.text", "Running...")
      .and("be.disabled");

    cy.validateOutputText("Running...", "Please wait.");
    cy.validateOutputText("Error", "test");
  });

  it("checks the run button disabled and enabled states", () => {
    cy.get("#runButton").should("be.disabled");
    cy.get("#codeInput").type("t");

    cy.get("#runButton").should("be.enabled");
    cy.get("#codeInput").clear();

    cy.get("#runButton").should("be.disabled");
  });

  it("clears the code input when logging off then logging in again", () => {
    cy.get("#codeInput").type("t");

    cy.get("#sandwich-menu").click();
    cy.get("#logoutButton").click();
    cy.contains("button", "Login").click();

    cy.get("#codeInput").should("have.value", "");
  });

  it("disables the run button when logging off then logging in again", () => {
    cy.get("#codeInput").type("t");

    cy.get("#sandwich-menu").click();
    cy.get("#logoutButton").click();
    cy.contains("button", "Login").click();

    cy.get("#runButton").should("be.disabled");
  });

  it("clears the code output when logging off then logging in again", () => {
    cy.fillInputAndRun("test");
    cy.validateOutputText("Error", "test");

    cy.get("#sandwich-menu").click();
    cy.get("#logoutButton").click();
    cy.contains("button", "Login").click();

    cy.get("#outputArea").should("have.text", "");
  });

  it.only("doesn't show the cookie consent banner on the login page", () => {
    cy.clearAllLocalStorage()

    cy.reload()

    cy.get('#cookieConsent').should('not.be.visible')
  });
});

describe("Cypress Simulator - Cookies consent", () => {
  beforeEach(() => {
    cy.visit("./src/index.html?skipCaptcha=true");
    cy.contains("button", "Login").click();
  });

  it("consents on the cookies usage", () => {
    cy.get("#acceptCookies").as("acceptCookiesButton").click();

    cy.get("@acceptCookiesButton").should("not.be.visible");
    cy.window()
      .its("localStorage.cookieConsent")
      .should("be.equal", "accepted");
    // cy.getAllLocalStorage().then(localstorage => {
    //   expect(localstorage['http://localhost:52570']['cookieConsent']).to.eql('accepted')
    // })
  });

  it("declines on the cookies usage", () => {
    cy.get("#declineCookies").as("declineCookiesButton").click();

    cy.get("@declineCookiesButton").should("not.be.visible");
    cy.window()
      .its("localStorage.cookieConsent")
      .should("be.equal", "declined");
  });
});

describe("Cypress Simulator - Captcha", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
    cy.contains("button", "Login").click();
  });

  it("disables the captcha verify button when no answer is provided or it's cleared", () => {
    cy.get("#verifyCaptcha").should("be.disabled");

    cy.get("#captchaInput").type("1");
    cy.get("#verifyCaptcha").should("be.enabled");

    cy.get("#captchaInput").clear();
    cy.get("#verifyCaptcha").should("be.disabled");
  });

  it("shows an error on a wrong captcha answer and goes back to its initial state", () => {
    cy.get("#captchaInput").type("21");
    cy.get("#verifyCaptcha").click();

    cy.contains(".error", "Incorrect answer, please try again.").should(
      "be.visible"
    );

    cy.get("#captchaInput").should("have.value", "");
    cy.get("#verifyCaptcha").should("be.disabled");
  });
});