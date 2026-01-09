// 'use client';

// import { useEffect, useState } from 'react';
// import { Trash2 } from 'lucide-react';
// import { useCart } from '@/context/CartContext';

// export default function CartPage() {
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Load cart from localStorage (guest cart)
//   useEffect(() => {
//     const saved = localStorage.getItem('frame-cart');
//     if (saved) {
//       setCart(JSON.parse(saved));
//     }
//     setLoading(false);
//   }, []);

//   const saveCart = (next) => {
//     setCart(next);
//     localStorage.setItem('frame-cart', JSON.stringify(next));
//   };

//   const updateQty = (productId, qty) => {
//     if (qty < 1) return;
//     saveCart(
//       cart.map((item) =>
//         item.productId === productId ? { ...item, quantity: qty } : item
//       )
//     );
//   };

//   const removeItem = (productId) => {
//     saveCart(cart.filter((item) => item.productId !== productId));
//   };

//   const subtotal = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   if (loading) {
//     return (
//       <main className="max-w-4xl mx-auto px-4 py-16">
//         <p className="text-slate-500">Loading your frames…</p>
//       </main>
//     );
//   }
//   const { cart } = useCart();

//   if (cart.length === 0) {
//     return (
//       <main className="max-w-4xl mx-auto px-4 py-16">
//         <h1 className="text-3xl font-bold mb-4 text-slate-900">Your Frame Cart</h1>
//         <p className="text-slate-500">No frames added yet.</p>
//       </main>
//     );
//   }

//   return (
//     <main className="max-w-4xl mx-auto px-4 py-16">
//       <h1 className="text-3xl font-bold mb-6 text-slate-900">Your Frame Cart</h1>

//       <div className="space-y-4 mb-8">
//         {cart.map((item) => (
//           <div
//             key={item.productId}
//             className="flex gap-4 bg-white rounded-xl shadow-sm p-4 items-center"
//           >
//             {item.imageUrl ? (
//               <img
//                 src={item.imageUrl}
//                 alt={item.title}
//                 className="w-20 h-20 rounded-lg object-cover"
//               />
//             ) : (
//               <div className="w-20 h-20 rounded-lg bg-slate-100" />
//             )}

//             <div className="flex-1">
//               <h2 className="font-semibold text-slate-900">{item.title}</h2>
//               <p className="text-sm text-slate-500">
//                 ₹ {item.price.toLocaleString('en-IN')} per frame
//               </p>
//             </div>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => updateQty(item.productId, item.quantity - 1)}
//                 className="px-2 py-1 rounded bg-slate-100"
//               >
//                 -
//               </button>
//               <span className="w-8 text-center">{item.quantity}</span>
//               <button
//                 onClick={() => updateQty(item.productId, item.quantity + 1)}
//                 className="px-2 py-1 rounded bg-slate-100"
//               >
//                 +
//               </button>
//             </div>

//             <div className="w-28 text-right font-semibold text-slate-900">
//               ₹ {(item.price * item.quantity).toLocaleString('en-IN')}
//             </div>

//             <button
//               onClick={() => removeItem(item.productId)}
//               className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-between items-center border-t pt-4">
//         <p className="text-xl font-bold text-slate-900">
//           Subtotal: ₹ {subtotal.toLocaleString('en-IN')}
//         </p>
//         <button
//           onClick={() => {
//             // later: call backend /api/orders to place frame order
//           }}
//           className="px-6 py-3 rounded-full bg-slate-900 text-white hover:bg-slate-800"
//         >
//           Checkout Frames
//         </button>
//       </div>
//     </main>
//   );
// }



// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useCart } from '@/context/cartContext';
// import {
//   ShoppingCart,
//   Trash2,
//   Plus,
//   Minus,
//   ArrowLeft,
//   CreditCard,
//   Truck,
//   ShieldCheck,
// } from 'lucide-react';
// import axios from 'axios';

// export default function CartPage() {
//   const router = useRouter();
//   const {
//     cartItems,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     getTotalPrice,
//     getTotalItems,
//   } = useCart();

//   const [paymentMethod, setPaymentMethod] = useState('COD');
//   const [placingOrder, setPlacingOrder] = useState(false);
//   const [orderError, setOrderError] = useState('');
//   const [orderSuccess, setOrderSuccess] = useState('');
//   const routerpush = useRouter();
//   const handleCheckout = async () => {
//     // try {
//     //   setPlacingOrder(true);
//     //   setOrderError('');
//     //   setOrderSuccess('');

//     //   const token = localStorage.getItem('token');
//     //   if (!token) {
//     //     setOrderError('Please log in to place an order.');
//     //     router.push('/login');
//     //     return;
//     //   }

//     //   if (cartItems.length === 0) {
//     //     setOrderError('Your cart is empty.');
//     //     return;
//     //   }

//     //   const items = cartItems.map((item) => ({
//     //     productId: item.productId,
//     //     quantity: item.quantity,
//     //     size: item.size,
//     //     frameColor: item.frameColor,
//     //     frameMaterial: item.frameMaterial,
//     //     frameThickness: item.frameThickness,
//     //     orientation: item.orientation,
//     //     imageUrl: item.uploadedImageUrl,
//     //     price: item.price,
//     //   }));

//     //   const res = await axios.post(
//     //     'http://localhost:4000/api/orders',
//     //     {
//     //       items,
//     //       totalAmount: getTotalPrice(),
//     //       paymentMethod,
//     //     },
//     //     {
//     //       headers: { Authorization: `Bearer ${token}` },
//     //     }
//     //   );

//     //   setOrderSuccess('Order placed successfully!');
//     //   // clearCart();

//     //   // Redirect to orders page after 2 seconds
//     //   setTimeout(() => {
//     //     router.push('/checkout');
//     //   }, 2000);
//     // } catch (err) {
//     //   const msg =
//     //     err.response?.data?.message || err.message || 'Failed to place order';
//     //   setOrderError(msg);
//     // } finally {
//     //   setPlacingOrder(false);
//     // }

