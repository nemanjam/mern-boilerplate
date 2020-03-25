import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import User from '../models/User';

// facebook strategy
const facebookLogin = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: [
      'id',
      'email',
      'gender',
      'profileUrl',
      'displayName',
      'locale',
      'name',
      'timezone',
      'updated_time',
      'verified',
      'picture.type(large)',
    ],
  },
  async (accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    try {
      const oldUser = await User.findOne({ facebookId: profile.id });

      if (oldUser) {
        return done(null, oldUser);
      }
    } catch (err) {
      console.log(err);
    }

    // register user
    try {
      const newUser = await new User({
        provider: 'facebook',
        facebookId: profile.id,
        facebookEmail: profile.emails[0].value,
        facebookDisplayName: profile.displayName,
        facebookPicture: profile.photos[0].value,
      }).save();

      done(null, newUser);
    } catch (err) {
      console.log(err);
    }
  },
);

passport.use(facebookLogin);
