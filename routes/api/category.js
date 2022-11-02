import { Router } from 'express';

import { ctrlWrapper } from '../../helpers/index.js';
import * as ctrl from '../../controllers/category/index.js';

const router = Router();

router.get('/all-categories', ctrlWrapper(ctrl.getAll));
router.get('/:id', ctrlWrapper(ctrl.getById));
router.post('/create', ctrlWrapper(ctrl.create));
router.patch('/edit/:id', ctrlWrapper(ctrl.edit));
router.delete('/delete/:id', ctrlWrapper(ctrl.remove));

export default router;
