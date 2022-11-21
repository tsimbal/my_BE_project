import { check } from 'express-validator';

const validators = {
  register: [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'min length 6').isLength({ min: 6 }),
  ],
  login: [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Enter password').exists(),
  ],
};

export default validators;
