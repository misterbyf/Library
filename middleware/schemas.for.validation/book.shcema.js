function createBookSchema(Joi) {
  return Joi.object().keys({
    params: {
      id: Joi.string().trim().required()
    },
    body: {
      title: Joi.string().trim().required(),
      publishedDate: Joi.date().required(),
      pages: Joi.number().required(),
      language: Joi.string().trim().required(),
      quantity: Joi.number()
    }
  });
}

function updateBookSchema(Joi) {
  return Joi.object().keys({
    params: {
      idAuthor: Joi.string().trim().required(),
      idBook: Joi.string().trim().required()
    },
    body: {
      title: Joi.string().trim(),
      publishedDate: Joi.date(),
      pages: Joi.number(),
      language: Joi.string().trim(),
      quantity: Joi.number()
    }
  });
}

function removeBookSchema(Joi) {
  return Joi.object().keys({
    params: {
      id: Joi.string().trim().required()
    }
  });
}

function getBookSchema(Joi) {
  return Joi.object().keys({
    query: {
      author: Joi.string().trim()
    }
  });
}

export {
  createBookSchema,
  updateBookSchema,
  removeBookSchema,
  getBookSchema
};