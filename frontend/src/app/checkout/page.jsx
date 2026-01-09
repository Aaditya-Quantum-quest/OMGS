

// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import { Home } from 'lucide-react';
// import { useCart } from '@/context/cartContext';

// const addressSchema = {
//   email: { type: 'string', required: true },
//   phone: { type: 'string', required: true },
//   firstName: { type: 'string', required: true },
//   lastName: { type: 'string', required: true },
//   address: { type: 'string', required: true },
//   area: { type: 'string', required: true },
//   pincode: { type: 'string', required: true, pattern: '^[0-9]{6}$' },
//   city: { type: 'string', required: true },
//   state: { type: 'string', required: true },
// };

// export default function CheckoutPage() {
//   const router = useRouter();
//   const { cartItems, getTotalPrice, getTotalItems, clearCart } = useCart();

//   // ✅ FIXED: Load custom frames from USER-SPECIFIC localStorage key
//   const [frameCartItems, setFrameCartItems] = useState([]);
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const userCartKey = `frameCart_${token.substring(0, 20)}`;
//       const frameCart = JSON.parse(localStorage.getItem(userCartKey) || '[]');
//       setFrameCartItems(frameCart);
//       console.log('✅ Loaded custom frames:', frameCart.length);
//     } else {
//       setFrameCartItems([]);
//     }
//   }, []);

//   const [formData, setFormData] = useState({
//     email: '',
//     phone: '',
//     firstName: '',
//     lastName: '',
//     address: '',
//     area: '',
//     pincode: '',
//     city: '',
//     state: 'Andhra Pradesh',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [razorpayLoaded, setRazorpayLoaded] = useState(false);

//   const indianStates = [
//     'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
//     'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
//     'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
//     'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
//     'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
//   ];

//   // ✅ FIXED: Combined cart items (regular + custom)
//   const allCartItems = [...cartItems, ...frameCartItems];
//   const subtotal = allCartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
//   const totalItems = allCartItems.length;

//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.async = true;
//     script.onload = () => setRazorpayLoaded(true);
//     script.onerror = () => {
//       console.error('Failed to load Razorpay script');
//       setRazorpayLoaded(false);
//     };
//     document.body.appendChild(script);

//     return () => {
//       const existingScript = document.querySelector(
//         'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
//       );
//       if (existingScript) document.body.removeChild(existingScript);
//     };
//   }, []);

//   const validateForm = () => {
//     for (const [field, schema] of Object.entries(addressSchema)) {
//       const value = formData[field];
//       if (schema.required && !value.trim()) {
//         setError(field.replace(/([A-Z])/g, ' $1').toUpperCase() + ' is required');
//         return false;
//       }
//       if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
//         setError('PIN code must be 6 digits');
//         return false;
//       }
//     }
//     setError('');
//     return true;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (error) setError('');
//   };

//   // ✅ FIXED: Get correct image source for all item types
//   const getImageSrc = (item) => {
//     if (item.imageUri && item.imageUri.startsWith('data:')) return item.imageUri;
//     if (item.imageUri) return item.imageUri;
//     if (item.uploadedImageUrl) return `http://localhost:4000${item.uploadedImageUrl}`;
//     if (item.imageUrl) return item.imageUrl;
//     return '/placeholder-frame.jpg';
//   };

//   // ✅ FIXED: Smart item title and details
//   const getItemTitle = (item) => {
//     if (item.title) return item.title;
//     if (item.frameShape) return `Custom ${item.frameShape} Frame`;
//     if (item.frameShapeId) return `Custom ${item.frameShapeId.replace('-', ' ').toUpperCase()} Frame`;
//     return 'Custom Photo Frame';
//   };

//   const handleRazorpayPayment = async () => {
//     if (!validateForm()) return;
//     if (allCartItems.length === 0) {
//       setError('Your cart is empty.');
//       return;
//     }
//     if (!razorpayLoaded || typeof window === 'undefined' || !window.Razorpay) {
//       setError('Payment system is not ready. Please refresh the page.');
//       return;
//     }

//     setPaymentLoading(true);
//     setError('');

//     try {
//       const response = await fetch('http://localhost:4000/api/orders/razorpay/order', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           amount: subtotal * 100,
//           currency: 'INR',
//           receipt: `receipt_${Date.now()}`,
//           cartItems: allCartItems, // ✅ Send ALL items (regular + custom)
//           customerData: formData,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create order');
//       }

