import {
  describe,
  it,
  before
} from 'mocha';
import { expect } from 'chai/index';
import request from 'supertest';
import httpStatus from 'http-status-codes';
import faker from 'faker';

import app from '../../src';
import clearCollections from '../../utils/clear.collections';
import { createDefaultUser, createUserObject, loginUserAgent } from '../../utils/init.data.user';

describe(' GET api/auth/logout', function () {
  before(async () => {
    await clearCollections();
  });

  it('should return OK and clear cookies', async () => {
    const user = createUserObject();

    await createDefaultUser(user);

    const agent = await loginUserAgent(user);

    const res = await agent
      .get('/api/auth/logout')
      .send()
      .expect(httpStatus.OK);

    expect(res.headers['set-cookie'].pop().split(';')[0]).eq('jwt=');
  });
});
