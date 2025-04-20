


# Cypress Simulator - Projeto de Testes End-to-End com Cypress

Este repositório contém os testes automatizados desenvolvidos durante o curso **Cypress Simulator**, da [Escola Talking About Testing](https://talking-about-testing.vercel.app/), com foco em boas práticas de automação de testes utilizando o framework **Cypress**.

---

## 🚀 Sobre o projeto

A aplicação em teste, chamada **Cypress Simulator**, é uma aplicação web desenvolvida com **HTML**, **CSS** e **JavaScript**. Seu objetivo é permitir que estudantes pratiquem comandos do Cypress em tempo real, em um ambiente seguro e controlado, sem a necessidade de configurações adicionais.

O projeto de testes tem como objetivo validar todas as funcionalidades da aplicação, com foco em confiabilidade, acessibilidade.

---

## 📋 Pré-requisitos

Certifique-se de ter os seguintes sistemas instalados:

- **Git** – versão 2.42.1 ou superior
- **Node.js** – versão 22.12.0 ou superior
- **npm** – versão 11.0.0 ou superior

> ⚠️ Recomenda-se utilizar as mesmas versões indicadas ou versões LTS equivalentes.

---

## 📦 Instalação

Clone o repositório e instale as dependências do projeto com os comandos:

```bash
npm install
```

---

## 🧪 Executando os testes

Este projeto permite executar os testes de duas formas:

### Modo Headless

Executa os testes diretamente no terminal:

```bash
npm run cy:run
```

### Modo Interativo (Cypress App)

Abre a interface do Cypress para execução interativa:

```bash
npm run cy:open
```

---

## 🧠 Funcionalidades cobertas nos testes

### 🔐 Autenticação
- Login com resolução de CAPTCHA
- Persistência de sessão por 30 dias
- Logout pelo menu sanduíche

### 🍪 Consentimento de Cookies
- Validação do banner de cookies
- Aceitar e recusar cookies
- Persistência da escolha do usuário

### 🖥 Interface Gráfica
- Validação de elementos do cabeçalho
- Menu e navegação lateral
- Saída de execução e feedbacks de comandos

### 💻 Terminal de comandos Cypress
- cy.visit, cy.get, cy.contains, cy.request, cy.exec, cy.log, etc.
- Comando de ajuda com exemplos
- Mensagens de sucesso, erro e aviso

### ♿ Acessibilidade
- Testes de acessibilidade com integração a ferramentas como Axe

### 🔄 Sessão e Performance
- Criação/restauração de sessão do usuário
- Configuração de retries automáticos

### ⚙️ CI/CD
- Esteira de integração contínua com execução paralela
- Geração de artefatos para debugging




