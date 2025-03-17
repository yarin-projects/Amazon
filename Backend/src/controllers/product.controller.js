import { generateCustomError } from '../middleware/error-handler.middleware.js';
import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
  const products = await Product.find({});
  return res.send(products);
};

export const getProductByToken = async (req, res, next) => {
  try {
    const product = await Product.findOne({ token: req.params.token });

    if (!product) {
      return next(generateCustomError(404, 'Product not found'));
    }

    return res.send(product);
  } catch (error) {
    return next(generateCustomError(500, `Server Error: ${error.message}`));
  }
};

export const getProductCategories = async (req, res, next) => {
  try {
    const categories = await Product.find().distinct('category');
    if (!categories) {
      return next(generateCustomError(404, 'Categories not found'));
    }
    return res.send(categories);
  } catch (error) {
    return next(generateCustomError(500, `Server Error: ${error.message}`));
  }
};

export const getProductsByQuery = async (req, res, next) => {
  try {
    const { query } = req;
    const pageSize = 10;

    const page = query.page || 1;
    const category = query.category || '';

    const price = query.price || '';
    const minPrice = Number(price.split('-')[0]);
    const maxPrice = Number(price.split('-')[1]);

    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const categoryFilter = category && category !== 'all' ? { category } : {};

    const priceFilter =
      price && price !== 'all' ? { price: { $gte: minPrice, $lte: maxPrice } } : {};

    const ratingFilter =
      rating && rating !== 'all' ? { 'rating.rate': { $gte: Number(rating) } } : {};

    // 1 for ascending, -1 for descending
    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'topRated'
        ? { rating: -1 }
        : { _id: -1 };

    const queryFilter =
      searchQuery && searchQuery !== 'all' ? { title: { $regex: searchQuery, $options: 'i' } } : {};

    const filter = { ...queryFilter, ...categoryFilter, ...ratingFilter, ...priceFilter };

    const products = await Product.find(filter)
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments(filter);

    res.send({ products, countProducts, pages: Math.ceil(countProducts / pageSize) });
  } catch (error) {
    return next(generateCustomError(500, `Server Error: ${error.message}`));
  }
};
