import Product from '../models/Product.js';
import User from '../models/User.js';
import data from '../data.js';
import { generateCustomError } from '../middleware/errorHandler.js';

export const seedData = async (req, res, next) => {
  try {
    await Promise.all([Product.deleteMany({}), User.deleteMany({})]);
    await Promise.all([User.insertMany(data.products), User.insertMany(data.users)]);
    res.send('Products and users were added successfully');
  } catch (error) {
    console.log(error);
    next(generateCustomError(500, 'Faild to seed data'));
  }
};
