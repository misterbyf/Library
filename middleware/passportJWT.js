import { Strategy as JWTStrategy } from 'passport-jwt';
import dotEnv from 'dotenv';
import redisClient from '../utils/init.redis';
dotEnv.config();

import User from '../models/User';

const SECRET_KEY = process.env.JWT;

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.signedCookies && req.signedCookies.jwt) {
    token = req.signedCookies.jwt;
  }

  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: SECRET_KEY,
  passReqToCallback: true
};

export default function middlewareJwt(passport) {
  passport.use(
    new JWTStrategy(options, async (req, payload, done) => {
      try {
        const result = await redisClient.get(req.signedCookies.jwt.toString());

        if (!result) return done(null, false);

        const user = await User.findById(result);

        if (!user) return done(null, false);

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
}
