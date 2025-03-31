import { Request, Response } from 'express';
import { sendSuccess, sendErrors } from '../helpers/responseHelper';
import { User } from '../entities/user';
import { Person } from '../entities/person';
import { mysqlDataSource } from '../../app-data-source';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { DeepPartial } from 'typeorm';

export const login = async (req: Request, res: Response) => {
  try {
      const { email, password } = req.body;

      // Buscar usuario por email
      const userRepository = mysqlDataSource.getRepository(User);
      const user = await userRepository.findOne({
          where: { email },
          relations: ['person']
      });

      if (!user) {
          return sendErrors(
              res,
              [{ msg: 'Credenciales inválidas', param: 'email', location: 'body' }],
              "Error de autenticación",
              401
          );
      }

      // Verificar contraseña
      const validPassword = await bcrypt.compare(password, user.password_hash);
      if (!validPassword) {
          return sendErrors(
              res,
              [{ msg: 'Credenciales inválidas', param: 'password', location: 'body' }],
              "Error de autenticación",
              401
          );
      }

      // Generar token JWT
      const token = jwt.sign(
          { 
              email: user.email,
              public_id: user.public_id,
              role: user.role
          },
          process.env.JWT_SECRET || 'tu_secreto',
          { expiresIn: '24h' }
      );

      // Configurar la cookie para almacenar el token de forma segura
      res.cookie('token', token, {
          httpOnly: true, // No accesible vía JavaScript
          secure: process.env.NODE_ENV === 'production', // Solo se envía por HTTPS en producción
          sameSite: 'strict', // Mitiga riesgos de CSRF
          maxAge: 24 * 60 * 60 * 1000 // 24 horas en milisegundos
      });

      sendSuccess(res, { token }, "Inicio de sesión exitoso", 200);
  } catch (error) {
      console.error('Error en login:', error);
      sendErrors(
          res,
          [{ msg: 'Error al procesar el inicio de sesión', param: '', location: 'server' }],
          "Error interno del servidor",
          500
      );
  }
};


export const register = async (req: Request, res: Response) => {
    try {
        const userRepository = mysqlDataSource.getRepository(User);
        const personRepository = mysqlDataSource.getRepository(Person);

        // Verificar si el email ya existe
        const existingUser = await userRepository.findOne({ where: { email: req.body.email } });
        if (existingUser) {
            return sendErrors(
                res,
                [{ msg: 'El correo electrónico ya está registrado', param: 'email', location: 'body' }],
                "Error de registro",
                400
            );
        }

        // Crear la persona
        const person = personRepository.create({
            ...req.body,
            public_id: uuidv4()
        });
        const savedPerson = await personRepository.save(person);

        // Crear el usuario
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = userRepository.create({
            email: req.body.email,
            password_hash: hashedPassword,
            public_id: uuidv4(),
            person: savedPerson,
            role: 'user',
            status: 'active'
        } as DeepPartial<User>);
        const savedUser = await userRepository.save(user) as User;

        // Generar token JWT
        const token = jwt.sign(
            { 
                email: savedUser.email,
                public_id: savedUser.public_id,
                role: savedUser.role
            },
            process.env.JWT_SECRET || 'tu_secreto',
            { expiresIn: '24h' }
        );

        // Enviar respuesta exitosa
        sendSuccess(res, { token }, "Usuario registrado correctamente", 201);
    } catch (error) {
        console.error('Error en registro:', error);
        sendErrors(
            res,
            [{ msg: 'Error al registrar el usuario', param: '', location: 'server' }],
            "Error interno del servidor",
            500
        );
    }
};

export const verifyToken = (req: Request, res: Response) => {
  try {
    // Se espera el token en el header Authorization en formato: Bearer <token>
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return sendErrors(
        res,
        [{ msg: 'No se proporcionó token' }],
        "No autorizado",
        401
      );
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    sendSuccess(res, decoded, "Token válido", 200);
  } catch (error) {
    console.error('Error en verifyToken:', error);
    sendErrors(
      res,
      [{ msg: 'Token inválido o expirado' }],
      "No autorizado",
      401
    );

  }
};
