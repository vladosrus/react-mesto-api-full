const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

const { JWT_SECRET_KEY = '96b89123393ce1397adc6912af9a95f43990e6db1b6c5d5f7c40444bd9e0fe52' } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  if (!token) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
  }

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
  }

  req.user = payload;

  next();
};
