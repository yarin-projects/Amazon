import Product from '../models/Product';
import User from '../models/User';
import data from '../data';
import { generateCustomError } from '../middleware/errorHandler';

export const seedData = async (req, res, send) => {
   try {
      await Promise.all([Product.deleteMany({}), User.deleteMany({})]);
      await Promise.all([User.insertMany(data.products), User.insertMany(data.users)]);
      req.send('Products and users were added successfully');
   } catch (error) {
      console.log(error);
      next(generateCustomError(500, 'Faild to seed data'));
   }
};
