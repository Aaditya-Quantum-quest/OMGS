// 'use client';

// import React, { useState, useEffect } from 'react';
// import { User, Package, MapPin, Loader2, Calendar, CreditCard, ShoppingBag } from 'lucide-react';
// import axios from 'axios';
// import { useParams } from 'next/navigation'; // Add this import

// const UserDashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [addresses, setAddresses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Get orderId from URL params for detailed view (optional)
//   const params = useParams();
//   const orderIdFromUrl = params?.orderId;

//   const API_URL = 'http://localhost:4000/api';

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   // NEW - Safe version (copy exactly)
//   // const fetchUserData = async () => {
//   //   setLoading(true);
//   //   setError(null);

//   //   try {
//   //     const userId = localStorage.getItem('userId') || '695f484201dca67b80f4af9d';
//   //     const token = localStorage.getItem('token');
//   //     const config = {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //         'Content-Type': 'application/json'
//   //       }
//   //     };

//   //     // 1. Profile (always works first)
//   //     console.log('🔍 Fetching profile...');
//   //     const userRes = await axios.get(`${API_URL}/user/users/${userId}`, config);
//   //     setUserData(userRes.data);

//   //     // 2. Orders (never crashes dashboard)
//   //     console.log('🔍 Fetching orders...');
//   //     try {
//   //       const ordersRes = await axios.get(`${API_URL}/user/orders/user/${userId}`, config);
//   //       setOrders(ordersRes.data || []);
//   //       console.log('✅ Orders:', ordersRes.data?.length || 0);
//   //     } catch (oErr) {
//   //       console.warn('⚠️ Orders failed (showing empty):', oErr.response?.status);
//   //       setOrders([]);
//   //     }

//   //     // 3. Addresses (never crashes dashboard)
//   //     console.log('🔍 Fetching addresses...');
//   //     try {
//   //       const addressesRes = await axios.get(`${API_URL}/user/addresses/user/${userId}`, config);
//   //       setAddresses(addressesRes.data || []);
//   //       console.log('✅ Addresses:', addressesRes.data?.length || 0);
//   //     } catch (aErr) {
//   //       console.warn('⚠️ Addresses failed (showing empty):', aErr.response?.status);
//   //       setAddresses([]);
//   //     }

//   //   } catch (err) {
//   //     console.error('❌ Main error:', err.response?.status, err.message);
//   //     setError(err.response?.data?.message || 'Dashboard error');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const fetchUserData = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       // FIX 1: Get CURRENT user from JWT token (not hardcoded)
//       const token = localStorage.getItem('token');
//       const userId = localStorage.getItem('userId'); // From login
//       const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT
//       const currentUserId = decoded.id || decoded.userId || userId;

//       console.log('🔍 Current user ID:', currentUserId);

//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       };

//       // Use currentUserId everywhere
//       const userRes = await axios.get(`${API_URL}/user/users/${currentUserId}`, config);
//       setUserData(userRes.data);

//       const ordersRes = await axios.get(`${API_URL}/user/orders/user/${currentUserId}`, config);
//       setOrders(ordersRes.data || []);

//       const addressesRes = await axios.get(`${API_URL}/user/addresses/user/${currentUserId}`, config);
//       setAddresses(addressesRes.data || []);

//     } catch (err) {
//       console.error('Dashboard error:', err);
//       setError('Failed to load - check login');
//     } finally {
//       setLoading(false);
//     }
//   };



//   // Status colors (unchanged - working fine)
//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'delivered': return 'bg-green-100 text-green-800';
//       case 'shipped': return 'bg-blue-100 text-blue-800';
//       case 'processing': return 'bg-yellow-100 text-yellow-800';
//       case 'pending': return 'bg-orange-100 text-orange-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getPaymentStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'paid': return 'bg-green-100 text-green-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'failed': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric', month: 'short', day: 'numeric'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
//           <p className="text-gray-600">Loading your dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
//         <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
//           <div className="text-red-600 text-center">
//             <p className="text-xl font-semibold mb-2">Error Loading Dashboard</p>
//             <p className="text-sm text-gray-600">{error}</p>
//             <button
//               onClick={fetchUserData}
//               className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-6 py-30">
//       <div className="max-w-6xl mx-auto">

//         {/* Profile Section */}
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//           <div className="flex items-center gap-4 mb-6">
//             <User className="w-8 h-8 text-indigo-600" />
//             <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
//           </div>

//           {userData ? (
//             <div className="flex items-start gap-6">
//               <div className="w-24 h-24 bg-linear-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
//                 {userData.name?.charAt(0).toUpperCase() || '?'}
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-1">{userData.name || 'N/A'}</h3>
//                 <p className="text-gray-500 mb-4">{userData.email || 'No email'}</p>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                     <span>{userData.email || 'N/A'}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <Calendar className="w-5 h-5" />
//                     <span>Member since {formatDate(userData.createdAt)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <p className="text-gray-500">Loading profile...</p>
//           )}
//         </div>

//         {/* Orders Section */}
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//           <div className="flex items-center gap-4 mb-6">
//             <Package className="w-8 h-8 text-indigo-600" />
//             <h2 className="text-2xl font-bold text-gray-800">My Orders ({orders.length})</h2>
//           </div>

//           {orders.length === 0 ? (
//             <div className="text-center py-12 text-gray-500">
//               <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-50" />
//               <p className="text-lg">No orders yet</p>
//               <p className="text-sm">Your beautiful frames are waiting to be created!</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {orders.map((order) => (
//                 <div key={order._id} className="border border-gray-200 rounded-lg p-5 hover:border-indigo-300 transition hover:shadow-md">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <p className="font-semibold text-gray-800 text-lg">Order #{order.orderId}</p>
//                       <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
//                     </div>
//                     <div className="flex flex-col items-end gap-1">
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                         {order.status?.toUpperCase() || 'PENDING'}
//                       </span>
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
//                         {order.paymentStatus?.toUpperCase() || 'PENDING'}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="space-y-3 mb-4">
//                     {order.products?.map((item, idx) => (
//                       <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded">
//                         <div className="flex-1">
//                           <p className="font-medium text-gray-800">
//                             {item.name || `${item.size} ${item.orientation}`}
//                           </p>
//                           <p className="text-sm text-gray-600">
//                             Frame: {item.frameMaterial || 'Wood'} ({item.frameThickness || '20mm'}) •
//                             Qty: {item.quantity || 1}
//                           </p>
//                         </div>
//                         <p className="font-semibold text-gray-800">₹{(item.price * (item.quantity || 1)).toFixed(0)}</p>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="flex justify-between items-center pt-3 border-t border-gray-200">
//                     <div className="flex items-center gap-2 text-gray-600">
//                       <CreditCard className="w-4 h-4" />
//                       <span className="text-sm">{order.paymentMethod || 'Card'}</span>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-sm text-gray-600">Total</p>
//                       <p className="text-xl font-bold text-gray-800">₹{order.amount || order.totalAmount || 0}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Addresses Section */}
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <div className="flex items-center gap-4 mb-6">
//             <MapPin className="w-8 h-8 text-indigo-600" />
//             <h2 className="text-2xl font-bold text-gray-800">Saved Addresses ({addresses.length})</h2>
//           </div>

