describe("After login sccess", () => {
  it("Login Success", () => {
    const TEST_UID = Cypress.env("TEST_UID");
    cy.log("uid", TEST_UID);

    cy.visit("/");
    cy.login();
    cy.callFirestore("get", "farms").then((r) => {
      cy.log("get returned: ", r);
      if (r.length === 7) {
        cy.log("arrayNumbers", r.length);
        cy.log("arrayNumbers", "correct");
      }

      r.map((item) => {
        if ((item.uid = TEST_UID)) {
          cy.log("correct");
        }
      });
    });
  });
  it("Create Farm", () => {
    cy.get("[data-testid=click_createFarm]").click();
    cy.get("[data-testid=displayName]").type("thomasFarm");
    cy.get("[data-testid=farmName]").type("myFarm_thomas");
    cy.get("[data-testid=phoneNumber]").type("12345678");
    cy.get("[data-testid=hours]").type("12");
    cy.get("[data-testid=click_add]").click();
    cy.get("[data-testid=click_signout]").should("be.visible");
    cy.get("[data-testid=click_signout]").click();
  });
  it("added Farm", () => {
    const TEST_UID = Cypress.env("TEST_UID");
    cy.log("uid", TEST_UID);
    cy.callFirestore("get", "farms").then((r) => {
      cy.log("arrayNumbers", r.length);
      if (r.length === 8) {
        cy.log("arrayNumbers", "correct");
      }

      r.map((item) => {
        if ((item.uid = TEST_UID)) {
          cy.log("correct");
        }
      });
    });
  });
});
