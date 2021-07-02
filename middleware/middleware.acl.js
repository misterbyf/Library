import httpStatus from 'http-status-codes'

export default function middlewareACL(...roles) {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }

    return res
      .status(httpStatus.FORBIDDEN)
      .json({
        message: 'You have not permission to access.'
      });
  };
}
