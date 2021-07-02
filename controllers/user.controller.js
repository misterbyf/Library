import User from '../models/User';

/**
 * GET /api/user
 * */
async function getUser(req, res, next) {
  try {
    const { _id } = req.user;

    const order = await User.find({ _id }).populate('books');

    return res
      .json(order);
  } catch (error) {
    return next(error);
  }
}

export {
  getUser
}