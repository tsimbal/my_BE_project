import { Router } from 'express';

import { ctrlWrapper } from '../../helpers/index.js';
import * as ctrl from '../../controllers/category/index.js';

const router = Router();

router.get('/all-category', ctrlWrapper(ctrl.getAllCategories));
router.get('/:id', ctrlWrapper(ctrl.getCategory));
router.post('/create', ctrlWrapper(ctrl.createCategory));
router.patch('/edit/:id', ctrlWrapper(ctrl.editCategory));
router.delete('/delete/:id', ctrlWrapper(ctrl.removeCategory));

export default router;
