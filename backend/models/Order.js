// // models/Order.js
// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },

//     items: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Product',
//           required: true,
//         },

//         quantity: {
//           type: Number,
//           required: true,
//           min: 1,
//         },

//         size: {
//           type: String,
//           default: '5x7', // frame size
//         },

//         frameColor: {
//           type: String,
//           default: 'black',
//         },

//         frameMaterial: {
//           type: String,
//           default: 'wood',
//         },

//         frameThickness: {
//           type: Number, // in mm
//           default: 20,
//         },

//         orientation: {
//           type: String,
//           enum: ['portrait', 'landscape', 'square'],
//           default: 'portrait',
//         },

//         imageUrl: {
//           type: String, // user uploaded image
//           required: true,
//         },

//         price: {
//           type: Number, // price per item at time of purchase
//           required: true,
//         },
//       },
//     ],

//     totalAmount: {
//       type: Number,
//       required: true,
//     },

//     paymentMethod: {
//       type: String,
//       enum: ['COD', 'UPI', 'CARD', 'NETBANKING'],
//       default: 'COD',
//     },

//     paymentStatus: {
//       type: String,
//       enum: ['pending', 'paid', 'failed'],
//       default: 'pending',
//     },

//     status: {
//       type: String,
//       enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'],
//       default: 'pending',
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Order', orderSchema);



// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       // required: true, // Comment out for guest checkout
//     },

//     items: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Product',
//           required: true,
//         },
//         quantity: { type: Number, required: true, min: 1 },
//         size: { type: String, default: '5x7' },
//         frameColor: { type: String, default: 'black' },
//         frameMaterial: { type: String, default: 'wood' },
//         frameThickness: { type: Number, default: 20 },
//         orientation: {
//           type: String,
//           enum: ['portrait', 'landscape', 'square'],
//           default: 'portrait',
//         },
//         imageUrl: { type: String, required: true },
//         price: { type: Number, required: true },
//       },
//     ],

//     totalAmount: { type: Number, required: true },
//     paymentMethod: {
//       type: String,
//       enum: ['COD', 'UPI', 'CARD', 'NETBANKING'],
//       default: 'COD',
//     },
//     paymentStatus: {
//       type: String,
//       enum: ['pending', 'paid', 'failed'],
//       default: 'pending',
//     },
//     status: {
//       type: String,
//       enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'],
//       default: 'pending',
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Order', orderSchema);



// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: false, // ✅ Allow guest checkout
//     },

//     items: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Product',
//           required: false, // ✅ Not required for custom frames
//         },
//         quantity: { type: Number, required: true, min: 1, default: 1 },
//         size: { type: String, default: '5x7' },
//         frameColor: { type: String, default: 'black' },
//         frameMaterial: { type: String, default: 'wood' },
//         frameThickness: { type: Number, default: 20 },
//         orientation: {
//           type: String,
//           enum: ['portrait', 'landscape', 'square'],
//           default: 'portrait',
//         },
//         imageUrl: { type: String, required: false }, // ✅ Not required for some items
//         price: { type: Number, required: true },
//       },
//     ],

//     totalAmount: { type: Number, required: true },
//     paymentMethod: {
//       type: String,
//       enum: ['COD', 'UPI', 'CARD', 'NETBANKING'],
//       default: 'COD',
//     },
//     paymentStatus: {
//       type: String,
//       enum: ['pending', 'paid', 'failed'],
//       default: 'pending',
//     },
//     status: {
//       type: String,
//       enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'],
//       default: 'pending',
//     },

//     // ✅ ADD RAZORPAY FIELDS
//     razorpayOrderId: {
//       type: String,
//       required: false,
//     },
//     razorpayPaymentId: {
//       type: String,
//       required: false,
//     },
//     razorpaySignature: {
//       type: String,
//       required: false,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Order', orderSchema);


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // ✅ Allow guest checkout
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: false, // ✅ Not required for custom frames
        },
        quantity: { type: Number, required: true, min: 1, default: 1 },
        size: { type: String, default: '5x7' },
        frameColor: { type: String, default: 'black' },
        frameMaterial: { type: String, default: 'wood' },
        frameThickness: { type: Number, default: 20 },
        orientation: {
          type: String,
          enum: ['portrait', 'landscape', 'square'],
          default: 'portrait',
        },
        imageUrl: { type: String, required: false }, // ✅ Not required for some items
        price: { type: Number, required: true },
      },
    ],

    totalAmount: { type: Number, required: true },

    // ✅ ADD THE LINKING FIELD HERE
    orderId: {
      type: String,
      required: false, // Optional for existing orders, but will be used for new ones
    },

    paymentMethod: {
      type: String,
      enum: ['COD', 'UPI', 'CARD', 'NETBANKING'],
      default: 'COD',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },

    // ✅ RAZORPAY FIELDS (Kept intact)
    razorpayOrderId: { type: String, required: false },
    razorpayPaymentId: { type: String, required: false },
    razorpaySignature: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);

