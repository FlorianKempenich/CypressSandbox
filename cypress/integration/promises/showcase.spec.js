/// <reference types="cypress" />

context("Showcase problem with Promises", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/fakeWebApp/");
  });

  it("hides debug div by default", () => {
    cy.get("#debug").should("be.hidden");
  });

  it("shows debug div when clicking button", () => {
    cy.get("#btn").click();
    cy.get("#debug").should("not.be.hidden");
  });













  
  // Also read this: https://docs.cypress.io/guides/references/migration-guide.html#Mocha-upgrade
  // Problem:
  // - warning shown
  // - failure doesn't register as a failure
  it("[Promise Problem] shows debug div when clicking button", async () => {
    cy.get("#debug").should("be.hidden");
    cy.get("#btn").should('not.exist')
    console.log("Promise start");
    await resolvesAfter3Sec().then((_) => {
      console.log("Promise done");
    });

    // cy.get("#btn").click();
    // cy.get("#debug").should("not.be.hidden");
  });

  const resolvesAfter3Sec = () =>
    new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
});
