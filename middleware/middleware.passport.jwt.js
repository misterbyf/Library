import passport from 'passport';
import httpStatus from 'http-status-codes';

export default function middlewarePassportJwt(req, res, next) {
  return passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'You are not authorize.'
      });
    }

    req.user = user;

    return next();
  })(req, res, next);
}
