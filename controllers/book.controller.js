import httpStatus from 'http-status-codes';

import Book from '../models/Book';
import Author from '../models/Author';

/**
 * POST /api/authors/:id/books
 * */
async function createBook(req, res, next) {
  try {
    const { id } = req.params;

    const { title, publishedDate, pages, language, quantity } = req.body;

    const author = await Author.findById(id);

    if (!author) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({
          message: 'Author with same id not found.'
        })
    }

    const findBook = await Book.findOne({ title });

    if (findBook) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({
          message: 'Book with same title already exist.'
        })
    }

    const book = new Book({
      title,
      id,
      publishedDate,
      pages,
      language,
      quantity
    });

    await book.save();

    return res
      .status(httpStatus.CREATED)
      .json(book);
  } catch (error) {
    return next(error);
  }
}


/**
 * POST /api/catalog/authors/:idAuthor/books/:idBook
 * */
async function updateBook(req, res, next) {
  try {
    const { idAuthor, idBook } = req.params;

    const { title, publishedDate, pages, language, quantity } = req.body;

    const author = await Author.findById(idAuthor);

    if (!author) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({
          message: 'Author with same id not found.'
        })
    }

    const book = await Book.findById(idBook);

    if (!book) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({
          message: 'Book with same id not found.'
        })
    }

    Object.assign(book, {
      title,
      idAuthor,
      publishedDate,
      pages,
      language,
      quantity
    });

    await Book.updateOne({ _id: idBook }, {
      $set: book
    });

    const reloadBook = await Book.findById(idBook);

    return res
      .json(reloadBook);
  } catch (error) {
    return next(error);
  }
}


/**
 * DELETE /api/catalog/books/:id
 * */
async function removeBook(req, res, next) {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({
          message: 'Book with same id not found.'
        });
    }

    await book.remove();

    return res
      .status(httpStatus.NO_CONTENT)
      .json({
        message: 'Book has been deleted.'
      });
  } catch (error) {
    return next(error);
  }
}


/**
 * GET /api/catalog/books
 * */
async function getBooks(req, res, next) {
  try {
    const query = { quantity: { $gt: 0 }};

    const { author } = req.query;

    if (author) {
      query.author = author
    }

    const books = await Book.find(query);

    return res
      .json(books);
  } catch (error) {
    return next(error);
  }
}

export {
  createBook,
  updateBook,
  getBooks,
  removeBook
}
