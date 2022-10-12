const { INTERNAL_SERVER_ERROR = 500 } = process.env;

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
  }
};
