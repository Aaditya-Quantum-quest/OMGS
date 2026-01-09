const express = require('express');
const router = express.Router();
const NameplateOrder = require('../models/NameplateOrder'); // Create this model

// POST - Create new nameplate order
router.post('/', async (req, res) => {
  try {
    console.log('📦 Received nameplate order from frontend');
    console.log('Order data:', req.body);

    const orderData = req.body;

    // Validate required fields
    if (!orderData.design || !orderData.size || !orderData.customer || !orderData.shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Create order in MongoDB
    const order = await NameplateOrder.create(orderData);

    console.log('✅ Order saved to database:', order._id);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: {
        orderId: order.orderId,
        _id: order._id,
        total: order.pricing.total
      }
    });

  } catch (error) {
    console.error('❌ Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

// GET - Fetch all nameplate orders
router.get('/', async (req, res) => {
  try {
    const { email, orderId } = req.query;
    
    let query = {};
    if (email) query['customer.email'] = email;
    if (orderId) query.orderId = orderId;

    const orders = await NameplateOrder.find(query)
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      success: true,
      count: orders.length,
      orders
    });

  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
});

// GET - Fetch single order by orderId
router.get('/:orderId', async (req, res) => {
  try {
    const order = await NameplateOrder.findOne({ 
      orderId: req.params.orderId 
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order
    });

  } catch (error) {
    console.error('❌ Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order'
    });
  }
});

// PATCH - Update order status
router.patch('/:orderId', async (req, res) => {
  try {
    const { status, paymentStatus, trackingNumber } = req.body;
    
    const updateData = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData['payment.status'] = paymentStatus;
    if (trackingNumber) updateData['shipping.trackingNumber'] = trackingNumber;

    const order = await NameplateOrder.findOneAndUpdate(
      { orderId: req.params.orderId },
      { $set: updateData },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order updated successfully',
      order
    });

  } catch (error) {
    console.error('❌ Error updating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order'
    });
  }
});

module.exports = router;
