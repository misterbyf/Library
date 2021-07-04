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

describe('GET /api/catalog/authors', function () {
  before(async () => {
    await clearCollections();

    const userObj = createUserObject({ role: 'admin' });

    await createDefaultUser(userObj);

    agent = await loginUserAgent(userObj);

    authorObj = createAuthorObject();

    defaultAuthor = await createDefaultAuthor(authorObj);

    bookObj = createBookObject({ author: defaultAuthor._id });

    defaultBook = await createDefaultBook(bookObj);
  });

  it('should return status OK, and array with books of author who is specified in the query.', async () => {
    const authorObject = createAuthorObject();

    const author = await createDefaultAuthor(authorObject);

    const bookObject = createBookObject({ author: author._id });

    const book = await createDefaultBook(bookObject);

    const res = await agent
      .get(`/api/catalog/books?author=${author._id}`)
      .send()
      .expect(httpStatus.OK);

    expect(res.body).to.be.an('array').lengthOf(1);
    expect(JSON.stringify(res.body[0].author)).eq(JSON.stringify(author._id));
    expect(res.body[0]).has.own.property('title').eq(book.title);
    expect(res.body[0]).has.own.property('publishedDate');
    expect(JSON.stringify(res.body[0].publishedDate)).eq(JSON.stringify(book.publishedDate));
    expect(res.body[0]).has.own.property('pages').eq(book.pages);
    expect(res.body[0]).has.own.property('language').eq(book.language);
  });

  it('should return status OK, and array with books where quantity more then 0.', async () => {
    const authorObject = createAuthorObject();

    const author = await createDefaultAuthor(authorObject);

    const bookObject = createBookObject({
      author: author._id,
      quantity: 0
    });

    await createDefaultBook(bookObject);

    const res = await agent
      .get(`/api/catalog/books`)
      .send()
      .expect(httpStatus.OK);

    expect(res.body).to.be.an('array').lengthOf(2);
  });

  it('should return status OK, and array of books.', async () => {
    const authorObject = createAuthorObject();

    const author = await createDefaultAuthor(authorObject);

    const bookObject = createBookObject({
      author: author._id
    });

    await createDefaultBook(bookObject);

    const res = await agent
      .get(`/api/catalog/books`)
      .send()
      .expect(httpStatus.OK);

    expect(res.body).to.be.an('array').lengthOf(3);
  });
});