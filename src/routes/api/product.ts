import { Router } from 'express';

import { ctrlWrapper } from '../../helpers/index';
import * as ctrl from '../../controllers/product/index';
import * as middleware from '../../middlewares/index';

const router = Router();

router.get('/all-products', ctrlWrapper(ctrl.getAllProducts));
router.get('/:id', ctrlWrapper(ctrl.getProduct));
router.post('/create', middleware.auth, ctrlWrapper(ctrl.createProduct));
router.patch('/edit/:id', middleware.auth, ctrlWrapper(ctrl.editProduct));
router.delete('/delete/:id', middleware.auth, ctrlWrapper(ctrl.removeProduct));

export default router;
