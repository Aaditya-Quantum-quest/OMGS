// 'use client';

// import { useState } from 'react';
// import { Menu, X, ShoppingCart, User, LogIn, UserPlus } from 'lucide-react';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <>
//       <nav className="bg-white shadow-md sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             {/* Left - Hamburger Menu */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-2 rounded-md hover:bg-gray-100 transition-colors"
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? (
//                 <X className="h-6 w-6 text-gray-700" />
//               ) : (
//                 <Menu className="h-6 w-6 text-gray-700" />
//               )}
//             </button>

//             {/* Center - Logo */}
//             <div className="absolute left-1/2 transform -translate-x-1/2">
//               <div className="flex items-center">
//                 <div className="bg-black px-4 py-2 rounded-md">
//                   <span className="text-white font-bold text-xl tracking-wider">OMGS</span>
//                   <span className="text-red-500 text-2xl ml-1">®</span>
//                 </div>
//               </div>
//             </div>

//             {/* Right - Cart, Profile, Login, Signup */}
//             <div className="flex items-center space-x-4">
//               {/* Cart */}
//               <button className="relative p-2 hover:bg-gray-100 rounded-md transition-colors">
//                 <ShoppingCart className="h-6 w-6 text-gray-700" />
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                   1
//                 </span>
//                 <span className="hidden sm:inline ml-2 text-sm text-gray-700">₹799</span>
//               </button>

//               {/* Profile - Hidden on mobile */}
//               <button className="hidden md:flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md transition-colors">
//                 <User className="h-5 w-5 text-gray-700" />
//                 <span className="text-sm text-gray-700">Profile</span>
//               </button>

//               {/* Login */}
//               <button className="hidden sm:flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
//                 <LogIn className="h-5 w-5" />
//                 <span className="text-sm font-medium">Login</span>
//               </button>

//               {/* Signup */}
//               <button className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-md transition-colors">
//                 <UserPlus className="h-5 w-5" />
//                 <span className="text-sm font-medium">Sign Up</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Sidebar Menu */}
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
//           isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
//         }`}
//         onClick={() => setIsMenuOpen(false)}
//       >
//         <div
//           className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
//             isMenuOpen ? 'translate-x-0' : '-translate-x-full'
//           }`}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="p-6">
//             <div className="flex items-center justify-between mb-8">
//               <h2 className="text-xl font-bold text-gray-800">Menu</h2>
//               <button
//                 onClick={() => setIsMenuOpen(false)}
//                 className="p-2 hover:bg-gray-100 rounded-md"
//               >
//                 <X className="h-5 w-5 text-gray-700" />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <a
//                 href="#"
//                 className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-md transition-colors"
//               >
//                 <User className="h-5 w-5 text-gray-700" />
//                 <span className="text-gray-700">Profile</span>
//               </a>
//               <a
//                 href="#"
//                 className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-md transition-colors"
//               >
//                 <ShoppingCart className="h-5 w-5 text-gray-700" />
//                 <span className="text-gray-700">Cart (₹799)</span>
//               </a>
//               <a
//                 href="#"
//                 className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-md transition-colors"
//               >
//                 <LogIn className="h-5 w-5 text-gray-700" />
//                 <span className="text-gray-700">Login</span>
//               </a>
//               <a
//                 href="#"
//                 className="flex items-center space-x-3 p-3 bg-black text-white rounded-md transition-colors hover:bg-gray-800"
//               >
//                 <UserPlus className="h-5 w-5" />
//                 <span>Sign Up</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Demo Content */}
//       <div className="max-w-7xl mx-auto p-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to OMGS</h1>
//         <p className="text-gray-600">
//           This is a responsive navbar component with hamburger menu, centered logo, and right-aligned actions.
//         </p>
//       </div>
//     </>
//   );
// }



'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, User, LogIn, UserPlus, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/cartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { getTotalItems } = useCart();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check token on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLoginClick = () => {
    router.push('/login');
    setIsMenuOpen(false);
  };

  const handleSignup = () => {
    router.push('/signup');
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    router.push('/userdashboard');
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('frameCart')) {
          localStorage.removeItem(key);
        }
      });
      window.dispatchEvent(new Event('userLogout'));
      localStorage.removeItem('token');
    }
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    router.replace('/login');
  };

  const productCategories = [
    {
      title: 'ALL FRAMES',
      items: [
        'Acrylic Photo',
        'Clear Acrylic Photo',
        'Acrylic Wall Clock',
        'Framed Acrylic Photo',
        'Collage Acrylic Photo',
        'Acrylic Fridge Magnets',
        'Acrylic Cutout',
        'Acrylic Desk Photo',
        'Acrylic KeyChains',
        'Acrylic Monogram',
        'Miniphoto Gallery',
      ],
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white shadow-md'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left - Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors z-50"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>

            {/* Center - Logo */}
            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-2 cursor-pointer group">
                <div className="relative w-10 h-10 bg-linear-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-xl">P</span>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
                </div>
                <span className="text-2xl font-bold bg-linear-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent hidden sm:block">
                  Prem Color Studio
                </span>
              </div>
            </Link>



            {/* Right - Cart, Profile, Login, Signup */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Cart */}
              <button
                className="relative p-2 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                onClick={() => router.push('/cart')}
              >
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-2">
                {isLoggedIn ? (
                  <>
                    <button
                      className="flex cursor-pointer items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      onClick={handleProfileClick}
                    >
                      <User className="h-5 w-5" />
                      <span className="text-sm font-medium">Profile</span>
                    </button>
                    <button
                      className="px-4 py-2 cursor-pointer bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors text-sm font-medium"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      onClick={handleLoginClick}
                    >
                      <LogIn className="h-5 w-5" />
                      <span className="text-sm font-medium">Login</span>
                    </button>
                    <button
                      className="flex items-center space-x-2 px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-md transition-colors"
                      onClick={handleSignup}
                    >
                      <UserPlus className="h-5 w-5" />
                      <span className="text-sm font-medium">Sign Up</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${isMenuOpen ? 'bg-opacity-50 visible' : 'bg-opacity-0 invisible'
          }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Sidebar Menu */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 bg-linear-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">P</span>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-orange-400 rounded-full" />
              </div>
              <span className="text-lg font-bold bg-linear-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Prem Color Studio
              </span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Sidebar Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-2">
              {/* Home Link */}
              <Link
                href="/"
                className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-gray-700 font-medium">Home</span>
              </Link>

              {/* Products Accordion */}
              <div className="border-b border-gray-200 pb-2">
                <button
                  onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                  className="w-full cursor-pointer flex items-center justify-between p-3 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <span className="text-gray-700 font-medium">Products</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-700 transition-transform duration-300 ${isMobileProductsOpen ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${isMobileProductsOpen ? 'max-h-[600px] mt-2' : 'max-h-0'
                    }`}
                >
                  {productCategories.map((category) => (
                    <div key={category.title} className="mb-4">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-3">
                        {category.title}
                      </p>
                      <div className="space-y-1">
                        {category.items.map((item) => (
                          <Link
                            key={item}
                            href={`/products/${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block cursor-pointer px-6 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setIsMobileProductsOpen(false);
                            }}
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Us Link */}
              <Link
                href="/contactus"
                className="flex cursor-pointer items-center space-x-3 p-3 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-gray-700 font-medium">Contact Us</span>
              </Link>

              {/* About Link */}
              <Link
                href="/aboutus"
                className="flex cursor-pointer items-center space-x-3 p-3 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-gray-700 font-medium">About</span>
              </Link>

              {/* Cart Link (Mobile) */}
              <button
                className="flex cursor-pointer items-center justify-between w-full p-3 hover:bg-gray-100 rounded-md transition-colors md:hidden"
                onClick={() => {
                  router.push('/cart');
                  setIsMenuOpen(false);
                }}
              >
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="h-5 w-5 text-gray-700 cursor-pointer" />
                  <span className="text-gray-700 font-medium">Cart</span>
                </div>
                {getTotalItems() > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Sidebar Footer - Auth Buttons */}
          <div className="p-6 border-t border-gray-200 space-y-3">
            {isLoggedIn ? (
              <>
                <button
                  className="w-full flex cursor-pointer items-center justify-center space-x-2 p-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors border border-gray-300"
                  onClick={handleProfileClick}
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">Profile</span>
                </button>
                <button
                  className="w-full flex cursor-pointer items-center justify-center space-x-2 p-3 bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors"
                  onClick={handleLogout}
                >
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  className="w-full flex cursor-pointer items-center justify-center space-x-2 p-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors border border-gray-300"
                  onClick={handleLoginClick}
                >
                  <LogIn className="h-5 w-5" />
                  <span className="font-medium">Login</span>
                </button>
                <button
                  className="w-full flex  items-center justify-center space-x-2 p-3 bg-black text-white hover:bg-gray-800 rounded-md transition-colors"
                  onClick={handleSignup}
                >
                  <UserPlus className="h-5 w-5" />
                  <span className="font-medium">Sign Up</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}