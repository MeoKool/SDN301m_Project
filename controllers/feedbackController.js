const Feedback = require("../models/Feedback");
const mongoose = require('mongoose');
const feedbackController = {
  // Get all feedback
  getAllFeedback: async (req, res) => {
    try {
      const feedback = await Feedback.find();
      res.json(feedback);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }g
  },

  // Get feedback by ID
  getFeedbackById: async (req, res) => {
    try {
      const feedback = await Feedback.findById(req.params.id);
      if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
      res.json(feedback);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Submit feedback
  submitFeedback: async  (req, res) => {
    const feedback = await new Feedback({
      userId: req.body.userId,
      productId: req.body.productId,
      content: req.body.content,
      rating: req.body.rating
    });

    try {
      const savedFeedback = await feedback.save();
      res.status(201).json(savedFeedback);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Update feedback
  updateFeedback: async (req, res) => {
    try {
      const updatedFeedback = await Feedback.findByIdAndUpdate(
        req.params.id,
        {
          userId: req.body.userId,
          productId: req.body.productId,
          content: req.body.content,
          rating: req.body.rating
        },
        { new: true }
      );

      if (!updatedFeedback) return res.status(404).json({ message: 'Feedback not found' });
      res.json(updatedFeedback);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Delete feedback
  deleteFeedback: async (req, res) => {
    try {
      const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
      if (!deletedFeedback) return res.status(404).json({ message: 'Feedback not found' });
      res.json({ message: 'Feedback deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = feedbackController;
