/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Pet API tests', ()=>{
  const pet_id =faker.number.int(100)
  const category_id = faker.number.int(1000)
  const category_name = faker.word.adjective()
  const pet_name = faker.person.firstName()
  const random_text = faker.lorem.sentence(3)
  const random_no = faker.number.int(1000)
  enum status {
    Available = 'available',
    Pending = 'pending',
    NotAvailable = 'not available',
    Placed = 'placed'
  }
  it('Should create a pet and check', ()=>{
    //creates a pet
    cy.api({
      method: "POST",
      url: `${Cypress.env("baseApiUrl")}/pet`,
      body: {
        id:pet_id,
        category: {
          id: category_id,
          name: category_name
        },
        name: pet_name,
        photoUrls: [
          random_text
        ],
        tags: [
          {
            id: random_no,
            name: random_text
          }
        ],
        status: status.Available
      }
    }).then((response)=>{
      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(pet_id)
      //checks the pet
      cy.api(
        {method:"GET",
        url: `${Cypress.env("baseApiUrl")}/pet/${pet_id}`}).then((response)=>{
        expect(response.status).to.eq(200)
        expect(response.body.category.id).to.eq(category_id)
        expect(response.body.name).to.eq(pet_name)
        expect(response.body.tags[0].id).to.eq(random_no)
        expect(response.body.status).to.eq(status.Available)
      })
    })
  })
  it("Should update the pet and check", ()=>{
    // updates the pet
    cy.api({
      method: 'PUT',
      url: `${Cypress.env("baseApiUrl")}/pet`,
      body: {
        id:pet_id,
        category: {
          id: category_id,
          name: category_name
        },
        name: pet_name,
        photoUrls: [
          random_text
        ],
        tags: [
          {
            id: random_no,
            name: random_text
          }
        ],
        status: status.Pending
      }
    }).then((response)=>{
      const new_pet_id = response.body.id
      Cypress.env('newPetID', new_pet_id)
      expect(response.status).to.equal(200);
      expect(response.body.status).to.eq(status.Pending)
      expect(response.body.id).to.eq(pet_id)
      expect(response.body.name).to.eq(pet_name)
    })
  })
  it('Should not update the pet info with invalid petID', ()=>{
    cy.api({
      method: 'PUT',
      url: `${Cypress.env("baseApiUrl")}/pet`,
      failOnStatusCode: false,
      body: {
        id:random_text,
        category: {
          id: category_id,
          name: category_name
        },
        name: pet_name,
        photoUrls: [
          random_text
        ],
        tags: [
          {
            id: random_no,
            name: random_text
          }
        ],
        status: status.Pending
      }
    }).then((response)=>{
      expect(response.status).to.equal(500);
      expect(response.body.message).to.eq("something bad happened")
    })
  })
  it('Should not return pet info with invalid ID', ()=>{
    cy.api(
      {method:"GET",
      url: `${Cypress.env("baseApiUrl")}/pet/${random_no}`,
      failOnStatusCode: false}).then((response)=>{
        expect(response.status).to.equal(404);
        expect(response.body.message).to.eq("Pet not found")
      })
  })
  it('Should purchase the pet and check', ()=>{
    //orders the pet
    cy.api({
      method: "POST",
      url:  `${Cypress.env("baseApiUrl")}/store/order`,
      body:{
        id: random_no,
        petId: Cypress.env('newPetID'),
        quantity: 1,
        shipDate: "2024-05-23T11:27:13.175Z",
        status: status.Placed,
        complete: true
      }
    }).then((response)=>{
      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(random_no)
      expect(response.body.petId).to.eq(pet_id)
      const order_id = response.body.id
      Cypress.env('orderID', order_id)
      // checks the pet
      cy.api({
        method: "GET",
        url:  `${Cypress.env("baseApiUrl")}/store/order/${order_id}`
      }).then((response)=>{
        expect(response.status).to.eq(200)
        expect(response.body.status).to.eq(status.Placed)
        expect(response.body.complete).to.eq(true)
        expect(response.body.petId).to.eq(pet_id)
      })
    })
  })
  it('Should delete the pet', ()=>{
    cy.api({
      method: 'DELETE',
      url: `${Cypress.env("baseApiUrl")}/pet/${pet_id}`
    }).then((response)=>{
      expect(response.status).to.eq(200)
      expect(response.body.message).to.eq(String(pet_id))
    })
  })
})
