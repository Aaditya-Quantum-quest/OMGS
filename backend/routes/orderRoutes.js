



// const express = require('express');
// const Razorpay = require('razorpay');
// const crypto = require('crypto');
// const mongoose = require('mongoose');
// const Order = require('../models/Order');
// const CheckoutAddress = require('../models/Address');
// const fast2sms = require('fast2sms');
// const auth = require('../middleware/auth'); // Your existing JWT middleware

// const router = express.Router();

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // ========================================
// // YOUR EXISTING ROUTE (KEEP THIS)
// router.post('/', auth, async (req, res) => {
//   try {
//     const {
//       items,
//       totalAmount,
//       paymentMethod,
//     } = req.body;

//     if (!items || !items.length) {
//       return res.status(400).json({ message: 'No items in order' });
//     }

//     const order = await Order.create({
//       user: req.user.id,
//       items: items.map((i) => ({
//         product: i.productId,
//         quantity: i.quantity,
//         size: i.size,
//         frameColor: i.frameColor,
//         frameMaterial: i.frameMaterial,
//         frameThickness: i.frameThickness,
//         orientation: i.orientation,
//         imageUrl: i.imageUrl,
//         price: i.price,
//       })),
//       totalAmount,
//       paymentMethod: paymentMethod || 'COD',
//     });

//     res.status(201).json(order);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to create order' });
//   }
// });



// router.post('/razorpay/order', async (req, res) => {
//   try {
//     const { amount, currency = 'INR', receipt, cartItems, customerData } = req.body;

//     // Very small notes (optional). Do NOT stringify full cart/address.
//     const safeNotes = {
//       itemCount: Array.isArray(cartItems) ? cartItems.length : 0,
//       email: customerData?.email || '',
//     };

//     const order = await razorpay.orders.create({
//       amount,
//       currency,
//       receipt,
//       notes: safeNotes, // or remove this line if you don't need notes at all
//     });

//     res.json(order);
//   } catch (error) {
//     console.error('Razorpay order error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });


// // NEW: VERIFY RAZORPAY PAYMENT + SAVE ORDER + ADDRESS + SMS
// router.post('/verify', async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       customer,
//       cartItems,
//       totalAmount
//     } = req.body;

//     // 1. VERIFY RAZORPAY SIGNATURE
//     const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
//     shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//     const digest = shasum.digest('hex');

//     if (digest !== razorpay_signature) {
//       return res.status(400).json({ error: 'Invalid payment signature' });
//     }

//     // 2. SAVE CUSTOMER ADDRESS
//     const address = new CheckoutAddress({
//       email: customer.email,
//       phone: customer.phone,
//       firstName: customer.firstName,
//       lastName: customer.lastName,
//       address: customer.address,
//       area: customer.area,
//       pincode: customer.pincode,
//       city: customer.city,
//       state: customer.state,
//     });
//     await address.save();

//     // 3. CONVERT CART TO ORDER ITEMS (MATCH YOUR FORMAT)
//     const orderItems = cartItems.map(item => ({
//       product: item.productId || item._id || new mongoose.Types.ObjectId(),
//       quantity: item.quantity,
//       size: item.size || '5x7',
//       frameColor: item.frameColor || 'black',
//       frameMaterial: item.frameMaterial || 'wood',
//       frameThickness: parseInt(item.frameThickness) || 20,
//       orientation: item.orientation || 'portrait',
//       imageUrl: item.uploadedImageUrl || item.imageUrl,
//       price: item.price,
//     }));

//     // 4. CREATE ORDER (GUEST CHECKOUT - no user required)
//     const order = await Order.create({
//       // user: null, // Guest checkout
//       items: orderItems,
//       totalAmount: totalAmount / 100, // paise to rupees
//       paymentMethod: 'CARD',
//       paymentStatus: 'paid',
//       status: 'paid',
//     });

