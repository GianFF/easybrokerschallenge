const { Interspersed } = require('../../src/domain/speakmethod/interspersed');
const { Silent } = require('../../src/domain/speakmethod/silent');
const { Repeat } = require('../../src/domain/speakmethod/repeat');

describe('Speak Method', () => {
  describe('Interspersed', () => {
    let speakMethod;
  
    beforeEach(() => {
      speakMethod = new Interspersed({ animalSound: 'miau' });
    });
  
    test('given a phrase, they interprese it with their animal sound', () => {
      expect(speakMethod.do('Hello world')).toEqual('Hello miau world miau');
    });
  
    test('given an empty phrase, they do not say anything', () => {
      expect(speakMethod.do('')).toEqual('');
    });
  
    test('given no phrase, they do not say anything', () => {
      expect(speakMethod.do()).toEqual('');
    });
  
    // NOTE: Documenting the actuall behaviour. Needs PO's confirmation.
    test('given a blank phrase, they repeat their animal sound', () => {
      expect(speakMethod.do(' ')).toEqual(' miau  miau');
    });
  });
  
  describe('Silent', () => {
    let speakMethod;
  
    beforeEach(() => {
      speakMethod = new Silent({ animalSound: 'miau' });
    });
  
    test('given a phrase, they do not say anything', () => {
      expect(speakMethod.do('Hello world')).toEqual('');
    });
  
    test('given an empty phrase, they do not say anything', () => {
      expect(speakMethod.do('')).toEqual('');
    });
  
    test('given no phrase, they do not say anything', () => {
      expect(speakMethod.do()).toEqual('');
    });
  
    test('given a blank phrase, they do not say anything', () => {
      expect(speakMethod.do(' ')).toEqual('');
    });
  });
  
  describe('Repeat', () => {
    let speakMethod;
  
    beforeEach(() => {
      speakMethod = new Repeat({ animalSound: 'miau' });
    });
  
    test('given a phrase, they repeat it with their animal sound', () => {
      expect(speakMethod.do('Hello world')).toEqual('Hello world Hello world miau');
    });
  
    test('given an empty phrase, they do not say anything', () => {
      expect(speakMethod.do('')).toEqual('');
    });
  
    test('given no phrase, they do not say anything', () => {
      expect(speakMethod.do()).toEqual('');
    });
  
    // NOTE: Documenting the actuall behaviour. Needs PO's confirmation.
    test('given a blank phrase, they repeat their animal sound', () => {
      expect(speakMethod.do(' ')).toEqual('    miau');
    });
  });
});
