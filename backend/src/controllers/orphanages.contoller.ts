import { getRepository } from "typeorm";
import { Request, Response } from "express";
import * as Yup from 'yup';

import Orphanage from "../models/orphanage.model";

import orphanageView from '../views/orphanages.view';

export default class OrphanagesController {
  async index(_: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find();

    return response.json(orphanageView.renderMany(orphanages));
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id);

    return response.json(orphanageView.render(orphanage));
  }

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const images = request.files as Express.Multer.File[];
    const formattedImages = images.map(image => {
      return {
        path: image.filename
      }
    })

    const orphanagesRepository = getRepository(Orphanage);

    const data = {
      about,
      instructions,
      latitude,
      longitude,
      name,
      open_on_weekends: open_on_weekends === 'true',
      opening_hours,
      images: formattedImages
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required()
      }))
    })

    await schema.validate(data, {
      abortEarly: false
    });

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return response.json(orphanage);
  }
}