//     // 5. LINK ORDER TO ADDRESS
//     address.orderId = `ORD-${Date.now()}`;
//     await address.save();

//     // 6. SEND SMS
//     try {
//       await fast2sms.sendSms({
//         authorization: process.env.FAST2SMS_API_KEY,
//         message: `🖼️ Frame Site Order #${address.orderId} confirmed!\nTotal: ₹${(totalAmount / 100).toLocaleString()}\nTrack at framesite.com`,
//         numbers: [customer.phone],
//       });
//       console.log('✅ SMS sent to:', customer.phone);
//     } catch (smsError) {
//       console.error('SMS failed:', smsError);
//     }

//     res.json({
//       orderId: address.orderId,
//       dbOrderId: order._id,
//       message: 'Order confirmed & SMS sent!',
//     });

//   } catch (error) {
//     console.error('Order processing error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;




// const express = require('express');
// const Razorpay = require('razorpay');
// const crypto = require('crypto');
// const mongoose = require('mongoose');
// const Order = require('../models/Order');
// const CheckoutAddress = require('../models/Address');
// const fast2sms = require('fast2sms');
// const auth = require('../middleware/auth');

// const router = express.Router();

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // ========================================
// // YOUR EXISTING ROUTE (KEEP THIS)
// router.post('/', auth, async (req, res) => {
//   try {
//     const {
//       items,
//       totalAmount,
//       paymentMethod,
//     } = req.body;

//     if (!items || !items.length) {
//       return res.status(400).json({ message: 'No items in order' });
//     }

//     const order = await Order.create({
//       user: req.user.id,
//       items: items.map((i) => ({
//         product: i.productId,
//         quantity: i.quantity,
//         size: i.size,
//         frameColor: i.frameColor,
//         frameMaterial: i.frameMaterial,
//         frameThickness: i.frameThickness,
//         orientation: i.orientation,
//         imageUrl: i.imageUrl,
//         price: i.price,
//       })),
//       totalAmount,
//       paymentMethod: paymentMethod || 'COD',
//     });

//     res.status(201).json(order);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to create order' });
//   }
// });

// // ✅ IMPROVED RAZORPAY ORDER CREATION WITH BETTER ERROR HANDLING
// router.post('/razorpay/order', async (req, res) => {
//   try {
//     const { amount, currency = 'INR', receipt, cartItems, customerData } = req.body;

//     // ✅ VALIDATION
//     console.log('📦 Received order request:', {
//       amount,
//       currency,
//       receipt,
//       itemCount: cartItems?.length,
//       customerEmail: customerData?.email
//     });

//     if (!amount || amount <= 0) {
//       return res.status(400).json({
//         error: 'Invalid amount',
//         message: 'Amount must be greater than 0'
//       });
//     }

//     if (!cartItems || cartItems.length === 0) {
//       return res.status(400).json({
//         error: 'Empty cart',
//         message: 'Cart cannot be empty'
//       });
//     }

//     // ✅ CHECK RAZORPAY CREDENTIALS
//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       console.error('❌ Razorpay credentials missing!');
//       return res.status(500).json({
//         error: 'Configuration error',
//         message: 'Payment gateway not configured'
//       });
//     }

//     // Small notes (optional)
//     const safeNotes = {
//       itemCount: cartItems.length,
//       email: customerData?.email || '',
//     };

//     console.log('🔄 Creating Razorpay order...');

//     const order = await razorpay.orders.create({
//       amount: Math.round(amount), // ✅ Ensure integer
//       currency,
//       receipt: receipt || `receipt_${Date.now()}`,
//       notes: safeNotes,
//     });

//     console.log('✅ Razorpay order created:', order.id);

//     res.json(order);
//   } catch (error) {
//     console.error('❌ Razorpay order error:', error);

