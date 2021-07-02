import faker from 'faker';
import mongoose from 'mongoose';

import Books from '../models/Author';

function createBookObject(data = {}) {
  const book = {
    author: data.author || mongoose.Types.ObjectId(),
    title: data.title || faker.name.title(),
    publishedDate: data.publishedDate || faker.date.future(),
    pages: data.pages || faker.datatype.number(),
    language: data.language || faker.lorem.word(),
    quantity: data.quantity || faker.datatype.number()
  };

  return book;
}

async function createDefaultBook(data = {}) {
  try {
    const book = new Books(data);

    await book.save();

    return book;
  } catch (error) {
    return console.warn(error);
  }
}

export {
  createBookObject,
  createDefaultBook
};
