//to use schema, install ajv library
// npm install ajv   

const Ajv = require('ajv')
const avj = new AJV()

describe('Schema Validation', () => {
     
    it('schema validation against response', () => {
        cy.request({
            method : 'GET',
            url : 'https://fakestoreapi.com/products'
        })
        .then((response) =>{
            
        })

    });
});