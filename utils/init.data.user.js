import request from 'supertest';
import app from '../src';
import faker from 'faker';

import User from '../models/User';

function createUserObject(data = {}) {
  const user = {
    name: data.name || faker.name.firstName(),
    email: data.email || faker.internet.email(),
    password: data.password || faker.internet.password(),
    role: data.role || 'user'
  };

  return user;
}

async function createDefaultUser(data = {}) {
  try {
    const { name, email, password, role } = data;

    const user = new User({
      name,
      email,
      password,
      role
    });

    await user.save();

    return user;
  } catch (error) {
    return console.warn(error);
  }
}

async function loginUserAgent(data = {}) {
  const agent = request.agent(app);

  await agent
    .post('/api/auth/login')
    .send({
      email: data.email,
      password: data.password
    });

  return agent;
}

export {
  createUserObject,
  createDefaultUser,
  loginUserAgent
};
