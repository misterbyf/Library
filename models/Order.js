import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    book: {
      type: Schema.ObjectId,
      ref: 'Book',
      required: true
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    dueBack: {
      type: Date,
      required: true
    }
  }
);

export default mongoose.model('Order', orderSchema);