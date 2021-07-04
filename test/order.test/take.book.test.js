import {
  describe,
  it,
  before
} from 'mocha';
import { expect } from 'chai/index';
import httpStatus from 'http-status-codes';
import mongoose from 'mongoose';
import faker from 'faker';

import Book from '../../models/Book';

import clearCollections from '../../utils/clear.collections';
import { createAuthorObject, createDefaultAuthor } from '../../utils/init.data.author';
import { createDefaultBook, createBookObject } from '../../utils/init.data.books';
import { createDefaultUser, createUserObject, loginUserAgent } from '../../utils/init.data.user';
import { createOrderObject, createDefaultOrder } from '../../utils/init.data.order';

let agent;

let authorObj;

let bookObj;

let defaultAuthor;

let defaultBook;

describe('POST /api/catalog/order/:id', function () {
  before(async () => {
    await clearCollections();

    const userObj = createUserObject({role: 'admin'});

    const defaultUser = await createDefaultUser(userObj);

    agent = await loginUserAgent(userObj);

    authorObj = createAuthorObject();

    defaultAuthor = await createDefaultAuthor(authorObj);

    bookObj = createBookObject({author: defaultAuthor._id});

    defaultBook = await createDefaultBook(bookObj);
  });

  it('should return status NOT FOUND, because book not found.', async () => {
    const id = mongoose.Types.ObjectId();

    await agent
      .post(`/api/catalog/order/${id}`)
      .send({
        date: faker.date.future()
      })
      .expect(httpStatus.NOT_FOUND);
  });

  it('should return status CREATED then return order object and iterate quantity in Book -1.', async () => {
    await agent
      .post(`/api/catalog/order/${defaultBook._id}`)
      .send({
        date: faker.date.future()
      })
      .expect(httpStatus.CREATED);

    const iterateBook = await Book.findById(defaultBook._id);

    expect(iterateBook.quantity).eq(defaultBook.quantity - 1);
  });
});