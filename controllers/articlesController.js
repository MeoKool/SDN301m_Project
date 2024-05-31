const Articles = require("../models/Articles");
const mongoose = require("mongoose");

const articlesController = {
  // Get all articles
  getAllArticles: async (req, res) => {
    try {
      const articles = await Articles.find();
      res.json(articles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Get article by ID
  getArticleById: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid article ID" });
    }

    try {
      const article = await Articles.findById(id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json(article);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Add article
  addArticle: async (req, res) => {
    const article = new Articles({
      articlesID: req.body.articlesID,
      userID: req.body.userID,
      title: req.body.title,
      content: req.body.content,
      publishDate: req.body.publishDate,
    });

    try {
      const savedArticle = await article.save();
      res.status(201).json(savedArticle);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Update article
  updateArticle: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid article ID" });
    }

    try {
      const updatedArticle = await Articles.findByIdAndUpdate(
        id,
        {
          articlesID: req.body.articlesID,
          userID: req.body.userID,
          title: req.body.title,
          content: req.body.content,
          publishDate: req.body.publishDate,
        },
        { new: true }
      );

      if (!updatedArticle) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json(updatedArticle);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  // Delete article
  deleteArticle: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid article ID" });
    }

    try {
      const deletedArticle = await Articles.findByIdAndDelete(id);
      if (!deletedArticle) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json({ message: "Article deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = articlesController;
