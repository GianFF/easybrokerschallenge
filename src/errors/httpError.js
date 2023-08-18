/**
 * HTTPError is a custom error used by the services to throw errors
 * that should be catched by the API layer and easily know which kind
 * of status code should be returned to the Client.
 *
 * It might be confusing that a domain object knows about HTTP status codes
 * but this is in a fact a cross layer object, and this way saves works at
 * the expense of OOP purity.
 *
 * @method new
 * @param message this is a Human readable message to be returned to the Client
 * @param statusCode this is an HTTP Code to be returned to the Client
 */
class HTTPError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = HTTPError;
