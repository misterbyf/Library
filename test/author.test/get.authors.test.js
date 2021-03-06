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

let defaultAuthor;

describe('GET api/catalog/authors', function () {
  before(async () => {
    await clearCollections();

    const userObj = createUserObject({ role: 'admin' });

    await createDefaultUser(userObj);

    agent = await loginUserAgent(userObj);

    authorObj = createAuthorObject();

    defaultAuthor = await createDefaultAuthor(authorObj);
  });

  it('should return status OK and array of authors.', async () => {
    const res = await agent
      .get('/api/catalog/authors')
      .send()
      .expect(httpStatus.OK);

    expect(res.body).to.be.an('array');
    expect(res.body[0]).has.own.property('name').eq(defaultAuthor.name);
    expect(res.body[0]).has.own.property('pseudonym').eq(defaultAuthor.pseudonym);
    expect(res.body[0]).has.own.property('hometown').eq(defaultAuthor.hometown);
  });
});