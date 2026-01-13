// const express = require('express');
// const router = express.Router();
// const User = require('../models/User'); // Your user model
// const Order = require('../models/Order'); // Your order model
// const Address = require('../models/Address'); // Your address model

// // Middleware to verify JWT token (if you're using authentication)
// const authMiddleware = require('../middleware/auth'); // Your auth middleware

// // Get user profile by ID
// router.get('/users/:userId', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId).select('-password');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Get orders by user ID
// router.get('/orders/user/:userId', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Find orders by user email or userId (depending on your schema)
//     const orders = await Order.find({ 
//       // If your orders have a userId field:
//       // userId: req.params.userId 
//       // OR if they use email:
//       email: user.email 
//     }).sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Get addresses by user ID
// router.get('/addresses/user/:userId', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const addresses = await Address.find({ email: user.email })
//       .sort({ createdAt: -1 });

//     res.json(addresses);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// module.exports = router;



// // routes/dashboard.js
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Order = require('../models/Order');
// const Address = require('../models/Address');
// const auth = require('../middleware/auth');

// // Get user profile
// router.get('/users/:userId', auth, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId && !req.user.isAdmin) {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     const user = await User.findById(req.params.userId).select('-password');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Get user's orders - FIXED
// router.get('/orders/user/:userId', auth, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId && !req.user.isAdmin) {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     const user = await User.findById(req.params.userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check if your Order schema has userId field or email field
//     // Try both methods:
//     let orders = await Order.find({ userId: req.params.userId })
//       .sort({ createdAt: -1 });

//     // If no orders found by userId, try by email
//     if (orders.length === 0) {
//       orders = await Order.find({ email: user.email })
//         .sort({ createdAt: -1 });
//     }

//     res.json(orders);
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Get user's addresses - FIXED
// router.get('/addresses/user/:userId', auth, async (req, res) => {
//   try {
//     if (req.user.id !== req.params.userId && !req.user.isAdmin) {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     const user = await User.findById(req.params.userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Try to find by userId first, then by email
//     let addresses = await Address.find({ userId: req.params.userId })
//       .sort({ createdAt: -1 });

//     if (addresses.length === 0) {
//       addresses = await Address.find({ email: user.email })
//         .sort({ createdAt: -1 });
//     }

//     res.json(addresses);
//   } catch (error) {
//     console.error('Error fetching addresses:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });


// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Order = require('../models/Order');
// const Address = require('../models/Address');
// const auth = require('../middleware/auth');

// // 1. USER PROFILE (WORKS - keep as-is)
// router.get('/users/:userId', auth, async (req, res) => {
//     try {
//         const user = await User.findById(req.params.userId).select('-password');
//         if (!user) return res.status(404).json({ message: 'User not found' });
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: 'Profile error' });
//     }
// });

// // 2. ORDERS LIST - BROAD SEARCH (Fixes "0 orders")
// router.get('/orders/user/:userId', auth, async (req, res) => {
//     try {
//         const userId = req.params.userId;

//         // LOG ALL ORDERS FIRST (debug)
//         const allOrders = await Order.find({}).limit(3);
//         console.log('🔍 ALL ORDERS sample:', allOrders.map(o => ({
//             _id: o._id,
//             orderId: o.orderId,
//             user: o.user,
//             userId: o.userId,
//             email: o.email
//         })));

//         // Try EVERY possible combination
//         const criteria = [
//             { user: userId },
//             { 'user._id': userId },
//             { userId: userId },
//             { email: req.user.email },
//             { 'user.email': req.user.email },
//             // COMMON ISSUE: orders might not have user field populated
//             {} // ALL orders if desperate (admin view)
//         ];

//         let orders = [];
//         for (let i = 0; i < criteria.length - 1; i++) {
//             orders = await Order.find(criteria[i]).limit(10);
//             if (orders.length > 0) {
//                 console.log(`✅ FOUND ${orders.length} orders with criteria ${i + 1}`);
//                 break;
//             }
//         }

//         if (orders.length === 0) {
//             orders = await Order.find({}).sort({ createdAt: -1 }).limit(5); // Show recent orders
//             console.log('📋 Showing recent orders (no user match)');
//         }

//         res.json(orders);
//     } catch (error) {
//         console.error('❌ Orders ERROR:', error);
//         res.json([]); // Never crash
//     }
// });


// // 3. ADDRESSES LIST - SHOW ALL (Fixes blank addresses)
// router.get('/addresses/user/:userId', auth, async (req, res) => {
//     try {
//         console.log('🔍 Addresses for userId:', req.params.userId);

