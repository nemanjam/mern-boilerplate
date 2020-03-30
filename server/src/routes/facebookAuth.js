import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  }),
);

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
    res.redirect(process.env.SUCCESS_REDIRECT_URL_DEV);
  },
);

export default router;
