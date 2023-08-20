/**
 * Represents the animals on the ZooJS.
 * They receive a specie and an animalSound to be created.
 */
class Animal {
  constructor({ name, specie, speakMethod }) {
    this.name = name;
    this.specie = specie;
    this.speakMethod = speakMethod;
  }

  /**
   * speak delegates in the animal Speak Method.
   */
  speak(phrase) {
    return this.speakMethod.do(phrase);
  }

  get sound() {
    return this.speakMethod.animalSound;
  }
}

module.exports = { Animal };
