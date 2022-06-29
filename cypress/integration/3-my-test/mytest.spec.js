describe("myTest from Login", () => {
  it("testing_from Login", () => {
    cy.visit("/");
    cy.get("[data-testid=email_login]").type("thomas@gmail.com");
    cy.get("[data-testid=password_login]").type("123456");
    cy.get("[data-testid=click_login]").click();
    cy.on("window:alert", (text) => {
      expect(text).to.contain("Success!");
    });

    // cy.get("[data-testid=click_createFarm]").click();
    // cy.get("[data-testid=displayName]").type("thomasFarm");
    // cy.get("[data-testid=farmName]").type("myFarm_thomas");
    // cy.get("[data-testid=phoneNumber]").type("12345678");
    // cy.get("[data-testid=hours]").type("12");
    // cy.get("[data-testid=click_add]").click();
    // cy.get("[data-testid=click_signout]").click();
    // cy.on("window:alert", (text) => {
    //   expect(text).to.contain("You are logged out");
    // });
  });
});
