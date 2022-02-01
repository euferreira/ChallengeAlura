class InvalidArgumentsException {
  constructor(mensagem = "", statusCode = 409) {
    this.mensagem = mensagem;
    this.statusCode = statusCode;
  }

  customException() {
    return new Error(this.mensagem);
  }
}

InvalidArgumentsException.prototype = Object.create(Error.prototype);
module.exports = InvalidArgumentsException;
