import { Request, Response } from "express";
import { getManager, getConnection } from "typeorm";
import { Events } from "../../models/Events";


const eventList = async (req: Request, res: Response) => {
  const entityManager = getManager()
  let data = await entityManager.find(Events);
  res.json({
    data: data
  })
}

const eventSingleList = async (req: Request, res: Response) => {
  const usersRepository = getConnection().getRepository(Events);
  let id = parseInt(req.params['id']);
  const entityManager = getManager()
  let data = await usersRepository.findOne({ where: { id: id } });
  res.json({
    data: data
  })
}


export {
  eventList,
  eventSingleList
}