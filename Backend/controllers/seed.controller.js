import Product from '../models/product.model.js';
import User from '../models/user.model.js';
import data from '../data.js';
import { generateCustomError } from '../middleware/error-handler.middleware.js';

export const seedData = async (req, res, next) => {
  try {
    await Promise.all([Product.deleteMany({}), User.deleteMany({})]);
    await Promise.all([Product.insertMany(data.products), User.insertMany(data.users)]);
    return res.send('Products and users were added successfully');
  } catch (error) {
    return next(generateCustomError(500, 'Faild to seed data'));
  }
};
