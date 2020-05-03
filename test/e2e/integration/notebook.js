describe('Notebook', () => {
  it('User can add new cells', () => {
    cy.visit('/')

    cy.get('.cell').should('have.length', 0)
    cy.get('button#cy-add-cell-button').click()
    cy.get('.cell').should('have.length', 1)
  })

  it('User can delete cells', () => {
    cy.visit('/')

    cy.get('.cell').should('have.length', 0)
    cy.get('button#cy-add-cell-button').click()
    cy.get('.cell').should('have.length', 1)
    cy.get('button.cell__close').click()
    cy.get('.cell').should('have.length', 0)
  })

  // TODO: create mock server and perform query
  describe('When query succeeded', () => {
    it('Display a query table with results', () => {})
  })

  // TODO: create mock server and perform query
  describe('When query result in error', () => {
    it('Display a tree view of the current database error', () => {})
  })
})
