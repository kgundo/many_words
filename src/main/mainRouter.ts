import { Router } from 'express';

import { testsdao } from './tests/tests.dao';
import { testsValidate } from './tests/tests.validator';

export const mainRouter = (router: Router) => {
    router.get('/tests', testsValidate, testsdao.loadAllSync);
};