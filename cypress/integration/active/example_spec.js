/*eslint-disable */
describe('First', function () {
  it('Back button should take user back to document list', function() {
    cy.visit('http://localhost:3000')

    cy.contains('Learn React').should('exist')
  })
})