//     routerpush.push('/checkout')
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="bg-linear-to-br from-amber-50 via-orange-50 to-rose-50 py-40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
//             <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Your Cart is Empty
//             </h2>
//             <p className="text-gray-600 mb-8">
//               Looks like you haven't added any items to your cart yet.
//             </p>
//             <button
//               onClick={() => router.back()}
//               className="inline-flex items-center cursor-pointer gap-2 px-8 py-4 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:scale-105 transition transform"
//             >
//               <ArrowLeft className="w-5 h-5" />
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-rose-50 py-28">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-bold text-gray-900 mb-2">
//               Shopping Cart
//             </h1>
//             <p className="text-gray-600">
//               {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
//             </p>
//           </div>
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Continue Shopping
//           </button>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2 space-y-4">
//             {cartItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
//               >
//                 <div className="flex gap-6">
//                   {/* Product Image */}
//                   <div className="w-32 h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100">
//                     {/* <img
//                       src={item.uploadedImageUrl ? `http://localhost:4000/api/uploads/${item.uploadedImageUrl}`: item.imageUrl}
//                       alt={item.title}
//                       className="w-full h-full object-cover"
//                     /> */}
//                     <img
//                       src={
//                         item.uploadedImageUrl
//                           ? `http://localhost:4000${item.uploadedImageUrl}`  // "/uploads/abc.jpg"
//                           : item.imageUrl
//                       }
//                       alt={item.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   {/* Product Details */}
//                   <div className="flex-1">
//                     <div className="flex justify-between mb-2">
//                       <h3 className="text-xl font-bold text-gray-900">
//                         {item.title}
//                       </h3>
//                       <button
//                         onClick={() => removeFromCart(index)}
//                         className="text-red-500 hover:text-red-700 transition p-2 cursor-pointer hover:bg-red-50 rounded-lg"
//                       >
//                         <Trash2 className="w-5 h-5" />
//                       </button>
//                     </div>

//                     <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
//                       <p>
//                         <span className="font-semibold">Size:</span> {item.size}"
//                       </p>
//                       <p>
//                         <span className="font-semibold">Color:</span>{' '}
//                         {item.frameColor}
//                       </p>
//                       <p>
//                         <span className="font-semibold">Material:</span>{' '}
//                         {item.frameMaterial}
//                       </p>
//                       <p>
//                         <span className="font-semibold">Orientation:</span>{' '}
//                         {item.orientation}
//                       </p>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       {/* Quantity Controls */}
//                       <div className="flex items-center gap-3 bg-black rounded-full px-2 py-1">
//                         <button
//                           onClick={() =>
//                             updateQuantity(index, item.quantity - 1)
//                           }
//                           className="w-8 h-8 rounded-full hover:bg-white hover:text-black cursor-pointer transition font-bold"
//                         >
//                           <Minus className="w-4 h-4 mx-auto" />
//                         </button>
//                         <span className="w-8 text-center font-semibold">
//                           {item.quantity}
//                         </span>
//                         <button
//                           onClick={() =>
//                             updateQuantity(index, item.quantity + 1)
//                           }
//                           className="w-8 h-8 rounded-full hover:bg-white hover:text-black cursor-pointer transition font-bold"
//                         >
//                           <Plus className="w-4 h-4 mx-auto" />
//                         </button>
//                       </div>

//                       {/* Price */}
//                       <div className="text-right">
//                         <p className="text-2xl font-bold bg-linear-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
//                           ₹{(item.price * item.quantity).toLocaleString()}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           ₹{item.price} each
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <button
//               onClick={clearCart}
//               className="w-full py-3 text-red-600 hover:text-red-700 font-semibold hover:bg-red-50 rounded-xl transition"
//             >
//               Clear Cart
//             </button>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Order Summary
//               </h2>

//               <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Subtotal ({getTotalItems()} items)</span>
//                   <span className="font-semibold">
//                     ₹{getTotalPrice().toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Shipping</span>
//                   <span className="font-semibold text-green-600">FREE</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Tax</span>
//                   <span className="font-semibold">Calculated at checkout</span>
//                 </div>
//               </div>

//               <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
//                 <span>Total</span>
//                 <span className="bg-linear-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
//                   ₹{getTotalPrice().toLocaleString()}
//                 </span>
//               </div>

//               {/* Payment Method */}
//               {/* <div className="mb-6">
//                 <label className="block text-sm font-semibold text-gray-900 mb-3">
//                   Payment Method
//                 </label>
//                 <select
//                   value={paymentMethod}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                   className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition"
//                 >
//                   <option value="COD">Cash on Delivery</option>
//                   <option value="UPI">UPI</option>
//                   <option value="CARD">Card</option>
//                   <option value="NETBANKING">Netbanking</option>
//                 </select>
//               </div> */}

//               {orderError && (
//                 <p className="text-sm text-red-600 mb-4">{orderError}</p>
//               )}
//               {orderSuccess && (
//                 <p className="text-sm text-green-600 mb-4">{orderSuccess}</p>
//               )}


//               <button
//                 onClick={handleCheckout}
//                 disabled={placingOrder}
//                 className="w-full py-4 bg-linear-to-r from-amber-500 to-orange-500 text-white cursor-pointer font-semibold rounded-2xl hover:shadow-2xl hover:scale-105 transition transform flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mb-4"
//               >
//                 <CreditCard className="w-5 h-5" />
//                 {placingOrder ? 'Processing...' : 'Proceed to Checkout'}
//               </button>

//               {/* Trust Badges */}
//               <div className="space-y-3 pt-6 border-t border-gray-200">
//                 <div className="flex items-center gap-3 text-sm text-gray-600">
//                   <Truck className="w-5 h-5 text-blue-600" />
//                   <span>Free shipping on all orders</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm text-gray-600">
//                   <ShieldCheck className="w-5 h-5 text-green-600" />
//                   <span>Secure payment processing</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm text-gray-600">
//                   <ShoppingCart className="w-5 h-5 text-amber-600" />
//                   <span>30-day money back guarantee</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useCart } from '@/context/cartContext';
// import {
//   ShoppingCart,
//   Trash2,
//   Plus,
//   Minus,
//   ArrowLeft,
//   CreditCard,
//   Truck,
//   ShieldCheck,
// } from 'lucide-react';

// export default function CartPage() {
//   const router = useRouter();
//   const {
//     cartItems,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     getTotalPrice,
//     getTotalItems,
//   } = useCart();

//   // Load frameCart items from localStorage
//   const [frameCartItems, setFrameCartItems] = useState([]);

