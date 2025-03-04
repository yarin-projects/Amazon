import jwt from 'jsonwebtoken';

export const generateToken = ({ _id, name, email }) => {
  return jwt.sign({ _id, name, email }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
