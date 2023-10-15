describe('template spec', () => {
  it('Should allow change between units of current temperature', () => {
    cy.visit("/");

    cy.findByLabelText("To").select("Kelvin");

    cy.findByText(/(\d*\.\d*) K/);

    cy.findByLabelText("To").select("Celsius");

    cy.findByText('°C');
  })
})