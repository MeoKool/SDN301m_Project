const router = require("express").Router();
const productController = require("../controllers/productController");

// ADD PRODUCT
router.post("/product/createProduct", productController.addProduct);
// GET ALL PRODUCTS
router.get("/product/getAll", productController.getAllProducts);
// GET PRODUCT BY ID
router.get("/product/getByID/:id", productController.getProductById);
// UPDATE PRODUCT
router.put("product/updateByID/:id", productController.updateProduct);
// DELETE PRODUCT
router.delete("product/deleteByID/:id", productController.deleteProduct);

module.exports = router;
