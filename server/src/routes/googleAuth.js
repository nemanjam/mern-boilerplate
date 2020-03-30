import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get(
  '/google/callback',
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