//       const orderData = await response.json();

//       const options = {
//         key: 'rzp_live_RB0sIuyS0KchSG',
//         amount: orderData.amount,
//         currency: orderData.currency,
//         name: 'Frame Site',
//         description: `Order #${orderData.receipt}`,
//         order_id: orderData.id,
//         handler: async (resp) => {
//           await handlePaymentSuccess(resp, orderData);
//         },
//         prefill: {
//           name: formData.firstName + ' ' + formData.lastName,
//           email: formData.email,
//           contact: formData.phone,
//         },
//         theme: { color: '#10b981' },
//         modal: {
//           ondismiss: () => {
//             setPaymentLoading(false);
//             alert('Payment cancelled.');
//           },
//         },
//       };

//       const RazorpayConstructor = window.Razorpay;
//       const rzp = new RazorpayConstructor(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       setError('Payment initiation failed. Try again.');
//     } finally {
//       setPaymentLoading(false);
//     }
//   };

//   const handlePaymentSuccess = async (razorpayResponse, razorpayOrder) => {
//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:4000/api/orders/verify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           razorpay_order_id: razorpayResponse.razorpay_order_id,
//           razorpay_payment_id: razorpayResponse.razorpay_payment_id,
//           razorpay_signature: razorpayResponse.razorpay_signature,
//           customer: formData,
//           cartItems: allCartItems, // ✅ Send ALL items
//           totalAmount: subtotal * 100,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Payment verification failed');
//       }

//       const orderData = await response.json();

//       // ✅ FIXED: Clear BOTH carts with USER-SPECIFIC key
//       clearCart();

//       const token = localStorage.getItem('token');
//       if (token) {
//         const userCartKey = `frameCart_${token.substring(0, 20)}`;
//         localStorage.removeItem(userCartKey);
//       }
//       // Also clear old key for backwards compatibility
//       localStorage.removeItem('frameCart');

//       setFrameCartItems([]);

