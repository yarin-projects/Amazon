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
