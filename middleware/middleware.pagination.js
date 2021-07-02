function middlewarePaginate(Model) {
  return async (req, res, next) => {
    try {
      const page = parseInt(req.query.page);

      const limit = parseInt(req.query.limit);

      const startIndex = (page - 1) * limit;

      const endIndex = page * limit;

      const results = {};

      if (endIndex < await Model.countDocuments().exec()) {
        results.next = {
          page: page + 1,
          limit: limit
        }
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        }
      }

      results.results = await Model.find().limit(limit).skip(startIndex).exec();

      res.paginatedResults = results;
      return next()
    } catch (error) {
      return next(error);
    }
  }
}