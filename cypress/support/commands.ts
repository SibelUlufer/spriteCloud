/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      isPageTitleVisible(title: string): Chainable<Element>
      clickAndCheckPageTitle(index: number): Chainable<Element>
      goTo(page: string): Chainable<Element>
      login(name: string, password: string): Chainable<Element>
    }
  }
}

//takes the page title parameter to check its visibility
Cypress.Commands.add('isPageTitleVisible', (title) => {
  cy.contains('.container h3', title, { timeout: 10000 }).should('be.visible')
})

//respectively clicks each option on the main page and checks the texts'
//in the option and in the redirected page to make sure it's correct
Cypress.Commands.add('clickAndCheckPageTitle', (index) => {
  cy.visit('http://www.uitestingplayground.com/');
  cy.get('h3').eq(index).should('exist').then(($el) => {
    const itemText = $el.text().trim();
    cy.wrap($el).click();
    cy.isPageTitleVisible(itemText);
    cy.go('back');
  });
});

//redirects via clicking the intended page
//and checks the url
Cypress.Commands.add('goTo', (page) => {
  cy.contains('h3', page).scrollIntoView().should('be.visible').click()
  cy.url().should('contain', page.replace(/\s+/g, '').toLowerCase())
})


//login with name, password parameters
Cypress.Commands.add('login', (name, password) => {
  cy.goTo('Sample App')
  cy.get('[name="UserName"]').type(name)
  cy.get('[name="Password"]').type(password)
  cy.get('#login').click()//login

})

export { };
