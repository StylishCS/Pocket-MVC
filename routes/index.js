var express = require('express');
const { createProduct, deleteProduct } = require('../controllers/products.controller');
const { Product } = require('../models/Product');
const { registerController, loginController } = require('../controllers/auth.controller');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1, rating: 1 })
      .skip(4)
      .limit(4);
    const newCollection = await Product.find()
      .sort({ createdAt: -1, rating: 1 })
      .limit(4);

    return res.render('index', { products, newCollection });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).render('error', {
      errorStatus: 500,
      errorMessage: error.message,
      errorDescription: "Something went wrong"
  });
  }
});

router.get("/products", async (req, res) => {
  if(req.query.collection){
    const products = await Product.find({ collection: req.query.collection });
    return res.render("products", { products, title: req.query.collection });
  }
  const products = await Product.find();
  return res.render("products", { products, title: "All Products" });
});

router.post('/product', createProduct);

router.post('/auth/signup', registerController);
router.post('/auth/login', loginController);

module.exports = router;
