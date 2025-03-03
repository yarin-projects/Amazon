import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generateCustomError } from '../middleware/errorHandler.js';
import { generateToken } from '../utils.js';

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = password && (await bcrypt.hash(password, 10));
  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user),
    });
  } catch (error) {
    next(generateCustomError(400, error.message || 'Invalid credentials. Please try again'));
  }
};
