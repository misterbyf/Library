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

router.route('/authors/:id/books')
  .post(middlewarePassportJwt, middlewareACL('admin'), middlewareValidator(createBookSchema), createBook);

router.route('/authors/:idAuthor/books/:idBook')
  .put(middlewarePassportJwt, middlewareACL('admin'), middlewareValidator(updateBookSchema), updateBook);

router.route('/books/:id')
  .delete(middlewarePassportJwt, middlewareACL('admin'), middlewareValidator(removeBookSchema), removeBook);

router.route('/books')
  .get(middlewarePassportJwt, middlewareACL('admin', 'user'), middlewareValidator(getBookSchema), getBooks);

export default router;
