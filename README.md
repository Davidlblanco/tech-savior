# tech-savior

Esta é uma aplicação desenvolvida como trabalho de pós-graduação na FIAP **Doatecando**. O objetivo é criar uma aplicação fullstack completa que ajudará escolas públicas a conseguir doações de aparelhos eletrônicos, permitindo assim aumentar a inclusão digital nessas instituições. O sistema conta com uma gamificação para os doadores, onde eles recebem badges de acordo com o que doaram. O nome do repositório não é o nome do projeto final, e sim o nome de uma dessas badges.

A aplicação utiliza **NestJS** com **Prisma** como ORM, conectando-se a um banco de dados **PostgreSQL**. Todos os endpoints são testados com **Jest**, e há ambientes configurados no **Postman** para testes locais e de produção.

## Arquitetura

Na arquitetura do projeto, são utilizados os conceitos de **Controllers**, **Providers** e **Modules** do NestJS.

- **Controllers**: Porta de entrada da aplicação, recebem requisições e enviam respostas.

  ![Controllers](https://docs.nestjs.com/assets/Controllers_1.png)

- **Providers**: Fornecem serviços injetáveis e podem ser compartilhados entre diferentes partes da aplicação.

  ![Providers](https://docs.nestjs.com/assets/Components_1.png)

- **Modules**: Organizam controllers e providers, criando a estrutura modular do NestJS.

  ![Modules](https://docs.nestjs.com/assets/Modules_1.png)

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Maneiras de Rodar o Projeto](#maneiras-de-rodar-o-projeto)
  - [Quick Run](#quick-run)
  - [Dev Run](#dev-run)
- [Arquitetura](#arquitetura)
  - [Fluxo Simplificado da API](#fluxo-simplificado-da-api)
  - [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Testes](#testes)
- [Deploy](#deploy)
- [Desafios](#desafios)

## Tecnologias Utilizadas

- **NestJS**
- **Prisma ORM**
- **PostgreSQL**
- **Docker**
- **Jest**
- **GitHub Actions**
- **Render.com**

## Maneiras de Rodar o Projeto

### Dev Run

Para rodar o app em ambiente de desenvolvimento, siga os passos:

1. Criar o banco de dados com Docker:

   ```bash
   sh create-local-db.sh
   ```

2. Instalar os pacotes Node.js:

   ```bash
   npm i
   ```

3. Rodar o app em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

## Estrutura de Diretórios

- `./prisma` - Schemas de dados, migrações e seed.
- `./src` - Código-fonte da aplicação NestJS.
  - `./src/donor` - CRUD de doadores.
  - `./src/item` - CRUD de itens.
  - `./src/school` - CRUD de escolas.
  - `./src/auth` - Fluxos de autenticação.
  - `./src/badges` - Provider responsável pela gamificação.
- `./create-local-db.sh` - Script para criar o banco local.
- `./Dockerfile-git` - Dockerfile para CI/CD com GitHub Actions.

## Testes

Os testes utilizam **Jest** e simulam chamadas aos endpoints da aplicação:

```bash
# Rodar todos os testes
npm run test

# Rodar testes em modo de desenvolvimento
npm run test:watch
```

Os arquivos `.spec.ts` contêm os testes de unidade e integração para os módulos.

## Deploy

A aplicação conta com um processo automatizado de deploy:

1. O banco de dados de produção está hospedado no **Render.com**.
2. As secrets de produção estão armazenadas no GitHub.
3. A GitHub Action cria uma imagem Docker de produção e a envia para o Docker Hub.
4. O **Render.com** lê a imagem `latest` e a disponibiliza na URL:

   ```
   https://tech-savior-latest.onrender.com/
   ```
