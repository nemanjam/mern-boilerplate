import { Router } from 'express';
import Joi from 'joi';

import User from '../models/User';
import requireLocalAuth from '../middleware/requireLocalAuth';

const router = Router();

router.post('/auth/login', requireLocalAuth, (req, res) => {
  const token = req.user.generateJWT();
  const me = req.user.toAuthJSON();
  res.json({ token, me });
});

router.post('/auth/register', async (req, res, next) => {
  const schema = Joi.object().keys({
    fullName: Joi.string()
      .trim()
      .min(2)
      .max(24)
      .required(),
    email: Joi.string()
      .trim()
      .email()
      .required(),
    password: Joi.string()
      .trim()
      .min(6)
      .max(12)
      .required(),
  });

  let form;
  try {
    form = await Joi.validate(req.body, schema);
  } catch (err) {
    return res.status(422).send(err.details[0].message);
  }
  const { email, password, fullName } = form;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    try {
      const newUser = await new User({
        provider: 'email',
        email,
        password,
        localDisplayName: fullName,
      });

      newUser.registerUser(newUser, (err, user) => {
        if (err) throw err;
        res.json({ register: true }); // just redirect to login
      });
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

// logout
router.get('/auth/logout', (req, res) => {
  req.logout();
  res.send(false);
});

export default router;
