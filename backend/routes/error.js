const router = require('express').Router();

module.exports = router;

const requestError = require('../controllers/errors');

router.all('*', requestError);