//       alert(`✅ Order #${orderData.orderId} confirmed! SMS sent to ${formData.phone}`);
//       router.push('/order-success?orderId=' + orderData.orderId);
//     } catch (err) {
//       console.error(err);
//       alert('Payment successful but order save failed. Contact support.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
//           >
//             <Home size={20} />
//             <span>Back to Home</span>
//           </button>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {error && (
//           <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//             {error}
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             {/* Billing form - UNCHANGED */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h2 className="text-2xl font-bold mb-6 text-black">BILLING & SHIPPING</h2>
//               <div className="space-y-4">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Phone Number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     name="firstName"
//                     placeholder="First name"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     className="px-4 py-3 border border-gray-300 rounded focus:outline-none text-black focus:ring-2 focus:ring-orange-500"
//                   />
//                   <input
//                     type="text"
//                     name="lastName"
//                     placeholder="Last name"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     className="px-4 py-3 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     name="address"
//                     placeholder="Flat, House no., Building, Company, Apartment"
//                     value={formData.address}
//                     onChange={handleChange}
//                     className="px-4 py-3 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                   <input
//                     type="text"
//                     name="area"
//                     placeholder="Area, Street, Sector, Village"
//                     value={formData.area}
//                     onChange={handleChange}
//                     className="px-4 py-3 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>
//                 <input
//                   type="text"
//                   name="pincode"
//                   placeholder="PIN code"
//                   value={formData.pincode}
//                   onChange={handleChange}
//                   maxLength={6}
//                   className="w-full px-4 py-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="Town / City"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//                 <div>
//                   <label className="block text-sm text-gray-700 mb-1">State *</label>
//                   <select
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   >
//                     {indianStates.map((state) => (
//                       <option key={state} value={state}>{state}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-gray-900 sticky top-4">
//               <h2 className="text-2xl font-bold mb-6 text-black">YOUR ORDER</h2>

//               <div className="space-y-4">
//                 {allCartItems.length === 0 ? (
//                   <p className="text-sm text-gray-500 pb-4 border-b">Your cart is empty.</p>
//                 ) : (
//                   // ✅ Display ALL items (regular + custom)
//                   <div className="pb-4 border-b space-y-3">
//                     {allCartItems.map((item, index) => (
//                       <div key={item.id || item.timestamp || index} className="flex gap-3">
//                         <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 shrink-0">
//                           <img
//                             src={getImageSrc(item)}
//                             alt={getItemTitle(item)}
//                             className="w-full h-full object-cover"
//                             onError={(e) => { e.target.src = '/placeholder-frame.jpg'; }}
//                           />
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex justify-between items-start mb-1">
//                             <p className="text-sm text-gray-700">
//                               {getItemTitle(item)} × {item.quantity || 1}
//                             </p>
//                             <p className="font-semibold text-black">
//                               ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
//                             </p>
//                           </div>
//                           <div className="text-xs text-gray-600 space-y-1">
//                             {/* Regular item details */}
//                             {item.size && (
//                               <p><span className="font-medium">Size:</span> {item.size}</p>
//                             )}
//                             {item.frameThickness && (
//                               <p><span className="font-medium">Thickness:</span> {item.frameThickness}mm</p>
//                             )}
//                             {item.frameColor && !item.imageUri && (
//                               <p><span className="font-medium">Color:</span> {item.frameColor}</p>
//                             )}
//                             {item.orientation && !item.imageUri && (
//                               <p><span className="font-medium">Orientation:</span> {item.orientation}</p>
//                             )}
//                             {/* Custom frame details */}
//                             {item.finalWidthInch && (
//                               <p><span className="font-medium">Size:</span> {item.finalWidthInch}x{item.finalHeightInch}" ({item.orientation})</p>
//                             )}
//                             {item.widthCm && !item.finalWidthInch && (
//                               <p><span className="font-medium">Size:</span> {item.widthCm.toFixed(1)}x{item.heightCm.toFixed(1)}cm</p>
//                             )}
//                             {(item.thicknessMm || item.selectedThickness) && (
//                               <p><span className="font-medium">Thickness:</span> {(item.thicknessMm || item.selectedThickness)}mm</p>
//                             )}
//                             {item.frameShape && (
//                               <p><span className="font-medium">Shape:</span> {item.frameShape}</p>
//                             )}
//                             {item.frameShapeId && (
//                               <p><span className="font-medium">Shape:</span> {item.frameShapeId.replace('-', ' ').toUpperCase()}</p>
//                             )}
//                             {item.frameColor && item.imageUri && (
//                               <p><span className="font-medium">Frame Color:</span> {item.frameColor}</p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 <div className="flex justify-between pb-4 border-b">
//                   <p className="font-semibold text-black">
//                     Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})
//                   </p>
//                   <p className="font-semibold text-black">₹{subtotal.toLocaleString()}</p>
//                 </div>

//                 <div className="flex justify-between pb-4 border-b">
//                   <p className="font-semibold text-black">Shipping</p>
//                   <p className="text-green-600 font-semibold">FREE SHIPPING</p>
//                 </div>

//                 <div className="flex justify-between items-center py-4">
//                   <p className="text-xl font-bold text-black">Total</p>
//                   <div className="text-right">
//                     <p className="text-2xl font-bold text-black">₹{subtotal.toLocaleString()}</p>
//                     <p className="text-xs text-gray-600">(includes 18% tax estimate)</p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleRazorpayPayment}
//                   disabled={loading || paymentLoading || allCartItems.length === 0 || !razorpayLoaded}
//                   className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-4 rounded transition-colors duration-200 flex items-center justify-center gap-2"
//                 >
//                   {paymentLoading ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Processing Payment...
//                     </>
//                   ) : loading ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Saving Order...
//                     </>
//                   ) : (
//                     'Pay with Razorpay'
//                   )}
//                 </button>

//                 <button
//                   className="w-full text-left text-gray-700 cursor-pointer hover:text-gray-900 mt-4"
//                   onClick={() => router.back()}
//                 >
//                   &lt; Back to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import { Home } from 'lucide-react';
// import { useCart } from '@/context/cartContext';

// const addressSchema = {
//   email: { type: 'string', required: true },
//   phone: { type: 'string', required: true },
//   firstName: { type: 'string', required: true },
//   lastName: { type: 'string', required: true },
//   address: { type: 'string', required: true },
//   area: { type: 'string', required: true },
//   pincode: { type: 'string', required: true, pattern: '^[0-9]{6}$' },
//   city: { type: 'string', required: true },
//   state: { type: 'string', required: true },
// };

// export default function CheckoutPage() {
//   const router = useRouter();
//   const { cartItems, clearCart } = useCart();

//   // ✅ Load custom frames from USER-SPECIFIC localStorage key
//   const [frameCartItems, setFrameCartItems] = useState([]);
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const userCartKey = `frameCart_${token.substring(0, 20)}`;
//       const frameCart = JSON.parse(localStorage.getItem(userCartKey) || '[]');
//       setFrameCartItems(frameCart);
//       console.log('✅ Loaded custom frames:', frameCart.length);
//     } else {
//       setFrameCartItems([]);
//     }
//   }, []);

//   const [formData, setFormData] = useState({
//     email: '',
//     phone: '',
//     firstName: '',
//     lastName: '',
//     address: '',
//     area: '',
//     pincode: '',
//     city: '',
//     state: 'Andhra Pradesh',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const indianStates = [
//     'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
//     'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
//     'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
//     'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
//     'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
//   ];

//   // ✅ Combined cart items (regular + custom)
//   const allCartItems = [...cartItems, ...frameCartItems];
//   const subtotal = allCartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
//   const totalItems = allCartItems.length;

//   const validateForm = () => {
//     for (const [field, schema] of Object.entries(addressSchema)) {
//       const value = formData[field];
//       if (schema.required && !value.trim()) {
//         setError(field.replace(/([A-Z])/g, ' $1').toUpperCase() + ' is required');
//         return false;
//       }
//       if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
//         setError('PIN code must be 6 digits');
//         return false;
//       }
//     }
//     setError('');
//     return true;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (error) setError('');
//   };

//   // ✅ Get correct image source for all item types
//   const getImageSrc = (item) => {
//     if (item.imageUri && item.imageUri.startsWith('data:')) return item.imageUri;
//     if (item.imageUri) return item.imageUri;
//     if (item.uploadedImageUrl) return `http://localhost:4000${item.uploadedImageUrl}`;
//     if (item.imageUrl) return item.imageUrl;
//     return '/placeholder-frame.jpg';
//   };

//   // ✅ Smart item title
//   const getItemTitle = (item) => {
//     if (item.title) return item.title;
//     if (item.frameShape) return `Custom ${item.frameShape} Frame`;
//     if (item.frameShapeId) return `Custom ${item.frameShapeId.replace('-', ' ').toUpperCase()} Frame`;
//     return 'Custom Photo Frame';
//   };

//   // ✅ DIRECT ORDER PLACEMENT (NO RAZORPAY)
//   const handlePlaceOrder = async () => {
//     if (!validateForm()) return;
//     if (allCartItems.length === 0) {
//       setError('Your cart is empty.');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       console.log('📦 Placing order...');

//       const response = await fetch('http://localhost:4000/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           customer: formData,
//           cartItems: allCartItems,
//           totalAmount: subtotal,
//           paymentMethod: 'COD', // Cash on Delivery
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => null);
//         throw new Error(errorData?.message || 'Failed to place order');
//       }

