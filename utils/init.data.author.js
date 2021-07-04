import faker from 'faker';

import Author from '../models/Author';

function createAuthorObject(data = {}) {
  const author = {
    name: data.name || faker.name.firstName(),
    pseudonym: data.pseudonym || faker.lorem.word(),
    hometown: data.hometown || faker.address.city(),
  };

  return author;
}

async function createDefaultAuthor(data = {}) {
  try {
    const author = new Author(data);

    await author.save();

    return author;
  } catch (error) {
    return console.warn(error);
  }
}

export {
  createAuthorObject,
  createDefaultAuthor
};
