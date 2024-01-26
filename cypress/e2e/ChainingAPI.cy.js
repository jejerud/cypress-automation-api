/// <reference types ="cypress" />

// const { expect } = require("chai");

describe('API chaining list then detail', () => {
    
    it('Getting All the posts', () => {
        cy.request({
            method: 'GET',
            url:"https://jsonplaceholder.typicode.com/posts"
        })
        .then((response) =>{
            expect(response.status).equal(200)
            const postid =response.body[0].id
            return postid
        })
        .then((postid)=>{
            cy.request({
                method:'GET',
                url: `https://jsonplaceholder.typicode.com/comments?postId=${postid}`
                
            })
            .then((response)=>{
                expect(response.status).equal(200)
                expect(response.body).to.have.length(5)
            })
        })
    })


});