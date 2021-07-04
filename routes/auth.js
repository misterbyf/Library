import express from 'express';
import passport from 'passport';

import middlewareValidator from '../middleware/middleware.validator';
import middlewarePassportJwt from '../middleware/middleware.passport.jwt';

import { loginSchema, registerSchema } from '../middleware/schemas.for.validation/auth.schema';
import {
  googleAuthorization,
  login,
  logout,
  register
} from '../controllers/auth.controller';

const router = express.Router();

router.route('/login')
    .post(middlewareValidator(loginSchema), login);

router.route('/register')
    .post(middlewareValidator(registerSchema), register);

router.route('/google')
    .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('/google/callback')
    .get(passport.authenticate('google', { failureRedirect: '/api/auth/login' }),
        googleAuthorization);

router.get('/logout', middlewarePassportJwt, logout);

export default router;
