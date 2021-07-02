function takeOrderSchema(Joi) {
  return Joi.object().keys({
    params: {
      id: Joi.string().trim().required()
    },
    body: {
      data: Joi.date().required()
    }
  });
}

function giveOrderSchema(Joi) {
  return Joi.object().keys({
    params: {
      idBook: Joi.string().trim().required(),
      idOrder: Joi.string().trim().required()
    }
  });
}

export {
  takeOrderSchema,
  giveOrderSchema
}