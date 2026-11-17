const mongoose = require('mongoose');

const TutorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome do tutor é obrigatório'],
    trim: true
  },
  telefone: {
    type: String,
    required: [true, 'O telefone é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  cpf: {
    type: String,
    required: [true, 'O CPF é obrigatório'],
    trim: true,
    unique: true
  },
  endereco: {
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

module.exports = mongoose.model('Tutor', TutorSchema);