//         const addresses = await Address.find({
//             $or: [
//                 { 'user': req.params.userId },
//                 { 'userId': req.params.userId },
//                 { 'user._id': req.params.userId },
//                 { email: req.user.email }
//             ]
//         }).sort({ createdAt: -1 });

//         console.log('✅ Addresses found:', addresses.length);
//         res.json(addresses);
//     } catch (error) {
//         console.error('❌ Addresses ERROR:', error.message);
//         res.json([]); // Return empty array instead of crashing
//     }
// });

// // 4. SINGLE ORDER DETAIL (bonus)
// router.get('/dashboard/:orderId', auth, async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.orderId).populate('user', 'name email');
//         if (!order) return res.status(404).json({ message: 'Order not found' });

//         const address = await Address.findOne({ orderId: order.orderId });

//         res.json({
//             order,
//             address: address || null
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Detail error' });
//     }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const Address = require('../models/Address');
const auth = require('../middleware/auth');
const NameplateOrder = require('../models/NameplateOrder');


// 1. USER PROFILE - Fixed for current logged-in user
router.get('/users/:userId', auth, async (req, res) => {
  try {
    // Use CURRENT logged-in user (req.user.id) OR param
    const userId = req.user.id || req.params.userId;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Profile error' });
  }
});

// 2. ORDERS LIST - Only CURRENT user's orders
router.get('/orders/user/:userId', auth, async (req, res) => {
  try {
    const userId = req.user.id || req.params.userId;

    console.log('🔍 Orders for logged-in user:', userId);

    const orders = await Order.find({
      $or: [
        { user: userId },
        { 'user._id': userId },
        { userId: userId },
        { email: req.user.email }
      ]
    })
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);

    console.log(`✅ Current user orders: ${orders.length}`);
    res.json(orders);
  } catch (error) {
    console.error('Orders error:', error.message);
    res.json([]);
  }
});

// 3. ADDRESSES LIST - Only CURRENT user's addresses
router.get('/addresses/user/:userId', auth, async (req, res) => {
  try {
    const userId = req.user.id || req.params.userId;

    console.log('🔍 Addresses for logged-in user:', userId);

    const addresses = await Address.find({
      $or: [
        { user: userId },
        { 'user._id': userId },
        { userId: userId },
        { email: req.user.email }
      ]
    }).sort({ createdAt: -1 });

    console.log(`✅ Current user addresses: ${addresses.length}`);
    res.json(addresses);
  } catch (error) {
    console.error('Addresses error:', error.message);
    res.json([]);
  }
});

// 4. SINGLE ORDER DETAIL - Owner verification
router.get('/dashboard/:orderId', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('user', 'name email phone');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Verify user owns order
    if (order.user._id.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const address = await Address.findOne({
      $or: [{ orderId: order.orderId }, { order: order._id }]
    });

    res.json({
      order: {
        ...order._doc,
        userName: order.user.name,
        userEmail: order.user.email
      },
      address: address || null
    });
  } catch (error) {
    res.status(500).json({ message: 'Order detail error' });
  }
});



// router.get('/user/orders/nameplates/user', auth, async (req, res) => {
//   try {
//     const email = req.user.email.toLowerCase();

//     console.log('🔍 Nameplate orders for:', email);

//     const orders = await NameplateOrder.find({
//       'customer.email': email
//     })
//       .sort({ createdAt: -1 });

//     console.log(`✅ Nameplate orders found: ${orders.length}`);
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error('❌ Nameplate orders error:', error);
//     res.status(500).json([]);
//   }
// });



// router.get('/', auth, async (req, res) => {
//   try {
//     console.log('🔍 Fetching nameplate orders for user:', req.user.email);

//     const orders = await NameplateOrder.find({
//       $or: [
//         { 'customer.email': req.user.email.toLowerCase() },
//         { userId: req.user.id },
//         { user: req.user.id }
//       ]
//     })
//       .populate('customer', 'firstName lastName phone email')
//       .populate('size')
//       .sort({ createdAt: -1 });

//     console.log(`✅ Nameplate orders found: ${orders.length}`);
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error('❌ Nameplate orders error:', error);
//     res.status(500).json({
//       message: 'Failed to fetch nameplate orders',
//       error: error.message
//     });
//   }
// });


router.get('/', auth, async (req, res) => {
  try {
    const orders = await NameplateOrder.find({ 'customer.email': req.user.email })
      .populate('customer', 'firstName lastName phone email')
      .populate('size')
      .sort({ createdAt: -1 });

    // ✅ ALWAYS RETURN ARRAY
    res.status(200).json(orders || []);
  } catch (error) {
    console.error('❌ Nameplate orders error:', error);
    // ✅ RETURN EMPTY ARRAY ON ERROR (not object)
    res.status(500).json([]);
  }
});



module.exports = router;
