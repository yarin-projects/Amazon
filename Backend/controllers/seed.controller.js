import Product from '../models/Product.js';
import User from '../models/User.js';
import data from '../data.js';
import { generateCustomError } from '../middleware/error-handler.js';

export const seedData = async (req, res, next) => {
  try {
    await Promise.all([Product.deleteMany({}), User.deleteMany({})]);
    await Promise.all([Product.insertMany(data.products), User.insertMany(data.users)]);
    res.send('Products and users were added successfully');
  } catch (error) {
    console.log(error);
    console.log(error.message);
    next(generateCustomError(500, 'Faild to seed data'));
  }
};
