import Joi from "joi";
import { BAD_REQUEST } from "../utils/constants.js";
const USERNAME_MIN = 2, USERNAME_MAX = 20, PWD_MIN = 6, PWD_MAX = 18;

class Validation {
  static productSchema = Joi.object({
    name: Joi.string(),
    price: Joi.number().integer(),
    place: Joi.string(),
    stock: Joi.number().integer(),
    description: Joi.string(),
  });

  static userSchema = Joi.object({
    username: Joi.string().min(USERNAME_MIN).max(USERNAME_MAX),
    email: Joi.string().email(),
    password: Joi.string().regex(new RegExp(`^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()])[a-zA-Z\\d!@#$%^&*()]{${PWD_MIN},${PWD_MAX}}$`)),
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