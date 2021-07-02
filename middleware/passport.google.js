import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotEnv from 'dotenv';
dotEnv.config();

import User from '../models/User';

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET_KEY,
  callbackURL: `http://localhost:${process.env.PORT}/api/auth/google/callback`
};

export default function middlewareGoogle(passport) {
  passport.use(
    new GoogleStrategy(options, async (accessToken, refreshToken, payload, done) => {
      try {
        let user = await User.findOne({ email: payload.emails[0].value });

        if (user) done(null, user);

        const newUser = await User.create({
          name: payload.name.givenName,
          email: payload.emails[0].value
        }).save();

        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
