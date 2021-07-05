import mongoose from 'mongoose';

import User from '../models/User';

import { createUserObject, createDefaultUser } from './init.data.user';

const db = mongoose.connection;

db.once('open', async () => {
  try {
    if (await User.countDocuments().exec() > 0) return;

    const user = createUserObject({ role: 'admin' });

    await createDefaultUser(user);
  } catch (error) {
    console.warn(error);
  }
});

export default db;