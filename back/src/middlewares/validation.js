import Joi from "joi";

const BAD_REQUEST = 400; 
const usernameMin = 2;
const usernameMax = 20;

const productValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().integer().required(),
    place: Joi.string().required(),
    stock: Joi.number().integer().required(),
    description: Joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(BAD_REQUEST).json({ error: error.details[0].message });
  }
  next();
};

const userValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required().min(usernameMin).max(usernameMax),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    districtName: Joi.string().required(), 
  });

  const { error } = schema.validate(req.body);
  if (error) {
    throw new Error(error.details[0].message);
  }
  next();
};

export { productValidation, userValidation };