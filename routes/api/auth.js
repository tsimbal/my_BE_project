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

// router.post("/logout", auth, async (req, res) => {
//   try {
//     if (req.user) req.user = {};

//     res.status(200).json({ statusCode: 200, message: "Success logout" });
//   } catch (error) {
//     res.status(500).json({ statusCode: 500, message: "Internal server error" });
//   }
// });

export default router;
