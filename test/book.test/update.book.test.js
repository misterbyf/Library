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

describe('POST /api/catalog/authors/:idAuthor/books/:idBook', function () {
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
    const idAuthor = mongoose.Types.ObjectId();

    await agent
      .put(`/api/catalog/authors/${idAuthor}/books/${defaultBook._id}`)
      .send(bookObj)
      .expect(httpStatus.NOT_FOUND);
  });

  it('should return status NOT FOUND, because author with same id not exist.', async () => {
    const idBook = mongoose.Types.ObjectId();

    await agent
      .put(`/api/catalog/authors/${defaultAuthor._id}/books/${idBook}`)
      .send(bookObj)
      .expect(httpStatus.NOT_FOUND);
  });

  it('should return status OK and new book object.', async () => {
    const book = createBookObject();

    const res = await agent
      .put(`/api/catalog/authors/${defaultAuthor._id}/books/${defaultBook._id}`)
      .send(book)
      .expect(httpStatus.OK);

    expect(res.body).to.be.an('object');
    expect(res.body).has.own.property('title').eq(book.title);
    expect(res.body).has.own.property('publishedDate');
    expect(JSON.stringify(res.body.publishedDate)).eq(JSON.stringify(book.publishedDate));
    expect(res.body).has.own.property('pages').eq(book.pages);
    expect(res.body).has.own.property('language').eq(book.language);
  });
});