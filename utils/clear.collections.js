import mongoose from 'mongoose';

export default async function clearCollections() {
  const promises = Object
    .keys(mongoose.connection.collections)
    .map(key => mongoose.connection.collections[key].deleteMany({}));

  await Promise.all(promises);
}
