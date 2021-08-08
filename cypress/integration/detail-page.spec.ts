describe('DetailPage', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.headline-title').click();
  })

  it('Should also display "Home" nav in header', () => {
    cy.visit('/');
    cy.get('.container.navbar').contains('Home');
  })

  it('Should display breadcrumb', () => {
    cy.get(".breadcrumb").contains('News');
  })

  it('Should get article content', () => {
    cy.get("h1.title").should('be.visible');
  })

})