//   useEffect(() => {
//     const frameCart = JSON.parse(localStorage.getItem('frameCart') || '[]');
//     setFrameCartItems(frameCart);
//   }, []);

//   const [paymentMethod, setPaymentMethod] = useState('COD');
//   const [placingOrder, setPlacingOrder] = useState(false);
//   const [orderError, setOrderError] = useState('');
//   const [orderSuccess, setOrderSuccess] = useState('');

//   // ✅ FIXED: Clear ALL cart items (regular + custom)
//   const clearAllCart = () => {
//     clearCart(); // Clear regular cart
//     localStorage.removeItem('frameCart'); // Clear custom frames
//     setFrameCartItems([]); // Update state
//   };

//   // Combined cart items
//   const allCartItems = [...cartItems, ...frameCartItems];

//   const handleCheckout = () => {
//     router.push('/checkout');
//   };

//   // ✅ FIXED: Proper image source for ALL image types
//   const getImageSrc = (item) => {
//     // Custom frame from NEW editor (imageUri = data:base64)
//     if (item.imageUri && item.imageUri.startsWith('data:')) {
//       return item.imageUri;
//     }
//     // Custom frame from OLD editor (imageUri = https://)
//     if (item.imageUri) {
//       return item.imageUri;
//     }
//     // Regular cart uploaded image
//     if (item.uploadedImageUrl) {
//       return `http://localhost:4000${item.uploadedImageUrl}`;
//     }
//     // Regular cart imageUrl
//     if (item.imageUrl) {
//       return item.imageUrl;
//     }
//     return '/placeholder-frame.jpg';
//   };

//   // ✅ FIXED: Smart item type detection
//   const isCustomFrame = (item) => {
//     return item.imageUri || item.frameShapeId || item.frameShape;
//   };

//   // ✅ FIXED: Render item details
//   const renderItemDetails = (item, globalIndex) => {
//     if (!isCustomFrame(item)) {
//       // Regular cart item
//       return (
//         <>
//           <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
//             <p><span className="font-semibold">Size:</span> {item.size}"</p>
//             <p><span className="font-semibold">Color:</span> {item.frameColor}</p>
//             <p><span className="font-semibold">Material:</span> {item.frameMaterial}</p>
//             <p><span className="font-semibold">Orientation:</span> {item.orientation}</p>
//           </div>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3 bg-black rounded-full px-2 py-1">
//               <button
//                 onClick={() => updateQuantity(globalIndex, item.quantity - 1)}
//                 className="w-8 h-8 rounded-full hover:bg-white hover:text-black cursor-pointer transition font-bold"
//               >
//                 <Minus className="w-4 h-4 mx-auto" />
//               </button>
//               <span className="w-8 text-center font-semibold">{item.quantity}</span>
//               <button
//                 onClick={() => updateQuantity(globalIndex, item.quantity + 1)}
//                 className="w-8 h-8 rounded-full hover:bg-white hover:text-black cursor-pointer transition font-bold"
//               >
//                 <Plus className="w-4 h-4 mx-auto" />
//               </button>
//             </div>
//             <div className="text-right">
//               <p className="text-2xl font-bold bg-linear-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
//                 ₹{(item.price * item.quantity).toLocaleString()}
//               </p>
//               <p className="text-sm text-gray-500">₹{item.price} each</p>
//             </div>
//           </div>
//         </>
//       );
//     }

//     // Custom frame (NEW or OLD editor)
//     const sizeDisplay = item.finalWidthInch 
//       ? `${item.finalWidthInch}x${item.finalHeightInch}" (${item.orientation})`
//       : `${item.widthCm.toFixed(1)}x${item.heightCm.toFixed(1)}cm`;

//     return (
//       <>
//         <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
//           <p><span className="font-semibold">Size:</span> {sizeDisplay}</p>
//           <p><span className="font-semibold">Thickness:</span> {item.thicknessMm || item.selectedThickness}mm</p>
//           <p><span className="font-semibold">Shape:</span> {item.frameShape || item.frameShapeId?.replace('-', ' ').toUpperCase()}</p>
//           <p><span className="font-semibold">Frame Color:</span> {item.frameColor}</p>
//           <p><span className="font-semibold">Mat Color:</span> {item.matColor}</p>
//         </div>
//         <div className="flex items-center justify-between">
//           <div className="px-4 py-2 bg-black text-white hover:bg-white hover:text-black rounded-full text-sm font-medium">
//             Single Custom Item
//           </div>
//           <div className="text-right">
//             <p className="text-2xl font-bold bg-linear-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
//               ₹{item.price?.toLocaleString()}
//             </p>
//             <p className="text-sm text-gray-500">Custom Frame</p>
//           </div>
//         </div>
//       </>
//     );
//   };

//   // ✅ FIXED: Remove by correct index
//   const handleRemoveItem = (globalIndex) => {
//     if (globalIndex < cartItems.length) {
//       // Regular item
//       removeFromCart(globalIndex);
//     } else {
//       // Custom frame
//       const frameIndex = globalIndex - cartItems.length;
//       const updatedFrameCart = frameCartItems.filter((_, i) => i !== frameIndex);
//       setFrameCartItems(updatedFrameCart);
//       localStorage.setItem('frameCart', JSON.stringify(updatedFrameCart));
//     }
//   };

//   if (allCartItems.length === 0) {
//     return (
//       <div className="bg-linear-to-br from-amber-50 via-orange-50 to-rose-50 py-40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
//             <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
//             <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
//             <button
//               onClick={() => router.back()}
//               className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:scale-105 transition transform"
//             >
//               <ArrowLeft className="w-5 h-5" />
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-rose-50 py-28">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
//             <p className="text-gray-600">
//               {allCartItems.length} {allCartItems.length === 1 ? 'item' : 'items'} in your cart
//             </p>
//           </div>
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Continue Shopping
//           </button>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2 space-y-4">
//             {allCartItems.map((item, globalIndex) => (
//               <div
//                 key={item.id || item.timestamp || globalIndex}
//                 className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
//               >
//                 <div className="flex gap-6">
//                   {/* ✅ FIXED: Perfect image handling */}
//                   <div className="w-32 h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100">
//                     <img
//                       src={getImageSrc(item)}
//                       alt={item.title || item.frameShape || 'Custom Frame'}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         e.target.src = '/placeholder-frame.jpg';
//                       }}
//                     />
//                   </div>

