/// <reference types ="cypress" />

describe('Register Test API', () => {
const userArray = new Array()
    it('Test Register response Via API with providing valid credentials', () => {
        cy.request({
            method:"POST",
            url: "https://reqres.in/api/register",
            body:{
                email: "eve.holt@reqres.in",
                password: "pistol"
            }
        })
        .then(response =>{
            expect(response.status).equal(200);
            expect(response.body).to.have.all.keys("id","token")
        })
    });
    
    it('Test Register Via API with providing invalid request handling/error 400', () => {
        cy.request({
            method:"POST",
            url: "https://reqres.in/api/register",
            failOnStatusCode: false,
            body:{
                email: "jeje@gmail.com"
            }
        })
        .then(response =>{
            expect(response.status).equal(400);
            expect(response.body.error).to.be.eq("Missing password");
        })
    });
    
    it('Test Login via API with providing valid data', () => {
        cy.request({
            method:"POST",
            url: "https://reqres.in/api/login",
            body:{
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            }
        })
        .then(response =>{
            expect(response.status).equal(200);
            expect(response.body).to.have.all.keys("token")
        })
    });

    it('Test Response body should contains list with expected result', () => {
        const queryParam = {page:2};
        cy.request({
            method:"GET",
            url: "https://reqres.in/api/users",
            qs:queryParam
            
        }).then(response =>{
            let data = JSON.parse(JSON.stringify(response.body.data))
            expect(response.status).equal(200)

            data.forEach(function(item) {
            expect(item).to.have.all.keys("id", "email", "first_name", "last_name", "avatar");
            cy.log("id: "+data["id"]+ " & email: "+data["email"]+ "& firstname: "+data["fist_name"]+ "& lastname: "+data["last_name"])

            })

        })
    });


    it('Test Response Body should contains expected field n value / read 1 data', () => {
        cy.request({
            method:"GET",
            url: "https://reqres.in/api/users/2",
            headers:{
                accept:"application/json"
            }
        })
        .then(response =>{
            let data = JSON.parse(JSON.stringify(response.body.data))
            cy.log(data)
                expect(response.status).equal(200)
                expect(response.body.data).has.property("first_name", "Janet");
            
                expect(data).to.have.all.keys("id", "email", "first_name", "last_name", "avatar");
                cy.log("id: "+data["id"]+ " & email: "+data["email"]+ "& firstname: "+data["fist_name"]+ "& lastname: "+data["last_name"])

        })
    });

    it('Verify Error Handling for non-existent Endpoint', () => {
        
        cy.request({
            method:"GET",
            url: "https://reqres.in/api/unknown/23",
            failOnStatusCode: false
            
        })
        .then(response =>{
            expect(response.status).equal(404);
        })
    });

    it('Validate status code of the post method api', () => {

        cy.request({
            method:"POST",
            url: "https://reqres.in/api/users",
            body:{
                name: "morpheus",
                job: "leader"
            }
        })
        .then(response =>{
            expect(response.status).equal(201)
        })
    });

    it('Validate status code of the put method api', () => {

        cy.request({
            method:"PUT",
            url: "https://reqres.in/api/users/2",
            body:{
                name: "morpheus",
                job: "zion resident"
            }
        })
        .then(response =>{
            expect(response.status).equal(200)
        })
    });

});