//           {addresses.length === 0 ? (
//             <div className="text-center py-12 text-gray-500">
//               <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
//               <p className="text-lg">No saved addresses</p>
//               <p className="text-sm">Add your delivery address for faster checkout</p>
//             </div>
//           ) : (
//             <div className="grid md:grid-cols-2 gap-4">
//               {addresses.map((address) => (
//                 <div key={address._id} className="border border-gray-200 rounded-lg p-5 hover:border-indigo-300 transition hover:shadow-md">
//                   <div className="mb-3">
//                     <p className="font-semibold text-gray-800 text-lg">
//                       {address.firstName} {address.lastName}
//                     </p>
//                     <p className="text-sm text-gray-600">{address.phone}</p>
//                   </div>

//                   <div className="text-sm text-gray-700 space-y-1 mb-3">
//                     <p>{address.street || address.address}</p>
//                     <p>{address.area || address.city}</p>
//                     <p>{address.city}, {address.state} - {address.pincode}</p>
//                   </div>

//                   {address.orderId && (
//                     <div className="pt-3 border-t border-gray-200">
//                       <p className="text-xs text-gray-500">Used for: #{address.orderId}</p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default UserDashboard;






// 'use client';

// import React, { useState, useEffect } from 'react';
// import { User, Package, MapPin, Loader2, Calendar, CreditCard, ShoppingBag, Image as ImageIcon, Phone, Mail } from 'lucide-react';
// import axios from 'axios';
// import { useParams } from 'next/navigation';

// const UserDashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [addresses, setAddresses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const params = useParams();
//   const orderIdFromUrl = params?.orderId;

//   const API_URL = 'http://localhost:4000/api';

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('No token found. Please login.');

//       const userId = localStorage.getItem('userId');
//       const decoded = JSON.parse(atob(token.split('.')[1]));
//       const currentUserId = decoded.id || decoded.userId || userId;

//       console.log('🔍 Current user ID:', currentUserId);

//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       };

//       // 1. Profile
//       console.log('🔍 Fetching profile...');
//       const userRes = await axios.get(`${API_URL}/user/users/${currentUserId}`, config);
//       setUserData(userRes.data);
//       console.log('✅ Profile loaded');

//       // 2. Orders with FULL details
//       console.log('🔍 Fetching orders...');
//       const ordersRes = await axios.get(`${API_URL}/user/orders/user/${currentUserId}`, config);
//       setOrders(ordersRes.data || []);
//       console.log('✅ Orders:', ordersRes.data?.length || 0);

//       // 3. Addresses
//       console.log('🔍 Fetching addresses...');
//       const addressesRes = await axios.get(`${API_URL}/user/addresses/user/${currentUserId}`, config);
//       setAddresses(addressesRes.data || []);
//       console.log('✅ Addresses:', addressesRes.data?.length || 0);

//     } catch (err) {
//       console.error('❌ Dashboard error:', err.response?.status, err.message);
//       setError(err.response?.data?.message || 'Failed to load dashboard. Please refresh or login again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'delivered': return 'bg-green-100 text-green-800';
//       case 'shipped': return 'bg-blue-100 text-blue-800';
//       case 'processing': return 'bg-yellow-100 text-yellow-800';
//       case 'pending': return 'bg-orange-100 text-orange-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getPaymentStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'paid': return 'bg-green-100 text-green-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'failed': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
//         <div className="text-center">
//           <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mx-auto mb-6" />
//           <p className="text-xl font-semibold text-gray-700 mb-2">Loading your dashboard...</p>
//           <p className="text-gray-500">Fetching profile, orders & addresses</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
//         <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
//           <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
//             <Package className="w-10 h-10 text-red-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Error</h2>
//           <p className="text-gray-600 mb-8">{error}</p>
//           <div className="space-x-3">
//             <button
//               onClick={fetchUserData}
//               className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-200"
//             >
//               Retry
//             </button>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
//             >
//               Refresh
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 p-4 sm:p-6 lg:p-8 ">
//       <div className="max-w-7xl mx-auto py-20">
//         {/* Profile Card */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 mb-8">
//           <div className="flex items-center gap-6 mb-8">
//             <div className="w-20 h-20 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
//               {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                 Welcome back!
//               </h1>
//               <p className="text-gray-600">{userData?.name || 'User'}</p>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-3 gap-6">
//             <div className="flex items-center gap-3 p-4 bg-linear-to-r from-indigo-50 to-blue-50 rounded-2xl">
//               <Mail className="w-8 h-8 text-indigo-600" />
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Email</p>
//                 <p className="font-semibold text-gray-900">{userData?.email || 'N/A'}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 p-4 bg-linear-to-r from-emerald-50 to-green-50 rounded-2xl">
//               <Calendar className="w-8 h-8 text-emerald-600" />
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Member Since</p>
//                 <p className="font-semibold text-gray-900">{formatDate(userData?.createdAt)}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 p-4 bg-linear-to-r from-purple-50 to-pink-50 rounded-2xl">
//               <Package className="w-8 h-8 text-purple-600" />
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Total Orders</p>
//                 <p className="text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   {orders.length}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Orders Section */}
//           <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 order-2 lg:order-1">
//             <div className="flex items-center gap-4 mb-8">
//               <Package className="w-10 h-10 text-indigo-600 bg-indigo-100 p-3 rounded-2xl" />
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-800">My Orders</h2>
//                 <p className="text-gray-600">Track your beautiful frames</p>
//               </div>
//             </div>

