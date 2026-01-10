// // app/admin/orders/[id]/page.jsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import {
//     ArrowLeft,
//     User,
//     Mail,
//     Image as ImageIcon,
//     Package,
//     Calendar,
//     Clock,
//     CreditCard,
//     CheckCircle2,
//     AlertCircle,
// } from 'lucide-react';
// import Link from 'next/link';

// export default function OrderDetailsPage() {
//     const { id } = useParams(); // order id from URL  

//     const [order, setOrder] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         if (!id) return;

//         const fetchOrder = async () => {
//             try {
//                 setLoading(true);
//                 setError('');
//                 const token = localStorage.getItem('token'); // if protected
//                 const res = await axios.get(
//                     `http://localhost:4000/api/order/${id}`,
//                     token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
//                 );
//                 setOrder(res.data);
//             } catch (err) {
//                 const msg =
//                     err.response?.data?.message ||
//                     err.message ||
//                     'Failed to load order';
//                 setError(msg);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrder();
//     }, [id]);

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-[#12002c] text-purple-100">
//                 Loading order…
//             </div>
//         );
//     }

//     if (error || !order) {
//         return (
//             <div className="min-h-screen flex flex-col items-center justify-center bg-[#12002c] text-purple-100">
//                 <p className="mb-4 text-red-400">{error || 'Order not found.'}</p>
//                 <Link
//                     href="/dashboard/orders"
//                     className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/80 hover:bg-purple-500 text-sm font-medium"
//                 >
//                     <ArrowLeft className="w-4 h-4" /> Back to Orders
//                 </Link>
//             </div>
//         );
//     }

//     const item = order.items?.[0]; // single item in your example
//     const created = new Date(order.createdAt);
//     const dateStr = created.toLocaleDateString('en-IN', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//     });
//     const timeStr = created.toLocaleTimeString('en-IN', {
//         hour: '2-digit',
//         minute: '2-digit',
//     });

//     const statusColor =
//         order.status === 'completed'
//             ? 'bg-green-500/20 text-green-300 border-green-400/60'
//             : order.status === 'cancelled'
//                 ? 'bg-red-500/20 text-red-300 border-red-400/60'
//                 : 'bg-yellow-500/20 text-yellow-300 border-yellow-400/60';

//     const paymentColor =
//         order.paymentStatus === 'paid'
//             ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/60'
//             : 'bg-orange-500/20 text-orange-300 border-orange-400/60';

//     const baseImageUrl = 'http://localhost:4000'; // because imageUrl is "/uploads/..."

//     return (
//         <div className="py-20 bg-linear-to-br from-[#150042] via-[#210057] to-[#2c006b] text-purple-50">
//             <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
//                 {/* Top bar */}
//                 <div className="flex items-center justify-between">
//                     <div>
//                         <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-3">
//                             <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-400/50">
//                                 <Package className="w-5 h-5 text-purple-100" />
//                             </span>
//                             Order Details
//                         </h1>
//                         <p className="text-sm text-purple-200/80 mt-1">
//                             Detailed view for order <span className="font-semibold">#{order._id}</span>
//                         </p>
//                     </div>
//                     <Link
//                         href="/dashboard/orders"
//                         className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/80 hover:bg-purple-500 text-sm font-medium shadow-lg shadow-purple-900/40"
//                     >
//                         <ArrowLeft className="w-4 h-4" /> All Orders
//                     </Link>
//                 </div>

//                 {/* Stats cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div className="rounded-2xl bg-linear-to-br from-purple-600/70 to-purple-500/40 border border-purple-300/40 p-4 flex items-center justify-between">
//                         <div>
//                             <p className="text-xs font-semibold tracking-wide text-purple-200/80 mb-1">
//                                 TOTAL AMOUNT
//                             </p>
//                             <p className="text-2xl font-bold text-emerald-300">
//                                 ₹{order.totalAmount}
//                             </p>
//                         </div>
//                         <div className="w-10 h-10 rounded-2xl bg-black/20 flex items-center justify-center">
//                             <CreditCard className="w-5 h-5 text-emerald-300" />
//                         </div>
//                     </div>

//                     <div className="rounded-2xl bg-linear-to-br from-purple-600/70 to-pink-500/40 border border-purple-300/40 p-4 flex items-center justify-between">
//                         <div>
//                             <p className="text-xs font-semibold tracking-wide text-purple-200/80 mb-1">
//                                 PAYMENT STATUS
//                             </p>
//                             <span
//                                 className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-semibold ${paymentColor}`}
//                             >
//                                 {order.paymentStatus === 'paid' ? (
//                                     <CheckCircle2 className="w-3 h-3" />
//                                 ) : (
//                                     <AlertCircle className="w-3 h-3" />
//                                 )}
//                                 {order.paymentStatus}
//                             </span>
//                             <p className="text-[11px] text-purple-200/70 mt-1">
//                                 Method: <span className="uppercase">{order.paymentMethod}</span>
//                             </p>
//                         </div>
//                     </div>

//                     <div className="rounded-2xl bg-linear-to-br from-purple-600/70 to-orange-500/40 border border-purple-300/40 p-4 flex items-center justify-between">
//                         <div>
//                             <p className="text-xs font-semibold tracking-wide text-purple-200/80 mb-1">
//                                 ORDER STATUS
//                             </p>
//                             <span
//                                 className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-semibold ${statusColor}`}
//                             >
//                                 {order.status === 'completed' ? (
//                                     <CheckCircle2 className="w-3 h-3" />
//                                 ) : (
//                                     <AlertCircle className="w-3 h-3" />
//                                 )}
//                                 {order.status}
//                             </span>
//                             <p className="text-[11px] text-purple-200/70 mt-1">
//                                 Created on {dateStr} at {timeStr}
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Main content: left meta + right item */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Left column */}
//                     <div className="space-y-4 lg:col-span-1">
//                         <div className="rounded-2xl bg-white/5 border border-purple-400/40 p-4 space-y-3">
//                             <h2 className="text-sm font-semibold text-purple-100 flex items-center gap-2">
//                                 <User className="w-4 h-4 text-purple-200" />
//                                 Customer
//                             </h2>
//                             <div className="flex items-center gap-3">
//                                 <div className="w-9 h-9 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-sm font-bold">
//                                     {/* first letter fallback; replace with actual customer name/email if you populate it */}
//                                     {(order.userName || 'M')[0]}
//                                 </div>
//                                 <div className="space-y-0.5">
//                                     <p className="text-sm font-semibold">
//                                         {order.userName || 'Customer'}
//                                     </p>
//                                     <div className="flex items-center gap-1 text-xs text-purple-200/80">
//                                         <Mail className="w-3 h-3" />
//                                         <span>{order.userEmail || 'customer@example.com'}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="rounded-2xl bg-white/5 border border-purple-400/40 p-4 space-y-3">
//                             <h2 className="text-sm font-semibold text-purple-100 flex items-center gap-2">
//                                 <Calendar className="w-4 h-4 text-purple-200" />
//                                 Order Timeline
//                             </h2>
//                             <div className="text-xs text-purple-200/80 space-y-1">
//                                 <p className="flex items-center gap-2">
//                                     <Clock className="w-3 h-3" />
//                                     <span>Placed on {dateStr} at {timeStr}</span>
//                                 </p>
//                                 <p>Status: <span className="font-semibold">{order.status}</span></p>
//                                 <p>Payment: <span className="font-semibold">{order.paymentStatus}</span></p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right column: item details */}
//                     <div className="lg:col-span-2 rounded-2xl bg-white/5 border border-purple-400/40 p-5">
//                         <div className="flex items-center justify-between mb-4">
//                             <h2 className="text-sm font-semibold text-purple-100 flex items-center gap-2">
//                                 <ImageIcon className="w-4 h-4 text-purple-200" />
//                                 Item Details
//                             </h2>
//                             <span className="text-xs text-purple-200/80">
//                                 Order ID: <span className="font-mono">{order._id}</span>
//                             </span>
//                         </div>

