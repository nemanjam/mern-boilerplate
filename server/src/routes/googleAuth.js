import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

const clientUrl = process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL_PROD : process.env.CLIENT_URL_DEV;

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    const token = req.user.generateJWT();
    res.cookie('x-auth-cookie', token);
    res.redirect(clientUrl);
  },
);

export default router;