//                   {/* Product Details */}
//                   <div className="flex-1">
//                     <div className="flex justify-between mb-2">
//                       <h3 className="text-xl font-bold text-gray-900">
//                         {item.title || 
//                          (item.frameShape 
//                            ? `Custom ${item.frameShape} Frame` 
//                            : item.frameShapeId 
//                              ? `Custom ${item.frameShapeId.replace('-', ' ').toUpperCase()} Frame`
//                              : 'Custom Photo Frame')
//                         }
//                       </h3>
//                       <button
//                         onClick={() => handleRemoveItem(globalIndex)}
//                         className="text-red-500 hover:text-red-700 transition p-2 cursor-pointer hover:bg-red-50 rounded-lg"
//                       >
//                         <Trash2 className="w-5 h-5" />
//                       </button>
//                     </div>

//                     {renderItemDetails(item, globalIndex)}
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* ✅ FIXED: Clear ALL Cart button */}
//             <button
//               onClick={clearAllCart}
//               className="w-full py-3 text-red-600 hover:text-red-700 font-semibold hover:bg-red-50 rounded-xl transition"
//             >
//               🗑️ Clear All Cart ({allCartItems.length} items)
//             </button>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

//               <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Subtotal ({allCartItems.length} items)</span>
//                   <span className="font-semibold">
//                     ₹{allCartItems.reduce((total, item) => {
//                       return total + (item.price || 0) * (item.quantity || 1);
//                     }, 0).toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Shipping</span>
//                   <span className="font-semibold text-green-600">FREE</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Tax</span>
//                   <span className="font-semibold">Calculated at checkout</span>
//                 </div>
//               </div>

//               <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
//                 <span>Total</span>
//                 <span className="bg-linear-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
//                   ₹{allCartItems.reduce((total, item) => {
//                     return total + (item.price || 0) * (item.quantity || 1);
//                   }, 0).toLocaleString()}
//                 </span>
//               </div>

//               <button
//                 onClick={handleCheckout}
//                 disabled={placingOrder}
//                 className="w-full py-4 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:scale-105 transition transform flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mb-4"
//               >
//                 <CreditCard className="w-5 h-5" />
//                 {placingOrder ? 'Processing...' : 'Proceed to Checkout'}
//               </button>

//               {/* Trust Badges */}
//               <div className="space-y-3 pt-6 border-t border-gray-200">
//                 <div className="flex items-center gap-3 text-sm text-gray-600">
//                   <Truck className="w-5 h-5 text-blue-600" />
//                   <span>Free shipping on all orders</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm text-gray-600">
//                   <ShieldCheck className="w-5 h-5 text-green-600" />
//                   <span>Secure payment processing</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm text-gray-600">
//                   <ShoppingCart className="w-5 h-5 text-amber-600" />
//                   <span>30-day money back guarantee</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }












// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useCart } from '@/context/cartContext';
// import {
//   ShoppingCart,
//   Trash2,
//   Plus,
//   Minus,
//   ArrowLeft,
//   CreditCard,
//   Truck,
//   ShieldCheck,
// } from 'lucide-react';

// export default function CartPage() {
//   const router = useRouter();
//   const {
//     cartItems,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     getTotalPrice,
//     getTotalItems,
//   } = useCart();

//   const [frameCartItems, setFrameCartItems] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   // Initialize user and load cart
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setCurrentUser(token);

//     if (token) {
//       const frameCart = JSON.parse(localStorage.getItem('frameCart') || '[]');
//       setFrameCartItems(frameCart);
//     } else {
//       // No user logged in - clear everything
//       setFrameCartItems([]);
//       clearCart();
//     }
//   }, []);

//   // 🔥 CLEAR ALL CART FUNCTION
//   const clearAllCart = () => {
//     clearCart();
//     localStorage.removeItem('frameCart');
//     setFrameCartItems([]);
//     setCurrentUser(null);
//     console.log('🧹 ALL CARTS CLEARED!');
//   };

//   // 🔥 USER SWITCH DETECTION - Watch for token changes
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       // Detect when token changes in localStorage
//       if (e.key === 'token' || e.key === null) {
//         const newToken = localStorage.getItem('token');

//         // User switched or logged out
//         if (newToken !== currentUser) {
//           console.log('🔄 User changed detected, clearing cart');
//           clearAllCart();

//           // Reload page to reset all state
//           window.location.reload();
//         }
//       }
//     };

//     // Listen to storage events (works across tabs)
//     window.addEventListener('storage', handleStorageChange);

//     // Poll for token changes (works in same tab)
//     const checkInterval = setInterval(() => {
//       const newToken = localStorage.getItem('token');
//       if (newToken !== currentUser) {
//         console.log('🔄 User switch detected via polling');
//         clearAllCart();
//         window.location.reload();
//       }
//     }, 500); // Check every 500ms

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(checkInterval);
//     };
//   }, [currentUser]);

//   // 🔥 CLEAR CART ON LOGOUT/CLOSE
//   useEffect(() => {
//     const handleLogout = () => {
//       console.log('🚪 Logout detected');
//       clearAllCart();
//     };

//     window.addEventListener('userLogout', handleLogout);

//     return () => {
//       window.removeEventListener('userLogout', handleLogout);
//     };
//   }, []);

//   const allCartItems = [...cartItems, ...frameCartItems];

//   // Rest of your functions (unchanged)
//   const handleCheckout = () => router.push('/checkout');

//   const getImageSrc = (item) => {
//     if (item.imageUri?.startsWith('data:')) return item.imageUri;
//     if (item.imageUri) return item.imageUri;
//     if (item.uploadedImageUrl) return `http://localhost:4000${item.uploadedImageUrl}`;
//     if (item.imageUrl) return item.imageUrl;
//     return '/placeholder-frame.jpg';
//   };

//   const isCustomFrame = (item) => item.imageUri || item.frameShapeId || item.frameShape;