//     // ✅ BETTER ERROR RESPONSE
//     res.status(500).json({
//       error: error.error?.description || error.message || 'Failed to create order',
//       message: 'Could not initiate payment. Please try again.',
//       details: process.env.NODE_ENV === 'development' ? error.toString() : undefined
//     });
//   }
// });

// // ✅ IMPROVED VERIFY ROUTE
// router.post('/verify', async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       customer,
//       cartItems,
//       totalAmount
//     } = req.body;

//     console.log('🔐 Verifying payment:', {
//       orderId: razorpay_order_id,
//       paymentId: razorpay_payment_id
//     });

//     // 1. VERIFY RAZORPAY SIGNATURE
//     const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
//     shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//     const digest = shasum.digest('hex');

//     if (digest !== razorpay_signature) {
//       console.error('❌ Invalid signature');
//       return res.status(400).json({ error: 'Invalid payment signature' });
//     }

//     console.log('✅ Signature verified');

//     // 2. SAVE CUSTOMER ADDRESS
//     const address = new CheckoutAddress({
//       email: customer.email,
//       phone: customer.phone,
//       firstName: customer.firstName,
//       lastName: customer.lastName,
//       address: customer.address,
//       area: customer.area,
//       pincode: customer.pincode,
//       city: customer.city,
//       state: customer.state,
//     });
//     await address.save();
//     console.log('✅ Address saved');

//     // 3. CONVERT CART TO ORDER ITEMS
//     const orderItems = cartItems.map(item => ({
//       product: item.productId || item._id || new mongoose.Types.ObjectId(),
//       quantity: item.quantity || 1,
//       size: item.size || item.selectedSize || '5x7',
//       frameColor: item.frameColor || 'black',
//       frameMaterial: item.frameMaterial || 'acrylic',
//       frameThickness: parseInt(item.frameThickness || item.selectedThickness || item.thicknessMm) || 20,
//       orientation: item.orientation || 'portrait',
//       imageUrl: item.uploadedImageUrl || item.imageUrl || item.imageUri,
//       price: item.price,
//     }));

//     // 4. CREATE ORDER
//     const order = await Order.create({
//       items: orderItems,
//       totalAmount: totalAmount / 100, // paise to rupees
//       paymentMethod: 'CARD',
//       paymentStatus: 'paid',
//       status: 'paid',
//       razorpayOrderId: razorpay_order_id,
//       razorpayPaymentId: razorpay_payment_id,
//     });

//     console.log('✅ Order saved:', order._id);

//     // 5. LINK ORDER TO ADDRESS
//     const orderId = `ORD-${Date.now()}`;
//     address.orderId = orderId;
//     await address.save();

//     // 6. SEND SMS
//     try {
//       if (process.env.FAST2SMS_API_KEY) {
//         await fast2sms.sendMessage({
//           authorization: process.env.FAST2SMS_API_KEY,
//           message: `🖼️ Prem Color Studio Order #${orderId} confirmed! Total: ₹${(totalAmount / 100).toLocaleString()}. Thank you!`,
//           numbers: [customer.phone],
//         });
//         console.log('✅ SMS sent to:', customer.phone);
//       }
//     } catch (smsError) {
//       console.error('⚠️ SMS failed:', smsError.message);
//       // Don't fail the order if SMS fails
//     }

//     res.json({
//       orderId: orderId,
//       dbOrderId: order._id,
//       message: 'Order confirmed & SMS sent!',
//     });

//   } catch (error) {
//     console.error('❌ Order processing error:', error);
//     res.status(500).json({
//       error: error.message,
//       message: 'Failed to process order'
//     });
//   }
// });

// module.exports = router;




