const Joi = require('joi');

// Validation schemas
const userCreateSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(255)
        .required()
        .messages({
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name cannot exceed 255 characters',
            'any.required': 'Name is required'
        }),
    email: Joi.string()
        .email()
        .max(255)
        .required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'string.max': 'Email cannot exceed 255 characters',
            'any.required': 'Email is required'
        })
});

const userUpdateSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(255)
        .messages({
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name cannot exceed 255 characters'
        }),
    email: Joi.string()
        .email()
        .max(255)
        .messages({
            'string.email': 'Please provide a valid email address',
            'string.max': 'Email cannot exceed 255 characters'
        })
}).min(1).messages({
    'object.min': 'At least one field (name or email) must be provided for update'
});

const idSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'ID must be a number',
            'number.integer': 'ID must be an integer',
            'number.positive': 'ID must be a positive number',
            'any.required': 'ID is required'
        })
});

// Validation middleware functions
const validateUserCreate = (req, res, next) => {
    const { error, value } = userCreateSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }))
        });
    }
    
    req.validatedData = value;
    next();
};

const validateUserUpdate = (req, res, next) => {
    const { error, value } = userUpdateSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }))
        });
    }
    
    req.validatedData = value;
    next();
};

const validateId = (req, res, next) => {
    const { error, value } = idSchema.validate({ id: req.params.id });
    
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }))
        });
    }
    
    req.validatedId = value.id;
    next();
};

module.exports = {
    validateUserCreate,
    validateUserUpdate,
    validateId
};
