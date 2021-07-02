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

describe('POST api/auth/login', function () {
  before(async () => {
    await clearCollections();
  });

  it('should return status NOT FOUND because the user doesn\'t exist.', async () => {
    await request(app)
      .post('/api/auth/login')
      .send({
        email: faker.internet.email(),
        password: faker.internet.password()
      })
      .expect(httpStatus.NOT_FOUND);
  });

  it('should return status BAD REQUEST because password is incorrect.', async () => {
    const user = createUserObject();

    const defaultUser = await createDefaultUser(user);

    await request(app)
      .post('/api/auth/login')
      .send({
        email: defaultUser.email,
        password: faker.internet.password()
      })
      .expect(httpStatus.BAD_REQUEST);
  });

  it('should return status OK and user object.', async () => {
    const user = createUserObject({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    });

    const defaultUser = await createDefaultUser(user);

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: user.email,
        password: user.password
      })
      .expect(httpStatus.OK);

    expect(res.body).to.be.an('object');
    expect(res.body).has.own.property('name').eq(defaultUser.name);
    expect(res.body).has.own.property('email').eq(defaultUser.email);
    expect(res.body).has.own.property('password').eq(defaultUser.password);
  });
});
