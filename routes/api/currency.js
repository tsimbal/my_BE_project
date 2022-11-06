import { Router } from 'express';

import { ctrlWrapper } from '../../helpers/index.js';
import * as ctrl from '../../controllers/currency/index.js';

const router = Router();

router.get('/all-currencies', ctrlWrapper(ctrl.getAllCurrency));

export default router;
