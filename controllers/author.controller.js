import httpStatus from 'http-status-codes';

import Author from '../models/Author';

/**
 * POST /api/catalog/authors
 * */
async function createAuthor(req, res, next) {
  try {
    const { name, pseudonym, hometown } = req.body;

    const candidate = await Author.findOne({ pseudonym });

    if (candidate) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({
          message: 'Author with same pseudonym already exist.'
        })
    }

    const author = new Author({
      name,
      pseudonym,
      hometown
    });

    await author.save();

    return res
      .status(httpStatus.CREATED)
      .json(author);
  } catch (error) {
    return next(error);
  }
}

/**
 * POST /api/catalog/authors/:id
 * */
async function updateAuthor(req, res, next) {
  try {
    const { id } = req.params;

    const { name, pseudonym, hometown } = req.body;

    const author = await Author.findById(id);

    if (!author) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({
          message: 'Author with same id not found.'
        });
    }

    Object.assign(author, { name, pseudonym, hometown });

    await Author.updateOne({ _id: id }, {
      $set: author
    });

    const reloadAuthor = await Author.findById(id);

    return res
      .json(reloadAuthor);
  } catch (error) {
    return next(error)
  }
}

/**
 * DELETE /api/catalog/authors/:id
 * */
async function removeAuthor(req, res, next) {
  try {
    const { id } = req.params;

    const author = await Author.findById(id);

    if (!author) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({
          message: 'Author with same id not found.'
        });
    }

    await author.remove();

    return res
      .status(httpStatus.NO_CONTENT)
      .json({
        message: 'Author has been deleted.'
      });
  } catch (error) {
    return next(error);
  }
}


/**
 * GET /api/catalog/authors
 * */
async function getAuthors(req, res, next) {
  try {
    const authors = res.resultOfPagination.results;

    return res
      .json(authors);
  } catch (error) {
    return next(error);
  }
}

/**
 * GET /api/catalog/authors/:id
 * */
async function getAuthor(req, res, next) {
  try {
    const { id } = req.params;

    const author = await Author.findById(id).populate('books');

    if (!author) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({
          message: 'Author not found.'
        });
    }

    return res
      .json(author);
  } catch (error) {
    return next(error);
  }
}

export {
  createAuthor,
  updateAuthor,
  removeAuthor,
  getAuthors,
  getAuthor
}