//                         <div className="grid md:grid-cols-2 gap-5">
//                             {/* Image + preview */}
//                             <div className="space-y-3">
//                                 <div className="relative rounded-2xl overflow-hidden bg-black/20 border border-purple-500/40">
//                                     <img
//                                         src={`${baseImageUrl}${item.imageUrl}`}
//                                         alt="Framed photo"
//                                         className="w-full h-64 object-cover"
//                                     />
//                                     <div className="absolute bottom-2 left-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-[11px] font-medium flex items-center gap-2">
//                                         <Package className="w-3 h-3 text-emerald-300" />
//                                         <span>{item.size} • {item.orientation}</span>
//                                     </div>
//                                 </div>
//                                 <p className="text-xs text-purple-200/80">
//                                     Image path: <span className="font-mono">{item.imageUrl}</span>
//                                 </p>
//                             </div>

//                             {/* Specs */}
//                             <div className="space-y-3">
//                                 <div className="grid grid-cols-2 gap-3 text-xs text-purple-100">
//                                     <div className="rounded-xl bg-black/20 border border-purple-500/40 p-3">
//                                         <p className="text-purple-300/80 text-[11px]">Size</p>
//                                         <p className="mt-1 font-semibold">{item.size}</p>
//                                     </div>
//                                     <div className="rounded-xl bg-black/20 border border-purple-500/40 p-3">
//                                         <p className="text-purple-300/80 text-[11px]">Color</p>
//                                         <p className="mt-1 font-semibold">{item.frameColor}</p>
//                                     </div>
//                                     <div className="rounded-xl bg-black/20 border border-purple-500/40 p-3">
//                                         <p className="text-purple-300/80 text-[11px]">Material</p>
//                                         <p className="mt-1 font-semibold capitalize">
//                                             {item.frameMaterial}
//                                         </p>
//                                     </div>
//                                     <div className="rounded-xl bg-black/20 border border-purple-500/40 p-3">
//                                         <p className="text-purple-300/80 text-[11px]">Thickness</p>
//                                         <p className="mt-1 font-semibold">{item.frameThickness} mm</p>
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-2 gap-3 text-xs text-purple-100">
//                                     <div className="rounded-xl bg-black/20 border border-purple-500/40 p-3">
//                                         <p className="text-purple-300/80 text-[11px]">Orientation</p>
//                                         <p className="mt-1 font-semibold capitalize">
//                                             {item.orientation}
//                                         </p>
//                                     </div>
//                                     <div className="rounded-xl bg-black/20 border border-purple-500/40 p-3">
//                                         <p className="text-purple-300/80 text-[11px]">Quantity</p>
//                                         <p className="mt-1 font-semibold">x{item.quantity}</p>
//                                     </div>
//                                 </div>

