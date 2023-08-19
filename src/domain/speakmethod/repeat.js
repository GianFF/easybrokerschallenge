const { SpeakMethod } = require('./speakMethod');

class Repeat extends SpeakMethod {
  /**
   * speak receives a phrase and returns it duplicated with the animal sound at the end.
   * @param {String} phrase the phrase to duplicate.
   * @returns the duplicated phrase.
   */
  do(phrase) {
    if (!phrase) return '';
    return `${phrase} ${phrase} ${this.animalSound}`;
  }
}

module.exports = { Repeat };
