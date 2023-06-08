import Joi from "joi";

const BAD_REQUEST = 400; 
const usernameMin = 2;
const usernameMax = 20;

class Validation {
  static productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().integer().required(),
    place: Joi.string().required(),
    stock: Joi.number().integer().required(),
    description: Joi.string(),
  });

  static userSchema = Joi.object({
    username: Joi.string().min(usernameMin).max(usernameMax),
    email: Joi.string().email(),
    password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{6,18}$/),
    districtName: Joi.string(), 
  });

  static validate(schema) {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(BAD_REQUEST).json({ error: error.details[0].message });
      }
      next();
    };
  }
}

export { Validation };