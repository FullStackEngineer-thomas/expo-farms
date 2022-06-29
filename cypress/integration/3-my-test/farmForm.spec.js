describe("After login sccess", () => {
  it("Login Success", () => {
    cy.visit("/");
    cy.login();
    cy.get("[data-testid=click_createFarm]").click();
    cy.get("[data-testid=displayName]").type("thomasFarm");
    cy.get("[data-testid=farmName]").type("myFarm_thomas");
    cy.get("[data-testid=phoneNumber]").type("12345678");
    cy.get("[data-testid=hours]").type("12");
    cy.get("[data-testid=click_add]").click();
    cy.get("[data-testid=click_signout]").should("be.visible");
    cy.get("[data-testid=click_signout]").click();
  });
  afterEach(() => {
    cy.logout();
    cy.clearCookies();
  });
});