//   const renderItemDetails = (item, globalIndex) => {
//     if (!isCustomFrame(item)) {
//       return (
//         <>
//           <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
//             <p><span className="font-semibold">Size:</span> {item.size}"</p>
//             <p><span className="font-semibold">Color:</span> {item.frameColor}</p>
//             <p><span className="font-semibold">Material:</span> {item.frameMaterial}</p>
//             <p><span className="font-semibold">Orientation:</span> {item.orientation}</p>
//           </div>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3 bg-black rounded-full px-2 py-1">
//               <button onClick={() => updateQuantity(globalIndex, item.quantity - 1)}
//                 className="w-8 h-8 rounded-full hover:bg-white hover:text-black cursor-pointer transition font-bold">
//                 <Minus className="w-4 h-4 mx-auto" />
//               </button>
//               <span className="w-8 text-center font-semibold">{item.quantity}</span>
//               <button onClick={() => updateQuantity(globalIndex, item.quantity + 1)}
//                 className="w-8 h-8 rounded-full hover:bg-white hover:text-black cursor-pointer transition font-bold">
//                 <Plus className="w-4 h-4 mx-auto" />
//               </button>
//             </div>
//             <div className="text-right">
//               <p className="text-2xl font-bold bg-linear-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
//                 ₹{(item.price * item.quantity).toLocaleString()}
//               </p>
//               <p className="text-sm text-gray-500">₹{item.price} each</p>
//             </div>
//           </div>
//         </>
//       );
//     }

//     const sizeDisplay = item.finalWidthInch 
//       ? `${item.finalWidthInch}x${item.finalHeightInch}" (${item.orientation})`
//       : `${item.widthCm.toFixed(1)}x${item.heightCm.toFixed(1)}cm`;

//     return (
//       <>
//         <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
//           <p><span className="font-semibold">Size:</span> {sizeDisplay}</p>
//           <p><span className="font-semibold">Thickness:</span> {item.thicknessMm || item.selectedThickness}mm</p>
//           <p><span className="font-semibold">Shape:</span> {item.frameShape || item.frameShapeId?.replace('-', ' ').toUpperCase()}</p>
//           <p><span className="font-semibold">Frame Color:</span> {item.frameColor}</p>
//           <p><span className="font-semibold">Mat Color:</span> {item.matColor}</p>
//         </div>
//         <div className="flex items-center justify-between">
//           <div className="px-4 py-2 bg-black text-white hover:bg-white hover:text-black rounded-full text-sm font-medium">
//             Single Custom Item
//           </div>
//           <div className="text-right">
//             <p className="text-2xl font-bold bg-linear-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
//               ₹{item.price?.toLocaleString()}
//             </p>
//             <p className="text-sm text-gray-500">Custom Frame</p>
//           </div>
//         </div>
//       </>
//     );
//   };

//   const handleRemoveItem = (globalIndex) => {
//     if (globalIndex < cartItems.length) {
//       removeFromCart(globalIndex);
//     } else {
//       const frameIndex = globalIndex - cartItems.length;
//       const updatedFrameCart = frameCartItems.filter((_, i) => i !== frameIndex);
//       setFrameCartItems(updatedFrameCart);
//       localStorage.setItem('frameCart', JSON.stringify(updatedFrameCart));
//     }
//   };

//   if (allCartItems.length === 0) {
//     return (
//       <div className="bg-linear-to-br from-amber-50 via-orange-50 to-rose-50 py-40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
//             <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
//             <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
//             <button onClick={() => router.back()}
//               className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:scale-105 transition transform">
//               <ArrowLeft className="w-5 h-5" />
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-rose-50 py-28">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
//             <p className="text-gray-600">
//               {allCartItems.length} {allCartItems.length === 1 ? 'item' : 'items'} in your cart
//             </p>
//           </div>
//           <button onClick={() => router.back()}
//             className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition">
//             <ArrowLeft className="w-5 h-5" />
//             Continue Shopping
//           </button>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-4">
//             {allCartItems.map((item, globalIndex) => (
//               <div key={item.id || item.timestamp || globalIndex}
//                 className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
//                 <div className="flex gap-6">
//                   <div className="w-32 h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100">
//                     <img src={getImageSrc(item)}
//                       alt={item.title || item.frameShape || 'Custom Frame'}
//                       className="w-full h-full object-cover"
//                       onError={(e) => { e.target.src = '/placeholder-frame.jpg'; }} />
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex justify-between mb-2">
//                       <h3 className="text-xl font-bold text-gray-900">
//                         {item.title || 
//                          (item.frameShape ? `Custom ${item.frameShape} Frame` :
//                           item.frameShapeId ? `Custom ${item.frameShapeId.replace('-', ' ').toUpperCase()} Frame` :
//                           'Custom Photo Frame')}
//                       </h3>
//                       <button onClick={() => handleRemoveItem(globalIndex)}
//                         className="text-red-500 hover:text-red-700 transition p-2 cursor-pointer hover:bg-red-50 rounded-lg">
//                         <Trash2 className="w-5 h-5" />
//                       </button>
//                     </div>
//                     {renderItemDetails(item, globalIndex)}
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <button onClick={clearAllCart}
//               className="w-full py-3 text-red-600 hover:text-red-700 font-semibold hover:bg-red-50 rounded-xl transition">
//               🗑️ Clear All Cart ({allCartItems.length} items)
//             </button>
//           </div>

