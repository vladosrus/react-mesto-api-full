const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUser,
} = require('../controllers/users');

router.get('/users', auth, getUsers);

router.get('/users/me', auth, getUser);
router.get(
  '/users/:userId',
  auth,
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().regex(/\w{24}/i),
    }),
  }),
  getUserById,
);

router.patch(
  '/users/me',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
);

router.patch(
  '/users/me/avatar',
  auth,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .uri()
        .regex(
          /https?:\/\/(\w{3}.)?[0-9a-z\-.]{1,}\.\w{1,}((\/[a-z0-9-._~:?#[\]@!$&'()*+,;=]{1,}){1,}\/?#?)?/i,
        ),
    }),
  }),
  updateAvatar,
);

module.exports = router;
