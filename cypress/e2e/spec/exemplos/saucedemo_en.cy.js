/// <reference types="cypress" />

describe('SauceDemo - Ecommerce - IA - English Version', () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    
    cy.env(['users', 'saucedemo'], { log: false }).then(({ users, saucedemo: url }) => {
      const { username, senha: password } = users.saucedemo
      cy.prompt(
        [
          `visit {{url}}`,
          'type {{username}} in the username field',
          'type {{password}} in the password field',
          'click the Login button',
          'verify that the products screen is displayed',
        ],
        {
          placeholders: { username, password, url },
        }
      )
    })
  })

  it('Add 2 products to cart from the home page', () => {
      cy.prompt(
        [
          'wait 2 seconds',
          'click "Add to cart" on product "Sauce Labs Backpack"',
          'click "Add to cart" on product "Sauce Labs Onesie"',
          'verify that there are 2 items in the cart icon',
          'force click on [data-test="shopping-cart-link"]',
          'verify that product "Sauce Labs Backpack" is visible',
          'verify that product "Sauce Labs Onesie" is visible',
          'verify that the "Remove" button is visible',
          'verify that the "Checkout" button is visible',
      ]
    )
  })

  it('Remove product from cart from the home page', () => {
    cy.prompt(
      [
        'wait 2 seconds',
        'click "Add to cart" on product "Sauce Labs Backpack"',
        'click the "Remove" button on product "Sauce Labs Backpack"',
        'verify that [data-test="shopping-cart-link"] shows no items',
        'force click on [data-test="shopping-cart-link"]',
        'verify that [data-test="inventory-item"] does not exist',
      ]
    )
  })

  it('Validate product price on the cart page', () => {
    cy.get('[data-test="inventory-list"] [data-test="inventory-item-price"]').eq(1)
      .first().invoke('text').as('value_product')

    cy.get('@value_product').then((value) => {
        cy.prompt(
          [
            'wait 2 seconds',
            'click "Add to cart" on the second product in the list',
            'force click on [data-test="shopping-cart-link"]',
            `verify that [data-test="inventory-item-price"] with value {{value}} is visible inside [data-test='cart-list']`,
            'click "Checkout"',
          ],{
            placeholders: { value },
          }
        )
    })
  })

  it('Complete order successfully', () => {
    cy.prompt(
      [
        'wait 2 seconds',
        'click "Add to cart" on any product',
        'verify that the cart icon shows 1 item',
        'force click on [data-test="shopping-cart-link"]',
        'verify that the added product is visible',
        'click "Checkout"',
        'verify url contains "/checkout-step-one.html"',
        'type the "First Name" field with "John"',
        'type the "Last Name" field with "Doe"',
        'type the "Postal Code" field with "12345"',
        'wait 2 seconds',
        'click "Continue"',
        'verify url contains "/checkout-step-two.html"',
        'verify that the added product is visible',
        'verify that [data-test="total-label"] is visible',
        'wait 2 seconds',
        'click "Finish"',
        'verify url contains "/checkout-complete.html"',
        'verify that the message "Thank you for your order!" is displayed',
        'verify that the "Back Home" button is visible',
        'click "Back Home"',
        'verify url contains "/inventory.html"',
      ]
    )
  })
})
