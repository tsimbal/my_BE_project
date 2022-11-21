import { Router } from 'express';

import { ctrlWrapper } from '../../helpers/index';
import * as ctrl from '../../controllers/auth/index';
import * as helpers from '../../helpers/index';

const router = Router();

router.post(
  '/register',
  helpers.validators.register,
  ctrlWrapper(ctrl.register)
);
router.post('/login', helpers.validators.login, ctrlWrapper(ctrl.login));
router.get('/refresh', ctrlWrapper(ctrl.refresh));
router.get('/logout', ctrlWrapper(ctrl.logout));
router.get('/refresh', ctrlWrapper(ctrl.refresh));
router.get('/activation/:link', ctrlWrapper(ctrl.activate));

export default router;
