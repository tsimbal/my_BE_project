import { Router } from 'express';

import { ctrlWrapper } from '../../helpers/index';
import * as ctrl from '../../controllers/currency/index';

const router = Router();

router.get('/all-currencies', ctrlWrapper(ctrl.getAllCurrency));

export default router;
