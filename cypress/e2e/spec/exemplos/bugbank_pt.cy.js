/// <reference types="cypress" />

describe('Bugbank - Finance - IA - Portuguese Version', () => {

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.setBugbankUserLocalStorage()
    
    cy.env(['users', 'bugbank'], { log: false }).then(({ users, bugbank: url }) => {
      const { email, password } = users.bugbank
      cy.prompt(
        [
          'wait 2 seconds',
          `visitar {{url}}`,
          'wait 2 seconds',
          'digitar {{email}} no campo E-mail',
          'digitar {{password}} no campo Senha',
          'clicar no botão Acessar',
          'verificar url contém "/home"',
        ],
        {
          placeholders: {
            email: String(email), password: String(password), url: String(url),
          },
        }
      )
    })
  })

  it('Fazer uma transferência entre contas e verificar o extrato', () => {
    cy.env(['bugbank_contas'], { log: false }).then(({ bugbank_contas }) => {
      const { conta: conta_destino, digito: digito_destino } = bugbank_contas.conta_destino
      var { saldo: saldo_origem } = bugbank_contas.conta_origem
      const valor_transferido = 5
      const saldo_atualizado = (saldo_origem - (valor_transferido * 2))
      //valor transferido duplicado devido a necessidade de clicar duas vezes no botão submit - bug do teste

      cy.prompt(
        [
          'wait 2 seconds',
          'forçar clicar na imagem do link TRANSFERÊNCIA',
          'verificar url contém "/transfer"',
          'digitar {{conta_destino}} no campo [name=accountNumber]',
          'digitar {{digito_destino}} no campo [name=digit]',
          `digitar ${valor_transferido} no campo [name=transferValue]`,
          'digitar "teste do caio" no campo [name=description]',
          'wait 2 seconds',
          'duplo clique no botão submit',
          'confirmar que o elemento #modalText possui o texto "Transferencia realizada com sucesso"',
          'clicar no botão Fechar',
          'clicar no botão Voltar',
          'verificar url contém "/home"',
          'wait 2 seconds',
          'forçar clicar na imagem do link EXTRATO',
          'verificar url contém "/bank-statement"',
          'verificar que o texto "Transferência enviada" está visível',
          `confirmar que uma transação contém o valor "${valor_transferido},00"`,
          `confirmar que o saldo disponível contém o valor "${saldo_atualizado},00"`,
        ],
        {
          placeholders: {
            conta_destino: String(conta_destino), digito_destino: String(digito_destino)
          },
        }
      )
    })
  })

  it('Fazer uma transferência entre contas com falha', () => {
    cy.prompt(
      [
        'wait 2 seconds',
        'forçar clicar na imagem do link TRANSFERÊNCIA',
        'verificar url contém "/transfer"',
        'digitar 0000 no campo [name=accountNumber]',
        'digitar 1 no campo [name=digit]',
        'digitar 5 no campo [name=transferValue]',
        'digitar "teste do caio" no campo [name=description]',
        'wait 2 seconds',
        'duplo clique no botão submit',
        'confirmar que o elemento #modalText possui o texto "Conta inválida ou inexistente"'
      ]
    )
  })

})
