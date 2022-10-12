const NotFoundError = require('../errors/notFoundError');

const requestError = (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
};

module.exports = requestError;
