import express from 'express';

import middlewareValidator from '../middleware/middleware.validator';
import middlewarePassportJwt from '../middleware/middleware.passport.jwt';
import middlewareACL from '../middleware/middleware.acl';

import { giveBook, takeBook } from '../controllers/order.controller';
import { takeOrderSchema, giveOrderSchema } from '../middleware/schemas.for.validation/order.schema';

const router = express.Router();

router.route('/order/:id')
  .post(middlewarePassportJwt, middlewareACL('admin', 'user'), middlewareValidator(takeOrderSchema), takeBook);

router.route('/order/:idOrder/:idBook')
  .delete(middlewarePassportJwt, middlewareACL('admin', 'user'), middlewareValidator(giveOrderSchema), giveBook);

export default router;
