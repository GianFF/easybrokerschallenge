const { SpeakMethod } = require('./speakMethod');

class Interspersed extends SpeakMethod {
  /**
   * speak receives a phrase and returns it interspersed with the anial sound.
   * @param {String} phrase the phrase to intersperse.
   * @returns the interspersed phrase.
   */
  do(phrase) {
    if (!phrase) return '';

    return phrase.split(' ') // ['Lions', 'suck']
      .map((word) => `${word} ${this.animalSound}`) // ['Lions grrr', 'suck grrr']
      .join(' '); // 'Lions grrr' + ' ' + 'suck grrr'
  }
}

module.exports = { Interspersed };