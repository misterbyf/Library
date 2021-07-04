import mongoose, { Schema } from 'mongoose';

const authorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  pseudonym: {
    type: String,
    unique: true,
    required: true
  },
  hometown: {
    type: String,
    required: true
  }
});

authorSchema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'author'
});

authorSchema.set('toObject', {
  virtuals: true
});

authorSchema.set('toJSON', {
  virtuals: true
});

export default mongoose.model('Author', authorSchema);