//       const orderData = await response.json();
//       console.log('✅ Order placed:', orderData);

//       // ✅ Clear BOTH carts
//       clearCart();

//       const token = localStorage.getItem('token');
//       if (token) {
//         const userCartKey = `frameCart_${token.substring(0, 20)}`;
//         localStorage.removeItem(userCartKey);
//       }
//       localStorage.removeItem('frameCart');
//       setFrameCartItems([]);

//       alert(`✅ Order #${orderData.orderId} placed successfully!`);
//       router.push(`/order-success?orderId=${orderData.orderId}`);
//     } catch (err) {
//       console.error('❌ Order error:', err);
//       setError(err.message || 'Failed to place order. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
//           >
//             <Home size={20} />
//             <span>Back to Home</span>
//           </button>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {error && (
//           <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//             {error}
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h2 className="text-2xl font-bold mb-6 text-black">BILLING & SHIPPING</h2>
//               <div className="space-y-4">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Phone Number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     name="firstName"
//                     placeholder="First name"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     className="px-4 py-3 border border-gray-300 rounded focus:outline-none text-black focus:ring-2 focus:ring-orange-500"
//                   />
//                   <input
//                     type="text"
//                     name="lastName"
//                     placeholder="Last name"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     className="px-4 py-3 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     name="address"
//                     placeholder="Flat, House no., Building, Company, Apartment"
//                     value={formData.address}
//                     onChange={handleChange}
//                     className="px-4 py-3 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                   <input
//                     type="text"
//                     name="area"
//                     placeholder="Area, Street, Sector, Village"
//                     value={formData.area}
//                     onChange={handleChange}
//                     className="px-4 py-3 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />
//                 </div>
//                 <input
//                   type="text"
//                   name="pincode"
//                   placeholder="PIN code"
//                   value={formData.pincode}
//                   onChange={handleChange}
//                   maxLength={6}
//                   className="w-full px-4 py-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="Town / City"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//                 <div>
//                   <label className="block text-sm text-gray-700 mb-1">State *</label>
//                   <select
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   >
//                     {indianStates.map((state) => (
//                       <option key={state} value={state}>{state}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-gray-900 sticky top-4">
//               <h2 className="text-2xl font-bold mb-6 text-black">YOUR ORDER</h2>

