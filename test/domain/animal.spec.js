const { Animal } = require('../../src/domain/animal');
const { Interspersed } = require('../../src/domain/speakmethod/interspersed');

describe('Anmial', () => {
  let kitten;

  beforeEach(() => {
    const speakMethod = new Interspersed({ animalSound: 'miau' });
    kitten = new Animal({ specie: 'Cat', speakMethod });
  });

  test('an animal has a specie', () => {
    expect(kitten.specie).toEqual('Cat');
  });

  test('an animal has a animal sound', () => {
    expect(kitten.sound).toEqual('miau');
  });

  test('given a phrase, they say it', () => {
    expect(kitten.speak('Hello world')).toEqual('Hello miau world miau');
  });
});