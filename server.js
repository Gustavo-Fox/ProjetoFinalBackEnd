require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Conexão com MongoDB
connectDB();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// EJS + Layout
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Rotas
app.use('/', require('./routes/index'));
app.use('/tutores', require('./routes/tutores'));
app.use('/animais', require('./routes/animais'));
app.use('/atendimentos', require('./routes/atendimentos'));

// 404
app.use((req, res) => {
  res.status(404).render('dashboard', {
    title: 'Página não encontrada',
    totalTutores: 0,
    totalAnimais: 0,
    totalAtendimentos: 0,
    atendimentosAgendados: 0,
    ultimosAtendimentos: []
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
