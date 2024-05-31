const Order = require("../models/Order");

const orderController = {
  // ADD ORDER
  addOrder: async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // GET ALL ORDERS
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find().populate("productID");
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // GET ORDER BY ID
  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // UPDATE ORDER
  updateOrder: async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE ORDER
  deleteOrder: async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // UPDATE STATUS
  updateStatus: async (req, res) => {
    try {
      const updatedStatus = await Order.findByIdAndUpdate(
        req.params.id,
        { $set: { status: req.body.status } },
        { new: true }
      );
      res.status(200).json(updatedStatus);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = orderController;
