const mongoose = require('mongoose');

const AtendimentoSchema = new mongoose.Schema({
  animalNome: {
    type: String,
    required: [true, 'O nome do animal é obrigatório'],
    trim: true
  },
  dataHora: {
    type: Date,
    required: [true, 'A data e hora são obrigatórias']
  },
  tipo: {
    type: String,
    required: [true, 'O tipo de atendimento é obrigatório'],
    enum: ['Consulta', 'Vacina', 'Banho', 'Tosa', 'Cirurgia', 'Retorno', 'Outro']
  },
  status: {
    type: String,
    required: true,
    enum: ['agendado', 'em_andamento', 'concluido', 'cancelado'],
    default: 'agendado'
  },
  valor: {
    type: Number,
    min: 0,
    default: 0
  },
  observacoes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Atendimento', AtendimentoSchema);
