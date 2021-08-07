import { HomepagePo } from './homepage.po';

describe('HomePage', () => {
  let page: HomepagePo;

  beforeEach(() => {
    page = new HomepagePo();
  });

  it('Should display "Home" nav in header', () => {
    cy.visit('/');
    cy.get('.container.navbar').contains('Home');
  })

  it('Should display tagline', () => {
    cy.visit('/');
    cy.get('.tagline__content').contains('Democracy Dies in Darkness');
  })

  it('Should display headline meta after fetching articles', () => {
    cy.visit('/');
    cy.get('.headline-meta').contains('comments');
  })

  it('Should navigate to detail page when click headline title', () => {
    page.navigateToArticle();
    cy.url().should('include', '/1')
  })

  it('Should include id and params url when navigate to post detail', () => {
    page.navigateToArticle();
    cy.url().should('include', '/1?url=')
  })

})
