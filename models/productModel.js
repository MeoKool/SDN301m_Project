const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
