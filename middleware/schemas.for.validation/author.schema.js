function createAuthorSchema(Joi) {
  return Joi.object().keys({
    body: {
      name: Joi.string().trim().required(),
      pseudonym: Joi.string().trim().required(),
      hometown: Joi.string().trim().required()
    }
  });
}

function updateAuthorSchema(Joi) {
  return Joi.object().keys({
    params: {
      id: Joi.string().trim().required()
    },
    body: {
      name: Joi.string().trim(),
      pseudonym: Joi.string().trim(),
      hometown: Joi.string().trim()
    }
  });
}

function removeAuthorSchema(Joi) {
  return Joi.object().keys({
    params: {
      id: Joi.string().trim().required()
    }
  });
}

function getAuthorSchema(Joi) {
  return Joi.object().keys({
    params: {
      id: Joi.string().trim().required()
    }
  });
}

export {
  createAuthorSchema,
  updateAuthorSchema,
  removeAuthorSchema,
  getAuthorSchema
};