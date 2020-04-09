import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  }),
);

const isProduction = process.env.NODE_ENV === 'production';
const successRedirectUrl = isProduction ? process.env.SUCCESS_REDIRECT_URL_PROD : process.env.SUCCESS_REDIRECT_URL_DEV;

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    // console.log(req.user);
    const token = req.user.generateJWT();
    res.cookie('x-auth-cookie', token);
    res.redirect(successRedirectUrl);
  },
);

export default router;
