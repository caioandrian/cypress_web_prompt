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

Cypress.Commands.add('stepNotImplemented', () => { 
  console.log('O step não foi implementado!');
  cy.log('O step não foi implementado!');
});

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

Cypress.Commands.add('acessar_dominio_externo', (site, sent_args = {}) => {
  return cy.origin(site, { args: sent_args }, ({ sent_args }) => {
    cy.visit('/');
  });
});

Cypress.Commands.add('setBugbankUserLocalStorage', () => {
  cy.log('armazenando usuário e contas no localStorage')

  cy.window().then((win) => {
    const users = Cypress.env('users')
    const bugbankContas = Cypress.env('bugbank_contas')
    
    const email = users.bugbank.email
    const password = users.bugbank.password
    const conta_origem = bugbankContas.conta_origem.conta
    const digito_origem = bugbankContas.conta_origem.digito
    const saldo_origem = bugbankContas.conta_origem.saldo

    const email_destino = users.bugbank.email_destino
    const senha_destino = users.bugbank.password_destino
    const conta_destino = bugbankContas.conta_destino.conta
    const digito_destino = bugbankContas.conta_destino.digito
    const saldo_destino = bugbankContas.conta_destino.saldo
    
    win.localStorage.setItem(
      email,
      JSON.stringify({
        name: 'teste',
        email: email,
        password: password,
        accountNumber: conta_origem + '-' + digito_origem,
        balance: saldo_origem,
        logged: false
      })
 
    );
    win.localStorage.setItem(
      email_destino,
      JSON.stringify({
        name: 'caio teste destino',
        email: email_destino,
        password: senha_destino,
        accountNumber: conta_destino + '-' + digito_destino,
        balance: saldo_destino,
        logged: false
      })
    );
  });
});