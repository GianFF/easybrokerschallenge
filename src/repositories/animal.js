const Animal = require('./models/animal');

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
