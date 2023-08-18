/**
 * Logger Factory, we could be using a library here but for the moment this is enough
 */
module.exports = {
  newLogger: (transactionID) => ({
    transactionID: transactionID || '',
    timestamp: new Date().toLocaleTimeString(),
    log(message) {
      console.log(`${this.timestamp} - ${this.transactionID} - ${message}`);
    },
  }),
};
