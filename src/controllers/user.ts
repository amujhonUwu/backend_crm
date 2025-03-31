import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { mysqlDataSource } from '../../app-data-source';
import { User } from '../entities/user'
import { sendSuccess, sendErrors } from '../helpers/responseHelper';


export const createUser = async (req: Request, res: Response) => {
  try {
    const userRepository = mysqlDataSource.getRepository(User);

    const newUser = userRepository.create({
      ...req.body,
      public_id: uuidv4(),
    });

    const savedUser = await userRepository.save(newUser);
    sendSuccess(res, savedUser, "Usuario creado correctamente", 201);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    sendErrors(
      res,
      [{ msg: 'Error al crear el usuario en la base de datos', param: '', location: 'server' }],
      "Error interno del servidor",
      500
    );
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { public_id } = req.params;
    const userRepository = mysqlDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ public_id });

    if (!user) {
      sendErrors(
        res,
        [{ msg: 'Usuario no encontrado', param: '', location: 'server' }],
        "Usuario no encontrado",
        404
      );
      return;
    }

    userRepository.merge(user, req.body);
    const updatedUser = await userRepository.save(user);
    sendSuccess(res, updatedUser, "Usuario actualizado correctamente", 200);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    sendErrors(
      res,
      [{ msg: 'Error al actualizar el usuario en la base de datos', param: '', location: 'server' }],
      "Error interno del servidor",
      500
    );
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { public_id } = req.params;
    const userRepository = mysqlDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { public_id },
      relations: ['person'] // Incluye los datos relacionados de Person, si es necesario
    });

    if (!user) {
      sendErrors(
        res,
        [{ msg: 'Usuario no encontrado', param: '', location: 'server' }],
        "Usuario no encontrado",
        404
      );
      return;
    }

    sendSuccess(res, user, "Usuario obtenido correctamente", 200);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    sendErrors(
      res,
      [{ msg: 'Error al obtener el usuario de la base de datos', param: '', location: 'server' }],
      "Error interno del servidor",
      500
    );
  }
};

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
  try {
    const userRepository = mysqlDataSource.getRepository(User);
    const users = await userRepository.find({
      relations: ['person'] // Incluye datos de Person si se desea
    });
    sendSuccess(res, users, "Usuarios obtenidos correctamente", 200);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    sendErrors(
      res,
      [{ msg: 'Error al obtener los usuarios de la base de datos', param: '', location: 'server' }],
      "Error interno del servidor",
      500
    );
  }
};

// Eliminar usuario
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { public_id } = req.params;
    const userRepository = mysqlDataSource.getRepository(User);
    const result = await userRepository.delete({ public_id });

    if (result.affected === 0) {
      sendErrors(
        res,
        [{ msg: 'Usuario no encontrado', param: '', location: 'server' }],
        "Usuario no encontrado",
        404
      );
      return;
    }

    sendSuccess(res, null, "Usuario eliminado correctamente", 200);
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    sendErrors(
      res,
      [{ msg: 'Error al eliminar el usuario de la base de datos', param: '', location: 'server' }],
      "Error interno del servidor",
      500
    );
  }
};
