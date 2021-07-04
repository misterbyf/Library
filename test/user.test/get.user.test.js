import {
  describe,
  it,
  before
} from 'mocha';
import { expect } from 'chai/index';
import httpStatus from 'http-status-codes';

import clearCollections from '../../utils/clear.collections';
import { createAuthorObject, createDefaultAuthor } from '../../utils/init.data.author';
import { createDefaultBook, createBookObject } from '../../utils/init.data.books';
import { createDefaultUser, createUserObject, loginUserAgent } from '../../utils/init.data.user';
import { createDefaultOrder, createOrderObject } from "../../utils/init.data.order";

let agent;

let authorObj;

let bookObj;

let orderObj;

let defaultUser;

let defaultAuthor;

let defaultBook;

let defaultOrder;

describe('GET /api/user', function () {
  before(async () => {
    await clearCollections();

    const userObj = createUserObject({ role: 'admin' });

    defaultUser = await createDefaultUser(userObj);

    agent = await loginUserAgent(userObj);

    authorObj = createAuthorObject();

    defaultAuthor = await createDefaultAuthor(authorObj);

    bookObj = createBookObject({ author: defaultAuthor._id });

    defaultBook = await createDefaultBook(bookObj);

    orderObj = createOrderObject({
      user: defaultUser._id,
      book: defaultBook._id
    });

    defaultOrder = await createDefaultOrder(orderObj);
  });

  it('should return status OK and user object with array of book.', async () => {
    const res = await agent
      .get(`/api/user`)
      .send()
      .expect(httpStatus.OK);

    expect(res.body[0]).to.be.an('object');
    expect(res.body[0]).has.own.property('name').eq(defaultUser.name);
    expect(res.body[0]).has.own.property('email').eq(defaultUser.email);
    expect(res.body[0]).has.own.property('password').eq(defaultUser.password);

    expect(JSON.stringify(res.body[0].books[0].book)).eq(JSON.stringify(defaultBook._id));
  });
});
