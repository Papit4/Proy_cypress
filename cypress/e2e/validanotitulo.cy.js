///   <reference types="cypress"/>

describe('Seccion 1: validando titulo',() => {
    it("Test validar titulo",() =>{
        cy.visit("https://www.tektonlabs.com")
        cy.title().should('eq', 'Tekton: Home')

        cy.log("ok")


    })
})