import Joi from 'joi';

export const loginSchema = Joi.object().keys({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(6).max(12).required(),
});

export const registerSchema = Joi.object().keys({
  name: Joi.string().trim().min(2).max(24).required(),
  username: Joi.string().trim().min(2).max(24).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(6).max(12).required(),
});
