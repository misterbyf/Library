import {
  describe,
  it,
  before
} from 'mocha';
import { expect } from 'chai/index';
import httpStatus from 'http-status-codes';
import mongoose from 'mongoose';

import clearCollections from '../../utils/clear.collections';
import { createAuthorObject, createDefaultAuthor } from '../../utils/init.data.author';
import { createDefaultBook, createBookObject } from '../../utils/init.data.books';
import { createDefaultUser, createUserObject, loginUserAgent } from '../../utils/init.data.user';

let agent;

let authorObj;

let bookObj;

let defaultAuthor;

let defaultBook;

describe('POST api/catalog/authors/:id/books', function () {
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

  it('should return status NOT FOUND, because author with same id not exist.', async () => {
    const id = mongoose.Types.ObjectId();

    await agent
      .post(`/api/catalog/authors/${id}/books`)
      .send(bookObj)
      .expect(httpStatus.NOT_FOUND);
  });

  it('should return status BAD REQUEST, because book with same title already exist.', async () => {
    await agent
      .post(`/api/catalog/authors/${defaultAuthor._id}/books`)
      .send(bookObj)
      .expect(httpStatus.BAD_REQUEST);
  });

  it('should return status CREATED and book object.', async () => {
    const book = createBookObject();

    const res = await agent
      .post(`/api/catalog/authors/${defaultAuthor._id}/books`)
      .send(book)
      .expect(httpStatus.CREATED);

    expect(res.body).to.be.an('object');
    expect(res.body).has.own.property('title').eq(book.title);
    expect(res.body).has.own.property('publishedDate');
    expect(JSON.stringify(res.body.publishedDate)).eq(JSON.stringify(book.publishedDate));
    expect(res.body).has.own.property('pages').eq(book.pages);
    expect(res.body).has.own.property('language').eq(book.language);
  });
});