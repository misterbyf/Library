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

let agent;

let authorObj;

let defaultAuthor;

describe('POST api/catalog/authors/:id', function () {
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
      .post(`/api/catalog/authors/${id}`)
      .send(authorObj)
      .expect(httpStatus.NOT_FOUND);
  });

  it('should return status OK, and reload author object.', async () => {
    const author = createAuthorObject();

    const res = await agent
      .post(`/api/catalog/authors/${defaultAuthor._id}`)
      .send(author)
      .expect(httpStatus.OK);

    expect(res.body).to.be.an('object');
    expect(res.body).has.own.property('name').eq(author.name);
    expect(res.body).has.own.property('pseudonym').eq(author.pseudonym);
    expect(res.body).has.own.property('hometown').eq(author.hometown);
  });
});