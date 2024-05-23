/// <reference types="cypress" />
declare global {
  namespace Cypress {
    interface Chainable {
      isPageTitleVisible(title: string): Chainable<Element>
      clickAndCheckPageTitle(index: number): Chainable<Element>
      goTo(page: string): Chainable<Element>
    }
  }
}

Cypress.Commands.add('isPageTitleVisible', (title) => {
  cy.contains('.container h3', title, { timeout: 10000 }).should('be.visible')
})

Cypress.Commands.add('clickAndCheckPageTitle', (index) => {
  cy.visit('http://www.uitestingplayground.com/');
  cy.get('h3').eq(index).should('exist').then(($el) => {
    const itemText = $el.text().trim();
    cy.wrap($el).click();
    cy.isPageTitleVisible(itemText);
    cy.go('back');
  });
});

Cypress.Commands.add('goTo', (page) => {
  cy.contains('h3', page).scrollIntoView().should('be.visible').click()
  cy.url().should('contain', page.replace(/\s+/g, '').toLowerCase())
})

export { };
