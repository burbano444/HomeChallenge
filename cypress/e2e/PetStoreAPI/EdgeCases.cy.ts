import { createRandomPet } from '../../Utils/petUtils'

//EDGE CASES
describe("Edge cases", () => {
    const env = Cypress.env("baseUrl")

    const pet = createRandomPet()

    //Add a pet with large data fields
    it("Edge-Add a pet with large data fields", () => {
        cy.log("Assign to the pet, the large data")
        pet.id = 999
        pet.name = "x".repeat(10000)
        pet.photoUrls = Array(1000).fill("https://example.com/photo.jpg")
        pet.tags = Array(1000).fill({ id: 1, name: "x".repeat(100) })
        pet.status = "available"

        cy.log("Adding the pet with the large data")
        cy.request({
            method: "POST",
            url: `${env}/pet`,
            headers: {
                "Content-Type": "application/json",
            },
            body: pet,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("id", 999);
            expect(response.body.name).to.eq(pet.name);
            expect(response.body.photoUrls.length).to.eq(1000);
        });
    });

    //Add a pet with minimal data.
    it("Edge-Add a pet with minimal data", () => {
        cy.log("Assign to the pet, the minimal data")
        pet.id = 1000
        pet.name = "Minimal Pet"
        pet.photoUrls = []
        pet.tags = []
        pet.status = ""

        cy.log("Adding the pet with the minimal data")
        cy.request({
            method: "POST",
            url: `${env}/pet`,
            headers: {
                "Content-Type": "application/json",
            },
            body: pet,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("id", 1000);
            expect(response.body).to.have.property("name", pet.name);
            expect(response.body.photoUrls).to.be.an("array").that.is.empty;
            expect(response.body.tags).to.be.an("array").that.is.empty;
            expect(response.body).to.have.property("status").that.is.empty;
        });
    });
});
