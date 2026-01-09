// 'use client';

// import { useEffect, useState } from 'react';

// export default function Checkout() {
//   const [customizedImage, setCustomizedImage] = useState(null);
//   const [designData, setDesignData] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);

//   useEffect(() => {
//     // Retrieve saved image and design data
//     const savedImage = localStorage.getItem('customizedNameplate');
//     const savedDesign = localStorage.getItem('nameplateDesign');

//     if (savedImage) {
//       setCustomizedImage(savedImage);
//     } else {
//       // Redirect back if no design found
//       alert('No design found. Please create one first.');
//       window.location.href = '/editor'; // Update with your editor route
//     }

//     if (savedDesign) {
//       setDesignData(JSON.parse(savedDesign));
//     }
//   }, []);

//   const sizes = [
//     { name: 'Small', dimensions: '6" x 4"', price: 299 },
//     { name: 'Medium', dimensions: '8" x 6"', price: 499 },
//     { name: 'Large', dimensions: '10" x 8"', price: 799 },
//     { name: 'XL', dimensions: '12" x 10"', price: 999 }
//   ];

//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       alert('Please select a size');
//       return;
//     }
//     // Add your cart logic here
//     console.log('Adding to cart:', { image: customizedImage, size: selectedSize });
//     alert(`Added ${selectedSize.name} size to cart!`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       {/* Header */}
//       <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md mb-4 p-4">
//         <div className="flex items-center gap-2">
//           <div className="bg-black px-3 py-1.5 rounded-md">
//             <span className="text-white font-bold text-lg">PCS</span>
//             <span className="text-red-500 text-xl ml-1">®</span>
//           </div>
//           <span className="text-xl font-bold text-gray-800">Checkout</span>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
//         {customizedImage ? (
//           <>
//             {/* Preview */}
//             <div className="mb-8">
//               <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Custom Nameplate</h2>
//               <div className="flex justify-center">
//                 <img 
//                   src={customizedImage} 
//                   alt="Your Custom Nameplate" 
//                   className="max-w-2xl w-full rounded-lg shadow-lg border-2 border-gray-200"
//                 />
//               </div>
//             </div>

//             {/* Size Selection */}
//             <div className="mb-8">
//               <h3 className="text-xl font-semibold mb-4 text-gray-800">Select Size</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {sizes.map((size) => (
//                   <button
//                     key={size.name}
//                     onClick={() => setSelectedSize(size)}
//                     className={`p-6 border-2 rounded-lg transition-all ${
//                       selectedSize?.name === size.name
//                         ? 'border-blue-500 bg-blue-50 scale-105'
//                         : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
//                     }`}
//                   >
//                     <div className="text-lg font-bold text-gray-800">{size.name}</div>
//                     <div className="text-sm text-gray-600 mt-1">{size.dimensions}</div>
//                     <div className="text-xl font-bold text-blue-600 mt-2">₹{size.price}</div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button
//                 onClick={() => window.history.back()}
//                 className="flex-1 px-6 py-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold text-lg transition-colors"
//               >
//                 ← Back to Editor
//               </button>
//               <button
//                 onClick={handleAddToCart}
//                 className="flex-1 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={!selectedSize}
//               >
//                 Add to Cart {selectedSize && `- ₹${selectedSize.price}`}
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="text-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading your design...</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




'use client';

import { useEffect, useState } from 'react';

