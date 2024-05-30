const orderController = require("../controllers/orderController");

const router = require("express").Router();

router.post("/order/createOrder", orderController.addOrder);
router.get("/order/getAll", orderController.getAllOrders);
router.get("/order/getByID/:id", orderController.getOrderById);
router.put("/order/updateByID/:id", orderController.updateOrder);
router.delete("/order/deleteByID/:id", orderController.deleteOrder);
router.put("/order/updateStatus/:id", orderController.updateStatus);

module.exports = router;
