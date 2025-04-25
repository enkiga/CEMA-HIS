// Import required modules
const Joi = require("joi"); // Import Joi for validation

// This registration schema is used to validate the data for user registration
exports.registrationSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string()
    .email()
    .required()
    .min(6)
    .max(60)
    .email({
      tlds: { allow: ["com", "net"] },
    }),
  password: Joi.string()
    .required()
    .min(8)
    .max(30)
    .pattern(
      new RegExp("^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};'\":\\\\|,.<>/?]).+$")
    ),
});

exports.loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .min(6)
    .max(60)
    .email({
      tlds: { allow: ["com", "net"] },
    }),
  password: Joi.string().required().min(8).max(30),
});

exports.programCreationSchema = Joi.object({
  name: Joi.string().required().min(3),
  description: Joi.string().required().min(10),
});

exports.clientCreationSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string()
    .email()
    .required()
    .min(6)
    .max(60)
    .email({
      tlds: { allow: ["com", "net"] },
    }),
});
