const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', auth, getCards);
router.post(
  '/cards',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string()
        .required()
        .regex(
          /https?:\/\/(\w{3}.)?[0-9a-z\-.]{1,}\.\w{1,}((\/[a-z0-9-._~:?#[\]@!$&'()*+,;=]{1,}){1,}\/?#?)?/i,
        ),
    }),
  }),
  createCard,
);

router.delete(
  '/cards/:cardId',
  auth,
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().regex(/\w{24}/i),
    }),
  }),
  deleteCard,
);

router.put(
  '/cards/:cardId/likes',
  auth,
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().regex(/\w{24}/i),
    }),
  }),
  likeCard,
);
router.delete(
  '/cards/:cardId/likes',
  auth,
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().regex(/\w{24}/i),
    }),
  }),
  dislikeCard,
);

module.exports = router;
