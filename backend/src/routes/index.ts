import { Router } from 'express';
import multer from 'multer';

import orphanagesRoutes from './orphanages.routes';

const routes = Router();

routes.use('/orphanages', orphanagesRoutes);

export default routes;