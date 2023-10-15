import { Countries } from "../../src/models/Countries";

describe('template spec', () => {
  it('Should allow change between units of current temperature', () => {
    cy.visit("/");


    cy.findByLabelText("To").select("Celsius");

    cy.findByText('°C');
  
    cy.contains(`in ${Countries.SPAIN}`);

    cy.findByLabelText("Country").select(Countries.UNITED_STATES);

    cy.findByText('Get Temperature').click()

    cy.contains(`in ${Countries.UNITED_STATES}`);
  })
})