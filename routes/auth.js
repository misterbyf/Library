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

router.post('/login', middlewareValidator(loginSchema), login);

router.post('/register', middlewareValidator(registerSchema), register);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/auth/login' }),
  googleAuthorization
);

router.get('/logout', middlewarePassportJwt, logout);

export default router;
