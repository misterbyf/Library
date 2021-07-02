function loginSchema(Joi) {
  return Joi.object().keys({
    body: {
      email: Joi.string().trim().email().required(),
      password: Joi
        .string()
        .trim()
        .min(5)
        .max(16)
        .required()
    }
  });
}

function registerSchema(Joi) {
  return Joi.object().keys({
    body: {
      name: Joi.string().required(),
      email: Joi.string().trim().email().required(),
      password: Joi.string()
        .trim()
        .min(5)
        .max(16)
        .required(),
      role: Joi.string()
    }
  });
}

export {
  loginSchema,
  registerSchema
};
