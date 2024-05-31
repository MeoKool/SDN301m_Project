const express = require("express");
const articlesController = require("../controllers/articlesController");
const router = express.Router();

router.get("/getAll", articlesController.getAllArticles);
router.get("/getById/:id", articlesController.getArticleById);
router.post("/addArticle", articlesController.addArticle);
router.put("/updateById/:id", articlesController.updateArticle);
router.delete("/deleteById/:id", articlesController.deleteArticle);

module.exports = router;
