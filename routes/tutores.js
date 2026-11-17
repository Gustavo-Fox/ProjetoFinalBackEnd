const express = require('express');
const router = express.Router();
const Tutor = require('../models/Tutor');

// Listar + pesquisa
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    let filtro = {};

    if (q && q.trim() !== '') {
      filtro = {
        $or: [
          { nome: { $regex: q, $options: 'i' } },
          { telefone: { $regex: q, $options: 'i' } },
          { cpf: { $regex: q, $options: 'i' } },
          { email: { $regex: q, $options: 'i' } }
        ]
      };
    }

    const tutores = await Tutor.find(filtro).sort({ nome: 1 });
    res.render('tutores/index', {
      title: 'Tutores',
      tutores,
      q: q || ''
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao listar tutores');
  }
});

// Formulário de cadastro
router.get('/novo', (req, res) => {
  res.render('tutores/form', {
    title: 'Novo Tutor',
    tutor: {},
    action: '/tutores',
    method: 'POST'
  });
});

// Criar
router.post('/', async (req, res) => {
  try {
    const { nome, telefone, email, cpf, endereco, ativo } = req.body;
    await Tutor.create({
      nome,
      telefone,
      email,
      cpf,
      endereco,
      ativo: ativo === 'on' || ativo === true || ativo === 'true'
    });
    res.redirect('/tutores');
  } catch (error) {
    console.error(error);
    res.status(400).send('Erro ao cadastrar tutor: ' + error.message);
  }
});

// Formulário de edição
router.get('/:id/editar', async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) return res.status(404).send('Tutor não encontrado');
    res.render('tutores/form', {
      title: 'Editar Tutor',
      tutor,
      action: `/tutores/${tutor._id}?_method=PUT`,
      method: 'POST'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar tutor');
  }
});

// Atualizar
router.put('/:id', async (req, res) => {
  try {
    const { nome, telefone, email, cpf, endereco, ativo } = req.body;
    await Tutor.findByIdAndUpdate(req.params.id, {
      nome,
      telefone,
      email,
      cpf,
      endereco,
      ativo: ativo === 'on' || ativo === true || ativo === 'true'
    });
    res.redirect('/tutores');
  } catch (error) {
    console.error(error);
    res.status(400).send('Erro ao atualizar tutor: ' + error.message);
  }
});

// Excluir
router.delete('/:id', async (req, res) => {
  try {
    await Tutor.findByIdAndDelete(req.params.id);
    res.redirect('/tutores');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao excluir tutor');
  }
});

module.exports = router;
