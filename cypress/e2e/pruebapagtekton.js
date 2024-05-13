///   <reference types="cypress"/>

require('cypress-plugin-tab')

describe('',() => {
    it("Validar pagina de contacto",() =>{
        cy.visit("https://www.tektonlabs.com/contact-us")
        cy.get("#firstname-6abf598a-85b9-4462-aa1a-ff37754b98a4").type("kike").tab().type("Castro")
        .tab().type('prueba123@gmail.com').tab().type('902 901 333')

        cy.get('#country-6abf598a-85b9-4462-aa1a-ff37754b98a4') 
        .select('Peru');

        cy.get('input[name="0-2/name"]').first().type('Compañia123').tab().type("A")

        cy.get('#hbspt-form-7887d5d4-bf07-402d-8a51-cd0fc28e8564 > #hsForm_6abf598a-85b9-4462-aa1a-ff37754b98a4 > .hs_submit > .actions > .hs-button')
        .should("be.enabled").click()


        

    })
})
