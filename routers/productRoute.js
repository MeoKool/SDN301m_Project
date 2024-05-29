const router = require('express').Router();
const productController = require('../controllers/productController');

// ADD PRODUCT
router.post('/', productController.addProduct);
// GET ALL PRODUCTS
router.get('/', productController.getAllProducts);
// GET PRODUCT BY ID
router.get('/:id', productController.getProductById);
// UPDATE PRODUCT
router.put('/:id', productController.updateProduct);
// DELETE PRODUCT
router.delete('/:id', productController.deleteProduct);

module.exports = router;
