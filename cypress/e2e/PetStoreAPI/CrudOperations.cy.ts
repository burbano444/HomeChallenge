import {createRandomPet} from '../../Utils/petUtils'

//POSITIVE TESTS
describe("CRUD operations", () => {

    const env = Cypress.env("baseUrl")

    const pet = createRandomPet()    
    let petEdited = createRandomPet()
    petEdited.id = pet.id

    //Add a new pet and verify its details, get a pet by ID included.
    it("CRUD-Add a new pet and verify its details.", () => {
        cy.log("Create a new pet in the store")
        cy.request({
            method: "POST",
            url: `${env}/pet`,
            headers: {
                "Content-Type": "application/json",
            },
            body: pet
        }).then((response) => {
            cy.log("Verify data")
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("id", pet.id);
            expect(response.body).to.have.property("name", pet.name);
            expect(response.body).to.have.property("status", pet.status);
            cy.log("Verify the pet's data's structure")
            expect(response.body).to.have.property("id").that.is.a("number").and.not.be.NaN;
            expect(response.body).to.have.property("name").that.is.a("string").and.not.be.empty;
            expect(response.body).to.have.property("photoUrls").to.be.an("array");
            expect(response.body).to.have.property("tags").to.be.an("array");
            expect(response.body).to.have.property("status").that.is.oneOf(["","available", "pending", "sold"]);
        });

        cy.log("Validate the creation of new pet and it's structure")
        cy.request({
            method: "GET",
            url: `${env}/pet/${pet.id}`,
        }).then((response) => {
            expect(response.status).to.eq(200);   
            expect(response.body).to.have.property("id").that.is.a("number").and.not.be.NaN;
            expect(response.body).to.have.property("name").that.is.a("string").and.not.be.empty;
            expect(response.body).to.have.property("photoUrls").to.be.an("array");
            expect(response.body).to.have.property("tags").to.be.an("array");
            expect(response.body).to.have.property("status").that.is.oneOf(["available", "pending", "sold"]);
        });
    });

    //Update a pet’s information and confirm changes, get a pet by ID included.
    it("CRUD-Update a pets information and confirm changes", () => {
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

        cy.log("Make the changes in the pet data")
        cy.request({
            method: "PUT",
            url: `${env}/pet`,
            headers: {
                "Content-Type": "application/json",
            },
            body: petEdited
        }).then((response) => {
            expect(response.status).to.eq(200);
        });

        cy.log("Verify that the id and the name is not equal")
        cy.request({
            method: "GET",
            url: `${env}/pet/${pet.id}`,
            headers: {
                "Content-Type": "application/json",
            },
            body: petEdited
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.id).to.equal(pet.id);
            expect(response.body.name).to.not.equal(pet.name);
        });
    });

    //Delete a pet and ensure it’s removed from the system.
    afterEach(() => {
        cy.log("Delete previous created pet")
        cy.request({
            method: "DELETE",
            url: `${env}/pet/${pet.id}`,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.eq("Pet deleted");
        });

        cy.log("Verify that the deleted pet doesn't exist")
        cy.request({
            failOnStatusCode: false,
            method: "GET",
            url: `${env}/pet/${pet.id}`,
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
});