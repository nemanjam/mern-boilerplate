import passport from 'passport';

const requireJwtAuth = passport.authenticate('jwt', { session: false });

export default requireJwtAuth;
