import {
  describe,
  it,
  before
} from 'mocha';
import { expect } from 'chai/index';
import httpStatus from 'http-status-codes';
import faker from 'faker';

import clearCollections from '../../utils/clear.collections';
import { createAuthorObject, createDefaultAuthor } from '../../utils/init.data.author';
import { createDefaultUser, createUserObject, loginUserAgent } from '../../utils/init.data.user';
import { createDefaultBook, createBookObject } from '../../utils/init.data.books';

let agent;

let authorObj;

let defaultAuthor;

describe('GET api/catalog/authors/:pseudonym', function () {
  before(async () => {
    await clearCollections();

    const userObj = createUserObject({ role: 'admin' });

    await createDefaultUser(userObj);

    agent = await loginUserAgent(userObj);

    authorObj = createAuthorObject();

    defaultAuthor = await createDefaultAuthor(authorObj);
  });

  it('should return status NOT_FOUND, because author with same id not found.', async () => {
    await agent
      .get(`/api/catalog/authors/author/${faker.lorem.word()}`)
      .send()
      .expect(httpStatus.NOT_FOUND);
  });

  it('should return status OK, author and array of books.', async () => {
    const bookObj = createBookObject({ author: defaultAuthor._id });

    const defaultBook = await createDefaultBook(bookObj);

    const res = await agent
      .get(`/api/catalog/authors/author/${defaultAuthor.pseudonym}`)
      .send()
      .expect(httpStatus.OK);

    expect(res.body).to.be.an('object');
    expect(res.body).has.own.property('name').eq(defaultAuthor.name);
    expect(res.body).has.own.property('pseudonym').eq(defaultAuthor.pseudonym);
    expect(res.body).has.own.property('hometown').eq(defaultAuthor.hometown);

    expect(res.body.books).to.be.an('array').to.have.lengthOf(1);
    expect(res.body.books[0]).has.own.property('title').eq(defaultBook.title);
    expect(res.body.books[0]).has.own.property('publishedDate');
    expect(JSON.stringify(res.body.books[0].publishedDate)).eq(JSON.stringify(defaultBook.publishedDate));
    expect(res.body.books[0]).has.own.property('pages').eq(defaultBook.pages);
    expect(res.body.books[0]).has.own.property('language').eq(defaultBook.language);
  });
});