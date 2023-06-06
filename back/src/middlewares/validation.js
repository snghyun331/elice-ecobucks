import Joi from "joi";

const productValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().integer().required(),
    place: Joi.string().required(),
    stock: Joi.number().integer().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const userValidation = (req, res, next) => {
  const usernameMin = 2;
  const schema = Joi.object({
    username: Joi.string().required().min(2).max(20),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    guName: Joi.string().required(), 
  });

  const { error } = schema.validate(req.body);
  if (error) {
    throw new Error(error.details[0].message);
  }
  next();
};

export { productValidation, userValidation };