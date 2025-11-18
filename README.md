# Sistema de Reserva de Salas — API (NestJS + MongoDB)

Este projeto consiste em uma API para gerenciamento de salas e reservas.  
O objetivo é oferecer uma solução simples e funcional para organizar o uso de ambientes compartilhados, evitando conflitos de horários e facilitando o controle de agendamentos.

---

## 🧱 Tecnologias Utilizadas

- **Node.js**
- **NestJS**
- **MongoDB**
- **Mongoose**
- **TypeScript**
- **Jest** (testes unitários)

---

## 📌 Funcionalidades Principais

### 🔹 **Gerenciamento de Salas**
- Criar sala
- Listar salas
- Consultar sala por ID
- Atualizar sala
- Excluir sala

### 🔹 **Gerenciamento de Reservas**
- Criar reserva vinculada a uma sala
- Verificar disponibilidade automaticamente
- Evitar conflitos de horários
- Listar reservas por sala
- Listar reservas por sala e data
- Consultar reserva por ID
- Atualizar reserva
- Cancelar reserva

---

## Como Executar o Projeto
1. Instalar dependências
npm install

2. Iniciar MongoDB

Certifique-se de que o MongoDB esteja rodando:

mongodb://localhost:27017/reserva_salas

3. Rodar o servidor
npm run start:dev

