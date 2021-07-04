function takeOrderSchema(Joi) {
  return Joi.object().keys({
    params: {
      id: Joi.string().trim().required()
    },
    body: {
      date: Joi.date().required()
    }
  });
}

function giveOrderSchema(Joi) {
  return Joi.object().keys({
    params: {
      id: Joi.string().trim().required(),
    }
  });
}

export {
  takeOrderSchema,
  giveOrderSchema
}