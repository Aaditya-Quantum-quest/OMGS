// import React, { use } from 'react';
// import { useRouter } from 'next/navigation';

// export default function ProductShowcase() {

//   const router = useRouter();
//   const products = [
//     {
//       id: 1,
//       image: 'https://res.cloudinary.com/dewxpvl5s/image/upload/v1767948688/nameplate-1_eqnnzt.webp',
//       title: 'Ganesa Acrylic Designer Name Plate',
//       description: 'SUNIL LAMBA\nRENU DEVI\n55 SHIV NAGAR III'
//     },
//     {
//       id: 2,
//       image: 'https://res.cloudinary.com/dewxpvl5s/image/upload/v1767948688/nameplate-2_r41hp8.webp',
//       title: 'Ganesa Square Acrylic Designer Name Plate',
//       description: 'Anand Niwas\nS K Nahar\nChitra Nahar\n30, Karol Bagh'
//     },
//     {
//       id: 3,
//       image: 'https://res.cloudinary.com/dewxpvl5s/image/upload/v1767948688/nameplate-3_gi8p4s.webp',
//       title: 'Ganesa Portrait Acrylic Designer Name Plate',
//       description: 'Shanti Sadan\nSantosh Kumar\nVimala Devi\n21, Kambha Nagar'
//     },
//     // {
//     //   id: 4,
//     //   image: 'https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?w=500&h=500&fit=crop',
//     //   title: 'Ganesa Oval Acrylic Designer Name Plate',
//     //   description: 'Krishna Kunj\nRajesh Sharma\nMeena Sharma\n45, Park Street'
//     // },
//     // {
//     //   id: 5,
//     //   image: 'https://images.unsplash.com/photo-1611095790749-9eeb5a0f8f4a?w=500&h=500&fit=crop',
//     //   title: 'Ganesa Round Acrylic Designer Name Plate',
//     //   description: 'Annapurna Villa\nVikram Singh\nPriya Singh\n12, Lake View'
//     // },
//     // {
//     //   id: 6,
//     //   image: 'https://images.unsplash.com/photo-1611095790168-1b365fa1e8a0?w=500&h=500&fit=crop',
//     //   title: 'Ganesa Hexagon Acrylic Designer Name Plate',
//     //   description: 'Lakshmi Bhawan\nArun Kumar\nRadha Devi\n88, Ring Road'
//     // }
//   ];

//   const handleCustomize = (productId) => {
//     const product = products.find(p => p.id === productId);
//     if (product) {
//       // Save the selected product image to localStorage
//       localStorage.setItem('nameplateBackground', product.image);
//       localStorage.setItem('selectedProductId', productId.toString());
//       localStorage.setItem('selectedProductTitle', product.title);
      
//       console.log(`Customizing product ${productId}`);
//       console.log('Image saved to localStorage:', product.image);
      
//       // Navigate to editor page (uncomment when ready)
//       // router.push('/editor');
      
//       // Show success message
//       // alert(`Product image saved! Ready to customize.\nImage: ${product.image}`);
//       setTimeout(() => {
//         // alert('Redirecting to editor page...');
//         router.push('/nameplate-editor');
//         // window.location.href = '/editor'; // Uncomment to enable redirection
//       }, 500);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Designer Name Plates
//           </h1>
//           <p className="text-lg text-gray-600">
//             Elegant Ganesa-themed acrylic name plates for your home
//           </p>
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
//             >
//               {/* Product Image */}
//               <div className="relative bg-gray-100 aspect-square overflow-hidden">
//                 <img
//                   src={product.image}
//                   alt={product.title}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                 />
//               </div>

//               {/* Product Details */}
//               <div className="p-6 flex-1 flex flex-col">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                   {product.title}
//                 </h3>
                
//                 {/* Customize Button */}
//                 <button
//                   onClick={() => handleCustomize(product.id)}
//                   className="mt-auto w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-red-700 transition-colors duration-300 transform hover:scale-105 active:scale-95"
//                 >
//                   Customise
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductShowcase() {
  const router = useRouter();
  const [debugInfo, setDebugInfo] = useState('');

  const products = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/dewxpvl5s/image/upload/v1767948688/nameplate-1_eqnnzt.webp',
      title: 'Ganesa Acrylic Designer Name Plate',
      description: 'SUNIL LAMBA\nRENU DEVI\n55 SHIV NAGAR III',
      customizable_image:"https://res.cloudinary.com/dewxpvl5s/image/upload/v1767950031/nameplate-custom-1_erq5vs.png",
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dewxpvl5s/image/upload/v1767948688/nameplate-2_r41hp8.webp',
      title: 'Ganesa Square Acrylic Designer Name Plate',
      description: 'Anand Niwas\nS K Nahar\nChitra Nahar\n30, Karol Bagh',
      customizable_image:"https://res.cloudinary.com/dewxpvl5s/image/upload/v1767950031/nameplate-custom-2_zcgiqi.png",
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/dewxpvl5s/image/upload/v1767948688/nameplate-3_gi8p4s.webp',
      title: 'Ganesa Portrait Acrylic Designer Name Plate',
      description: 'Shanti Sadan\nSantosh Kumar\nVimala Devi\n21, Kambha Nagar',
      customizable_image:"https://res.cloudinary.com/dewxpvl5s/image/upload/v1767950031/nameplate-custom-3_w2juiw.png",
    }
  ];

  const handleCustomize = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      // ✅ FIXED: Clear any old data first, then set new values
      localStorage.removeItem('nameplateBackground');
      localStorage.removeItem('selectedProductId');
      localStorage.removeItem('selectedProductTitle');
      
      // ✅ Save with explicit verification
      localStorage.setItem('nameplateBackground', product.customizable_image);
      localStorage.setItem('selectedProductId', productId.toString());
      localStorage.setItem('selectedProductTitle', product.title);
      
      // ✅ IMMEDIATE VERIFICATION - Check if it actually saved
      const savedImage = localStorage.getItem('nameplateBackground');
      const savedId = localStorage.getItem('selectedProductId');
      
      console.log('🟢 SAVED TO LOCALSTORAGE:', {
        image: savedImage,
        id: savedId,
        title: localStorage.getItem('selectedProductTitle'),
        productImageLength: product.image.length // Should be > 0
      });
      
      setDebugInfo(`✅ Saved: ${product.title}\nImage: ${savedImage?.substring(0, 50)}...`);
      
      // Navigate after DOM update
      setTimeout(() => {
        console.log('🚀 Navigating to /nameplate-editor');
        router.push('/nameplate-editor');
      }, 100);
    }
  };

  // Debug: Check localStorage on mount
  useEffect(() => {
    const existing = localStorage.getItem('nameplateBackground');
    if (existing) {
      console.log('💾 Existing localStorage on load:', existing);
      setDebugInfo(`Found existing: ${existing.substring(0, 50)}...`);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Debug Panel */}
        {debugInfo && (
          <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-8 max-w-md">
            {debugInfo}
          </div>
        )}
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Designer Name Plates
          </h1>
          <p className="text-lg text-gray-600">
            Elegant Ganesa-themed acrylic name plates for your home
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Product Image */}
              <div className="relative bg-gray-100 aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => console.error('❌ Image failed:', product.image)}
                />
              </div>

              {/* Product Details */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {product.title}
                </h3>
                
                {/* Customize Button */}
                <button
                  onClick={() => handleCustomize(product.id)}
                  className="mt-auto w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-red-700 transition-colors duration-300 transform hover:scale-105 active:scale-95"
                >
                  Customise
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
