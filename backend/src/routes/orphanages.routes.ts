import { Router } from "express";
import multer from "multer";

import OrphanagesController from "../controllers/orphanages.contoller";

import uploadConfig from "../config/upload";

const orphanagesRoutes = Router();
const upload = multer(uploadConfig);

const orphanagesController = new OrphanagesController();

orphanagesRoutes.get("/", orphanagesController.index);
orphanagesRoutes.get("/:id", orphanagesController.show);
orphanagesRoutes.post("/", upload.array("images"), orphanagesController.create);

export default orphanagesRoutes;
