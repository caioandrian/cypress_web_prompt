/// <reference types="cypress" />

describe('SauceDemo - Ecommerce - IA - Portuguese Version', () => {

  beforeEach(() => {
    //cy.clearCookies();
    //cy.clearLocalStorage();
    
    cy.env(['users', 'saucedemo'], { log: false }).then(({ users, saucedemo: url }) => {
      const { username, senha: password } = users.saucedemo
      cy.prompt(
        [
          `visitar {{url}}`,
          'digite {{username}} no campo username',
          'digite {{password}} no campo password',
          'clicar no botão Login',
          'verificar se a tela com os produtos são exibidos',
        ],
        {
          placeholders: { username, password, url },
        }
      )
    })
  })

  it('Validar produtos adicionados no carrinho', () => {
      cy.prompt(
        [
          'wait 2 seconds',
          'clicar em "Add to cart" no produto "Sauce Labs Backpack"',
          'clicar em "Add to cart" no produto "Sauce Labs Onesie"',
          'verificar que existem 2 produtos adicionados no icone do carrinho',
          'clicar em [data-test="shopping-cart-link"]',  
          'verificar que o produto "Sauce Labs Backpack" está visível',
          'verificar que o produto "Sauce Labs Onesie" está visível',
          'verificar que o botão de "Remove" está visível',
          'verificar que o botão de "Checkout" está visível',
      ]
    )
  })

  it('Remover produto do carrinho pela home', () => {
    cy.prompt(
      [
        'wait 2 seconds',
        'clicar em "Add to cart" no produto "Sauce Labs Backpack"',
        'clicar no botão de "Remove" no produto "Sauce Labs Backpack"',
        'verificar que [data-test="shopping-cart-link"] está vazio',
        'clicar em [data-test="shopping-cart-link"]',  
        'verificar que [data-test="inventory-item"] não existe',
      ]
    )
  })

  it('Validar preço do produto na tela do carrinho', () => {
    cy.get('[data-test="inventory-list"] [data-test="inventory-item-price"]').eq(1)
      .invoke('text').as('valor_produto')

    cy.get('@valor_produto').then((valor) => {
      cy.prompt(
        [
          'wait 2 seconds',
          'clicar em "Add to cart" do segundo produto da lista',
          'clicar em [data-test="shopping-cart-link"]',
          `verificar que o elemento [data-test="inventory-item-price"] com o valor ${valor} está visível dentro de [data-test='cart-list']`,
          'clicar em "Checkout"',
        ]
      )
    })
  })

  it('Finalizar pedido com sucesso', () => {
    cy.prompt(
      [
        'wait 2 seconds',
        'clicar em "Add to cart" em um produto',
        'verificar que existe 1 produto adicionado no icone do carrinho',
        'clicar em [data-test="shopping-cart-link"]',  
        'verificar que o produto adicionado está visível',
        'wait 2 seconds',
        'clicar no botão "Checkout"',
        'verificar url contém "/checkout-step-one.html"',
        'preencher o campo "First Name" com "John"',
        'preencher o campo "Last Name" com "Doe"',  
        'preencher o campo "Postal Code" com "12345"',
        'wait 2 seconds',
        'clicar no botão "Continue"',
        'verificar url contém "/checkout-step-two.html"',
        'verificar que o produto adicionado está visível',
        'verificar que o elemento [data-test="total-label"] está visível',
        'wait 2 seconds',
        'clicar no botão "Finish"',
        'verificar url contém "/checkout-complete.html"',
        'verificar que a mensagem "Thank you for your order!" está visível',
        'clicar no botão "Back Home"',
        'verificar url contém "/inventory.html"',
      ]
    )
  })
})
