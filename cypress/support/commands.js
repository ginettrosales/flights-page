// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('result', (element, condition, value) => {
    cy.get(element).each(($el) => {
        cy.get($el).should(condition, value)
    })
})

Cypress.Commands.add('prices', (element, condition, value) => {
    cy.get(element).each(($el) => {
        cy.get($el).invoke('text').then(parseFloat).should(condition, value)
    })
})

Cypress.Commands.add('randomItem', (element) => {
    cy.get(element).then(($items) => {
        const randomIndex = Math.floor(Math.random() * $items.length)
        cy.wrap($items[randomIndex]).click()
    })
})