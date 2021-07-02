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
import { createDefaultBook, createBookObject } from '../../utils/init.data.books';

let agent;

let authorObj;

let defaultAuthor;

describe('GET api/catalog/authors/:id', function () {
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
      .get(`/api/catalog/authors/${id}`)
      .send()
      .expect(httpStatus.NOT_FOUND);
  });

  it('should return status OK, author and array of books.', async () => {
    const res = await agent
      .get(`/api/catalog/authors/${defaultAuthor._id}`)
      .send()
      .expect(httpStatus.OK);

    expect(res.body).to.be.an('object');
    expect(res.body).has.own.property('name').eq(defaultAuthor.name);
    expect(res.body).has.own.property('pseudonym').eq(defaultAuthor.pseudonym);
    expect(res.body).has.own.property('hometown').eq(defaultAuthor.hometown);
  });
});