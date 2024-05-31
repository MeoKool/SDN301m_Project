const mongoose = require("mongoose");

const articlesSchema = mongoose.Schema(
  {
    articlesID: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    publishDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Articles", articlesSchema);