//               <div className="space-y-4">
//                 {allCartItems.length === 0 ? (
//                   <p className="text-sm text-gray-500 pb-4 border-b">Your cart is empty.</p>
//                 ) : (
//                   <div className="pb-4 border-b space-y-3">
//                     {allCartItems.map((item, index) => (
//                       <div key={item.id || item.timestamp || index} className="flex gap-3">
//                         <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 shrink-0">
//                           <img
//                             src={getImageSrc(item)}
//                             alt={getItemTitle(item)}
//                             className="w-full h-full object-cover"
//                             onError={(e) => { e.target.src = '/placeholder-frame.jpg'; }}
//                           />
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex justify-between items-start mb-1">
//                             <p className="text-sm text-gray-700">
//                               {getItemTitle(item)} × {item.quantity || 1}
//                             </p>
//                             <p className="font-semibold text-black">
//                               ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
//                             </p>
//                           </div>
//                           <div className="text-xs text-gray-600 space-y-1">
//                             {item.size && (
//                               <p><span className="font-medium">Size:</span> {item.size}</p>
//                             )}
//                             {item.frameThickness && (
//                               <p><span className="font-medium">Thickness:</span> {item.frameThickness}mm</p>
//                             )}
//                             {item.frameColor && !item.imageUri && (
//                               <p><span className="font-medium">Color:</span> {item.frameColor}</p>
//                             )}
//                             {item.orientation && !item.imageUri && (
//                               <p><span className="font-medium">Orientation:</span> {item.orientation}</p>
//                             )}
//                             {item.finalWidthInch && (
//                               <p><span className="font-medium">Size:</span> {item.finalWidthInch}x{item.finalHeightInch}" ({item.orientation})</p>
//                             )}
//                             {item.widthCm && !item.finalWidthInch && (
//                               <p><span className="font-medium">Size:</span> {item.widthCm.toFixed(1)}x{item.heightCm.toFixed(1)}cm</p>
//                             )}
//                             {(item.thicknessMm || item.selectedThickness) && (
//                               <p><span className="font-medium">Thickness:</span> {(item.thicknessMm || item.selectedThickness)}mm</p>
//                             )}
//                             {item.frameShape && (
//                               <p><span className="font-medium">Shape:</span> {item.frameShape}</p>
//                             )}
//                             {item.frameShapeId && (
//                               <p><span className="font-medium">Shape:</span> {item.frameShapeId.replace('-', ' ').toUpperCase()}</p>
//                             )}
//                             {item.frameColor && item.imageUri && (
//                               <p><span className="font-medium">Frame Color:</span> {item.frameColor}</p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 <div className="flex justify-between pb-4 border-b">
//                   <p className="font-semibold text-black">
//                     Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})
//                   </p>
//                   <p className="font-semibold text-black">₹{subtotal.toLocaleString()}</p>
//                 </div>

//                 <div className="flex justify-between pb-4 border-b">
//                   <p className="font-semibold text-black">Shipping</p>
//                   <p className="text-green-600 font-semibold">FREE SHIPPING</p>
//                 </div>

