import express from 'express';

import middlewarePassportJwt from '../middleware/middleware.passport.jwt';
import middlewareACL from '../middleware/middleware.acl';

import { getUser } from '../controllers/user.controller';

const router = express.Router();

router.route('/')
  .get(middlewarePassportJwt, middlewareACL('admin', 'user'),  getUser);

export default router;
