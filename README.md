<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


# Reserva de Salas

Descrição

Instituições, empresas e escolas realizam reuniões, treinamentos e eventos internos diariamente. Esse tipo de atividade exige o uso de salas que precisam ser reservadas com antecedência. O controle manual dessas reservas (via planilhas, e-mails ou comunicação informal) causa conflitos de horários, perda de informação e retrabalho.

Objetivo da solução

Desenvolver um sistema simples e funcional de reserva de salas, permitindo:

- Cadastro das salas disponíveis
- Registro de reservas com horário de início e fim
- Verificação automática de disponibilidade
- Cancelamento de reservas
- Listagem de reservas por sala e por data

Visão geral do projeto

Esta API é implementada com NestJS e MongoDB (Mongoose). O código está organizado em módulos: `room` (salas) e `reservation` (reservas), cada um com seus DTOs, schemas, serviços e controladores.

Requisitos

- Node.js (recomendado >= 14)
- npm
- MongoDB (local ou remoto)

Instalação

1. Clone o repositório:

```powershell
git clone <repo-url>
cd "reserva de salas\reserva-salas-api"
```

2. Instale dependências:

```powershell
npm install
```

Configuração

- A conexão padrão do MongoDB está configurada em `src/app.module.ts` como `mongodb://localhost:27017/reserva_salas`.
- Para usar outra URI, altere `src/app.module.ts` ou implemente leitura de `process.env.MONGODB_URI`.

Execução

- Desenvolvimento (com reload):

```powershell
npm run start:dev
```

- Produção:

```powershell
npm run build
npm run start:prod
```

Principais endpoints

- `POST /reservation` — cria uma reserva. Campos: `roomId`, `dataInicio` (ISO string), `dataFim` (ISO string), `requesterName`, `motivo` (opcional).
- `GET /reservation/room/:roomId` — lista reservas ativas da sala.
- `GET /reservation/room/:roomId/date?date=YYYY-MM-DD` — lista reservas da sala para a data informada.
- `PATCH /reservation/cancel/:id` — cancela reserva.
- Endpoints para gerenciar salas estão disponíveis no módulo `room`.

Testes

- Unitários: `npm run test`
- E2E: `npm run test:e2e`

Observações

- Recomenda-se fazer backup do banco antes de executar migrações ou scripts de normalização.
- Considere aprimorar validações de DTOs e padronizar o armazenamento de `roomId` como `ObjectId`.

Contribuição

- Faça fork, crie uma branch e abra um pull request com as mudanças.

---

Se quiser, eu posso gerar a mensagem de commit sugerida para essa alteração do README.