const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const CheckoutAddress = require('../models/Address');
const fast2sms = require('fast2sms');
const auth = require('../middleware/auth');

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ========================================
// YOUR EXISTING ROUTE (KEEP THIS)
router.post('/', auth, async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      paymentMethod,
    } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ message: 'No items in order' });
    }

    const order = await Order.create({
      user: req.user.id,
      items: items.map((i) => ({
        product: i.productId,
        quantity: i.quantity,
        size: i.size,
        frameColor: i.frameColor,
        frameMaterial: i.frameMaterial,
        frameThickness: i.frameThickness,
        orientation: i.orientation,
        imageUrl: i.imageUrl,
        price: i.price,
      })),
      totalAmount,
      paymentMethod: paymentMethod || 'COD',
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// ✅ IMPROVED RAZORPAY ORDER CREATION WITH BETTER ERROR HANDLING
router.post('/razorpay/order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, cartItems, customerData } = req.body;

    // ✅ VALIDATION
    console.log('📦 Received order request:', {
      amount,
      currency,
      receipt,
      itemCount: cartItems?.length,
      customerEmail: customerData?.email
    });

    if (!amount || amount <= 0) {
      return res.status(400).json({
        error: 'Invalid amount',
        message: 'Amount must be greater than 0'
      });
    }

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        error: 'Empty cart',
        message: 'Cart cannot be empty'
      });
    }

    // ✅ CHECK RAZORPAY CREDENTIALS
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('❌ Razorpay credentials missing!');
      return res.status(500).json({
        error: 'Configuration error',
        message: 'Payment gateway not configured'
      });
    }

    // Small notes (optional)
    const safeNotes = {
      itemCount: cartItems.length,
      email: customerData?.email || '',
    };

    console.log('🔄 Creating Razorpay order...');

    const order = await razorpay.orders.create({
      amount: Math.round(amount), // ✅ Ensure integer
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: safeNotes,
    });

    console.log('✅ Razorpay order created:', order.id);

    res.json(order);
  } catch (error) {
    console.error('❌ Razorpay order error:', error);

    // ✅ BETTER ERROR RESPONSE
    res.status(500).json({
      error: error.error?.description || error.message || 'Failed to create order',
      message: 'Could not initiate payment. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.toString() : undefined
    });
  }
});

// ✅ IMPROVED VERIFY ROUTE
router.post('/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer,
      cartItems,
      totalAmount
    } = req.body;

    console.log('🔐 Verifying payment:', {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id
    });

    // 1. VERIFY RAZORPAY SIGNATURE
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpay_signature) {
      console.error('❌ Invalid signature');
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    console.log('✅ Signature verified');

    // 2. SAVE CUSTOMER ADDRESS
    const address = new CheckoutAddress({
      email: customer.email,
      phone: customer.phone,
      firstName: customer.firstName,
      lastName: customer.lastName,
      address: customer.address,
      area: customer.area,
      pincode: customer.pincode,
      city: customer.city,
      state: customer.state,
    });
    await address.save();
    console.log('✅ Address saved');

    // 3. CONVERT CART TO ORDER ITEMS
    const orderItems = cartItems.map(item => ({
      product: item.productId || item._id || new mongoose.Types.ObjectId(),
      quantity: item.quantity || 1,
      size: item.size || item.selectedSize || '5x7',
      frameColor: item.frameColor || 'black',
      frameMaterial: item.frameMaterial || 'acrylic',
      frameThickness: parseInt(item.frameThickness || item.selectedThickness || item.thicknessMm) || 20,
      orientation: item.orientation || 'portrait',
      imageUrl: item.uploadedImageUrl || item.imageUrl || item.imageUri,
      price: item.price,
    }));

    // 4. CREATE ORDER
    const order = await Order.create({
      items: orderItems,
      totalAmount: totalAmount / 100, // paise to rupees
      paymentMethod: 'CARD',
      paymentStatus: 'paid',
      status: 'paid',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    console.log('✅ Order saved:', order._id);

    // 5. LINK ORDER TO ADDRESS
    const orderId = `ORD-${Date.now()}`;
    address.orderId = orderId;
    await address.save();

    // 6. SEND SMS
    try {
      if (process.env.FAST2SMS_API_KEY) {
        await fast2sms.sendMessage({
          authorization: process.env.FAST2SMS_API_KEY,
          message: `🖼️ Prem Color Studio Order #${orderId} confirmed! Total: ₹${(totalAmount / 100).toLocaleString()}. Thank you!`,
          numbers: [customer.phone],
        });
        console.log('✅ SMS sent to:', customer.phone);
      }
    } catch (smsError) {
      console.error('⚠️ SMS failed:', smsError.message);
      // Don't fail the order if SMS fails
    }

    res.json({
      orderId: orderId,
      dbOrderId: order._id,
      message: 'Order confirmed & SMS sent!',
    });

  } catch (error) {
    console.error('❌ Order processing error:', error);
    res.status(500).json({
      error: error.message,
      message: 'Failed to process order'
    });
  }
});

