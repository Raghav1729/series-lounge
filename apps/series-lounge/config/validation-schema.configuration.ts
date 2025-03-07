import * as Joi from 'joi';
import { EnvNamesEnums } from './enums/env-names.enums';

export const validationSchemaConfiguration = Joi.object({
  NODE_ENV: Joi.string().valid(
    EnvNamesEnums.DEVELOPMENT,
    EnvNamesEnums.PRODUCTION,
    EnvNamesEnums.TEST,
  ),
}).options({
  abortEarly: false,
  messages: {
    'any.required': 'The {{#label}} environment variable is required.',
    'string.base': 'The {{#label}} environment variable must be a string.',
    'string.min':
      'The {{#label}} environment variable must be at least {{#limit}} characters long.',
    'string.max':
      'The {{#label}} environment variable must be at most {{#limit}} characters long.',
    'number.base': 'The {{#label}} environment variable must be a number.',
    'number.default':
      'Invalid value provided for the {{#label}} environment variable.',
    'string.uri': 'The {{#label}} environment variable must be a valid URI.',
    'string.email':
      'The {{#label}} environment variable must be a valid email address.',
    'number.min':
      'The {{#label}} environment variable must be at least {{#limit}}.',
    'number.max':
      'The {{#label}} environment variable must be at most {{#limit}}.',
    // Add more custom messages as needed
  },
});
