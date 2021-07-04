import {
  describe,
  it,
  before
} from 'mocha';
import { expect } from 'chai/index';
import httpStatus from 'http-status-codes';

import clearCollections from '../../utils/clear.collections';
import { createAuthorObject, createDefaultAuthor } from '../../utils/init.data.author';
import { createDefaultUser, createUserObject, loginUserAgent } from '../../utils/init.data.user';

let agent;

let authorObj;

describe('POST api/catalog/authors', function () {
  before(async () => {
    await clearCollections();

    const userObj = createUserObject({ role: 'admin' });

    await createDefaultUser(userObj);

    agent = await loginUserAgent(userObj);

    authorObj = createAuthorObject();

    await createDefaultAuthor(authorObj);
  });

  it('should return status BAD REQUEST, because author with same pseudonym already exist.', async () => {
    await agent
      .post('/api/catalog/authors')
      .send(authorObj)
      .expect(httpStatus.BAD_REQUEST);
  });

  it('should return status CREATED, and author object.', async () => {
    const author = createAuthorObject();

    const res = await agent
      .post('/api/catalog/authors')
      .send(author)
      .expect(httpStatus.CREATED);

    expect(res.body).to.be.an('object');
    expect(res.body).has.own.property('name').eq(author.name);
    expect(res.body).has.own.property('pseudonym').eq(author.pseudonym);
    expect(res.body).has.own.property('hometown').eq(author.hometown);
  });
});