import { Router } from 'express';

import { ctrlWrapper } from '../../helpers/index.js';
import * as ctrl from '../../controllers/auth/index.js';

import { check } from 'express-validator';

const router = Router();

router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'min length 6').isLength({ min: 6 }),
  ],
  ctrlWrapper(ctrl.register)
);

router.post(
  '/login',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Enter password').exists(),
  ],
  ctrlWrapper(ctrl.login)
);
router.post('/refresh', ctrlWrapper(ctrl.refresh));
router.get('/logout', ctrlWrapper(ctrl.logout));
router.get('/refresh', ctrlWrapper(ctrl.refresh));
router.get('/activation/:link', ctrlWrapper(ctrl.activate));
export default router;
