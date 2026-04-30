# Cypress Web Prompt

Automação de testes **E2E** com [Cypress](https://www.cypress.io/), usando passos em **linguagem natural** via `cy.prompt()`, alinhados às referências em `cypress/base/`. O projeto inclui exemplos prontos (SauceDemo e Bugbank) em português e inglês.

---

## Requisitos

| Item | Versão |
|------|--------|
| **Node.js** | `>= 20` |
| **npm** | compatível com a sua instalação do Node |

> Em ambientes corporativos, garanta acesso à internet para instalar dependências e para os sites usados nos exemplos.

---

## Início rápido

```bash
# 1. Clonar e entrar na pasta do projeto
git clone <url-do-repositório>
cd cypress_web_prompt

# 2. Instalar dependências
npm install

# 3. Abrir o Cypress (modo interativo — recomendado na primeira vez)
npm run cy:open
```

Para validar a instalação do Cypress sem abrir a interface:

```bash
npm run cypress:verify
```

---

## Scripts npm

| Comando | O que faz |
|---------|-----------|
| `npm run cy:open` | Abre o Cypress com a configuração padrão (**homologação** → `hmg.json`). |
| `npm run cy:open-prod` | Abre o Cypress usando `cypress/config-files/prod.json`. |
| `npm run cy:run-saucedemo-pt` | Executa o spec SauceDemo em PT, Chrome headless. |
| `npm run cy:run-saucedemo-en` | Executa o spec SauceDemo em EN, Chrome headless. |
| `npm run cy:run-bugbank-pt` | Executa o spec Bugbank em PT, Chrome headless. |
| `npm run cy:run-bugbank-en` | Executa o spec Bugbank em EN, Chrome headless. |
| `npm run cy:all-tests` | Roda todos os specs em `cypress/e2e/spec/exemplos/`, Chrome headless. |
| `npm test` | `cypress run` (suite conforme configuração atual). |

Execução avançada com ambiente explícito:

```bash
npx cypress run --env fileConfig=hmg
npx cypress open --env fileConfig=prod
```

---

## Configuração por ambiente

Os dados de ambiente (URLs, usuários de teste, timeouts) vêm de arquivos JSON em `cypress/config-files/`:

- **`hmg.json`** — padrão quando nada é informado (via plugin em `cypress/plugins/index.js`).
- **`prod.json`** — perfil enxuto para produção; ajuste `env` conforme a sua necessidade.

Variável usada pelo plugin: `fileConfig` → nome do ficheiro sem `.json`.

---

## Estrutura útil

```
cypress/
├── base/              # Referência de frases para cy.prompt (pt / en)
├── config-files/      # hmg.json, prod.json
├── e2e/spec/exemplos/ # Specs de exemplo (.cy.js)
├── plugins/           # merge de config + relatórios
├── support/           # commands, helpers, e2e.js
└── reports/           # saída Mochawesome / JUnit (gerada após execuções)
```

---

## Relatórios

O projeto usa **cypress-mochawesome-reporter** e **JUnit** (configuração em `cypress.config.js`). Após `cypress run`, consulte `cypress/reports/` e o agregado `cypress/reports/junitreport.xml` quando aplicável.

---

## Licença

MIT — ver [LICENSE](LICENSE).
