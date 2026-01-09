// 



require('dotenv').config();

const express = require('express');
const app = express();
const cors = require("cors");

// Database Connection 
const connectDB = require("./config/db");

// AUTH ROUTES
const authRoutes = require('./routes/authRoutes');

// Admin
const dashboardRoutes = require('./routes/dashboardRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminSeeingOrder = require('./routes/privareSeeingOrderRoutes');

// PUBLIC
const publicGalleryRoutes = require('./routes/publicGalleryRoutes');
const publicViewProductRoutes = require('./routes/publicViewProductsRoute');
const userOrderRoutes = require('./routes/orderRoutes');  // includes Razorpay
const uploadImageRoute = require('./routes/upload');
const publicProductRoute = require('./routes/publicProductsRoutes');
const addressRoutes = require('./routes/addressRoutes');   // your address routes





app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));


app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json());

app.use('/api/auth', authRoutes);

// ADMIN
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/', adminSeeingOrder);

// PUBLIC
app.use('/api/gallery', publicGalleryRoutes);
app.use('/api/products', publicViewProductRoutes);
app.use('/api/orders', userOrderRoutes);   // ✅ includes /, /razorpay/order, /verify
app.use('/api/', publicProductRoute);
app.use('/api/', addressRoutes);


//  USER PROFILE ROUTES
app.use('/api/user', require('./routes/userDashboard')); 



// STATIC
app.use('/uploads', express.static('uploads'));

// UPLOAD
app.use('/api/upload', uploadImageRoute);

connectDB().then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log("THE SERVER IS LISTENING THE USER REQUEST");
    });
});


