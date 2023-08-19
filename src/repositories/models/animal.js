const mongoose = require('mongoose');
const speakMethodConstants = require('../../domain/speakmethod/speakMethodConstants');

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  animalSound: { type: String, required: true },
  specie: { type: String, required: true },
  speakMethod: {
    type: String,
    enum: [
      speakMethodConstants.INTERSPERSED,
      speakMethodConstants.REPEAT,
      speakMethodConstants.SILENT,
    ],
  },
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
