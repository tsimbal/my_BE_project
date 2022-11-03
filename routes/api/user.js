import { Router } from 'express';

import { ctrlWrapper } from '../../helpers/index.js';
import * as ctrl from '../../controllers/user/index.js';

const router = Router();

router.get('/', ctrlWrapper(ctrl.info));
router.patch('/:id', ctrlWrapper(ctrl.edit));

export default router;
