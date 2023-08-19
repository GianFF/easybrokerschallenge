/**
 * Represents the way an animal can speak.
 */
class SpeakMethod {
  constructor({ animalSound }) {
    this.animalSound = animalSound;
  }

  // eslint-disable-next-line no-unused-vars, class-methods-use-this
  do(phrase) {
    throw new Error('Subclass responsibilty');
  }
}

module.exports = { SpeakMethod };
