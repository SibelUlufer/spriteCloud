/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('UI tests', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUiUrl'))
  })


  it.skip('Should click each item and match with the redirected page title', () => {
    cy.get('h3').each(($el, index) => {
      cy.clickAndCheckPageTitle(index);
    });

    cy.log('All h3 elements have been clicked.');
  });
  it('Should login with valid credentials and logs out', ()=>{
    cy.goTo('Sample App')
    const name = faker.word.noun(5)
    cy.get('[name="UserName"]').type(name)
    cy.get('[name="Password"]').type('pwd')
    cy.get('#login').click()//login
    cy.get('#loginstatus').should('be.visible').and('contain',  `Welcome, ${name}!`)
    cy.get('#login').click()//logout
    cy.get('#loginstatus').should('be.visible').and('contain',  'User logged out.')
  })
  it('Should not login with invalid password', ()=>{
    cy.goTo('Sample App')
    const name = faker.word.noun(5)
    cy.get('[name="UserName"]').type(name)
    cy.get('[name="Password"]').type('234')
    cy.get('#login').click()//login
    cy.get('#loginstatus').should('be.visible').and('contain',  'Invalid username/password')
  })
  it.only('Should wait load time ', ()=>{
    cy.intercept(`${Cypress.env('baseUiUrl')}/loaddelay`).as('loader')
    cy.goTo('Load Delay')
    cy.wait('@loader')
    cy.contains('.btn-primary', 'Button Appearing After Delay').should('be.visible')
  })
  it('Should scroll to the button', ()=>{
    cy.visit(`${Cypress.env('baseUiUrl')}/scrollbars`)
    cy.get('#hidingButton').scrollIntoView().should('be.visible')
  })
});
