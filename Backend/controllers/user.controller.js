import User from '../models/user.model.js';
import { generateCustomError } from '../middleware/error-handler.middleware.js';
import { comparePasswords, generateToken, hashPassword } from '../utils.js';

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user),
    });
  } catch (error) {
    return next(generateCustomError(400, error.message || 'Invalid credentials. Please try again'));
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await comparePasswords(password, user.password))) {
      return next(
        generateCustomError(400, error.message || 'Invalid credentials. Please try again')
      );
    }
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user),
    });
  } catch (error) {
    return next(generateCustomError(400, error.message || 'Invalid credentials. Please try again'));
  }
};
