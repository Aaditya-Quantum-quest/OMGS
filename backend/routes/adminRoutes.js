// routes/adminRoutes.js
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const Product = require('../models/Product');
const GalleryImage = require('../models/GalleryImage');
const User = require('../models/User');
const Order = require('../models/Order');

// For image uploads by admin
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// All routes below: admin only
router.use(auth, isAdmin);

// PRODUCTS
// router.post('/products', async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(201).json({ message: 'Product added', product });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to add product', error: err.message });
//   }
// });

router.post('/products', async (req, res) => {
  try {
    const productData = {
      ...req.body,
      // Ensure additionalImages is an array
      additionalImages: req.body.additionalImages || []
    };

    const product = await Product.create(productData);
    res.status(201).json({ message: 'Product added', product });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add product', error: err.message });
  }
});


router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product updated', product });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product', error: err.message });
  }
});

router.get('/products', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});


// router.delete('/products/:id', async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Product deleted' });
// });


router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Optional: Delete associated image files
    if (product.additionalImages && product.additionalImages.length > 0) {
      product.additionalImages.forEach(imageUrl => {
        const filename = imageUrl.split('/').pop();
        const filePath = path.join(__dirname, '../uploads/products', filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }
    
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product', error: err.message });
  }
});



// Products upload images by admin

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/products';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

// Upload images endpoint
router.post('/upload-images', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    // Generate URLs for uploaded images
    const imageUrls = req.files.map(file => {
      return `http://localhost:4000/uploads/products/${file.filename}`;
    });

    res.json({ imageUrls });
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload images', error: err.message });
  }
});



// GALLERY
router.post('/gallery', async (req, res) => {
  try {
    const img = await GalleryImage.create(req.body);
    res.status(201).json({ message: 'Image added', image: img });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add image', error: err.message });
  }
});

router.get('/gallery', async (req, res) => {
  const images = await GalleryImage.find().sort({ createdAt: -1 });
  res.json(images);
});

router.delete('/gallery/:id', async (req, res) => {
  await GalleryImage.findByIdAndDelete(req.params.id);
  res.json({ message: 'Image deleted' });
});

// CUSTOMERS (users)
router.get('/users', async (req, res) => {
  const users = await User.find({}, 'name email createdAt'); // only name + email
  res.json(users);
});
router.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User Deleted ' })
})

// ORDERS
router.get('/orders', async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name email')
    .populate('items.product', 'title price');
  res.json(orders);
});

router.delete('/orders/:id', async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Order Deleted ' })
});

module.exports = router;
