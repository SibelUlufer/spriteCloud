/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('User API tests', ()=>{
  const user_id = faker.number.int(100)
  const first_name = faker.person.firstName()
  const last_name = faker.person.lastName()
  const user_name = `${first_name}_${last_name}`
  const email = `${first_name}+${last_name}@testmail.com`
  const random_no = faker.number.int(1000)
  const password = `pwd${random_no}`

  it('Should create a user and check', ()=>{
    const phone_number = faker.string.numeric(11)
    //creates user
    cy.api({
      method: 'POST',
      url: `${Cypress.env("baseApiUrl")}/user`,
      body: {
        id: user_id,
        username: user_name,
        firstName: first_name,
        lastName: last_name,
        email: email,
        password: password,
        phone: phone_number,
        userStatus: 0
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal(String(user_id)); // Verify the message contains the user ID
    }).then(()=>{
      //checks user
        cy.api({
          method:'GET',
          url:  `${Cypress.env("baseApiUrl")}/user/${user_name}`
        }).then((response)=>{
          expect(response.body.username).to.eq(user_name)
          expect(response.body.id).to.eq(user_id)
          expect(response.body.email).to.eq(email)
        })
    })
  })
  it('Should update user and check', ()=>{
    const phone_number = faker.string.numeric(11)
    //updates user
    cy.api({
      method: 'PUT',
      url: `${Cypress.env("baseApiUrl")}/user/${user_name}`,
      body: {
        id: user_id,
        username: user_name,
        firstName: first_name,
        lastName: last_name,
        email: email,
        password: password,
        phone: phone_number,
        userStatus: 0
      }
    }).then((response)=>{
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal(String(user_id));// Verify the message contains the user ID
    })
  })
  it('Should delete the user', ()=>{
    cy.api({
      method: 'DELETE',
      url: `${Cypress.env("baseApiUrl")}/user/${user_name}`
    }).then((response)=>{
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq(user_name)
    })
  })
  })
