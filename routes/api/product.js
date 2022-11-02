import { Router } from 'express';

import { ctrlWrapper } from '../../helpers/index.js';
import * as ctrl from '../../controllers/product/index.js';

const router = Router();

router.get('/all-products', ctrlWrapper(ctrl.getAllProducts));
router.get('/:id', ctrlWrapper(ctrl.getProduct));
router.post('/create', ctrlWrapper(ctrl.createProduct));
router.patch('/edit/:id', ctrlWrapper(ctrl.editProduct));
router.delete('/delete/:id', ctrlWrapper(ctrl.removeProduct));

export default router;
