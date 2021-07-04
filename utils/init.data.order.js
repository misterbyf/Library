import faker from 'faker';
import mongoose from 'mongoose';

import Order from '../models/Order';
import Book from '../models/Book';

function createOrderObject(data = {}) {
  const order = {
    user: data.user || mongoose.Types.ObjectId(),
    book: data.book || mongoose.Types.ObjectId(),
    dueBack: data.dueBack || faker.date.future(),
  };

  return order;
}

async function createDefaultOrder(data = {}) {
  try {
    const order = new Order(data);

    await order.save();

    await Book.updateOne({ _id: order.book }, { $inc: { quantity: -1 } });

    return order;
  } catch (error) {
    return console.warn(error);
  }
}

export {
  createOrderObject,
  createDefaultOrder
};
