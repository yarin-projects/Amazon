import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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
