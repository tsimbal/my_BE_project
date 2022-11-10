import { Router } from 'express';

import { ctrlWrapper } from '../../helpers/index';
import * as ctrl from '../../controllers/contacts/index';

import { isValidId } from '../../middlewares/index';

const router = Router();

router.get('/:id', isValidId, ctrlWrapper(ctrl.getById));
router.get('/', ctrlWrapper(ctrl.getAll));
router.post('/', ctrlWrapper(ctrl.add));
router.put('/:id', isValidId, ctrlWrapper(ctrl.updateById));
router.delete('/:id', isValidId, ctrlWrapper(ctrl.removeById));
router.patch('/:id/favorite', isValidId, ctrlWrapper(ctrl.updateFavorite));

export default router;
