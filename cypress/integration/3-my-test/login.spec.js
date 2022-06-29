describe("myTest from Login", () => {
  it("testing_from Login", () => {
    cy.visit("/");
    cy.get("[data-testid=email_login]").type("thomas@gmail.com");
    cy.get("[data-testid=password_login]").type("123456");
    cy.get("[data-testid=click_login]").click();
    cy.login();
  });
  afterEach(() => {
    cy.clearCookies();
  });
});
