import User from '../../models/user.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'incorrect data',
      });
    }

    const { email, password } = req.body;

    const candidate = await User.findOne({ email });
    if (candidate)
      return res
        .status(400)
        .json({ statusCode: 400, message: 'User is exist' });

    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashPassword });
    await user.save();

    res.status(201).json({ statusCode: 201, message: 'User created' });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: 'Internal server error' });
  }
};

export default login;