//             {orders.length === 0 ? (
//               <div className="text-center py-20">
//                 <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
//                 <h3 className="text-2xl font-semibold text-gray-500 mb-2">No orders yet</h3>
//                 <p className="text-gray-400 mb-8 max-w-md mx-auto">
//                   Your custom photo frames and acrylic prints are waiting to be created!
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {orders.map((order) => (
//                   <div key={order._id} className="group border border-gray-200 rounded-2xl p-8 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-linear-to-b from-white to-gray-50">
//                     {/* Order Header */}
//                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-6 border-b border-gray-100 gap-4">
//                       <div>
//                         <h3 className="text-xl font-bold text-gray-900 mb-1">Order #{order.orderId}</h3>
//                         <p className="text-gray-500">{formatDate(order.createdAt)}</p>
//                       </div>
//                       <div className="flex flex-wrap gap-2">
//                         <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
//                           {order.status?.toUpperCase() || 'PENDING'}
//                         </span>
//                         <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
//                           {order.paymentStatus?.toUpperCase() || 'PENDING'}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Products with Images */}
//                     <div className="space-y-4 mb-8">
//                       {order.products?.map((item, idx) => (
//                         <div key={idx} className="flex gap-6 p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
//                           {/* Product Image */}
//                           <div className="w-28 h-28 flex-shrink-0 bg-linear-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
//                             {item.image ? (
//                               <img 
//                                 src={item.image} 
//                                 alt={item.name}
//                                 className="w-full h-full object-cover"
//                                 onError={(e) => {
//                                   e.target.style.display = 'none';
//                                   e.target.nextSibling.style.display = 'flex';
//                                 }}
//                               />
//                             ) : null}
//                             <ImageIcon className="w-12 h-12 text-gray-400 hidden group-hover:block" />
//                           </div>

//                           {/* Product Details */}
//                           <div className="flex-1 min-w-0">
//                             <h4 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-1">{item.name || `${item.size} ${item.orientation}`}</h4>
//                             <div className="grid grid-cols-2 gap-4 text-sm mb-3">
//                               <div>
//                                 <span className="text-gray-500">Frame:</span>
//                                 <p className="font-medium">{item.frameMaterial || 'N/A'} ({item.frameThickness || 'N/A'})</p>
//                               </div>
//                               <div>
//                                 <span className="text-gray-500">Size:</span>
//                                 <p className="font-medium">{item.size} {item.orientation}</p>
//                               </div>
//                               <div>
//                                 <span className="text-gray-500">Quantity:</span>
//                                 <p className="font-medium">{item.quantity || 1}</p>
//                               </div>
//                               <div>
//                                 <span className="text-gray-500">Price:</span>
//                                 <p className="font-semibold text-indigo-600">₹{item.price?.toFixed(0) || 0}</p>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Item Total */}
//                           <div className="text-right flex flex-col items-end">
//                             <p className="text-2xl font-bold text-gray-900">
//                               ₹{(item.price * (item.quantity || 1)).toFixed(0)}
//                             </p>
//                             <p className="text-sm text-gray-500">per item</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Order Summary */}
//                     <div className="flex flex-col sm:flex-row justify-between items-end gap-6 pt-6 border-t border-gray-100">
//                       <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
//                         <div className="flex items-center gap-2">
//                           <CreditCard className="w-5 h-5" />
//                           <span>{order.paymentMethod || 'Card'}</span>
//                         </div>
//                         {order.shippingMethod && (
//                           <div className="flex items-center gap-2">
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-4V7m8 10v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3" />
//                             </svg>
//                             <span>{order.shippingMethod}</span>
//                           </div>
//                         )}
//                       </div>
//                       <div className="text-right">
//                         <p className="text-lg text-gray-600 mb-1">Order Total</p>
//                         <p className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                           ₹{order.amount || order.totalAmount || 0}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Addresses Section */}
//           <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 order-1 lg:order-2">
//             <div className="flex items-center gap-4 mb-8">
//               <MapPin className="w-10 h-10 text-emerald-600 bg-emerald-100 p-3 rounded-2xl" />
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-800">Saved Addresses</h2>
//                 <p className="text-gray-600">Your delivery locations</p>
//               </div>
//             </div>

//             {addresses.length === 0 ? (
//               <div className="text-center py-20">
//                 <MapPin className="w-24 h-24 text-gray-300 mx-auto mb-6" />
//                 <h3 className="text-2xl font-semibold text-gray-500 mb-2">No addresses saved</h3>
//                 <p className="text-gray-400 mb-8 max-w-sm mx-auto">
//                   Add your delivery address to checkout faster next time
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {addresses.map((address, idx) => (
//                   <div key={address._id} className="group border border-gray-200 hover:border-emerald-300 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 bg-linear-to-b from-white to-gray-50 hover:-translate-y-1">
//                     {/* Address Header */}
//                     <div className="flex items-start justify-between mb-4">
//                       <div>
//                         <h4 className="font-bold text-lg text-gray-900 capitalize">
//                           {address.firstName || 'N/A'} {address.lastName || ''}
//                         </h4>
//                         <p className="text-2xl font-semibold text-gray-800 mt-1">
//                           {address.phone || 'Phone number missing'}
//                         </p>
//                       </div>
//                       {address.isDefault && (
//                         <span className="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
//                           Default
//                         </span>
//                       )}
//                     </div>

//                     {/* Address Details with Placeholders */}
//                     <div className="space-y-2 text-gray-700 text-sm mb-6">
//                       <div className="flex items-start gap-3 p-3 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl">
//                         <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
//                         <div className="space-y-1 min-w-0">
//                           <p><span className="font-semibold text-gray-900">Street:</span> {address.street || address.address || 'Street address missing'}</p>
//                           <p><span className="font-semibold text-gray-900">Area:</span> {address.area || 'Area/Locality missing'}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-3 p-3 bg-linear-to-r from-emerald-50 to-green-50 rounded-xl">
//                         <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
//                         <div>
//                           <p><span className="font-semibold text-gray-900">Phone:</span> {address.phone || 'Phone number missing'}</p>
//                         </div>
//                       </div>
//                       <div className="p-3 bg-linear-to-r from-purple-50 to-pink-50 rounded-xl">
//                         <p className="font-semibold text-gray-900">Location</p>
//                         <p>{address.city || 'City missing'}, {address.state || 'State missing'} - {address.pincode || 'PIN missing'}</p>
//                       </div>
//                     </div>

//                     {/* Order Reference */}
//                     {address.orderId && (
//                       <div className="pt-4 border-t border-gray-200">
//                         <p className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block font-medium">
//                           Used for Order #{address.orderId}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;




// 'use client';

// import React, { useState, useEffect } from 'react';
// import { User, Package, MapPin, Loader2, Calendar, CreditCard, ShoppingBag, Image as ImageIcon, Phone, Mail } from 'lucide-react';
// import axios from 'axios';
// import { useParams } from 'next/navigation';

// const UserDashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [addresses, setAddresses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const params = useParams();
//   const orderIdFromUrl = params?.orderId;

//   const API_URL = 'http://localhost:4000/api';

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('No token found. Please login.');

//       const userId = localStorage.getItem('userId');
//       const decoded = JSON.parse(atob(token.split('.')[1]));
//       const currentUserId = decoded.id || decoded.userId || userId;

//       console.log('🔍 Current user ID:', currentUserId);

//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       };

//       // 1. Profile
//       console.log('🔍 Fetching profile...');
//       const userRes = await axios.get(`${API_URL}/user/users/${currentUserId}`, config);
//       setUserData(userRes.data);
//       console.log('✅ Profile loaded');

//       // 2. Orders with FULL details
//       console.log('🔍 Fetching orders...');
//       const ordersRes = await axios.get(`${API_URL}/user/orders/user/${currentUserId}`, config);
//       setOrders(ordersRes.data || []);
//       console.log('✅ Orders:', ordersRes.data?.length || 0);

//       // 3. Addresses
//       console.log('🔍 Fetching addresses...');
//       const addressesRes = await axios.get(`${API_URL}/user/addresses/user/${currentUserId}`, config);
//       setAddresses(addressesRes.data || []);
//       console.log('✅ Addresses:', addressesRes.data?.length || 0);

//     } catch (err) {
//       console.error('❌ Dashboard error:', err.response?.status, err.message);
//       setError(err.response?.data?.message || 'Failed to load dashboard. Please refresh or login again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'delivered': return 'bg-green-100 text-green-800';
//       case 'shipped': return 'bg-blue-100 text-blue-800';
//       case 'processing': return 'bg-yellow-100 text-yellow-800';
//       case 'pending': return 'bg-orange-100 text-orange-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getPaymentStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'paid': return 'bg-green-100 text-green-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'failed': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
//         <div className="text-center">
//           <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mx-auto mb-6" />
//           <p className="text-xl font-semibold text-gray-700 mb-2">Loading your dashboard...</p>
//           <p className="text-gray-500">Fetching profile, orders & addresses</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
//         <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
//           <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
//             <Package className="w-10 h-10 text-red-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Error</h2>
//           <p className="text-gray-600 mb-8">{error}</p>
//           <div className="space-x-3">
//             <button
//               onClick={fetchUserData}
//               className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-200"
//             >
//               Retry
//             </button>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
//             >
//               Refresh
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 p-4 sm:p-6 lg:p-8 ">
//       <div className="max-w-7xl mx-auto py-20">
//         {/* Profile Card */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 mb-8">
//           <div className="flex items-center gap-6 mb-8">
//             <div className="w-20 h-20 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
//               {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                 Welcome back!
//               </h1>
//               <p className="text-gray-600">{userData?.name || 'User'}</p>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-3 gap-6">
//             <div className="flex items-center gap-3 p-4 bg-linear-to-r from-indigo-50 to-blue-50 rounded-2xl">
//               <Mail className="w-8 h-8 text-indigo-600" />
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Email</p>
//                 <p className="font-semibold text-gray-900">{userData?.email || 'N/A'}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 p-4 bg-linear-to-r from-emerald-50 to-green-50 rounded-2xl">
//               <Calendar className="w-8 h-8 text-emerald-600" />
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Member Since</p>
//                 <p className="font-semibold text-gray-900">{formatDate(userData?.createdAt)}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 p-4 bg-linear-to-r from-purple-50 to-pink-50 rounded-2xl">
//               <Package className="w-8 h-8 text-purple-600" />
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Total Orders</p>
//                 <p className="text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                   {orders.length}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Orders Section */}
//           <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 order-2 lg:order-1">
//             <div className="flex items-center gap-4 mb-8">
//               <Package className="w-10 h-10 text-indigo-600 bg-indigo-100 p-3 rounded-2xl" />
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-800">My Orders</h2>
//                 <p className="text-gray-600">Track your beautiful frames</p>
//               </div>
//             </div>

//             {orders.length === 0 ? (
//               <div className="text-center py-20">
//                 <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
//                 <h3 className="text-2xl font-semibold text-gray-500 mb-2">No orders yet</h3>
//                 <p className="text-gray-400 mb-8 max-w-md mx-auto">
//                   Your custom photo frames and acrylic prints are waiting to be created!
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {orders.map((order) => (
//                   <div key={order._id} className="group border border-gray-200 rounded-2xl p-8 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-linear-to-b from-white to-gray-50">
//                     {/* Order Header */}
//                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-6 border-b border-gray-100 gap-4">
//                       <div>
//                         <h3 className="text-xl font-bold text-gray-900 mb-1">Order #{order.orderId}</h3>
//                         <p className="text-gray-500">{formatDate(order.createdAt)}</p>
//                       </div>
//                       <div className="flex flex-wrap gap-2">
//                         <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
//                           {order.status?.toUpperCase() || 'PENDING'}
//                         </span>
//                         <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
//                           {order.paymentStatus?.toUpperCase() || 'PENDING'}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Products with Complete Details */}
//                     <div className="space-y-4 mb-8">
//                       {order.products?.map((item, idx) => (
//                         <div key={idx} className="flex gap-6 p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
//                           {/* Product Image */}
//                           <div className="w-32 h-32 flex-shrink-0 bg-linear-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center overflow-hidden border-2 border-gray-200">
//                             {item.imageUrl || item.image ? (
//                               <img 
//                                 src={item.imageUrl || item.image} 
//                                 alt={item.name || 'Product'}
//                                 className="w-full h-full object-cover"
//                                 onError={(e) => {
//                                   e.target.style.display = 'none';
//                                   e.target.nextSibling.style.display = 'flex';
//                                 }}
//                               />
//                             ) : null}
//                             <div className="flex flex-col items-center justify-center">
//                               <ImageIcon className="w-12 h-12 text-gray-400" />
//                               <p className="text-xs text-gray-400 mt-2">No Image</p>
//                             </div>
//                           </div>

//                           {/* Product Details */}
//                           <div className="flex-1 min-w-0">
//                             <h4 className="font-bold text-gray-900 text-lg mb-3 line-clamp-1">
//                               {item.name || `${item.size || 'Custom'} ${item.orientation || 'Frame'}`}
//                             </h4>
//                             <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
//                               <div className="bg-blue-50 p-3 rounded-lg">
//                                 <span className="text-blue-600 font-semibold block mb-1">Size</span>
//                                 <p className="font-medium text-gray-900">{item.size || 'N/A'}</p>
//                               </div>
//                               <div className="bg-purple-50 p-3 rounded-lg">
//                                 <span className="text-purple-600 font-semibold block mb-1">Orientation</span>
//                                 <p className="font-medium text-gray-900 capitalize">{item.orientation || 'N/A'}</p>
//                               </div>
//                               <div className="bg-emerald-50 p-3 rounded-lg">
//                                 <span className="text-emerald-600 font-semibold block mb-1">Quantity</span>
//                                 <p className="font-medium text-gray-900">{item.quantity || 1}</p>
//                               </div>
//                               <div className="bg-orange-50 p-3 rounded-lg">
//                                 <span className="text-orange-600 font-semibold block mb-1">Frame Material</span>
//                                 <p className="font-medium text-gray-900 capitalize">{item.frameMaterial || 'N/A'}</p>
//                               </div>
//                               <div className="bg-pink-50 p-3 rounded-lg">
//                                 <span className="text-pink-600 font-semibold block mb-1">Frame Color</span>
//                                 <p className="font-medium text-gray-900">{item.frameColor || 'N/A'}</p>
//                               </div>
//                               <div className="bg-indigo-50 p-3 rounded-lg">
//                                 <span className="text-indigo-600 font-semibold block mb-1">Thickness</span>
//                                 <p className="font-medium text-gray-900">{item.frameThickness ? `${item.frameThickness}mm` : 'N/A'}</p>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Item Total */}
//                           <div className="text-right flex flex-col items-end justify-between">
//                             <div>
//                               <p className="text-sm text-gray-500 mb-1">Unit Price</p>
//                               <p className="text-lg font-semibold text-indigo-600">₹{item.price?.toFixed(0) || 0}</p>
//                             </div>
//                             <div className="mt-4">
//                               <p className="text-sm text-gray-500 mb-1">Item Total</p>
//                               <p className="text-2xl font-bold text-gray-900">
//                                 ₹{(item.price * (item.quantity || 1)).toFixed(0)}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Order Summary */}
//                     <div className="flex flex-col sm:flex-row justify-between items-end gap-6 pt-6 border-t border-gray-100">
//                       <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
//                         <div className="flex items-center gap-2">
//                           <CreditCard className="w-5 h-5" />
//                           <span>{order.paymentMethod || 'Card'}</span>
//                         </div>
//                         {order.shippingMethod && (
//                           <div className="flex items-center gap-2">
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-4V7m8 10v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3" />
//                             </svg>
//                             <span>{order.shippingMethod}</span>
//                           </div>
//                         )}
//                       </div>
//                       <div className="text-right">
//                         <p className="text-lg text-gray-600 mb-1">Order Total</p>
//                         <p className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                           ₹{order.amount || order.totalAmount || 0}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Addresses Section */}
//           <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 order-1 lg:order-2">
//             <div className="flex items-center gap-4 mb-8">
//               <MapPin className="w-10 h-10 text-emerald-600 bg-emerald-100 p-3 rounded-2xl" />
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-800">Saved Addresses</h2>
//                 <p className="text-gray-600">Your delivery locations</p>
//               </div>
//             </div>

//             {addresses.length === 0 ? (
//               <div className="text-center py-20">
//                 <MapPin className="w-24 h-24 text-gray-300 mx-auto mb-6" />
//                 <h3 className="text-2xl font-semibold text-gray-500 mb-2">No addresses saved</h3>
//                 <p className="text-gray-400 mb-8 max-w-sm mx-auto">
//                   Add your delivery address to checkout faster next time
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {addresses.map((address, idx) => (
//                   <div key={address._id} className="group border border-gray-200 hover:border-emerald-300 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 bg-linear-to-b from-white to-gray-50 hover:-translate-y-1">
//                     {/* Address Header */}
//                     <div className="flex items-start justify-between mb-4">
//                       <div>
//                         <h4 className="font-bold text-lg text-gray-900 capitalize">
//                           {address.firstName || 'N/A'} {address.lastName || ''}
//                         </h4>
//                         <p className="text-2xl font-semibold text-gray-800 mt-1">
//                           {address.phone || 'Phone number missing'}
//                         </p>
//                       </div>
//                       {address.isDefault && (
//                         <span className="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
//                           Default
//                         </span>
//                       )}
//                     </div>

//                     {/* Address Details with Placeholders */}
//                     <div className="space-y-2 text-gray-700 text-sm mb-6">
//                       <div className="flex items-start gap-3 p-3 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl">
//                         <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
//                         <div className="space-y-1 min-w-0">
//                           <p><span className="font-semibold text-gray-900">Street:</span> {address.street || address.address || 'Street address missing'}</p>
//                           <p><span className="font-semibold text-gray-900">Area:</span> {address.area || 'Area/Locality missing'}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-3 p-3 bg-linear-to-r from-emerald-50 to-green-50 rounded-xl">
//                         <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
//                         <div>
//                           <p><span className="font-semibold text-gray-900">Phone:</span> {address.phone || 'Phone number missing'}</p>
//                         </div>
//                       </div>
//                       <div className="p-3 bg-linear-to-r from-purple-50 to-pink-50 rounded-xl">
//                         <p className="font-semibold text-gray-900">Location</p>
//                         <p>{address.city || 'City missing'}, {address.state || 'State missing'} - {address.pincode || 'PIN missing'}</p>
//                       </div>
//                     </div>

//                     {/* Order Reference */}
//                     {address.orderId && (
//                       <div className="pt-4 border-t border-gray-200">
//                         <p className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block font-medium">
//                           Used for Order #{address.orderId}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;



'use client';

import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, Loader2, Calendar, CreditCard, ShoppingBag, Image as ImageIcon, Phone, Mail } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'next/navigation';

import Sidebar from '@/components/section/Sidebar';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const orderIdFromUrl = params?.orderId;

  const API_URL = 'http://localhost:4000/api';

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found. Please login.');

      const userId = localStorage.getItem('userId');
      const decoded = JSON.parse(atob(token.split('.')[1]));
      const currentUserId = decoded.id || decoded.userId || userId;

      console.log('🔍 Current user ID:', currentUserId);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      // 1. Profile
      console.log('🔍 Fetching profile...');
      const userRes = await axios.get(`${API_URL}/user/users/${currentUserId}`, config);
      setUserData(userRes.data);
      console.log('✅ Profile loaded');

      // 2. Orders with FULL details
      console.log('🔍 Fetching orders...');
      const ordersRes = await axios.get(`${API_URL}/user/orders/user/${currentUserId}`, config);
      setOrders(ordersRes.data || []);
      console.log('✅ Orders:', ordersRes.data?.length || 0);

      // 3. Addresses
      console.log('🔍 Fetching addresses...');
      const addressesRes = await axios.get(`${API_URL}/user/addresses/user/${currentUserId}`, config);
      setAddresses(addressesRes.data || []);
      console.log('✅ Addresses:', addressesRes.data?.length || 0);

    } catch (err) {
      console.error('❌ Dashboard error:', err.response?.status, err.message);
      setError(err.response?.data?.message || 'Failed to load dashboard. Please refresh or login again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mx-auto mb-6" />
          <p className="text-xl font-semibold text-gray-700 mb-2">Loading your dashboard...</p>
          <p className="text-gray-500">Fetching profile, orders & addresses</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Error</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <div className="space-x-3">
            <button
              onClick={fetchUserData}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-200"
            >
              Retry
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    // <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 p-4 sm:p-6 lg:p-8 ">
    //   <div className="max-w-7xl mx-auto py-20">
    //     {/* Profile Card */}
    //     <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 mb-8">
    //       <div className="flex items-center gap-6 mb-8">
    //         <div className="w-20 h-20 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
    //           {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
    //         </div>
    //         <div>
    //           <h1 className="text-3xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
    //             Welcome back!
    //           </h1>
    //           <p className="text-gray-600">{userData?.name || 'User'}</p>
    //         </div>
    //       </div>

    //       <div className="grid md:grid-cols-3 gap-6">
    //         <div className="flex items-center gap-3 p-4 bg-linear-to-r from-indigo-50 to-blue-50 rounded-2xl">
    //           <Mail className="w-8 h-8 text-indigo-600" />
    //           <div>
    //             <p className="text-sm font-medium text-gray-500">Email</p>
    //             <p className="font-semibold text-gray-900">{userData?.email || 'N/A'}</p>
    //           </div>
    //         </div>
    //         <div className="flex items-center gap-3 p-4 bg-linear-to-r from-emerald-50 to-green-50 rounded-2xl">
    //           <Calendar className="w-8 h-8 text-emerald-600" />
    //           <div>
    //             <p className="text-sm font-medium text-gray-500">Member Since</p>
    //             <p className="font-semibold text-gray-900">{formatDate(userData?.createdAt)}</p>
    //           </div>
    //         </div>
    //         <div className="flex items-center gap-3 p-4 bg-linear-to-r from-purple-50 to-pink-50 rounded-2xl">
    //           <Package className="w-8 h-8 text-purple-600" />
    //           <div>
    //             <p className="text-sm font-medium text-gray-500">Total Orders</p>
    //             <p className="text-2xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
    //               {orders.length}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="grid lg:grid-cols-2 gap-8">
    //       {/* Orders Section */}
    //       <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 order-2 lg:order-1">
    //         <div className="flex items-center gap-4 mb-8">
    //           <Package className="w-10 h-10 text-indigo-600 bg-indigo-100 p-3 rounded-2xl" />
    //           <div>
    //             <h2 className="text-3xl font-bold text-gray-800">My Orders</h2>
    //             <p className="text-gray-600">Track your beautiful frames</p>
    //           </div>
    //         </div>

    //         {orders.length === 0 ? (
    //           <div className="text-center py-20">
    //             <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
    //             <h3 className="text-2xl font-semibold text-gray-500 mb-2">No orders yet</h3>
    //             <p className="text-gray-400 mb-8 max-w-md mx-auto">
    //               Your custom photo frames and acrylic prints are waiting to be created!
    //             </p>
    //           </div>
    //         ) : (
    //           <div className="space-y-6">
    //             {orders.map((order) => (
    //               <div key={order._id} className="group border border-gray-200 rounded-2xl p-8 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-linear-to-b from-white to-gray-50">
    //                 {/* Order Header */}
    //                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-6 border-b border-gray-100 gap-4">
    //                   <div>
    //                     <h3 className="text-xl font-bold text-gray-900 mb-1">Order #{order.orderId}</h3>
    //                     <p className="text-gray-500">{formatDate(order.createdAt)}</p>
    //                   </div>
    //                   <div className="flex flex-wrap gap-2">
    //                     <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
    //                       {order.status?.toUpperCase() || 'PENDING'}
    //                     </span>
    //                     <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
    //                       {order.paymentStatus?.toUpperCase() || 'PENDING'}
    //                     </span>
    //                   </div>
    //                 </div>

    //                 {/* Products with Complete Details */}
    //                 <div className="space-y-4 mb-8">
    //                   {(order.items || order.products)?.map((item, idx) => (
    //                     <div key={idx} className="flex gap-6 p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
    //                       {/* Product Image */}
    //                       <div className="w-32 h-32 flex-shrink-0 bg-linear-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center overflow-hidden border-2 border-gray-200">
    //                         {item.imageUrl || item.image ? (
    //                           <img 
    //                             src={item.imageUrl || item.image} 
    //                             alt={item.name || 'Product'}
    //                             className="w-full h-full object-cover"
    //                             onError={(e) => {
    //                               e.target.style.display = 'none';
    //                               e.target.nextSibling.style.display = 'flex';
    //                             }}
    //                           />
    //                         ) : null}
    //                         <div className="flex flex-col items-center justify-center">
    //                           <ImageIcon className="w-12 h-12 text-gray-400" />
    //                           <p className="text-xs text-gray-400 mt-2">No Image</p>
    //                         </div>
    //                       </div>

    //                       {/* Product Details */}
    //                       <div className="flex-1 min-w-0">
    //                         <h4 className="font-bold text-gray-900 text-lg mb-3 line-clamp-1">
    //                           {item.name || `${item.size || 'Custom'} ${item.orientation || 'Frame'}`}
    //                         </h4>
    //                         <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
    //                           <div className="bg-blue-50 p-3 rounded-lg">
    //                             <span className="text-blue-600 font-semibold block mb-1">Size</span>
    //                             <p className="font-medium text-gray-900">{item.size || 'N/A'}</p>
    //                           </div>
    //                           <div className="bg-purple-50 p-3 rounded-lg">
    //                             <span className="text-purple-600 font-semibold block mb-1">Orientation</span>
    //                             <p className="font-medium text-gray-900 capitalize">{item.orientation || 'N/A'}</p>
    //                           </div>
    //                           <div className="bg-emerald-50 p-3 rounded-lg">
    //                             <span className="text-emerald-600 font-semibold block mb-1">Quantity</span>
    //                             <p className="font-medium text-gray-900">{item.quantity || 1}</p>
    //                           </div>
    //                           <div className="bg-orange-50 p-3 rounded-lg">
    //                             <span className="text-orange-600 font-semibold block mb-1">Frame Material</span>
    //                             <p className="font-medium text-gray-900 capitalize">{item.frameMaterial || 'N/A'}</p>
    //                           </div>
    //                           <div className="bg-pink-50 p-3 rounded-lg">
    //                             <span className="text-pink-600 font-semibold block mb-1">Frame Color</span>
    //                             <p className="font-medium text-gray-900">{item.frameColor || 'N/A'}</p>
    //                           </div>
    //                           <div className="bg-indigo-50 p-3 rounded-lg">
    //                             <span className="text-indigo-600 font-semibold block mb-1">Thickness</span>
    //                             <p className="font-medium text-gray-900">{item.frameThickness ? `${item.frameThickness}mm` : 'N/A'}</p>
    //                           </div>
    //                         </div>
    //                       </div>

    //                       {/* Item Total */}
    //                       <div className="text-right flex flex-col items-end justify-between">
    //                         <div>
    //                           <p className="text-sm text-gray-500 mb-1">Unit Price</p>
    //                           <p className="text-lg font-semibold text-indigo-600">₹{item.price?.toFixed(0) || 0}</p>
    //                         </div>
    //                         <div className="mt-4">
    //                           <p className="text-sm text-gray-500 mb-1">Item Total</p>
    //                           <p className="text-2xl font-bold text-gray-900">
    //                             ₹{(item.price * (item.quantity || 1)).toFixed(0)}
    //                           </p>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   ))}
    //                 </div>

    //                 {/* Order Summary */}
    //                 <div className="flex flex-col sm:flex-row justify-between items-end gap-6 pt-6 border-t border-gray-100">
    //                   <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
    //                     <div className="flex items-center gap-2">
    //                       <CreditCard className="w-5 h-5" />
    //                       <span>{order.paymentMethod || 'Card'}</span>
    //                     </div>
    //                     {order.shippingMethod && (
    //                       <div className="flex items-center gap-2">
    //                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-4V7m8 10v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3" />
    //                         </svg>
    //                         <span>{order.shippingMethod}</span>
    //                       </div>
    //                     )}
    //                   </div>
    //                   <div className="text-right">
    //                     <p className="text-lg text-gray-600 mb-1">Order Total</p>
    //                     <p className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
    //                       ₹{order.amount || order.totalAmount || 0}
    //                     </p>
    //                   </div>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         )}
    //       </div>

    //       {/* Addresses Section */}
    //       <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 order-1 lg:order-2">
    //         <div className="flex items-center gap-4 mb-8">
    //           <MapPin className="w-10 h-10 text-emerald-600 bg-emerald-100 p-3 rounded-2xl" />
    //           <div>
    //             <h2 className="text-3xl font-bold text-gray-800">Saved Addresses</h2>
    //             <p className="text-gray-600">Your delivery locations</p>
    //           </div>
    //         </div>

    //         {addresses.length === 0 ? (
    //           <div className="text-center py-20">
    //             <MapPin className="w-24 h-24 text-gray-300 mx-auto mb-6" />
    //             <h3 className="text-2xl font-semibold text-gray-500 mb-2">No addresses saved</h3>
    //             <p className="text-gray-400 mb-8 max-w-sm mx-auto">
    //               Add your delivery address to checkout faster next time
    //             </p>
    //           </div>
    //         ) : (
    //           <div className="space-y-4">
    //             {addresses.map((address, idx) => (
    //               <div key={address._id} className="group border border-gray-200 hover:border-emerald-300 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 bg-linear-to-b from-white to-gray-50 hover:-translate-y-1">
    //                 {/* Address Header */}
    //                 <div className="flex items-start justify-between mb-4">
    //                   <div>
    //                     <h4 className="font-bold text-lg text-gray-900 capitalize">
    //                       {address.firstName || 'N/A'} {address.lastName || ''}
    //                     </h4>
    //                     <p className="text-2xl font-semibold text-gray-800 mt-1">
    //                       {address.phone || 'Phone number missing'}
    //                     </p>
    //                   </div>
    //                   {address.isDefault && (
    //                     <span className="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
    //                       Default
    //                     </span>
    //                   )}
    //                 </div>

    //                 {/* Address Details with Placeholders */}
    //                 <div className="space-y-2 text-gray-700 text-sm mb-6">
    //                   <div className="flex items-start gap-3 p-3 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl">
    //                     <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
    //                     <div className="space-y-1 min-w-0">
    //                       <p><span className="font-semibold text-gray-900">Street:</span> {address.street || address.address || 'Street address missing'}</p>
    //                       <p><span className="font-semibold text-gray-900">Area:</span> {address.area || 'Area/Locality missing'}</p>
    //                     </div>
    //                   </div>
    //                   <div className="flex items-center gap-3 p-3 bg-linear-to-r from-emerald-50 to-green-50 rounded-xl">
    //                     <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
    //                     <div>
    //                       <p><span className="font-semibold text-gray-900">Phone:</span> {address.phone || 'Phone number missing'}</p>
    //                     </div>
    //                   </div>
    //                   <div className="p-3 bg-linear-to-r from-purple-50 to-pink-50 rounded-xl">
    //                     <p className="font-semibold text-gray-900">Location</p>
    //                     <p>{address.city || 'City missing'}, {address.state || 'State missing'} - {address.pincode || 'PIN missing'}</p>
    //                   </div>
    //                 </div>

    //                 {/* Order Reference */}
    //                 {address.orderId && (
    //                   <div className="pt-4 border-t border-gray-200">
    //                     <p className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block font-medium">
    //                       Used for Order #{address.orderId}
    //                     </p>
    //                   </div>
    //                 )}
    //               </div>
    //             ))}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>


    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 sm:p-6 lg:p-8">
      <Sidebar />
      <div className="max-w-7xl mx-auto py-8 sm:py-12 lg:py-20">
        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/50 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg flex-shrink-0">
              {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent truncate">
                Welcome back!
              </h1>
              <p className="text-gray-600 truncate">{userData?.name || 'User'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl sm:rounded-2xl">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Email</p>
                <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{userData?.email || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl sm:rounded-2xl">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Member Since</p>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">{formatDate(userData?.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl sm:col-span-2 md:col-span-1">
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {orders.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Orders Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/50 p-4 sm:p-6 lg:p-8 order-2 lg:order-1">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Package className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600 bg-indigo-100 p-2 sm:p-3 rounded-xl sm:rounded-2xl flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">My Orders</h2>
                <p className="text-sm sm:text-base text-gray-600">Track your beautiful frames</p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12 sm:py-20">
                <ShoppingBag className="w-16 h-16 sm:w-24 sm:h-24 text-gray-300 mx-auto mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-500 mb-2">No orders yet</h3>
                <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto px-4">
                  Your custom photo frames and acrylic prints are waiting to be created!
                </p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {orders.map((order) => (
                  <div key={order._id} className="group border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-white to-gray-50">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-100 gap-3 sm:gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 truncate">Order #{order.orderId}</h3>
                        <p className="text-sm sm:text-base text-gray-500">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                        <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${getStatusColor(order.status)}`}>
                          {order.status?.toUpperCase() || 'PENDING'}
                        </span>
                        <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus?.toUpperCase() || 'PENDING'}
                        </span>
                      </div>
                    </div>

                    {/* Products with Complete Details */}
                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      {(order.items || order.products)?.map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                          {/* Product Image */}
                          <div className="w-full sm:w-24 md:w-32 h-32 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center overflow-hidden border-2 border-gray-200">
                            {item.imageUrl || item.image ? (
                              <img
                                src={item.imageUrl || item.image}
                                alt={item.name || 'Product'}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div className="flex flex-col items-center justify-center">
                              <ImageIcon className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
                              <p className="text-xs text-gray-400 mt-2">No Image</p>
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-2 sm:mb-3 line-clamp-2">
                              {item.name || `${item.size || 'Custom'} ${item.orientation || 'Frame'}`}
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
                              <div className="bg-blue-50 p-2 sm:p-3 rounded-lg">
                                <span className="text-blue-600 font-semibold block mb-1">Size</span>
                                <p className="font-medium text-gray-900 truncate">{item.size || 'N/A'}</p>
                              </div>
                              <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
                                <span className="text-purple-600 font-semibold block mb-1">Orientation</span>
                                <p className="font-medium text-gray-900 capitalize truncate">{item.orientation || 'N/A'}</p>
                              </div>
                              <div className="bg-emerald-50 p-2 sm:p-3 rounded-lg">
                                <span className="text-emerald-600 font-semibold block mb-1">Quantity</span>
                                <p className="font-medium text-gray-900">{item.quantity || 1}</p>
                              </div>
                              <div className="bg-orange-50 p-2 sm:p-3 rounded-lg">
                                <span className="text-orange-600 font-semibold block mb-1">Material</span>
                                <p className="font-medium text-gray-900 capitalize truncate">{item.frameMaterial || 'N/A'}</p>
                              </div>
                              <div className="bg-pink-50 p-2 sm:p-3 rounded-lg">
                                <span className="text-pink-600 font-semibold block mb-1">Color</span>
                                <p className="font-medium text-gray-900 truncate">{item.frameColor || 'N/A'}</p>
                              </div>
                              <div className="bg-indigo-50 p-2 sm:p-3 rounded-lg">
                                <span className="text-indigo-600 font-semibold block mb-1">Thickness</span>
                                <p className="font-medium text-gray-900">{item.frameThickness ? `${item.frameThickness}mm` : 'N/A'}</p>
                              </div>
                            </div>
                          </div>

                          {/* Item Total - Responsive */}
                          <div className="flex sm:flex-col justify-between sm:justify-between items-center sm:items-end gap-4 sm:gap-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                            <div className="text-left sm:text-right">
                              <p className="text-xs sm:text-sm text-gray-500 mb-1">Unit Price</p>
                              <p className="text-base sm:text-lg font-semibold text-indigo-600">₹{item.price?.toFixed(0) || 0}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs sm:text-sm text-gray-500 mb-1">Item Total</p>
                              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                                ₹{(item.price * (item.quantity || 1)).toFixed(0)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 flex-wrap">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                          <span>{order.paymentMethod || 'Card'}</span>
                        </div>
                        {order.shippingMethod && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-4V7m8 10v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3" />
                            </svg>
                            <span>{order.shippingMethod}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        <p className="text-base sm:text-lg text-gray-600 mb-1">Order Total</p>
                        <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          ₹{order.amount || order.totalAmount || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Addresses Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/50 p-4 sm:p-6 lg:p-8 order-1 lg:order-2">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 bg-emerald-100 p-2 sm:p-3 rounded-xl sm:rounded-2xl flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Saved Addresses</h2>
                <p className="text-sm sm:text-base text-gray-600">Your delivery locations</p>
              </div>
            </div>

            {addresses.length === 0 ? (
              <div className="text-center py-12 sm:py-20">
                <MapPin className="w-16 h-16 sm:w-24 sm:h-24 text-gray-300 mx-auto mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-500 mb-2">No addresses saved</h3>
                <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 max-w-sm mx-auto px-4">
                  Add your delivery address to checkout faster next time
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {addresses.map((address, idx) => (
                  <div key={address._id} className="group border border-gray-200 hover:border-emerald-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-white to-gray-50 hover:-translate-y-1">
                    {/* Address Header */}
                    <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-base sm:text-lg text-gray-900 capitalize truncate">
                          {address.firstName || 'N/A'} {address.lastName || ''}
                        </h4>
                        <p className="text-lg sm:text-2xl font-semibold text-gray-800 mt-1">
                          {address.phone || 'Phone number missing'}
                        </p>
                      </div>
                      {address.isDefault && (
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full flex-shrink-0">
                          Default
                        </span>
                      )}
                    </div>

                    {/* Address Details with Placeholders */}
                    <div className="space-y-2 text-gray-700 text-xs sm:text-sm mb-4 sm:mb-6">
                      <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="space-y-1 min-w-0 flex-1">
                          <p className="break-words"><span className="font-semibold text-gray-900">Street:</span> {address.street || address.address || 'Street address missing'}</p>
                          <p className="break-words"><span className="font-semibold text-gray-900">Area:</span> {address.area || 'Area/Locality missing'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg sm:rounded-xl">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="break-words"><span className="font-semibold text-gray-900">Phone:</span> {address.phone || 'Phone number missing'}</p>
                        </div>
                      </div>
                      <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg sm:rounded-xl">
                        <p className="font-semibold text-gray-900 mb-1">Location</p>
                        <p className="break-words">{address.city || 'City missing'}, {address.state || 'State missing'} - {address.pincode || 'PIN missing'}</p>
                      </div>
                    </div>

                    {/* Order Reference */}
                    {address.orderId && (
                      <div className="pt-3 sm:pt-4 border-t border-gray-200">
                        <p className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block font-medium">
                          Used for Order #{address.orderId}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default UserDashboard;