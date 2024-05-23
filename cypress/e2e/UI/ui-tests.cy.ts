/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('UI tests', () => {
  const name = faker.word.noun(5)

  beforeEach(() => {
    cy.visit(Cypress.env('baseUiUrl'))
  })

  it('Should click each item and match with the redirected page title', () => {
    cy.get('h3').each(($el, index) => {
      cy.clickAndCheckPageTitle(index);
    });
    cy.log('All h3 elements have been clicked.');
  });

  it('Should login with valid credentials and logs out', () => {
    cy.login(name, 'pwd')
    cy.get('#loginstatus').should('be.visible').and('contain', `Welcome, ${name}!`)
    cy.get('#login').click()//logout
    cy.get('#loginstatus').should('be.visible').and('contain', 'User logged out.')
  })

  it('Should not login with invalid password', () => {
    cy.login(name, '234')
    cy.get('#loginstatus').should('be.visible').and('contain', 'Invalid username/password')
  })

  it('Should wait load time ', () => {
    cy.intercept(`${Cypress.env('baseUiUrl')}/loaddelay`).as('loader')
    cy.goTo('Load Delay')
    cy.wait('@loader')
    cy.contains('.btn-primary', 'Button Appearing After Delay').should('be.visible')
  })

  it('Should scroll to the button', () => {
    cy.visit(`${Cypress.env('baseUiUrl')}/scrollbars`)
    cy.get('#hidingButton').scrollIntoView().should('be.visible')
  })
});
