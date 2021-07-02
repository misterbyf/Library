export default function middlewarePagination(Model) {
  return async (req, res, next) => {
    try {
      const page = parseInt(req.query.page);

      const limit = parseInt(req.query.limit);

      const start = (page - 1) * limit;

      const end = page * limit;

      const results = {};

      if (end < await Model.countDocuments().exec()) {
        results.next = {
          page: page + 1,
          limit: limit
        }
      }

      if (start > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        }
      }

      results.results = await Model.find().limit(limit).skip(start).exec();

      res.resultOfPagination = results;

      return next()
    } catch (error) {
      return next(error);
    }
  }
}