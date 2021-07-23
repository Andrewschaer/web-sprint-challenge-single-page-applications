// - [X] test that you can add text to the box
// - [X] test that you can select multiple toppings
// - [ ] test that you can submit the form

describe('User Onboarding App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza')
    })

    it('Doesnt do much', () => {
        expect(true).to.equal(true)
    })

    it('Check if text typed in name input contains the typed text',() =>{
        cy.get('#name-input')
        .type('Andrew Schaer')
        .should('have.value','Andrew Schaer')
    })
    it('Check if text typed in special-requests input contains the typed text',() =>{
        cy.get('#special-text')
        .type('Leave it at the door')
        .should('have.value','Leave it at the door')
    })
    it('Check if multiple toppings can be selected such that multiple toppings can equal true',() =>{
        cy.get(':nth-child(2) > input')
        .check()
        cy.get(':nth-child(3) > input')
        .check()
        cy.get(':nth-child(3) > input')
        .should('have.checked','true')
        cy.get(':nth-child(2) > input')
        .should('have.checked','true')
    })
    it('Check if order-now button becomes active(!disabled) and can be clicked to reset the form after entering a name and pizza size',() => {
        cy.get('#order-button')
        .should('have.disabled')
        cy.get('#name-input')
        .type('Andrew Schaer')
        cy.get('#size-dropdown')
        .select('small')
        cy.get('#order-button')
        .should('not.have.disabled')
        .click()
        cy.get('#name-input')
        .should('have.value','')
        cy.get('#size-dropdown')
        .should('have.value','')
    })
})