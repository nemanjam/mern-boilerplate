import { Router } from 'express';
import passport from 'passport';
import tokenFromUser from '../utils/utils';

const router = Router();

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get(
  process.env.GOOGLE_CALLBACK_URL,
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    const token = req.user.generateJWT();
    res.cookie('x-auth-cookie', token);
    res.redirect(process.env.SUCCESS_REDIRECT_URL_DEV);
  },
);

export default router;
