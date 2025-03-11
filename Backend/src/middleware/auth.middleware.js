import { generateCustomError } from './error-handler.middleware.js';
import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
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