// // ✅ NEW: DIRECT ORDER PLACEMENT (NO RAZORPAY - COD)
// router.post('/direct', async (req, res) => {
//   try {
//     const { customer, cartItems, totalAmount, paymentMethod = 'COD' } = req.body;

//     // 1. GENERATE CUSTOM ORDER ID IMMEDIATELY
//     const customOrderId = `ORD-${Date.now()}`;

//     console.log('📦 Direct order received:', {
//       orderId: customOrderId,
//       customerEmail: customer?.email,
//       total: totalAmount
//     });

//     // Validation
//     if (!cartItems || cartItems.length === 0) {
//       return res.status(400).json({
//         error: 'Empty cart',
//         message: 'Cart cannot be empty'
//       });
//     }

//     if (!customer || !customer.email || !customer.phone) {
//       return res.status(400).json({
//         error: 'Invalid customer data',
//         message: 'Customer information is required'
//       });
//     }

//     // 2. CONVERT CART TO ORDER ITEMS
//     const orderItems = cartItems.map(item => ({
//       product: item.productId || item._id || new mongoose.Types.ObjectId(),
//       quantity: item.quantity || 1,
//       size: item.size || item.selectedSize || '5x7',
//       frameColor: item.frameColor || 'black',
//       frameMaterial: item.frameMaterial || 'acrylic',
//       frameThickness: parseInt(item.frameThickness || item.selectedThickness || item.thicknessMm) || 20,
//       orientation: item.orientation || 'portrait',
//       imageUrl: item.uploadedImageUrl || item.imageUrl || item.imageUri,
//       price: item.price,
//     }));

//     // 3. CREATE ORDER (With orderId saved in the document)
//     const order = await Order.create({
//       orderId: customOrderId, // Important: Ensure your Order model has this field
//       items: orderItems,
//       totalAmount: totalAmount,
//       paymentMethod: paymentMethod,
//       paymentStatus: 'pending',
//       status: 'pending',
//     });

//     console.log('✅ Order created:', order._id);

//     // 4. SAVE CUSTOMER ADDRESS (Linked with the same orderId)
//     const address = new CheckoutAddress({
//       email: customer.email,
//       phone: customer.phone,
//       firstName: customer.firstName,
//       lastName: customer.lastName,
//       address: customer.address,
//       area: customer.area,
//       pincode: customer.pincode,
//       city: customer.city,
//       state: customer.state,
//       orderId: customOrderId, // Direct link
//     });
//     await address.save();
//     console.log('✅ Address saved and linked');

//     // 5. SEND SMS
//     try {
//       if (process.env.FAST2SMS_API_KEY) {
//         await fast2sms.sendMessage({
//           authorization: process.env.FAST2SMS_API_KEY,
//           message: `🖼️ Prem Color Studio Order #${customOrderId} received! Total: ₹${totalAmount.toLocaleString()}. We'll call you soon for confirmation!`,
//           numbers: [customer.phone],
//         });
//         console.log('✅ SMS sent to:', customer.phone);
//       }
//     } catch (smsError) {
//       console.error('⚠️ SMS failed:', smsError.message);
//     }

