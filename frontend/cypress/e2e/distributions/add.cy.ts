describe('distributions/add.tsx', () => {
  it('should load distributions/add.tsx', () => {
    cy.visit('/')
    cy.get("#distributorButton").click()

    cy.get('h1').contains('Become a Distributor')
  })
})
