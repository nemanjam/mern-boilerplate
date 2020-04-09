import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

const isProduction = process.env.NODE_ENV === 'production';
const successRedirectUrl = isProduction ? process.env.SUCCESS_REDIRECT_URL_PROD : process.env.SUCCESS_REDIRECT_URL_DEV;

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    const token = req.user.generateJWT();
    res.cookie('x-auth-cookie', token);
    res.redirect(successRedirectUrl);
  },
);

export default router;
