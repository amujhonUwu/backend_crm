import type { Request, Response, NextFunction } from 'express';
import { sendErrors, ErrorDetail } from './../helpers/responseHelper';
import { check, validationResult } from 'express-validator';


export const validatePersonRegistration = [


  check('first_name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ max: 25 }).withMessage('El nombre debe tener máximo 25 caracteres'),


  check('middle_name')
    .optional()
    .isLength({ max: 25 }).withMessage('El segundo nombre debe tener máximo 25 caracteres'),


  check('last_name1')
    .notEmpty().withMessage('El primer apellido es obligatorio')
    .isLength({ max: 25 }).withMessage('El primer apellido debe tener máximo 25 caracteres'),


  check('last_name2')
    .notEmpty().withMessage('El segundo apellido es obligatorio')
    .isLength({ max: 25 }).withMessage('El segundo apellido debe tener máximo 100 caracteres'),

  // Validar que, si se envía, la fecha de nacimiento sea una fecha válida (formato ISO 8601)
  check('date_of_birth')
    .optional()
    .isISO8601().withMessage('La fecha de nacimiento debe ser una fecha válida'),


  check('gender') 
    .notEmpty().withMessage('El género es obligatorio')
    .isIn(['Masculino', 'Femenino', 'Otro']).withMessage('Género no permitido'),


  check('phone')
    .optional()
    .custom((value: string, { req }) => {
      const nationality = req.body.nationality;
      if (nationality && (nationality.toLowerCase() === 'ecuatoriano/a')) {
        if (value.length !== 10) {
          throw new Error('El teléfono debe tener exactamente 10 dígitos para usuarios ecuatorianos');
        }
      } else {
        if (value.length > 25) {
          throw new Error('El teléfono no debe tener más de 25 dígitos');
        }
      }
      return true;
    })
    .matches(/^[0-9\-\+\s]*$/).withMessage('El teléfono solo puede contener números, espacios, + o -'),


  check('document_type')
    .notEmpty().withMessage('El tipo de documento es obligatorio')
    .isIn(['Cédula', 'Pasaporte', 'Otro']).withMessage('Tipo de documento no permitido'),


  check('document_number')
    .custom((value: string, { req }) => {
      const nationality = req.body.nationality;
      if (nationality && (nationality.toLowerCase() === 'ecuatoriano/a')) {
        if (value.length !== 10) {
          throw new Error('La cédula debe tener exactamente 10 dígitos para usuarios ecuatorianos');
        }
      } else {
        if (value.length > 25) {
          throw new Error('El número de documento no debe tener más de 25 dígitos');
        }
      }
      return true;
    }),


  check('address')
    .optional()
    .isLength({ max: 255 }).withMessage('La dirección debe tener máximo 255 caracteres'),

    
  check('nationality')
    .isLength({ max: 60 }).withMessage('La nacionalidad debe tener máximo 60 caracteres'),


  check('marital_status')
    .optional()
    .isIn(['Soltero', 'Casado', 'Divorciado', 'Viudo']).withMessage('Estado civil no permitido'),

  // Middleware para recoger y enviar los errores de validación
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors: ErrorDetail[] = errors.array().map(error => ({
        msg: error.msg,
        param: error.type === 'field' ? error.path : '',
        location: error.type === 'field' ? error.location : 'body'
      }));
      
      sendErrors(
        res, 
        formattedErrors,
        "Datos incorrectos registrando a la persona",
        400
      );
    }
    next();
  },
];

