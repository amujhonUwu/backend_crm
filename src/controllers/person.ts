import type { Request, Response } from "express";
import { sendSuccess, sendErrors } from "../helpers/responseHelper";
import { Person } from "../entities/person";
import { mysqlDataSource } from "../../app-data-source";
import { v4 as uuidv4 } from 'uuid';


export const getPersonSummary = async (req: Request, res: Response) => {
    try {
        const persons = await mysqlDataSource.getRepository(Person).find({
            select: ["public_id", "last_name1", "last_name2", "first_name", "middle_name", "document_number"]
        });
        sendSuccess(res, persons, "Personas obtenidas correctamente", 200);
    }
    catch (error) {
        console.error('Error al obtener personas:', error);
        sendErrors(res, [{ msg: 'Error al obtener personas', param: '', location: 'server' }], "Error interno del servidor", 500);
    }
}

export const getPersons = async (req: Request, res: Response) => {
    try {
        const persons = await mysqlDataSource.getRepository(Person).find();
        sendSuccess(res, persons, "Personas obtenidas correctamente", 200);
    } catch (error) {
        console.error('Error al obtener personas:', error);
    }
}

export const getPersonById = async (req: Request, res: Response) => {
    try {
        const { public_id } = req.params;
        const person = await mysqlDataSource.getRepository(Person).findOneBy({ public_id });
        if (!person) {
            sendErrors(res, [{ msg: 'Persona no encontrada', param: '', location: 'server' }], "Persona no encontrada", 404);
            return;
        }
        sendSuccess(res, person, "Persona encontrada correctamente", 200);
    } catch (error) {
        console.error('Error al obtener persona por ID:', error);
        sendErrors(res, [{ msg: 'Error al obtener la persona por ID en la base de datos', param: '', location: 'server' }], "Error interno del servidor", 500);
    }
}  

export const createPerson = async (req: Request, res: Response) => {
    try {
      const personRepository = mysqlDataSource.getRepository(Person);
      const person = personRepository.create({
        ...req.body,
        public_id: uuidv4(),
      });
      const savedPerson = await personRepository.save(person);
      sendSuccess(res, savedPerson, "Persona registrada correctamente", 201);
    } catch (error) {
      console.error('Error al registrar persona:', error);
      sendErrors(
        res,
        [{ msg: 'Error al registrar la persona en la base de datos', param: '', location: 'server' }],
        "Error interno del servidor",
        500
      );
    }
  };  

export const deletePerson = async (req: Request, res: Response) => {
    try {
        const { public_id } = req.params;
        const person = await mysqlDataSource.getRepository(Person).findOneBy({ public_id });
        if (!person) {
            sendErrors(res, [{ msg: 'Persona no encontrada', param: '', location: 'server' }], "Persona no encontrada", 404);
            return;
        }
        await mysqlDataSource.getRepository(Person).remove(person);
        sendSuccess(res, null, "Persona eliminada correctamente", 200);
    } catch (error) {
        console.error('Error al eliminar persona:', error);
        sendErrors(res, [{ msg: 'Error al eliminar la persona en la base de datos', param: '', location: 'server' }], "Error interno del servidor", 500);
    }
}   

export const updatePerson = async (req: Request, res: Response) => {
    try {
      const { public_id } = req.params;
      const personRepository = mysqlDataSource.getRepository(Person);
      const person = await personRepository.findOneBy({ public_id });
      if (!person) {
        sendErrors(
          res,
          [{ msg: 'Persona no encontrada', param: '', location: 'server' }],
          "Persona no encontrada",
          404
        );
        return;
      }
      
      // Fusiona los datos existentes con los nuevos de req.body
      personRepository.merge(person, req.body);
      const updatedPerson = await personRepository.save(person);
      sendSuccess(res, updatedPerson, "Persona actualizada correctamente", 200);
    } catch (error) {
      console.error('Error al actualizar persona:', error);
      sendErrors(
        res,
        [{ msg: 'Error al actualizar la persona en la base de datos', param: '', location: 'server' }],
        "Error interno del servidor",
        500
      );
    }
  };
  
 
