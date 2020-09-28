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

});
