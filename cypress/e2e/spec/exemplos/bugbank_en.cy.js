/// <reference types="cypress" />

describe('Bugbank - Finance - IA - English Version', () => {

  beforeEach(() => {
    //cy.clearCookies();
    //cy.clearLocalStorage();
    cy.setBugbankUserLocalStorage()

    cy.env(['users', 'bugbank'], { log: false }).then(({ users, bugbank: url }) => {
      const { email, password } = users.bugbank
      cy.prompt(
        [
          'wait 2 seconds',
          `visit {{url}}`,
          'wait 2 seconds',
          'type {{email}} in the email field',
          'type {{password}} in the password field',
          'click the "Acessar" button',
          'verify the url contains "/home"',
        ],
        {
          placeholders: {
            email: String(email), password: String(password), url: String(url),
          },
        }
      )
    })
  })

  it('Transfer between accounts successfully', () => {
    cy.env(['bugbank_contas'], { log: false }).then(({ bugbank_contas }) => {
      const { conta: conta_destino, digito: digito_destino } = bugbank_contas.conta_destino
      var { saldo: saldo_origem } = bugbank_contas.conta_origem
      const valor_transferido = 5
      const saldo_atualizado = (saldo_origem - (valor_transferido * 2))
      //valor transferido duplicado devido a necessidade de clicar duas vezes no botão submit - bug do teste

      cy.prompt(
        [
          'wait 2 seconds',
          'force click TRANSFER image link',
          'verify url contains "/transfer"',
          'type {{conta_destino}} on field [name=accountNumber]',
          'type {{digito_destino}} on field [name=digit]',
          `type ${valor_transferido} on field [name=transferValue]`,
          'type "teste do caio" on field [name=description]',
          'wait 2 seconds',
          'double click the submit button',
          'confirm that the #modalText element has the text "Transferencia realizada com sucesso"',
          'click the "Fechar" button',
          'click the "Voltar" button',
          'verify url contains "/home"',
          'wait 2 seconds',
          'force click EXTRATO image link',
          'verify url contains "/bank-statement"',
          'verify that the text "Transferência enviada" is visible',
          `confirm that a transaction contains the value "${valor_transferido},00"`,
          `confirm that the available balance contains the value "${saldo_atualizado},00"`,
        ],
        {
          placeholders: {
            conta_destino: String(conta_destino), digito_destino: String(digito_destino),
          },
        }
      )
    })
  })

  it('Transfer between accounts with failure', () => {
    cy.prompt(
      [
        'wait 2 seconds',
        'force click TRANSFER image link',
        'verify url contains "/transfer"',
        'type "000000" on field [name=accountNumber]',
        'type "5" on field [name=digit]',
        'type "1" on field [name=transferValue]',
        'type "teste do caio" on field [name=description]',
        'wait 2 seconds',
        'double click the submit button',
        'confirm that the #modalText element has the text "Conta inválida ou inexistente"'
      ]
    )
  })

})
