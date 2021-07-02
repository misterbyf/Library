import express from 'express';

import middlewareValidator from '../middleware/middleware.validator';
import middlewarePassportJwt from '../middleware/middleware.passport.jwt';
import middlewareACL from '../middleware/middleware.acl';

import { createBook, updateBook, getBooks, removeBook } from '../controllers/book.controller';
import {
  createBookSchema,
  updateBookSchema,
  getBookSchema,
  removeBookSchema
} from '../middleware/schemas.for.validation/book.shcema';

const router = express.Router();

router.route('/books/:id')
  .post(middlewarePassportJwt, middlewareACL('admin'), middlewareValidator(createBookSchema), createBook)
  .put(middlewarePassportJwt, middlewareACL('admin'), middlewareValidator(updateBookSchema), updateBook)
  .delete(middlewarePassportJwt, middlewareACL('admin'), middlewareValidator(removeBookSchema), removeBook);

router.route('/books')
  .get(middlewarePassportJwt, middlewareACL('admin', 'user'), middlewareValidator(getBookSchema), getBooks);

export default router;
