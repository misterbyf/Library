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
import { createDefaultUser, createUserObject } from '../../utils/init.data.user';

describe('POST api/auth/register', function () {
  before(async () => {
    await clearCollections();
  });

  it('should return status BAD REQUEST because the user already exists', async () => {
    const user = createUserObject();

    await createDefaultUser(user);

    await request(app)
      .post('/api/auth/register')
      .send(user)
      .expect(httpStatus.BAD_REQUEST);
  });

  it('should return status CREATED and user object', async () => {
    const user = createUserObject({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    });

    const res = await request(app)
      .post('/api/auth/register')
      .send(user)
      .expect(httpStatus.CREATED);

    expect(res.body).to.be.an('object');
    expect(res.body).has.own.property('name').eq(user.name);
    expect(res.body).has.own.property('email').eq(user.email);
  });
});