//                                 <div className="mt-4 flex items-center justify-between border-t border-purple-500/40 pt-3">
//                                     <div className="text-xs text-purple-200/80">
//                                         <p>Item price: <span className="font-semibold">₹{item.price}</span></p>
//                                         <p>Total amount: <span className="font-semibold">₹{order.totalAmount}</span></p>
//                                     </div>
//                                     <div className="rounded-full px-4 py-2 bg-purple-600/80 text-xs font-semibold shadow-lg shadow-purple-900/40">
//                                         Pending actions
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


// app/admin/orders/[id]/page.jsx



'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import {
    ArrowLeft,
    User,
    Mail,
    Image as ImageIcon,
    Package,
    CreditCard,
    CheckCircle2,
    AlertCircle,
    Phone,
    MapPin
} from 'lucide-react';
import Link from 'next/link';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro'; // Standard library replaced to support modern CSS


export default function OrderDetailsPage() {

    const { id } = useParams(); // MongoDB _id of the order
    const [order, setOrder] = useState(null);
    const [address, setAddress] = useState(null); // Separate state for address collection
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;

        const fetchFullOrderData = async () => {
            try {
                setLoading(true);
                setError('');
                const token = localStorage.getItem('token');
                const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

                // 1. Fetch Order
                const orderRes = await axios.get(`http://localhost:4000/api/order/${id}`, config);
                const orderData = orderRes.data;
                setOrder(orderData);

                // 2. Fetch Address (Corrected Link)
                // Inside your useEffect
                if (orderData && orderData.orderId) {
                    // Ensure there is NO "/order/" in the middle of this URL
                    const addressRes = await axios.get(
                        `http://localhost:4000/api/address/${orderData.orderId}`,
                        config
                    );
                    setAddress(addressRes.data);
                }
            } catch (err) {
                console.error("Fetch Error:", err);
                setError(err.response?.data?.message || err.message || 'Failed to load details');
            } finally {
                setLoading(false);
            }
        };

        fetchFullOrderData();
    }, [id]);





    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#12002c] text-purple-100">
                Loading order…
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#12002c] text-purple-100">
                <p className="mb-4 text-red-400">{error || 'Order not found.'}</p>
                <Link
                    href="/dashboard/orders"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/80 hover:bg-purple-500 text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Orders
                </Link>
            </div>
        );
    }

    const item = order.items?.[0]; // single item in your example

    const created = new Date(order.createdAt);
    const dateStr = created.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
    const timeStr = created.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const statusColor =
        order.status === 'completed'
            ? 'bg-green-500/20 text-green-300 border-green-400/60'
            : order.status === 'cancelled'
                ? 'bg-red-500/20 text-red-300 border-red-400/60'
                : 'bg-yellow-500/20 text-yellow-300 border-yellow-400/60';

    const paymentColor =
        order.paymentStatus === 'paid'
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/60'
            : 'bg-orange-500/20 text-orange-300 border-orange-400/60';

    // Base URL because imageUrl in DB is like "/uploads/xyz.jpg"
    const baseImageUrl = 'http://localhost:4000';


    const handleDownloadImage = async () => {
        if (!item?.imageUrl) return;

        try {
            const res = await fetch(`${baseImageUrl}${item.imageUrl}`);
            const blob = await res.blob();

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `order-${order._id}-image.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Failed to download image', err);
        }
    };


    // const handleDownloadReceipt = async () => {
    //     const element = document.getElementById('receipt');
    //     if (!element) {
    //         alert("Error: Receipt content not found on page.");
    //         return;
    //     }

    //     try {
    //         console.log("Starting PDF generation..."); // Check your console (F12) for this
    //         const canvas = await html2canvas(element, {
    //             scale: 2,
    //             useCORS: true,
    //             backgroundColor: '#150042',
    //             logging: true // This will show detailed errors in your console
    //         });

    //         const imgData = canvas.toDataURL('image/png');
    //         const pdf = new jsPDF('p', 'mm', 'a4');
    //         const pdfWidth = pdf.internal.pageSize.getWidth();
    //         const imgProps = pdf.getImageProperties(imgData);
    //         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    //         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    //         pdf.save(`Order-Receipt-${order.orderId || order._id}.pdf`);
    //         console.log("PDF successfully saved.");
    //     } catch (err) {
    //         console.error("PDF generation failed:", err);
    //         alert("Failed to generate PDF: " + err.message);
    //     }
    // };



    // const handleDownloadReceipt = async () => {
    //     const element = document.getElementById('receipt');
    //     if (!element) {
    //         alert("Error: Receipt content not found on page.");
    //         return;
    //     }

    //     try {
    //         console.log("Starting PDF generation...");

    //         const canvas = await html2canvas(element, {
    //             scale: 2,
    //             useCORS: true,
    //             backgroundColor: '#150042',
    //             logging: true,
    //             allowTaint: true,
    //             windowHeight: element.scrollHeight // Capture full height
    //         });

    //         const imgData = canvas.toDataURL('image/png');
    //         const pdf = new jsPDF('p', 'mm', 'a4');
    //         const pdfWidth = pdf.internal.pageSize.getWidth();
    //         const pdfHeight = pdf.internal.pageSize.getHeight();

    //         const imgProps = pdf.getImageProperties(imgData);
    //         let imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    //         let yPosition = 0;

    //         // If content is taller than one page, add multiple pages
    //         while (imgHeight > 0) {
    //             if (yPosition > 0) {
    //                 pdf.addPage();
    //             }

    //             const remainingHeight = pdfHeight - yPosition;

    //             if (imgHeight <= remainingHeight) {
    //                 // Last page - fits completely
    //                 pdf.addImage(imgData, 'PNG', 0, yPosition, pdfWidth, imgHeight);
    //                 imgHeight = 0;
    //             } else {
    //                 // Add what fits on this page
    //                 pdf.addImage(imgData, 'PNG', 0, yPosition, pdfWidth, remainingHeight);
    //                 imgHeight -= remainingHeight;
    //                 yPosition = 0;
    //             }
    //         }

    //         pdf.save(`Order-Receipt-${order.orderId || order._id}.pdf`);
    //         console.log("PDF successfully saved.");
    //     } catch (err) {
    //         console.error("PDF generation failed:", err);
    //         alert("Failed to generate PDF: " + err.message);
    //     }
    // };


    // const handleDownloadReceipt = async () => {
    //     const element = document.getElementById('receipt');
    //     if (!element) {
    //         alert("Error: Receipt content not found on page.");
    //         return;
    //     }
    //     try {
    //         console.log("Starting PDF generation...");

    //         const canvas = await html2canvas(element, {
    //             scale: 2,
    //             useCORS: true,
    //             backgroundColor: '#150042',
    //             logging: true,
    //             allowTaint: true,
    //             windowHeight: element.scrollHeight
    //         });

    //         const imgData = canvas.toDataURL('image/png');
    //         const pdf = new jsPDF('p', 'mm', 'a4');
    //         const pdfWidth = pdf.internal.pageSize.getWidth();
    //         const pdfHeight = pdf.internal.pageSize.getHeight();

    //         // Calculate image dimensions to fit A4
    //         const imgProps = pdf.getImageProperties(imgData);
    //         const imgWidth = pdfWidth;
    //         const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    //         let heightLeft = imgHeight;
    //         let position = 0;

    //         // Add first page
    //         pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //         heightLeft -= pdfHeight;

    //         // Add additional pages if content is longer than one page
    //         while (heightLeft > 0) {
    //             position = heightLeft - imgHeight;
    //             pdf.addPage();
    //             pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //             heightLeft -= pdfHeight;
    //         }

    //         pdf.save(`Order-Receipt-${order.orderId || order._id}.pdf`);
    //         console.log("PDF successfully saved.");
    //     } catch (err) {
    //         console.error("PDF generation failed:", err);
    //         alert("Failed to generate PDF: " + err.message);
    //     }
    // };



    const handleDownloadReceipt = async () => {
    try {
        console.log("Starting PDF generation...");
        
        // Extract data from your order object - convert everything to strings
        const orderData = {
            orderId: String(order.orderId || order._id || 'ORD-1767823633410'),
            totalAmount: String(order.totalAmount || '₹12,121'),
            paymentStatus: String(order.paymentStatus || 'PENDING'),
            paymentMethod: String(order.paymentMethod || 'COD'),
            orderStatus: String(order.orderStatus || 'PENDING'),
            orderDate: String(order.createdAt || '08 Jan 2026'),
            
            // Customer Info
            customerName: String(order.customerName || 'vhdv vbcm'),
            customerEmail: String(order.customerEmail || 'saditya@gmail.com'),
            customerPhone: String(order.customerPhone || '1122334455'),
            
            // Shipping Address
            shippingAddress: {
                name: String(order.shippingAddress?.name || 'vhdv vbcm'),
                address1: String(order.shippingAddress?.address1 || '22311'),
                address2: String(order.shippingAddress?.address2 || 'mnds'),
                city: String(order.shippingAddress?.city || 'cbmxz'),
                state: String(order.shippingAddress?.state || 'Haryana'),
                pincode: String(order.shippingAddress?.pincode || '122334')
            },
            
            // Product Details
            products: order.products?.map(p => ({
                name: String(p.name || 'Portrait'),
                size: String(p.size || '8x10'),
                material: String(p.material || 'Wood'),
                frameColor: String(p.frameColor || 'Natural Oak'),
                thickness: String(p.thickness || '20mm'),
                quantity: String(p.quantity || 1),
                price: String(p.price || '₹12121')
            })) || [{
                name: 'Portrait',
                size: '8x10',
                material: 'Wood',
                frameColor: 'Natural Oak',
                thickness: '20mm',
                quantity: '1',
                price: '₹12121'
            }]
        };
        
        // Create PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 20;
        let yPosition = margin;
        
        // Helper function to add text
        const addText = (text, x, y, size = 10, style = 'normal', color = [0, 0, 0]) => {
            pdf.setFontSize(size);
            pdf.setFont('helvetica', style);
            pdf.setTextColor(...color);
            pdf.text(text, x, y);
        };
        
        // Helper function to add line
        const addLine = (y) => {
            pdf.setDrawColor(200, 200, 200);
            pdf.line(margin, y, pageWidth - margin, y);
        };
        
        // Header - Company Name (centered)
        pdf.setFontSize(24);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(88, 28, 135);
        pdf.text('ORDER RECEIPT', pageWidth / 2, yPosition, { align: 'center' });
        pdf.setTextColor(0, 0, 0);
        yPosition += 15;
        
        // Order ID and Date
        addText(`Order ID: ${orderData.orderId}`, margin, yPosition, 10, 'normal');
        const dateText = `Date: ${orderData.orderDate}`;
        const dateWidth = pdf.getTextWidth(dateText);
        addText(dateText, pageWidth - margin - dateWidth, yPosition, 10, 'normal');
        yPosition += 10;
        
        addLine(yPosition);
        yPosition += 10;
        
        // Order Status Section
        addText('ORDER STATUS', margin, yPosition, 12, 'bold', [88, 28, 135]);
        yPosition += 8;
        
        addText(`Payment Status: ${orderData.paymentStatus}`, margin, yPosition, 10, 'normal');
        addText(`Order Status: ${orderData.orderStatus}`, margin + 80, yPosition, 10, 'normal');
        yPosition += 6;
        
        addText(`Payment Method: ${orderData.paymentMethod}`, margin, yPosition, 10, 'normal');
        yPosition += 12;
        
        addLine(yPosition);
        yPosition += 10;
        
        // Customer Information
        addText('CUSTOMER INFORMATION', margin, yPosition, 12, 'bold', [88, 28, 135]);
        yPosition += 8;
        
        addText(`Name: ${orderData.customerName}`, margin, yPosition, 10, 'normal');
        yPosition += 6;
        addText(`Email: ${orderData.customerEmail}`, margin, yPosition, 10, 'normal');
        yPosition += 6;
        addText(`Phone: ${orderData.customerPhone}`, margin, yPosition, 10, 'normal');
        yPosition += 12;
        
        addLine(yPosition);
        yPosition += 10;
        
        // Shipping Address
        addText('SHIPPING ADDRESS', margin, yPosition, 12, 'bold', [88, 28, 135]);
        yPosition += 8;
        
        addText(orderData.shippingAddress.name, margin, yPosition, 10, 'normal');
        yPosition += 6;
        addText(orderData.shippingAddress.address1, margin, yPosition, 10, 'normal');
        yPosition += 6;
        addText(orderData.shippingAddress.address2, margin, yPosition, 10, 'normal');
        yPosition += 6;
        addText(`${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} - ${orderData.shippingAddress.pincode}`, margin, yPosition, 10, 'normal');
        yPosition += 12;
        
        addLine(yPosition);
        yPosition += 10;
        
        // Product Details Header
        addText('PRODUCT DETAILS', margin, yPosition, 12, 'bold', [88, 28, 135]);
        yPosition += 10;
        
        // Table Header
        pdf.setFillColor(240, 240, 240);
        pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 8, 'F');
        
        addText('Item', margin + 2, yPosition, 10, 'bold');
        addText('Specifications', margin + 60, yPosition, 10, 'bold');
        addText('Qty', pageWidth - margin - 55, yPosition, 10, 'bold');
        addText('Price', pageWidth - margin - 25, yPosition, 10, 'bold');
        yPosition += 10;
        
        // Product Items
        orderData.products.forEach((product, index) => {
            // Check if we need a new page
            if (yPosition > pageHeight - 40) {
                pdf.addPage();
                yPosition = margin;
            }
            
            addText(product.name || 'Portrait', margin + 2, yPosition, 10, 'normal');
            
            // Specifications
            const specs = `${product.size || '8x10'}, ${product.material || 'Wood'}, ${product.frameColor || 'Natural Oak'}`;
            addText(specs, margin + 60, yPosition, 9, 'normal');
            
            // Right align quantity and price
            const qtyText = product.quantity?.toString() || '1';
            const qtyWidth = pdf.getTextWidth(qtyText);
            addText(qtyText, pageWidth - margin - 50, yPosition, 10, 'normal');
            
            const priceText = product.price || '₹12121';
            const priceWidth = pdf.getTextWidth(priceText);
            addText(priceText, pageWidth - margin - priceWidth, yPosition, 10, 'normal');
            yPosition += 8;
        });
        
        yPosition += 5;
        addLine(yPosition);
        yPosition += 10;
        
        // Total Section
        pdf.setFillColor(88, 28, 135);
        pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 12, 'F');
        
        addText('TOTAL AMOUNT', margin + 2, yPosition + 2, 12, 'bold', [255, 255, 255]);
        
        // Right align total amount
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(255, 255, 255);
        const totalWidth = pdf.getTextWidth(orderData.totalAmount);
        pdf.text(orderData.totalAmount, pageWidth - margin - totalWidth - 2, yPosition + 2);
        pdf.setTextColor(0, 0, 0);
        yPosition += 20;
        
        // Footer
        yPosition = pageHeight - 30;
        addLine(yPosition);
        yPosition += 8;
        
        addText('Thank you for your order!', pageWidth / 2, yPosition, 10, 'italic', [100, 100, 100]);
        pdf.setTextColor(0, 0, 0);
        yPosition += 6;
        addText('For any queries, please contact customer support', pageWidth / 2, yPosition, 9, 'normal', [100, 100, 100]);
        
        // Center align footer text
        pdf.text('Thank you for your order!', pageWidth / 2, pageHeight - 22, { align: 'center' });
        pdf.text('For any queries, please contact customer support', pageWidth / 2, pageHeight - 16, { align: 'center' });
        
        // Save PDF
        pdf.save(`Order-Receipt-${orderData.orderId}.pdf`);
        console.log("PDF successfully saved.");
        
    } catch (err) {
        console.error("PDF generation failed:", err);
        alert("Failed to generate PDF: " + err.message);
    }
};

    return (
        <div className="py-20 bg-linear-to-br from-[#150042] via-[#210057] to-[#2c006b] text-purple-50 min-h-screen">
            <div id="receipt" className="max-w-6xl mx-auto px-4 py-4 space-y-4">
                {/* Top bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-3">
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-400/50">
                                <Package className="w-5 h-5 text-purple-100" />
                            </span>
                            Order Details
                        </h1>
                        <p className="text-sm text-purple-200/80 mt-1">
                            Order ID: <span className="font-mono font-semibold text-purple-100">{order.orderId || order._id}</span>
                        </p>
                    </div>
                    <Link
                        href="/dashboard/orders"
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-purple-600/80 hover:bg-purple-500 text-sm font-medium shadow-lg transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" /> All Orders
                    </Link>
                </div>

                {/* Stats cards (Mobile: 1 col, MD: 3 col) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-2xl bg-linear-to-br from-purple-600/70 to-purple-500/40 border border-purple-300/40 p-5 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold tracking-wide text-purple-200/80 mb-1">TOTAL AMOUNT</p>
                            <p className="text-2xl font-bold text-emerald-300">₹{order.totalAmount?.toLocaleString()}</p>
                        </div>
                        <CreditCard className="w-8 h-8 text-emerald-300/50" />
                    </div>

                    <div className="rounded-2xl bg-linear-to-br from-purple-600/70 to-pink-500/40 border border-purple-300/40 p-5">
                        <p className="text-xs font-semibold tracking-wide text-purple-200/80 mb-1">PAYMENT STATUS</p>
                        <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-bold uppercase ${paymentColor}`}>
                                {order.paymentStatus === 'paid' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                {order.paymentStatus}
                            </span>
                        </div>
                        <p className="text-[11px] text-purple-200/70 mt-2 uppercase">Method: {order.paymentMethod || 'Online'}</p>
                    </div>

                    <div className="rounded-2xl bg-linear-to-br from-purple-600/70 to-orange-500/40 border border-purple-300/40 p-5">
                        <p className="text-xs font-semibold tracking-wide text-purple-200/80 mb-1">ORDER STATUS</p>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-bold uppercase ${statusColor}`}>
                            {order.status}
                        </span>
                        <p className="text-[11px] text-purple-200/70 mt-2">Placed: {dateStr}</p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left column: Customer & Address */}

                    {/* Left column: Customer & Address */}
                    <div className="space-y-4 lg:col-span-1">
                        {/* Customer Info - Pulling from 'address' state */}
                        <div className="rounded-2xl bg-white/5 border border-purple-400/40 p-5 space-y-4">
                            <h2 className="text-sm font-semibold text-purple-100 flex items-center gap-2 border-b border-purple-400/20 pb-2">
                                <User className="w-4 h-4 text-purple-200" /> Customer Information
                            </h2>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-lg font-bold shadow-inner">
                                    {address?.firstName ? address.firstName[0] : 'U'}
                                </div>
                                <div>
                                    <p className="text-base font-bold text-white">
                                        {address?.firstName} {address?.lastName}
                                    </p>
                                    <p className="text-xs text-purple-200/70 flex items-center gap-1">
                                        <Mail className="w-3 h-3" /> {address?.email || 'No email provided'}
                                    </p>
                                    <p className="text-xs text-purple-200/70 flex items-center gap-1">
                                        <Phone className="w-3 h-3" /> {address?.phone || 'No phone provided'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address - Pulling from 'address' state */}
                        <div className="rounded-2xl bg-white/5 border border-purple-400/40 p-5 space-y-4">
                            <h2 className="text-sm font-semibold text-purple-100 flex items-center gap-2 border-b border-purple-400/20 pb-2">
                                <MapPin className="w-4 h-4 text-purple-200" /> Shipping Address
                            </h2>
                            <div className="text-sm text-purple-100/90 leading-relaxed">
                                {address ? (
                                    <>
                                        <p className="font-medium text-white">{address.firstName} {address.lastName}</p>
                                        <p>{address.address}</p>
                                        <p>{address.area}</p>
                                        <p>{address.city}, {address.state} - <span className="font-mono">{address.pincode}</span></p>
                                    </>
                                ) : (
                                    <p className="text-purple-300/50 italic">No address details found for this order.</p>
                                )}
                            </div>
                        </div>
                    </div>



                    {/* Right column: Item Details */}
                    <div className="lg:col-span-2 rounded-2xl bg-white/5 border border-purple-400/40 p-6">
                        <div className="flex items-center justify-between mb-6 border-b border-purple-400/20 pb-4">
                            <h2 className="text-lg font-bold text-purple-100 flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-purple-200" /> Product Details
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Image Preview */}
                            <div className="space-y-4">
                                <div className="relative rounded-2xl overflow-hidden bg-black/40 border border-purple-500/40 shadow-2xl">
                                    <img
                                        src={`${baseImageUrl}${item.imageUrl}`}
                                        alt="Product"
                                        className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-purple-600/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
                                        {item.orientation}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={handleDownloadImage}
                                        className="
    flex-1 px-4 py-2.5 cursor-pointer
    rounded-xl
    bg-linear-to-br from-purple-600 to-purple-700
    text-purple-100
    text-xs font-semibold
    shadow-lg shadow-purple-900/40
    transition-all duration-300
    hover:from-purple-500 hover:to-purple-600
    hover:shadow-purple-700/50 hover:-translate-y-0.5
    active:translate-y-0 active:shadow-md
    focus:outline-none focus:ring-2 focus:ring-purple-500/40
  "
                                    >
                                        Download Image
                                    </button>

                                    <button
                                        onClick={handleDownloadReceipt}
                                        className="
    flex-1 px-4 py-2.5
    rounded-xl
    bg-linear-to-br from-emerald-600 to-emerald-700
    text-emerald-100
    text-xs font-semibold cursor-pointer
    shadow-lg shadow-emerald-900/40
    transition-all duration-300
    hover:from-emerald-500 hover:to-emerald-600
    hover:shadow-emerald-700/50 hover:-translate-y-0.5
    active:translate-y-0 active:shadow-md
    focus:outline-none focus:ring-2 focus:ring-emerald-500/40
  "
                                    >
                                        Receipt
                                    </button>

                                </div>
                            </div>

                            {/* Specifications List */}
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { label: 'Size', value: item.size },
                                        { label: 'Frame Color', value: item.frameColor },
                                        { label: 'Material', value: item.frameMaterial },
                                        { label: 'Thickness', value: `${item.frameThickness}mm` },
                                        { label: 'Quantity', value: `x${item.quantity}` },
                                        { label: 'Item Price', value: `₹${item.price}` }
                                    ].map((spec, i) => (
                                        <div key={i} className="bg-white/5 rounded-xl p-3 border border-purple-400/10">
                                            <p className="text-[10px] uppercase tracking-wider text-purple-300/60 font-bold">{spec.label}</p>
                                            <p className="text-sm font-semibold text-white mt-1 capitalize">{spec.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-purple-500/10 rounded-2xl p-4 border border-purple-400/20">
                                    <div className="flex justify-between items-center text-purple-100">
                                        <span className="text-sm font-medium">Final Amount</span>
                                        <span className="text-xl font-bold text-emerald-300">₹{order.totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
