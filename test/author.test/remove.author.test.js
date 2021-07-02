import {
  describe,
  it,
  before
} from 'mocha';
import { expect } from 'chai/index';
import httpStatus from 'http-status-codes';
import mongoose from 'mongoose';

import clearCollections from '../../utils/clear.collections';
import { createAuthorObject, createDefaultAuthor } from '../../utils/init.data.author';
import { createDefaultUser, createUserObject, loginUserAgent } from '../../utils/init.data.user';

import Author from '../../models/Author';

let agent;

let authorObj;

let defaultAuthor;

describe('DELETE api/catalog/authors/:id', function () {
  before(async () => {
    await clearCollections();

    const userObj = createUserObject({ role: 'admin' });

    await createDefaultUser(userObj);

    agent = await loginUserAgent(userObj);

    authorObj = createAuthorObject();

    defaultAuthor = await createDefaultAuthor(authorObj);
  });

  it('should return status NOT_FOUND, because author with same id not found.', async () => {
    const id = mongoose.Types.ObjectId();

    await agent
      .delete(`/api/catalog/authors/${id}`)
      .send(authorObj)
      .expect(httpStatus.NOT_FOUND);
  });

  it('should return status NO_CONTENT, and delete author.', async () => {
    await agent
      .delete(`/api/catalog/authors/${defaultAuthor._id}`)
      .send()
      .expect(httpStatus.NO_CONTENT);

    const reloadAuthor = await Author.findOne(defaultAuthor._id);
    expect(reloadAuthor).eq(null);
  });
});