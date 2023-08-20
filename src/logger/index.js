/**
 * Logger Factory, builds a logger that prints logs with a transactionID to help tracing.
 * We could be using a library here but for the moment console.log is enough.
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
