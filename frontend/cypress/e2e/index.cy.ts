describe('index.tsx', () => {
  it('should load index.tsx', () => {
    cy.visit('/')
    cy.get('h1').contains('Sponsors')
  })
})
