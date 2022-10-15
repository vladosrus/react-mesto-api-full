const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Создание сервера
const express = require('express');

const app = express();

const { PORT, MONGODB_URL } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

// Мидлвэры
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

// Роутеры
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const routerError = require('./routes/error');
const routerSignUp = require('./routes/signUp');
const routerSignIn = require('./routes/signIn');

// Подключение к серверу mongoDB
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
});

app.use(cors);
app.use(bodyParser.json());
app.use(cookieParser());

// Логгер запросов
app.use(requestLogger);

app.use('/', routerSignUp);
app.use('/', routerSignIn);
app.use('/', routerUsers);
app.use('/', routerCards);

// Обработка неправильного пути
app.use('*', routerError);

// Логгер ошибок
app.use(errorLogger);

// Централизованный обработчик ошибок (основные ошибки + celebrate)
app.use(errors());
app.use(error);

app.listen(PORT, () => console.log(PORT));
