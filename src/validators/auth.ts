import type { Request, Response, NextFunction } from 'express';
import { sendErrors, ErrorDetail } from '../helpers/responseHelper';
import { check, validationResult } from 'express-validator';


export const validateLogin = [


  check('email')
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('Debe ser un correo válido'),
  check('password')
    .notEmpty().withMessage('La contraseña es obligatoria'),

  (req: Request, res: Response, next: NextFunction): void => {
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
        "Datos de inicio de sesión incorrectos",
        400
      );
      return;
    }
    next();
  },
];
