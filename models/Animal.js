const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome do animal é obrigatório'],
    trim: true
  },
  especie: {
    type: String,
    required: [true, 'A espécie é obrigatória'],
    trim: true,
    enum: ['Cachorro', 'Gato', 'Ave', 'Roedor', 'Réptil', 'Outro']
  },
  raca: {
    type: String,
    trim: true
  },
  idade: {
    type: Number,
    min: 0
  },
  tutorNome: {
    type: String,
    required: [true, 'O nome do tutor é obrigatório'],
    trim: true
  },
  observacoes: {
    type: String,
    trim: true
  },
  ativo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Animal', AnimalSchema);
