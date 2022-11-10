import { Router } from 'express';

import { ctrlWrapper } from '../../helpers/index';
import * as ctrl from '../../controllers/user/index';

const router = Router();

router.get('/', ctrlWrapper(ctrl.info));
router.patch('/:id', ctrlWrapper(ctrl.edit));
router.get('/get-all', ctrlWrapper(ctrl.getAll));

export default router;
