import { Router } from 'express';
import Joi from 'joi';

import User from '../models/User';
import requireLocalAuth from '../middleware/requireLocalAuth';
import { registerSchema } from '../services/validators';

const router = Router();

router.post('/login', requireLocalAuth, (req, res) => {
  const token = req.user.generateJWT();
  const me = req.user.toJSON();
  res.json({ token, me });
});

router.post('/register', async (req, res, next) => {
  let form;
  try {
    form = await Joi.validate(req.body, registerSchema);
  } catch (err) {
    return res.status(422).send({ message: err.details[0].message });
  }
  const { email, password, name, username } = form;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(422).send({ message: 'Email is in use' });
    }

    try {
      const newUser = await new User({
        provider: 'email',
        email,
        password,
        username,
        name,
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
router.get('/logout', (req, res) => {
  req.logout();
  res.send(false);
});

export default router;
