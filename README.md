# PetAgenda — Sistema de Gestão de Clínica Veterinária

Sistema administrativo completo desenvolvido como **Projeto Final** da disciplina de Backend (Tecnologia em Sistemas de Internet).

**Grupo:**
- Gustavo de Souza Pinto
- Quellin Alvienes Marques
- Mailton Torbes Kessner
- Caue Morai Madruga

**Polo:** Rosário do Sul

---

## Sobre o Sistema

O **PetAgenda** é um sistema web para gerenciamento de uma clínica veterinária / pet shop. Permite o controle de:

- **Tutores** (donos dos animais)
- **Animais** (pacientes)
- **Atendimentos** (consultas, vacinas, banho, tosa, etc.)

### Funcionalidades

- Dashboard com indicadores
- CRUD completo para as 3 entidades
- Pesquisa/filtro em todas as listagens
- Interface administrativa responsiva com Bootstrap 5
- Persistência de dados com MongoDB

---

## Tecnologias

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **EJS** (templates)
- **Bootstrap 5** + Bootstrap Icons
- **method-override** (suporte a PUT/DELETE via formulários)

---

## Como executar localmente

### 1. Pré-requisitos
- Node.js 18+
- Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (gratuita) ou MongoDB local

### 2. Instalação

```bash
git clone <url-do-repositorio>
cd petagenda
npm install
```

### 3. Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/petagenda?retryWrites=true&w=majority
NODE_ENV=development
```

### 4. Executar

```bash
npm start
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## Deploy no Render

1. Crie um repositório público no GitHub com este código.
2. No [Render](https://render.com):
   - New → Web Service
   - Conecte o repositório
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
3. Em **Environment** adicione:
   - `MONGODB_URI` → sua connection string do Atlas
   - `NODE_ENV` → `production`
4. Deploy!

---

## Estrutura do Projeto

```
petagenda/
├── config/
│   └── db.js              # Conexão com MongoDB
├── models/
│   ├── Tutor.js
│   ├── Animal.js
│   └── Atendimento.js
├── routes/
│   ├── index.js           # Dashboard
│   ├── tutores.js
│   ├── animais.js
│   └── atendimentos.js
├── views/
│   ├── layouts/main.ejs
│   ├── partials/
│   ├── dashboard.ejs
│   ├── tutores/
│   ├── animais/
│   └── atendimentos/
├── public/css/style.css
├── server.js
├── package.json
└── .env.example
```

---

## Entidades

### Tutor
`nome`, `telefone`, `email`, `cpf`, `endereco`, `ativo`

### Animal
`nome`, `especie`, `raca`, `idade`, `tutorNome`, `observacoes`, `ativo`

### Atendimento
`animalNome`, `dataHora`, `tipo`, `status`, `valor`, `observacoes`

---

## Licença

Projeto acadêmico — uso educacional.