//     // 6. FINAL RESPONSE
//     res.json({
//       orderId: customOrderId,
//       dbOrderId: order._id,
//       message: 'Order placed successfully!',
//       status: 'success'
//     });

//   } catch (error) {
//     console.error('❌ Order error:', error);
//     res.status(500).json({
//       error: error.message,
//       message: 'Failed to place order'
//     });
//   }
// });


// ✅ UPDATED: DIRECT ORDER PLACEMENT - PROPERLY LINKED TO USER
router.post('/direct', auth, async (req, res) => {
  try {
    const { customer, cartItems, totalAmount, paymentMethod = 'COD' } = req.body;

    // 1. GENERATE CUSTOM ORDER ID IMMEDIATELY
    const customOrderId = `ORD-${Date.now()}`;

    console.log('📦 Direct order received:', {
      orderId: customOrderId,
      userId: req.user?.id, // ✅ Log the user ID
      customerEmail: customer?.email,
      total: totalAmount
    });

    // Validation
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        error: 'Empty cart',
        message: 'Cart cannot be empty'
      });
    }

    if (!customer || !customer.email || !customer.phone) {
      return res.status(400).json({
        error: 'Invalid customer data',
        message: 'Customer information is required'
      });
    }

    // 2. CONVERT CART TO ORDER ITEMS
    const orderItems = cartItems.map(item => ({
      product: item.productId || item._id || new mongoose.Types.ObjectId(),
      quantity: item.quantity || 1,
      size: item.size || item.selectedSize || '5x7',
      frameColor: item.frameColor || 'black',
      frameMaterial: item.frameMaterial || 'acrylic',
      frameThickness: parseInt(item.frameThickness || item.selectedThickness || item.thicknessMm) || 20,
      orientation: item.orientation || 'portrait',
      imageUrl: item.uploadedImageUrl || item.imageUrl || item.imageUri,
      price: item.price,
    }));

    // 3. CREATE ORDER (✅ WITH USER LINK)
    const order = await Order.create({
      orderId: customOrderId,
      user: req.user.id, // ✅ CRITICAL: Link to authenticated user
      items: orderItems,
      totalAmount: totalAmount,
      paymentMethod: paymentMethod,
      paymentStatus: 'pending',
      status: 'pending',
    });

    console.log('✅ Order created:', order._id, 'for user:', req.user.id);

    // 4. SAVE CUSTOMER ADDRESS (✅ WITH USER LINK)
    const address = new CheckoutAddress({
      email: customer.email,
      phone: customer.phone,
      firstName: customer.firstName,
      lastName: customer.lastName,
      address: customer.address,
      area: customer.area,
      pincode: customer.pincode,
      city: customer.city,
      state: customer.state,
      orderId: customOrderId,
      user: req.user.id, // ✅ CRITICAL: Link to authenticated user
    });
    await address.save();
    console.log('✅ Address saved and linked to user:', req.user.id);

    // 5. SEND SMS
    try {
      if (process.env.FAST2SMS_API_KEY) {
        await fast2sms.sendMessage({
          authorization: process.env.FAST2SMS_API_KEY,
          message: `🖼️ Prem Color Studio Order #${customOrderId} received! Total: ₹${totalAmount.toLocaleString()}. We'll call you soon for confirmation!`,
          numbers: [customer.phone],
        });
        console.log('✅ SMS sent to:', customer.phone);
      }
    } catch (smsError) {
      console.error('⚠️ SMS failed:', smsError.message);
    }

    // 6. FINAL RESPONSE
    res.json({
      orderId: customOrderId,
      dbOrderId: order._id,
      message: 'Order placed successfully!',
      status: 'success'
    });

  } catch (error) {
    console.error('❌ Order error:', error);
    res.status(500).json({
      error: error.message,
      message: 'Failed to place order'
    });
  }
});


module.exports = router;
