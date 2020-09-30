/// <reference types="cypress" />

context("Sandbox Image Regression", () => {
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

  it("compares 2 images", () => {
    cy.task("compareImages", {
      img1Id: "compass",
      img2Id: "compassExpected",
    }).then((result) => {
      console.log(result);
    });

    cy.task("compareImages", {
      img1Id: "compass",
      img2Id: "compassWrong",
    }).then((result) => {
      console.log(result);
    });
  });
});
