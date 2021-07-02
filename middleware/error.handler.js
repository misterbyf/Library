import httpStatus from 'http-status-codes';

export default function errorHandler(err, req, res, next) {
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: err.message ? err.message : err
  });
}
