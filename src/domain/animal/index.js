/**
 * Represents an animal in the ZooJS.
 * Each animal can speak from a different manner,
 * thus they need a speakMethod.
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
