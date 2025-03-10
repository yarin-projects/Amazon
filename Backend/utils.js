import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { generateCustomError } from './src/middleware/error-handler.middleware.js';

export const generateToken = ({ _id, name, email }) => {
  return jwt.sign({ _id, name, email }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const hashPassword = async password => {
  return password && (await bcrypt.hash(password, 10));
};

export const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const isAuth = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!token) {
      return next(generateCustomError(401, 'Unauthorized, No Token Found'));
    }
    const token = auth.split(' ')[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
      if (err) {
        return next(generateCustomError(401, err.message || 'Unauthorized, Invalid Token'));
      }
      req.user = decodedToken;
      return next();
    });
  } catch (error) {
    return next(generateCustomError(500, error.message || 'Server Error'));
  }
};
