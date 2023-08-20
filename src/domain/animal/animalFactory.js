const { Animal } = require('.');
const { Interspersed } = require('../speakmethod/interspersed');
const { Silent } = require('../speakmethod/silent');
const { Repeat } = require('../speakmethod/repeat');
const speakMethodConstants = require('../speakmethod/speakMethodConstants');

/**
 * The animal factory is used to build Animal domain objects from an Animal from the DB.
 */
const animalFactory = {
  build({
    specie, animalSound, name, speakMethod,
  }) {
    let animalSpeakMethod;

    switch (speakMethod) {
      case speakMethodConstants.INTERSPERSED:
        animalSpeakMethod = new Interspersed({ animalSound });
        break;
      case speakMethodConstants.SILENT:
        animalSpeakMethod = new Silent({ animalSound });
        break;
      case speakMethodConstants.REPEAT:
        animalSpeakMethod = new Repeat({ animalSound });
        break;
      default:
        throw Error(`Couldn't find speak method for ${speakMethod}`);
    }

    return new Animal({ name, specie, speakMethod: animalSpeakMethod });
  },
};

module.exports = { animalFactory };