//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
//               <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Subtotal ({allCartItems.length} items)</span>
//                   <span className="font-semibold">
//                     ₹{allCartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0).toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Shipping</span>
//                   <span className="font-semibold text-green-600">FREE</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Tax</span>
//                   <span className="font-semibold">Calculated at checkout</span>
//                 </div>
//               </div>
//               <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
//                 <span>Total</span>
//                 <span className="bg-linear-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
//                   ₹{allCartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0).toLocaleString()}
//                 </span>
//               </div>
//               <button onClick={handleCheckout}
//                 className="w-full py-4 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:scale-105 transition transform flex items-center justify-center gap-2 mb-4">
//                 <CreditCard className="w-5 h-5" />
//                 Proceed to Checkout
//               </button>
//               <div className="space-y-3 pt-6 border-t border-gray-200">
//                 <div className="flex items-center gap-3 text-sm text-gray-600">
//                   <Truck className="w-5 h-5 text-blue-600" />
//                   <span>Free shipping on all orders</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm text-gray-600">
//                   <ShieldCheck className="w-5 h-5 text-green-600" />
//                   <span>Secure payment processing</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-sm text-gray-600">
//                   <ShoppingCart className="w-5 h-5 text-amber-600" />
//                   <span>30-day money back guarantee</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cartContext';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  Truck,
  ShieldCheck,
} from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  const [frameCartItems, setFrameCartItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ CLEAR ALL CART FUNCTION
  const clearAllCart = () => {
    clearCart();
    localStorage.removeItem('frameCart');
    setFrameCartItems([]);
    console.log('🧹 ALL CARTS CLEARED!');
  };

  // ✅ Initialize user and load cart WITH USER-SPECIFIC KEY
  useEffect(() => {
    const token = localStorage.getItem('token');
    setCurrentUser(token);

    if (token) {
      // Use user-specific cart key
      const userCartKey = `frameCart_${token.substring(0, 20)}`; // Use first 20 chars of token as identifier
      const frameCart = JSON.parse(localStorage.getItem(userCartKey) || '[]');
      setFrameCartItems(frameCart);
    } else {
      setFrameCartItems([]);
      clearCart();
    }
  }, []);

  // ✅ CLEAR CART ON TAB/BROWSER CLOSE
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      console.log('🚪 Tab closing - clearing cart');
      clearAllCart();

      // Clear all frameCart keys
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('frameCart')) {
          localStorage.removeItem(key);
        }
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // ✅ USER SWITCH DETECTION - Clear cart when user changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === null) {
        const newToken = localStorage.getItem('token');

        if (newToken !== currentUser) {
          console.log('🔄 User changed detected, clearing cart');

          // Clear ALL frameCart keys (previous user's cart)
          Object.keys(localStorage).forEach(key => {
            if (key.startsWith('frameCart')) {
              localStorage.removeItem(key);
            }
          });

          clearCart();
          window.location.reload();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Poll for token changes in same tab
    const checkInterval = setInterval(() => {
      const newToken = localStorage.getItem('token');
      if (newToken !== currentUser) {
        console.log('🔄 User switch detected via polling');

        // Clear all cart data
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('frameCart')) {
            localStorage.removeItem(key);
          }
        });

        clearCart();
        setCurrentUser(newToken);
        window.location.reload();
      }
    }, 1000); // Check every second

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(checkInterval);
    };
  }, [currentUser]);

  // ✅ CLEAR CART ON LOGOUT EVENT
  useEffect(() => {
    const handleLogout = () => {
      console.log('🚪 Logout detected');

      // Clear all frameCart keys
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('frameCart')) {
          localStorage.removeItem(key);
        }
      });

      clearCart();
    };

    window.addEventListener('userLogout', handleLogout);

    return () => {
      window.removeEventListener('userLogout', handleLogout);
    };
  }, []);

  const allCartItems = [...cartItems, ...frameCartItems];

  // ✅ GET FRAME TYPE FROM CART ITEM
  const getFrameType = (item) => {
    if (item.isAcrylicClock) return 'Acrylic Wall Clock';
    if (item.isAcrylicCutout) return 'Acrylic Cutout';
    if (item.isGallery) return 'Miniphoto Gallery';

    const shape = (item.frameShape || item.frameShapeId || '').toLowerCase();

    if (shape.includes('clock') || shape.includes('circle-clock')) {
      return 'Custom Circle Clock Frame';
    }
    if (shape.includes('rounded') || shape.includes('rounded-rect')) {
      return 'Custom ROUNDED RECT Frame';
    }
    if (shape.includes('circle')) {
      return 'Acrylic Photo';
    }
    if (shape.includes('square')) {
      return 'Clear Acrylic Photo';
    }
    if (shape.includes('rectangle') || shape.includes('rect')) {
      return 'Framed Acrylic Photo';
    }
    if (shape.includes('heart')) {
      return 'Acrylic Cutout';
    }
    if (shape.includes('nameplate')) {
      return 'Acrylic Nameplate';
    }
    if (shape.includes('keychain')) {
      return 'Acrylic KeyChains';
    }
    if (shape.includes('desk')) {
      return 'Acrylic Desk Photo';
    }
    if (shape.includes('fridge') || shape.includes('magnet')) {
      return 'Acrylic Fridge Magnets';
    }
    if (shape.includes('monogram')) {
      return 'Acrylic Monogram';
    }
    if (shape.includes('collage')) {
      return 'Collage Acrylic Photo';
    }
    if (shape.includes('aluminium') || shape.includes('aluminum')) {
      return 'Aluminium Framed Acrylic Photo';
    }

    if (item.imageUri || item.frameShapeId || item.frameShape) {
      return 'Custom Photo Frame';
    }

    return item.category || 'Photo Frame';
  };

  const handleCheckout = () => router.push('/checkout');

  const getImageSrc = (item) => {
    if (item.imageUri?.startsWith('data:')) return item.imageUri;
    if (item.imageUri) return item.imageUri;
    if (item.uploadedImageUrl) return `http://localhost:4000${item.uploadedImageUrl}`;
    if (item.imageUrl) return item.imageUrl;
    return '/placeholder-frame.jpg';
  };

  const isCustomFrame = (item) => item.imageUri || item.frameShapeId || item.frameShape;

  const renderItemDetails = (item, globalIndex) => {
    if (!isCustomFrame(item)) {
      return (
        <>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
            <p><span className="font-semibold">Size:</span> {item.size}"</p>
            <p><span className="font-semibold">Color:</span> {item.frameColor}</p>
            <p><span className="font-semibold">Material:</span> {item.frameMaterial}</p>
            <p><span className="font-semibold">Orientation:</span> {item.orientation}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 bg-black rounded-full px-2 py-1">
              <button onClick={() => updateQuantity(globalIndex, item.quantity - 1)}
                className="w-8 h-8 rounded-full hover:bg-white hover:text-black cursor-pointer transition font-bold">
                <Minus className="w-4 h-4 mx-auto" />
              </button>
              <span className="w-8 text-center font-semibold">{item.quantity}</span>
              <button onClick={() => updateQuantity(globalIndex, item.quantity + 1)}
                className="w-8 h-8 rounded-full hover:bg-white hover:text-black cursor-pointer transition font-bold">
                <Plus className="w-4 h-4 mx-auto" />
              </button>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold bg-linear-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
                ₹{(item.price * item.quantity).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">₹{item.price} each</p>
            </div>
          </div>
        </>
      );
    }

    const sizeDisplay = item.finalWidthInch
      ? `${item.finalWidthInch}x${item.finalHeightInch}" (${item.orientation})`
      : `${item.widthCm?.toFixed(1) || item.previewWidthCm?.toFixed(1)}x${item.heightCm?.toFixed(1) || item.previewHeightCm?.toFixed(1)}cm`;

    return (
      // <>
      //   <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
      //     <p><span className="font-semibold">Size:</span> {sizeDisplay}</p>
      //     <p><span className="font-semibold">Thickness:</span> {item.thicknessMm || item.selectedThickness}mm</p>
      //     <p><span className="font-semibold">Shape:</span> {item.frameShape || item.frameShapeId?.replace('-', ' ').toUpperCase()}</p>
      //     <p><span className="font-semibold">Frame Color:</span> {item.frameColor}</p>
      //     <p><span className="font-semibold">Mat Color:</span> {item.matColor}</p>
      //   </div>
      //   <div className="flex items-center justify-between">
      //     <div className="px-4 py-2 bg-black text-white hover:bg-white hover:text-black rounded-full text-sm font-medium">
      //       Single Custom Item
      //     </div>
      //     <div className="text-right">
      //       <p className="text-2xl font-bold bg-linear-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
      //         ₹{item.price?.toLocaleString()}
      //       </p>
      //       <p className="text-sm text-gray-500">Custom Frame</p>
      //     </div>
      //   </div>
      // </>

      <>
        {/* Product Details Grid - Fully Responsive */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
          <p className="flex flex-col xs:flex-row xs:items-center gap-1">
            <span className="font-semibold text-gray-800">Size:</span>
            <span className="text-gray-600">{sizeDisplay}</span>
          </p>

          <p className="flex flex-col xs:flex-row xs:items-center gap-1">
            <span className="font-semibold text-gray-800">Thickness:</span>
            <span className="text-gray-600">{item.thicknessMm || item.selectedThickness}mm</span>
          </p>

          <p className="flex flex-col xs:flex-row xs:items-center gap-1">
            <span className="font-semibold text-gray-800">Shape:</span>
            <span className="text-gray-600">{item.frameShape || item.frameShapeId?.replace('-', ' ').toUpperCase()}</span>
          </p>

          <p className="flex flex-col xs:flex-row xs:items-center gap-1">
            <span className="font-semibold text-gray-800">Frame Color:</span>
            <span className="text-gray-600">{item.frameColor}</span>
          </p>

          <p className="flex flex-col xs:flex-row xs:items-center gap-1 col-span-1 xs:col-span-2 sm:col-span-1">
            <span className="font-semibold text-gray-800">Mat Color:</span>
            <span className="text-gray-600">{item.matColor}</span>
          </p>
        </div>

        {/* Badge and Price Section - Fully Responsive */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          {/* Badge */}
          <div className="w-full sm:w-auto">
            <div className="inline-flex px-3 sm:px-4 py-1.5 sm:py-2 bg-linear-to-r from-gray-900 to-gray-800 text-white hover:from-white hover:to-gray-50 hover:text-gray-900 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg border-2 border-transparent hover:border-gray-900">
              <span className="flex items-center gap-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                Single Custom Item
              </span>
            </div>
          </div>

          {/* Price Section */}
          <div className="w-full sm:w-auto text-left sm:text-right">
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-1">
              <div>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-linear-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                  ₹{item.price?.toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Custom Frame</p>
              </div>

              {/* Mobile-only quick info badge */}
              <div className="sm:hidden">
                <div className="px-2 py-1 bg-linear-to-r from-amber-50 to-rose-50 rounded-lg border border-amber-200">
                  <p className="text-xs font-semibold text-amber-700">Premium</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const handleRemoveItem = (globalIndex) => {
    const token = localStorage.getItem('token');
    const userCartKey = `frameCart_${token?.substring(0, 20)}`;

    if (globalIndex < cartItems.length) {
      removeFromCart(globalIndex);
    } else {
      const frameIndex = globalIndex - cartItems.length;
      const updatedFrameCart = frameCartItems.filter((_, i) => i !== frameIndex);
      setFrameCartItems(updatedFrameCart);
      localStorage.setItem(userCartKey, JSON.stringify(updatedFrameCart));
    }
  };

  if (allCartItems.length === 0) {
    return (
      <div className="bg-linear-to-br from-amber-50 via-orange-50 to-rose-50 py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <button onClick={() => router.back()}
              className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:scale-105 transition transform">
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    //     <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-rose-50 py-28">
    //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


    // /* Alternative Version - More Compact on Mobile */
    //         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-200">
    //           {/* Title Section */}
    //           <div className="w-full sm:w-auto">
    //             <div className="flex items-center justify-between sm:block">
    //               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-0 sm:mb-2">
    //                 Shopping Cart
    //               </h1>

    //               {/* Mobile: Item count badge next to title */}
    //               <div className="sm:hidden inline-flex items-center justify-center min-w-[28px] h-7 px-2 bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
    //                 {allCartItems.length}
    //               </div>
    //             </div>

    //             {/* Desktop: Full item count description */}
    //             <p className="hidden sm:flex text-sm sm:text-base text-gray-600 items-center gap-2 mt-2">
    //               <span className="inline-flex items-center justify-center w-7 h-7 bg-linear-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full">
    //                 {allCartItems.length}
    //               </span>
    //               <span>
    //                 {allCartItems.length === 1 ? 'item' : 'items'} in your cart
    //               </span>
    //             </p>

    //             {/* Mobile: Compact item count */}
    //             <p className="sm:hidden text-xs text-gray-500 mt-1">
    //               {allCartItems.length} {allCartItems.length === 1 ? 'item' : 'items'}
    //             </p>
    //           </div>

    //           {/* Continue Shopping Button */}
    //           <button
    //             onClick={() => router.back()}
    //             className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-amber-600 hover:text-white bg-white hover:bg-linear-to-r hover:from-amber-600 hover:to-orange-600 border-2 border-amber-600 font-semibold rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-lg"
    //           >
    //             <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
    //             <span className="text-sm sm:text-base">Continue Shopping</span>
    //           </button>
    //         </div>

    //         <div className="grid lg:grid-cols-3 gap-8">
    //           <div className="lg:col-span-2 space-y-4">
    //             {allCartItems.map((item, globalIndex) => (
    //               <div key={item.id || item.timestamp || globalIndex}
    //                 className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
    //                 <div className="flex gap-6">
    //                   <div className="w-32 h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100">
    //                     <img src={getImageSrc(item)}
    //                       alt={getFrameType(item)}
    //                       className="w-full h-full object-cover"
    //                       onError={(e) => { e.target.src = '/placeholder-frame.jpg'; }} />
    //                   </div>
    //                   <div className="flex-1">
    //                     <div className="flex justify-between mb-2">
    //                       <h3 className="text-xl font-bold text-gray-900">
    //                         {getFrameType(item)}
    //                       </h3>
    //                       <button onClick={() => handleRemoveItem(globalIndex)}
    //                         className="text-red-500 hover:text-red-700 transition p-2 cursor-pointer hover:bg-red-50 rounded-lg">
    //                         <Trash2 className="w-5 h-5" />
    //                       </button>
    //                     </div>
    //                     {renderItemDetails(item, globalIndex)}
    //                   </div>
    //                 </div>
    //               </div>
    //             ))}
    //             /* Version 1: linear Danger Button with Icon */
    //             <button
    //               onClick={clearAllCart}
    //               className="group w-full py-3 cursor-pointer sm:py-3.5 px-4 bg-linear-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
    //             >
    //               <svg
    //                 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 viewBox="0 0 24 24"
    //               >
    //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    //               </svg>
    //               <span>Clear All Cart</span>
    //               <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
    //                 {allCartItems.length}
    //               </span>
    //             </button>




    //             /
    //           </div>

    //           <div className="lg:col-span-1">
    //             <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
    //               <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
    //               <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
    //                 <div className="flex justify-between text-gray-600">
    //                   <span>Subtotal ({allCartItems.length} items)</span>
    //                   <span className="font-semibold">
    //                     ₹{allCartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0).toLocaleString()}
    //                   </span>
    //                 </div>
    //                 <div className="flex justify-between text-gray-600">
    //                   <span>Shipping</span>
    //                   <span className="font-semibold text-green-600">FREE</span>
    //                 </div>
    //                 <div className="flex justify-between text-gray-600">
    //                   <span>Tax</span>
    //                   <span className="font-semibold">Calculated at checkout</span>
    //                 </div>
    //               </div>
    //               <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
    //                 <span>Total</span>
    //                 <span className="bg-linear-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
    //                   ₹{allCartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0).toLocaleString()}
    //                 </span>
    //               </div>
    //               <button onClick={handleCheckout}
    //                 className="w-full py-4 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:scale-105 transition transform flex items-center justify-center gap-2 mb-4">
    //                 <CreditCard className="w-5 h-5" />
    //                 Proceed to Checkout
    //               </button>
    //               <div className="space-y-3 pt-6 border-t border-gray-200">
    //                 <div className="flex items-center gap-3 text-sm text-gray-600">
    //                   <Truck className="w-5 h-5 text-blue-600" />
    //                   <span>Free shipping on all orders</span>
    //                 </div>
    //                 <div className="flex items-center gap-3 text-sm text-gray-600">
    //                   <ShieldCheck className="w-5 h-5 text-green-600" />
    //                   <span>Secure payment processing</span>
    //                 </div>
    //                 <div className="flex items-center gap-3 text-sm text-gray-600">
    //                   <ShoppingCart className="w-5 h-5 text-amber-600" />
    //                   <span>30-day money back guarantee</span>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-rose-50 py-12 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-18 lg:py-8">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
          <div className="w-full sm:w-auto">
            <div className="flex items-center justify-between sm:block">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                SHOPPING CART
              </h1>
              {/* Mobile Badge */}
              <div className="sm:hidden inline-flex items-center justify-center min-w-[28px] h-7 px-2 bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                {allCartItems.length}
              </div>
            </div>

            {/* Desktop Description */}
            <p className="hidden sm:flex text-sm sm:text-base text-gray-600 items-center gap-2 mt-2">
              <span className="inline-flex items-center justify-center w-7 h-7 bg-linear-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full">
                {allCartItems.length}
              </span>
              <span>
                {allCartItems.length === 1 ? 'frame' : 'type of frames'} in your cart
              </span>
            </p>

            {/* Mobile Text */}
            <p className="sm:hidden text-xs text-gray-500 mt-1">
              {allCartItems.length} {allCartItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 px-6 py-3 text-amber-600 hover:text-white bg-white hover:bg-linear-to-r hover:from-amber-600 hover:to-orange-600 border-2 border-amber-600 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm sm:text-base">Continue Shopping</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {allCartItems.map((item, globalIndex) => (
              <div key={item.id || item.timestamp || globalIndex}
                className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="w-full sm:w-32 h-48 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                    <img src={getImageSrc(item)}
                      alt={getFrameType(item)}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = '/placeholder-frame.jpg'; }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                        {getFrameType(item)}
                      </h3>
                      <button onClick={() => handleRemoveItem(globalIndex)}
                        className="text-red-500 hover:text-red-700 transition p-2 cursor-pointer hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    {renderItemDetails(item, globalIndex)}
                  </div>
                </div>
              </div>
            ))}

            {/* Clear All Button */}
            <button
              onClick={clearAllCart}
              className="group w-full py-3.5 px-4 bg-linear-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Trash2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>Clear All Cart</span>
              <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
                {allCartItems.length}
              </span>
            </button>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({allCartItems.length} items)</span>
                  <span className="font-semibold">
                    ₹{allCartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-semibold text-sm">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                <span>Total</span>
                <span className="bg-linear-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
                  ₹{allCartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0).toLocaleString()}
                </span>
              </div>

              <button onClick={handleCheckout}
                className="w-full py-4 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all transform flex items-center justify-center gap-2 mb-4 active:scale-95 cursor-pointer">
                <CreditCard className="w-5 h-5" />
                Proceed to Checkout
              </button>

              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>Free shipping on all orders</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <ShoppingCart className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>30-day money back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
