import httpStatus from 'http-status-codes';

import Order from '../models/Order';
import Book from '../models/Book';

/**
 * POST /api/catalog/order/:id
 * */
async function takeBook(req, res, next) {
  try {
    const { _id: idUser } = req.user;

    const { id } = req.params;

    const { date } = req.body;

    const book = await Book.findById(id);

    if (!book) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({
          message: 'Book with same id not found.'
        })
    }

    const order = new Order({
      book: id,
      user: idUser,
      dueBack: date
    });

    await order.save();

    await Book.updateOne({ _id: id }, { $inc: { quantity: -1 } });

    return res
      .status(httpStatus.CREATED)
      .json(order);
  } catch (error) {
    return next(error);
  }
}

/**
 * DELETE /api/catalog/order/:idOrder/:idBook
 * */
async function giveBook(req, res, next) {
  try {
    const { idBook, idOrder } = req.params;

    const book = Book.findById(idBook);

    if (!book) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({
          message: 'Book with same id not found.'
        })
    }

    const order = Order.findById(idOrder);

    if (!order) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({
          message: 'Order with same id not found.'
        })
    }

    await order.remove();

    await Book.updateOne({ _id: idBook }, { $inc: { quantity: 1 } });

    return res
      .status(httpStatus.NO_CONTENT)
      .json({
        message: 'You have successfully returned the book.'
      });
  } catch (error) {
    return next(error);
  }
}

export {
  takeBook,
  giveBook
}