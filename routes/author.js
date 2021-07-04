import express from 'express';

import middlewareValidator from '../middleware/middleware.validator';
import middlewarePassportJwt from '../middleware/middleware.passport.jwt';
import middlewareACL from '../middleware/middleware.acl';

import { createAuthor, updateAuthor, removeAuthor, getAuthors, getAuthor } from '../controllers/author.controller';
import {
  createAuthorSchema,
  updateAuthorSchema,
  removeAuthorSchema,
  getAuthorSchema
} from '../middleware/schemas.for.validation/author.schema';
import middlewarePagination from '../middleware/middleware.pagination';

import Author from '../models/Author';

const router = express.Router();

router.route('/authors')
  .post(middlewarePassportJwt, middlewareACL('admin'), middlewareValidator(createAuthorSchema), createAuthor)
  .get(middlewarePassportJwt, middlewareACL('admin'), middlewarePagination(Author), getAuthors);

router.route('/authors/:id')
  .post(middlewarePassportJwt, middlewareACL('admin'), middlewareValidator(updateAuthorSchema), updateAuthor)
  .delete(middlewarePassportJwt, middlewareACL('admin'), middlewareValidator(removeAuthorSchema), removeAuthor);

router.route('/authors/author/:pseudonym')
  .get(middlewarePassportJwt, middlewareACL('admin', 'user'), middlewareValidator(getAuthorSchema), getAuthor);

export default router;
