import Joi from 'joi';

export default function middlewareValidator(schema) {
  return async (req, res, next) => {
    try {
      const newSchema = schema(Joi);

      await newSchema.validateAsync(req, { stripUnknown: true });

      return next();
    } catch (error) {
      return next(error);
    }
  };
}
