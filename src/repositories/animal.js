const Animal = require('./models/animal');

/**
 * AnimalRepository is an abstraction over mongoose.
 * It simply delegates in the mongoose model "Animal" to operate the DB.
 */
const animalRepository = {
  async save({
    specie, animalSound, name, speakMethod,
  }) {
    const animal = new Animal({
      specie, animalSound, name, speakMethod,
    });
    return animal.save();
  },
  async findById(id) {
    if (!id) {
      return Animal.find();
    }
    return Animal.find({ _id: id });
  },
};

module.exports = { animalRepository };
