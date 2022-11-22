import { Router } from 'express';

import { ctrlWrapper } from '../../helpers/index';
import * as ctrl from '../../controllers/test/index';

const router = Router();

router.get('/', ctrlWrapper(ctrl.getTest));

export default router;