export default function Checkout() {
    const [customizedImage, setCustomizedImage] = useState(null);
    const [designData, setDesignData] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        flatHouse: '',
        areaStreet: '',
        pinCode: '',
        townCity: '',
        state: 'Andhra Pradesh'
    });

    useEffect(() => {
        // Retrieve saved image and design data
        const savedImage = localStorage.getItem('customizedNameplate');
        const savedDesign = localStorage.getItem('nameplateDesign');

        if (savedImage) {
            setCustomizedImage(savedImage);
        } else {
            // Redirect back if no design found
            alert('No design found. Please create one first.');
            window.location.href = '/editor'; // Update with your editor route
        }

        if (savedDesign) {
            setDesignData(JSON.parse(savedDesign));
        }
    }, []);

    const sizes = [
        { name: 'Small', dimensions: '6" x 4"', price: 299 },
        { name: 'Medium', dimensions: '8" x 6"', price: 499 },
        { name: 'Large', dimensions: '10" x 8"', price: 799 },
        { name: 'XL', dimensions: '12" x 10"', price: 999 }
    ];

    const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
        'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
        'Andaman and Nicobar Islands', 'Dadra and Nagar Haveli and Daman and Diu',
        'Lakshadweep'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        // Validate required fields
        const requiredFields = ['email', 'phone', 'firstName', 'lastName', 'flatHouse', 'areaStreet', 'pinCode', 'townCity'];
        const emptyFields = requiredFields.filter(field => !formData[field].trim());

        if (emptyFields.length > 0) {
            alert('Please fill in all required fields');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Validate phone
        if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }

        // Validate PIN code
        if (formData.pinCode.length !== 6 || !/^\d+$/.test(formData.pinCode)) {
            alert('Please enter a valid 6-digit PIN code');
            return;
        }

        // Process order
        const orderData = {
            image: customizedImage,
            design: designData,
            size: selectedSize,
            shipping: formData,
            timestamp: new Date().toISOString()
        };

        console.log('Order submitted:', orderData);

        // Save to localStorage or send to API
        localStorage.setItem('pendingOrder', JSON.stringify(orderData));

        alert(`Order placed successfully! Total: ₹${selectedSize.price}`);

        // Redirect to payment or success page
        // window.location.href = '/payment';
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            {/* Header */}
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md mb-4 p-4">
                <div className="flex items-center gap-2">
                    <div className="bg-black px-3 py-1.5 rounded-md">
                        <span className="text-white font-bold text-lg">PCS</span>
                        <span className="text-red-500 text-xl ml-1">®</span>
                    </div>
                    <span className="text-xl font-bold text-gray-800">Checkout</span>
                </div>
            </div>

            {customizedImage ? (
                <form onSubmit={handleSubmit} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Form & Size Selection */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Size Selection */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Select Size *</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {sizes.map((size) => (
                                    <button
                                        key={size.name}
                                        type="button"
                                        onClick={() => setSelectedSize(size)}
                                        className={`p-4 border-2 rounded-lg transition-all ${selectedSize?.name === size.name
                                                ? 'border-blue-500 bg-blue-50 scale-105'
                                                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="text-lg font-bold text-gray-800">{size.name}</div>
                                        <div className="text-xs text-gray-600 mt-1">{size.dimensions}</div>
                                        <div className="text-lg font-bold text-blue-600 mt-2">₹{size.price}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Billing & Shipping Form */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-2xl font-bold mb-6 text-gray-800">BILLING & SHIPPING</h3>

                            <div className="space-y-4">
                                {/* Email */}
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email address"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Phone Number"
                                        required
                                        maxLength="10"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                    />
                                </div>

                                {/* First Name & Last Name */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="First name"
                                        required
                                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Last name"
                                        required
                                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                    />
                                </div>

                                {/* Flat/House & Area/Street */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="flatHouse"
                                        value={formData.flatHouse}
                                        onChange={handleInputChange}
                                        placeholder="Flat, House no., Building, Company, Apartment"
                                        required
                                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                    />
                                    <input
                                        type="text"
                                        name="areaStreet"
                                        value={formData.areaStreet}
                                        onChange={handleInputChange}
                                        placeholder="Area, Street, Sector, Village"
                                        required
                                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                    />
                                </div>

                                {/* PIN Code */}
                                <div>
                                    <input
                                        type="text"
                                        name="pinCode"
                                        value={formData.pinCode}
                                        onChange={handleInputChange}
                                        placeholder="PIN code"
                                        required
                                        maxLength="6"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                    />
                                </div>

                                {/* Town/City */}
                                <div>
                                    <input
                                        type="text"
                                        name="townCity"
                                        value={formData.townCity}
                                        onChange={handleInputChange}
                                        placeholder="Town / City"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                    />
                                </div>

                                {/* State */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        State *
                                    </label>
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 cursor-pointer"
                                    >
                                        {indianStates.map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h3>

                            {/* Preview Image */}
                            <div className="mb-4">
                                <img
                                    src={customizedImage}
                                    alt="Your Custom Nameplate"
                                    className="w-full rounded-lg shadow-md border border-gray-200"
                                />
                            </div>

                            {/* Price Details */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-700">
                                    <span>Size:</span>
                                    <span className="font-semibold">
                                        {selectedSize ? `${selectedSize.name} (${selectedSize.dimensions})` : 'Not selected'}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Price:</span>
                                    <span className="font-semibold">
                                        {selectedSize ? `₹${selectedSize.price}` : '₹0'}
                                    </span>
                                </div>
                                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                                    <span>Total:</span>
                                    <span className="text-blue-600">
                                        {selectedSize ? `₹${selectedSize.price}` : '₹0'}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    disabled={!selectedSize}
                                    className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Place Order
                                </button>
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="w-full px-6 py-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold transition-colors"
                                >
                                    ← Back to Editor
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-12">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading your design...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
