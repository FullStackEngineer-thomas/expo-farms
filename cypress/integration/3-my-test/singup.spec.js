describe("myTest from SignUp", () => {
  it("testing_from Signup", () => {
    cy.visit("/");
    cy.get("[data-testid=click_newRegister]").click();
    cy.get("[data-testid=email_signup]").type("myprivate@gmail.com");
    cy.get("[data-testid=password_signup]").type("123456");
    cy.get("[data-testid=click_signup]").click();
  });
  afterEach(() => {
    cy.clearCookies();
  });
});
