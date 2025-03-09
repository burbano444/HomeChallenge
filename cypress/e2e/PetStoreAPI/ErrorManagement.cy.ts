import { createRandomPet } from '../../Utils/petUtils'

//NEGATIVE TESTS
describe("Error Management", () => {

    const env = Cypress.env("baseUrl")

    const pet = createRandomPet()
    let petEdited = createRandomPet()

    //Try to get a pet with a non-existent ID
    it("Negative test-Get a pet with a non-existent ID", () => {
        cy.log("Delete previous created pet")
        cy.request({
            method: "DELETE",
            url: `${env}/pet/${pet.id}`,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.eq("Pet deleted");
        });

        cy.log("Verify that the deleted dog doesn't exist")
        cy.request({
            failOnStatusCode: false,
            method: "GET",
            url: `${env}/pet/${pet.id}`,
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.eq("Pet not found");
        });
    });

    //Try to update a pet with invalid data 
    it("Negative test-Update a pets information with different ID", () => {
        cy.log("Create a new pet in the store")
        cy.request({
            method: "POST",
            url: `${env}/pet`,
            headers: {
                "Content-Type": "application/json",
            },
            body: pet
        }).then((response) => {
            expect(response.status).to.eq(200);
        });

        cy.log("Make the changes in the pet data with different ID")
        cy.request({
            failOnStatusCode: false,
            method: "PUT",
            url: `${env}/pet`,
            headers: {
                "Content-Type": "application/json",
            },
            body: petEdited
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    //Send requests with invalid content types.
    it("Negative test-Send requests with invalid content types.", () => {
        cy.log("Create a new pet in the store with invalid content type in header")
        cy.request({
            failOnStatusCode: false,
            method: "POST",
            url: `${env}/pet`,
            headers: {
                "Content-Type": "text/plain",
            }
        }).then((response) => {
            expect(response.status).to.eq(415); // Expect HTTP 415
            expect(response.body).to.have.property("message").and.include("Unsupported Media Type");
        });
    });
});