// validationMiddleware.js
const { body, validationResult } = require('express-validator');

const validateTaskCreation = [
  body('id').notEmpty().isString(),
  body('title').notEmpty().isString(),
  body('description').notEmpty().isString(),
  body('status').notEmpty().isString(),
];

module.exports = {
  validateTaskCreation,
};