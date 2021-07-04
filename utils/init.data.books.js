import faker from 'faker';
import mongoose from 'mongoose';

import Book from '../models/Book';

function createBookObject(data = {}) {
  const book = {
    author: data.author || mongoose.Types.ObjectId(),
    title: data.title || faker.name.title(),
    publishedDate: data.publishedDate || faker.date.recent(),
    pages: data.pages || faker.datatype.number(),
    language: data.language || faker.lorem.word()
  };

  if ( data.quantity !== 0) {
    book.quantity = faker.datatype.number()
  }

  return book;
}

async function createDefaultBook(data = {}) {
  try {
    const book = new Book(data);

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
