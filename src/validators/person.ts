// validations/userRegistrationValidator.js
import type { Request, Response, NextFunction } from 'express';
const { check, validationResult } = require('express-validator');


const validateUserRegistration = [
  // Validar que el primer nombre sea obligatorio y no supere 100 caracteres
  check('first_name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ max: 100 }).withMessage('El nombre debe tener máximo 100 caracteres'),

  // Validar que el segundo nombre sea opcional y, si se envía, no supere 100 caracteres
  check('middle_name')
    .optional()
    .isLength({ max: 100 }).withMessage('El segundo nombre debe tener máximo 100 caracteres'),

  // Validar que el primer apellido sea obligatorio y no supere 100 caracteres
  check('last_name1')
    .notEmpty().withMessage('El primer apellido es obligatorio')
    .isLength({ max: 100 }).withMessage('El primer apellido debe tener máximo 100 caracteres'),

  // Validar que el segundo apellido sea obligatorio y no supere 100 caracteres
  check('last_name2')
    .notEmpty().withMessage('El segundo apellido es obligatorio')
    .isLength({ max: 100 }).withMessage('El segundo apellido debe tener máximo 100 caracteres'),

  // Validar que, si se envía, la fecha de nacimiento sea una fecha válida (formato ISO 8601)
  check('date_of_birth')
    .optional()
    .isISO8601().withMessage('La fecha de nacimiento debe ser una fecha válida'),

  // Validar que el género sea obligatorio y uno de los valores permitidos
  check('gender')
    .notEmpty().withMessage('El género es obligatorio')
    .isIn(['Masculino', 'Femenino', 'Otro']).withMessage('Género no permitido'),

  // Validar que el teléfono, si se envía, no supere 20 caracteres y tenga un formato aceptable
  check('phone')
    .optional()
    .isLength({ max: 20 }).withMessage('El teléfono debe tener máximo 20 caracteres')
    .matches(/^[0-9\-\+\s]*$/).withMessage('El teléfono solo puede contener números, espacios, + o -'),

  // Validar que el tipo de documento sea obligatorio y uno de los permitidos
  check('document_type')
    .notEmpty().withMessage('El tipo de documento es obligatorio')
    .isIn(['DNI', 'Pasaporte', 'Otro']).withMessage('Tipo de documento no permitido'),

  // Validar que el número de documento, si se envía, no supere 50 caracteres
  check('document_number')
    .optional()
    .isLength(10).withMessage('El número de documento debe tener 10 caracteres'),

  // Validar que la dirección, si se envía, no supere 255 caracteres
  check('address')
    .optional()
    .isLength({ max: 255 }).withMessage('La dirección debe tener máximo 255 caracteres'),

  // Validar que la nacionalidad, si se envía, no supere 100 caracteres
  check('nationality')
    .optional()
    .isLength({ max: 100 }).withMessage('La nacionalidad debe tener máximo 100 caracteres'),

  // Validar que el estado civil, si se envía, sea uno de los permitidos
  check('marital_status')
    .optional()
    .isIn(['Soltero', 'Casado', 'Divorciado', 'Viudo']).withMessage('Estado civil no permitido'),

  // Middleware para recoger y enviar los errores de validación
  (req: Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Puedes personalizar el formato del error si lo deseas
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateUserRegistration };
