import {
  describe,
  it,
  before
} from 'mocha';
import { expect } from 'chai/index';
import httpStatus from 'http-status-codes';
import mongoose from 'mongoose';

import Book from '../../models/Book';

import clearCollections from '../../utils/clear.collections';
import { createAuthorObject, createDefaultAuthor } from '../../utils/init.data.author';
import { createDefaultBook, createBookObject } from '../../utils/init.data.books';
import { createDefaultUser, createUserObject, loginUserAgent } from '../../utils/init.data.user';

let agent;

let authorObj;

let bookObj;

let defaultAuthor;

let defaultBook;

describe('DELETE /api/catalog/books/:id', function () {
  before(async () => {
    await clearCollections();

    const userObj = createUserObject({ role: 'admin' });

    await createDefaultUser(userObj);

    agent = await loginUserAgent(userObj);

    authorObj = createAuthorObject();

    defaultAuthor = await createDefaultAuthor(authorObj);

    bookObj = createBookObject({ author: defaultAuthor._id });

    defaultBook = await createDefaultBook(bookObj)
  });

  it('should return status NOT FOUND, because book with same id not exist.', async () => {
    const id = mongoose.Types.ObjectId();

    await agent
      .delete(`/api/catalog/books/${id}`)
      .send(bookObj)
      .expect(httpStatus.NOT_FOUND);
  });

  it('should return status NOT FOUND, because book with same id not exist.', async () => {
    await agent
      .delete(`/api/catalog/books/${defaultBook._id}`)
      .send(bookObj)
      .expect(httpStatus.NO_CONTENT);

    const reloadBook = await Book.findById(defaultBook._id);

    expect(reloadBook).eq(null);
  });
});