import { Router } from 'express';

import { mainRouter } from './main/mainRouter';

const router = Router();
mainRouter(router);

export { router };