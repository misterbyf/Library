import mongoose, { Schema } from 'mongoose';

const bookSchema= new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  },
  publishedDate: {
    type: Date,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 0
  }
});

export default mongoose.model('Book', bookSchema);