//                 <div className="flex justify-between items-center py-4">
//                   <p className="text-xl font-bold text-black">Total</p>
//                   <div className="text-right">
//                     <p className="text-2xl font-bold text-black">₹{subtotal.toLocaleString()}</p>
//                     <p className="text-xs text-gray-600">(Cash on Delivery)</p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handlePlaceOrder}
//                   disabled={loading || allCartItems.length === 0}
//                   className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-bold py-4 rounded transition-colors duration-200 flex items-center justify-center gap-2"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                       Placing Order...
//                     </>
//                   ) : (
//                     '🛒 Place Order (COD)'
//                   )}
//                 </button>

//                 <button
//                   className="w-full text-left text-gray-700 cursor-pointer hover:text-gray-900 mt-4"
//                   onClick={() => router.back()}
//                 >
//                   &lt; Back to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { useCart } from '@/context/cartContext';

const addressSchema = {
  // name: { type: 'string', required: true },
  email: { type: 'string', required: true },
  phone: { type: 'string', required: true },
  firstName: { type: 'string', required: true },
  lastName: { type: 'string', required: true },
  address: { type: 'string', required: true },
  area: { type: 'string', required: true },
  pincode: { type: 'string', required: true, pattern: '^[0-9]{6}$' },
  city: { type: 'string', required: true },
  state: { type: 'string', required: true },
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();

  // ✅ Load custom frames from USER-SPECIFIC localStorage key
  const [frameCartItems, setFrameCartItems] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('token');
    if (token) {
      const userCartKey = `frameCart_${token.substring(0, 20)}`;
      const frameCart = JSON.parse(localStorage.getItem(userCartKey) || '[]');
      setFrameCartItems(frameCart);
      console.log('✅ Loaded custom frames:', frameCart.length);
    } else {
      setFrameCartItems([]);
    }
  }, []);

  const [formData, setFormData] = useState({
    // name: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    area: '',
    pincode: '',
    city: '',
    state: 'Andhra Pradesh',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  ];

  // ✅ Combined cart items (regular + custom)
  const allCartItems = [...cartItems, ...frameCartItems];
  const subtotal = allCartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
  const totalItems = allCartItems.length;

  const validateForm = () => {
    for (const [field, schema] of Object.entries(addressSchema)) {
      const value = formData[field];
      if (schema.required && !value.trim()) {
        setError(field.replace(/([A-Z])/g, ' $1').toUpperCase() + ' is required');
        return false;
      }
      if (schema.pattern && !new RegExp(schema.pattern).test(value)) {
        setError('PIN code must be 6 digits');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  // ✅ Get correct image source for all item types
  const getImageSrc = (item) => {
    if (item.imageUri && item.imageUri.startsWith('data:')) return item.imageUri;
    if (item.imageUri) return item.imageUri;
    if (item.uploadedImageUrl) return `http://localhost:4000${item.uploadedImageUrl}`;
    if (item.imageUrl) return item.imageUrl;
    return '/placeholder-frame.jpg';
  };

  // ✅ Smart item title
  const getItemTitle = (item) => {
    if (item.title) return item.title;
    if (item.frameShape) return `Custom ${item.frameShape} Frame`;
    if (item.frameShapeId) return `Custom ${item.frameShapeId.replace('-', ' ').toUpperCase()} Frame`;
    return 'Custom Photo Frame';
  };

  // ✅ DIRECT ORDER PLACEMENT WITH JWT AUTHENTICATION
  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    if (allCartItems.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('📦 Placing order...');

      // ✅ Get JWT token from localStorage
      const token = localStorage.getItem('token');
      
      // ✅ Check if user is logged in
      if (!token) {
        setError('Please log in to place an order');
        setLoading(false);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
        return;
      }

      console.log('🔐 Token found, sending authenticated request...');

      const response = await fetch('http://localhost:4000/api/orders/direct', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // ✅ JWT Authentication
        },
        body: JSON.stringify({
          customer: formData,
          cartItems: allCartItems,
          totalAmount: subtotal,
          paymentMethod: 'COD',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        
        // ✅ Handle authentication errors
        if (response.status === 401) {
          localStorage.removeItem('token');
          setError('Session expired. Please log in again.');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
          return;
        }
        
        throw new Error(errorData?.message || 'Failed to place order');
      }

      const orderData = await response.json();
      console.log('✅ Order placed:', orderData);

      // ✅ Clear BOTH carts
      clearCart();

      if (token) {
        const userCartKey = `frameCart_${token.substring(0, 20)}`;
        localStorage.removeItem(userCartKey);
      }
      localStorage.removeItem('frameCart');
      setFrameCartItems([]);

      alert(`✅ Order #${orderData.orderId} placed successfully!`);
      router.push(`/order-success?orderId=${orderData.orderId}`);
    } catch (err) {
      console.error('❌ Order error:', err);
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Prevent hydration issues
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6 text-black">BILLING & SHIPPING</h2>
              <div className="space-y-4">
                {/* <input typwe="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                /> */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-300 rounded focus:outline-none text-black focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="address"
                    placeholder="Flat, House no., Building, Company, Apartment"
                    value={formData.address}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="text"
                    name="area"
                    placeholder="Area, Street, Sector, Village"
                    value={formData.area}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <input
                  type="text"
                  name="pincode"
                  placeholder="PIN code"
                  value={formData.pincode}
                  onChange={handleChange}
                  maxLength={6}
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="Town / City"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <div>
                  <label className="block text-sm text-gray-700 mb-1">State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {indianStates.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-gray-900 sticky top-4">
              <h2 className="text-2xl font-bold mb-6 text-black">YOUR ORDER</h2>

              <div className="space-y-4">
                {allCartItems.length === 0 ? (
                  <p className="text-sm text-gray-500 pb-4 border-b">Your cart is empty.</p>
                ) : (
                  <div className="pb-4 border-b space-y-3">
                    {allCartItems.map((item, index) => (
                      <div key={item.id || item.timestamp || index} className="flex gap-3">
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 shrink-0">
                          <img
                            src={getImageSrc(item)}
                            alt={getItemTitle(item)}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = '/placeholder-frame.jpg'; }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <p className="text-sm text-gray-700">
                              {getItemTitle(item)} × {item.quantity || 1}
                            </p>
                            <p className="font-semibold text-black">
                              ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                            </p>
                          </div>
                          <div className="text-xs text-gray-600 space-y-1">
                            {item.size && (
                              <p><span className="font-medium">Size:</span> {item.size}</p>
                            )}
                            {item.frameThickness && (
                              <p><span className="font-medium">Thickness:</span> {item.frameThickness}mm</p>
                            )}
                            {item.frameColor && !item.imageUri && (
                              <p><span className="font-medium">Color:</span> {item.frameColor}</p>
                            )}
                            {item.orientation && !item.imageUri && (
                              <p><span className="font-medium">Orientation:</span> {item.orientation}</p>
                            )}
                            {item.finalWidthInch && (
                              <p><span className="font-medium">Size:</span> {item.finalWidthInch}x{item.finalHeightInch}" ({item.orientation})</p>
                            )}
                            {item.widthCm && !item.finalWidthInch && (
                              <p><span className="font-medium">Size:</span> {item.widthCm.toFixed(1)}x{item.heightCm.toFixed(1)}cm</p>
                            )}
                            {(item.thicknessMm || item.selectedThickness) && (
                              <p><span className="font-medium">Thickness:</span> {(item.thicknessMm || item.selectedThickness)}mm</p>
                            )}
                            {item.frameShape && (
                              <p><span className="font-medium">Shape:</span> {item.frameShape}</p>
                            )}
                            {item.frameShapeId && (
                              <p><span className="font-medium">Shape:</span> {item.frameShapeId.replace('-', ' ').toUpperCase()}</p>
                            )}
                            {item.frameColor && item.imageUri && (
                              <p><span className="font-medium">Frame Color:</span> {item.frameColor}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between pb-4 border-b">
                  <p className="font-semibold text-black">
                    Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </p>
                  <p className="font-semibold text-black">₹{subtotal.toLocaleString()}</p>
                </div>

                <div className="flex justify-between pb-4 border-b">
                  <p className="font-semibold text-black">Shipping</p>
                  <p className="text-green-600 font-semibold">FREE SHIPPING</p>
                </div>

                <div className="flex justify-between items-center py-4">
                  <p className="text-xl font-bold text-black">Total</p>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-black">₹{subtotal.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">(Cash on Delivery)</p>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading || allCartItems.length === 0}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-bold py-4 rounded transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white cursor-pointer border-t-transparent rounded-full animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    '🛒 PLACE ORDER '
                  )}
                </button>

                <button
                  className="w-full text-center text-gray-700 cursor-pointer hover:text-gray-900 mt-4"
                  onClick={() => router.back()}
                >
                 Back to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
