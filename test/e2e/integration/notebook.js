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

  describe('When query succeeded', () => {
    it('Display a query table with results', () => {
      cy.visit('/')

      cy.get('button#cy-connections-button').click()
      cy.get('#cy-host').type('127.0.0.1')
      cy.get('#cy-database').type('db')
      cy.get('#cy-port').type('3306')
      cy.get('#cy-username').type('root')
      cy.get('#cy-password').type('root')
      cy.get('button#cy-connections-close-button').click()

      cy.get('button#cy-add-cell-button').click()

      cy.get('.prism-editor__code').type('SELECT * FROM `users`;')
      cy.get('.cell__query').click()

      cy.get('tbody > tr').should('have.length', 2)
      cy.get('td')
        .eq(1)
        .contains('User 01')
      cy.get('td')
        .eq(2)
        .contains('user01@test.com')

      cy.get('td')
        .eq(4)
        .contains('User 02')
      cy.get('td')
        .eq(5)
        .contains('user02@test.com')
    })
  })

  describe('When query result in error', () => {
    it('Display a tree view of the current database error', () => {
      cy.visit('/')

      cy.get('button#cy-connections-button').click()
      cy.get('#cy-host').type('127.0.0.1')
      cy.get('#cy-database').type('db')
      cy.get('#cy-port').type('3306')
      cy.get('#cy-username').type('root')
      cy.get('#cy-password').type('root')
      cy.get('button#cy-connections-close-button').click()

      cy.get('button#cy-add-cell-button').click()

      cy.get('.prism-editor__code').type('SELECT * FROM `unexisting-table`;')
      cy.get('.cell__query').click()

      cy.get('#cy-tree-view').contains(
        "Table 'db.unexisting-table' doesn't exist"
      )
    })
  })
})
