describe('sponsorships/add.tsx', () => {
  it('should load sponsorships/add.tsx', () => {
    cy.visit('/')
    cy.get("#sponsorButton").click()

    cy.get('h1').contains('Become a Sponsor')
  })
})
