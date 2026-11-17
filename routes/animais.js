const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');

// Listar + pesquisa
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    let filtro = {};

    if (q && q.trim() !== '') {
      filtro = {
        $or: [
          { nome: { $regex: q, $options: 'i' } },
          { especie: { $regex: q, $options: 'i' } },
          { raca: { $regex: q, $options: 'i' } },
          { tutorNome: { $regex: q, $options: 'i' } }
        ]
      };
    }

    const animais = await Animal.find(filtro).sort({ nome: 1 });
    res.render('animais/index', {
      title: 'Animais',
      animais,
      q: q || ''
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao listar animais');
  }
});

// Formulário de cadastro
router.get('/novo', (req, res) => {
  res.render('animais/form', {
    title: 'Novo Animal',
    animal: {},
    action: '/animais',
    method: 'POST'
  });
});

// Criar
router.post('/', async (req, res) => {
  try {
    const { nome, especie, raca, idade, tutorNome, observacoes, ativo } = req.body;
    await Animal.create({
      nome,
      especie,
      raca,
      idade: idade ? Number(idade) : undefined,
      tutorNome,
      observacoes,
      ativo: ativo === 'on' || ativo === true || ativo === 'true'
    });
    res.redirect('/animais');
  } catch (error) {
    console.error(error);
    res.status(400).send('Erro ao cadastrar animal: ' + error.message);
  }
});

// Formulário de edição
router.get('/:id/editar', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).send('Animal não encontrado');
    res.render('animais/form', {
      title: 'Editar Animal',
      animal,
      action: `/animais/${animal._id}?_method=PUT`,
      method: 'POST'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar animal');
  }
});

// Atualizar
router.put('/:id', async (req, res) => {
  try {
    const { nome, especie, raca, idade, tutorNome, observacoes, ativo } = req.body;
    await Animal.findByIdAndUpdate(req.params.id, {
      nome,
      especie,
      raca,
      idade: idade ? Number(idade) : undefined,
      tutorNome,
      observacoes,
      ativo: ativo === 'on' || ativo === true || ativo === 'true'
    });
    res.redirect('/animais');
  } catch (error) {
    console.error(error);
    res.status(400).send('Erro ao atualizar animal: ' + error.message);
  }
});

// Excluir
router.delete('/:id', async (req, res) => {
  try {
    await Animal.findByIdAndDelete(req.params.id);
    res.redirect('/animais');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao excluir animal');
  }
});

module.exports = router;
