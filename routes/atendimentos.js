const express = require('express');
const router = express.Router();
const Atendimento = require('../models/Atendimento');

// Listar + pesquisa
router.get('/', async (req, res) => {
  try {
    const { q, status } = req.query;
    let filtro = {};

    if (q && q.trim() !== '') {
      filtro.$or = [
        { animalNome: { $regex: q, $options: 'i' } },
        { tipo: { $regex: q, $options: 'i' } },
        { observacoes: { $regex: q, $options: 'i' } }
      ];
    }

    if (status && status !== '') {
      filtro.status = status;
    }

    const atendimentos = await Atendimento.find(filtro).sort({ dataHora: -1 });
    res.render('atendimentos/index', {
      title: 'Atendimentos',
      atendimentos,
      q: q || '',
      status: status || ''
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao listar atendimentos');
  }
});

// Formulário de cadastro
router.get('/novo', (req, res) => {
  res.render('atendimentos/form', {
    title: 'Novo Atendimento',
    atendimento: {},
    action: '/atendimentos',
    method: 'POST'
  });
});

// Criar
router.post('/', async (req, res) => {
  try {
    const { animalNome, dataHora, tipo, status, valor, observacoes } = req.body;
    await Atendimento.create({
      animalNome,
      dataHora: new Date(dataHora),
      tipo,
      status: status || 'agendado',
      valor: valor ? Number(valor) : 0,
      observacoes
    });
    res.redirect('/atendimentos');
  } catch (error) {
    console.error(error);
    res.status(400).send('Erro ao cadastrar atendimento: ' + error.message);
  }
});

// Formulário de edição
router.get('/:id/editar', async (req, res) => {
  try {
    const atendimento = await Atendimento.findById(req.params.id);
    if (!atendimento) return res.status(404).send('Atendimento não encontrado');
    res.render('atendimentos/form', {
      title: 'Editar Atendimento',
      atendimento,
      action: `/atendimentos/${atendimento._id}?_method=PUT`,
      method: 'POST'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar atendimento');
  }
});

// Atualizar
router.put('/:id', async (req, res) => {
  try {
    const { animalNome, dataHora, tipo, status, valor, observacoes } = req.body;
    await Atendimento.findByIdAndUpdate(req.params.id, {
      animalNome,
      dataHora: new Date(dataHora),
      tipo,
      status,
      valor: valor ? Number(valor) : 0,
      observacoes
    });
    res.redirect('/atendimentos');
  } catch (error) {
    console.error(error);
    res.status(400).send('Erro ao atualizar atendimento: ' + error.message);
  }
});

// Excluir
router.delete('/:id', async (req, res) => {
  try {
    await Atendimento.findByIdAndDelete(req.params.id);
    res.redirect('/atendimentos');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao excluir atendimento');
  }
});

module.exports = router;
