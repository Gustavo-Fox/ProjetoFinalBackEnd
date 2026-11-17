const express = require('express');
const router = express.Router();
const Tutor = require('../models/Tutor');
const Animal = require('../models/Animal');
const Atendimento = require('../models/Atendimento');

// Dashboard
router.get('/', async (req, res) => {
  try {
    const totalTutores = await Tutor.countDocuments();
    const totalAnimais = await Animal.countDocuments();
    const totalAtendimentos = await Atendimento.countDocuments();
    const atendimentosAgendados = await Atendimento.countDocuments({ status: 'agendado' });
    const ultimosAtendimentos = await Atendimento.find()
      .sort({ dataHora: -1 })
      .limit(5);

    res.render('dashboard', {
      title: 'Dashboard',
      totalTutores,
      totalAnimais,
      totalAtendimentos,
      atendimentosAgendados,
      ultimosAtendimentos
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar dashboard');
  }
});

module.exports = router;
