const { SpeakMethod } = require('./speakMethod');

class Silent extends SpeakMethod {
  /**
   * speak receives a phrase and returns an empty string meeaning an empty sound.
   * This is usefull for fhises.
   * @returns an empty string.
   */
  // eslint-disable-next-line class-methods-use-this
  do() {
    return '';
  }
}

module.exports = { Silent };
