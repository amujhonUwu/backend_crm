import type { Request, Response, NextFunction } from 'express';
import { sendErrors, ErrorDetail } from './../helpers/responseHelper';
import { check, validationResult } from 'express-validator';


export const validateUserRegistration = [

  
  check('email')
    .notEmpty().withMessage('El correo electrónico es obligatorio')
    .isEmail().withMessage('El correo electrónico debe ser válido')
    .isLength({ max: 80 }).withMessage('El correo electrónico debe tener máximo 80 caracteres'),

  // Suponiendo que el formulario envía "password" en texto plano para luego hashearla
  check('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    .isLength({ max: 64 }).withMessage('La contraseña debe tener máximo 64 caracteres'),
  
  // Validación opcional para username
  check('username')
    .optional()
    .isLength({ max: 25 }).withMessage('El nombre de usuario debe tener máximo 25 caracteres'),

  // Si se necesita confirmar la contraseña, se puede agregar una validación para "confirm_password"
  check('confirm_password')
    .optional()
    .custom((value: string, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Las contraseñas no coinciden');
      }
      return true;
    }),

  // Middleware final para recoger los errores
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
        "Datos incorrectos registrando al usuario",
        400
      );
    }
    next();
  },
];
