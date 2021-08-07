export class HomepagePo {
  navigateToArticle(): void {
    cy.visit('/');
    cy.get('.headline-title').click();
  }
}
