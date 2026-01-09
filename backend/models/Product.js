// // models/Product.js
// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     slug: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     description: {
//       type: String,          // ← fixed typo (was "typp")
//     },
//     imageUrl: {
//       type: String,          // URL to frame image (Cloudinary, etc.)
//     },
//     category: {
//       type: String,          // e.g. "Acrylic Photo", "Wall Clock"
//       trim: true,
//     },
//   },
//   {
//     timestamps: true,        // adds createdAt, updatedAt
//   }
// );

// const Product = mongoose.model('Product', productSchema);

// module.exports = Product;



// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,          // Main/primary image URL
    },
    additionalImages: {
      type: [String],        // Array of image URLs
      default: [],           // Default to empty array
    },
    category: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;