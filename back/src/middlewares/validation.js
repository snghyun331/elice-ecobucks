import Joi from "joi";
import { BAD_REQUEST } from "../utils/constants.js";
const USERNAME_MIN = 2, USERNAME_MAX = 20, PWD_MIN = 6, PWD_MAX = 18;

class Validation {
  static blogpostSchema = Joi.object({
    topic: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
  })

  static blogpostUpdateSchema = Joi.object({
    topic: Joi.string(),
    title: Joi.string(),
    content: Joi.string(),
  })
  
  static blogcommentSchema = Joi.object({
    comment: Joi.string().required()
  })

  static blogcommentUpdateSchema = Joi.object({
    comment: Joi.string()
  })

  static productSchema = Joi.object({
    name: Joi.string().required().not(''),
    price: Joi.number().integer().required(),
    place: Joi.string().required(),
    stock: Joi.number().integer().required(),
    description: Joi.string().required(),
    location: Joi.object({
      x: Joi.number().required(),
      y: Joi.number().required()
    }),
    imageId: Joi.string().required()
  });

  static productUpdateSchema = Joi.object({
    name: Joi.string(),
    price: Joi.number().integer(),
    place: Joi.string(),
    stock: Joi.number().integer(),
    description: Joi.string(),
    imageId: Joi.string()
  })

  static imageCreateSchema = Joi.object({
    object: Joi.string(),
  });

  static imageUpdateSchema = Joi.object({
    object: Joi.string(),
  });

  static challengeCreateSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    icon: Joi.string().required(),
    weeks: Joi.string().required(),
  });

  static challengeUpdateSchema = Joi.object({
    title: Joi.string(),
    content: Joi.string(),
    icon: Joi.string(),
    weeks: Joi.string()
  });

  static challengeCommentCreateSchema = Joi.object({
    content: Joi.string().required(),
  });

  static challengeCommentUpdateSchema = Joi.object({ 
    content: Joi.string().required(),
  });

  static participationCreateSchema = Joi.object({
    imageId: Joi.string().required(),
  });

  static participationUpdateSchema = Joi.object({
    imageId: Joi.string().required(),
  });

  static userSchema = Joi.object({
    userName: Joi.string().min(USERNAME_MIN).max(USERNAME_MAX).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().regex(new RegExp(`^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()])[a-zA-Z\\d!@#$%^&*()]{${PWD_MIN},${PWD_MAX}}$`)),
    districtName: Joi.string().required(), 
  });

  static userUpdateSchema = Joi.object({
    userName: Joi.string().min(USERNAME_MIN).max(USERNAME_MAX).pattern(/^(?=.*[가-힣a-zA-Z])[가-힣a-zA-Z]+$/),
    password: Joi.string().regex(new RegExp(`^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()])[a-zA-Z\\d!@#$%^&*()]{${PWD_MIN},${PWD_MAX}}$`)),
    districtName: Joi.string(), 
  }).or('userName', 'password', 'districtName');

  static validate(schema) {
    return (req, res, next) => {    
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(BAD_REQUEST)
                  .json({ "유효성 검사 오류": error.details[0].message, errorCode:"BAD_REQUEST" });
      }
      next();
    };
  }
}

export { Validation };