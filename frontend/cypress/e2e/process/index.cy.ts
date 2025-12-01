describe('process/index.tsx', () => {
  it('should load process/index.tsx', () => {
    cy.visit('/')
    cy.get("#processLink").click()

    cy.get('h1').contains('Process Next Queue Pair')
  })
})
