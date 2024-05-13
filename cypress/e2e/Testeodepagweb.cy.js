///   <reference types="cypress"/>
require('cypress-plugin-tab')
require('cypress-xpath')

function generateRandomUsername() {
    const adjectives = ['Happy', 'Sunny', 'Brave', 'Lucky', 'Gentle', 'Smart', 'Clever', 'Kind', 'Wise', 'Peaceful'];
    const nouns = ['Cat', 'Dog', 'Tiger', 'Lion', 'Elephant', 'Bird', 'Horse', 'Dolphin', 'Whale', 'Butterfly'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000); // Agregar un número aleatorio para mayor variabilidad
    return randomAdjective + randomNoun + randomNumber;
  }

  
describe('Todas las pruebas de registro',() => {
    it("Registrarse con datos validos",() =>{

        const usuario= generateRandomUsername();
        cy.visit("https://bookcart.azurewebsites.net/register")
        cy.get('#mat-input-0').type("kike").tab().type("castro").tab().type(usuario)
        .tab().type("Prueba_123").tab().type("Prueba_123")
        
        cy.get('#mat-radio-2-input').click()

        cy.wait(1000)

        cy.get('.mat-mdc-card-actions > .mdc-button > .mdc-button__label').click()
    })

    it("Registrarse con nombre invalido",() =>{

        const usuario= generateRandomUsername();
        const mensaje_error_esperado= "First Name is required"
        cy.visit("https://bookcart.azurewebsites.net/register")
        cy.get('#mat-input-0').click().tab()
        cy.get('#mat-input-1').type("castro").tab().type(usuario)
        .tab().type("Prueba_123").tab().type("Prueba_123")
        cy.get('#mat-radio-2-input').click()
        cy.wait(1000)
        cy.get('.mat-mdc-card-actions > .mdc-button > .mdc-button__label').click()
        cy.get('#mat-mdc-error-0').should('have.text', mensaje_error_esperado)

    })

    it("Registrarse con apellido invalido",() =>{

        const usuario= generateRandomUsername();
        const mensaje_error_esperado= "Last Name is required"
        cy.visit("https://bookcart.azurewebsites.net/register")
        cy.get('#mat-input-0').type("kike").tab()
        cy.get('#mat-input-1').click().tab()
        
        cy.get('#mat-input-2').type(usuario)
        .tab().type("Prueba_123").tab().type("Prueba_123")
        cy.get('#mat-radio-2-input').click()
        cy.wait(1000)
        cy.get('.mat-mdc-card-actions > .mdc-button > .mdc-button__label').click()
        cy.get('#mat-mdc-error-0').should('have.text', mensaje_error_esperado)

    })

    it("Registrarse con usuario invalido",() =>{

        const usuario= generateRandomUsername();
        const mensaje_error_esperado= "User Name is required "
        cy.visit("https://bookcart.azurewebsites.net/register")
        cy.get('#mat-input-0').type("kike").tab()
        cy.get('#mat-input-1').type("Castro").tab()
        
        cy.get('#mat-input-2').tab().type("Prueba_123").tab().type("Prueba_123")
        cy.get('#mat-radio-2-input').click()
        cy.wait(1000)
        cy.get('.mat-mdc-card-actions > .mdc-button > .mdc-button__label').click()
        cy.get('#mat-mdc-error-0').should('have.text', mensaje_error_esperado)

    })

    it("Registrarse con contraseña invalida",() =>{

        const usuario= generateRandomUsername();
        const mensaje_error_esperado= " Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number " 
        cy.visit("https://bookcart.azurewebsites.net/register")
        cy.get('#mat-input-0').type("kike").tab().type("castro").tab().type(usuario)
        
        cy.get('#mat-input-3').type("Prueba").tab().type("Prueba")
        
        cy.get('#mat-radio-2-input').click()

        cy.wait(1000)

        cy.get('.mat-mdc-card-actions > .mdc-button > .mdc-button__label').click()

        cy.get('.mat-mdc-card-actions > .mdc-button > .mdc-button__label').click()
        cy.get('#mat-mdc-error-0').should('have.text', mensaje_error_esperado)

    })

    it("Registrarse con contraseña no iguales",() =>{

        const usuario= generateRandomUsername();
        const mensaje_error_esperado= " Password do not match " 
        cy.visit("https://bookcart.azurewebsites.net/register")
        cy.get('#mat-input-0').type("kike").tab().type("castro").tab().type(usuario)
        
        cy.get('#mat-input-3').type("Coca_123").tab().type("Prueba")
        
        cy.get('#mat-radio-2-input').click()

        cy.wait(1000)

        cy.get('.mat-mdc-card-actions > .mdc-button > .mdc-button__label').click()

        cy.get('.mat-mdc-card-actions > .mdc-button > .mdc-button__label').click()
        cy.get('#mat-mdc-error-0').should('have.text', mensaje_error_esperado)

    })
    
})

describe('Todas las pruebas de login',() => {
    it("Ingresar con usuarios validos",() =>{
        cy.visit("https://bookcart.azurewebsites.net/login")
        cy.get('#mat-input-0').type("papita").tab().type("Coca_123")
        cy.get('.mat-mdc-card-actions > .mdc-button > .mdc-button__label').click()

    })

    it("Ingresar con usuarios invalidos",() =>{
        const mensaje_error_esperado= "Username or Password is incorrect."
        cy.visit("https://bookcart.azurewebsites.net/login")
        cy.get('#mat-input-0').type("aea").tab().type("Coca_123")
        cy.get('.mat-mdc-card-actions > .mdc-button > .mdc-button__label').click()
        cy.get('#mat-mdc-error-0').should('have.text', mensaje_error_esperado)

    })
    
    
   


})

describe('Compra',() => {

    it("Realizar compra",() =>{
        const mensaje_esperado= "One Item added to cart"
        cy.visit("https://bookcart.azurewebsites.net/login")
        cy.get('#mat-input-0').type("papita").tab().type("Coca_123")
        cy.get('.mat-mdc-card-actions > .mdc-button > .mdc-button__label').click()
        cy.wait(2000)
        cy.get('.mat-mdc-card-content')  // Selecciona todos los elementos '.mat-mdc-card-content'
        .find('strong')  // Encuentra el elemento <strong> dentro del primer elemento
        .contains('Harry Potter and the Chamber of Secrets')  // Verifica que contenga el texto específico
        .click();
        cy.contains('span.mdc-button__label', 'Add to Cart').click();
        cy.contains('div.mat-mdc-snack-bar-label', 'One Item added to cart') // Verificar que el mensaje de confirmación aparezca
        .should('be.visible')
        cy.get('button[ng-reflect-router-link="/shopping-cart"]').click();

        cy.get('.my-2 > .mdc-button__label').click()
        cy.get('#mat-input-2').type("kike").tab().type("avenida los angeles").tab().type("avenida los angeles2")
        .tab().type("200121").tab().type("lima")
        cy.get('tbody > .ng-star-inserted > :nth-child(3)')
        .should('have.text', '₹235.00')
        cy.get('tbody > .ng-star-inserted > :nth-child(4)')
        .should('have.text',' ₹235.00 ')
        cy.get('.mat-mdc-card-actions > .mat-primary > .mdc-button__label').click()

        




        
    })

    
    
    
   


})