'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { PackagePlus, Trash2, Edit3, Image, Tag, DollarSign, FileText, X, Upload, XCircle } from 'lucide-react';

export default function ProductsAdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [editingId, setEditingId] = useState(null);

  // New states for image uploads
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [uploadType, setUploadType] = useState('url');

  // protect route: only admin
  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (!token) {
      router.replace('/login');
      return;
    }
    if (!isAdmin) {
      router.replace('/');
      return;
    }
    setChecking(false);
  }, [router]);

  // load products
  useEffect(() => {
    if (checking) return;
    const token = localStorage.getItem('token');

    axios
      .get('http://localhost:4000/api/admin/products', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => {
        const msg =
          err.response?.data?.message ||
          err.message ||
          'Failed to load products';
        setErrorMsg(msg);
      });
  }, [checking]);

  // Handle image file selection
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 4) {
      setErrorMsg('You can only upload up to 4 images');
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      setErrorMsg('Only JPG, JPEG, PNG, and WEBP images are allowed');
      return;
    }

    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setErrorMsg('Each image must be less than 5MB');
      return;
    }

    setSelectedImages(files);

    const previewUrls = files.map(file => URL.createObjectURL(file));
    setImagePreviewUrls(previewUrls);
    setErrorMsg('');
  };

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviewUrls.filter((_, i) => i !== index);

    URL.revokeObjectURL(imagePreviewUrls[index]);

    setSelectedImages(newImages);
    setImagePreviewUrls(newPreviews);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Validate required fields
    if (!title.trim()) {
      setErrorMsg('Please enter a product title');
      return;
    }
    if (!slug.trim()) {
      setErrorMsg('Please enter a slug');
      return;
    }
    if (!price || Number(price) <= 0) {
      setErrorMsg('Please enter a valid price');
      return;
    }
    if (!category) {
      setErrorMsg('Please select a category');
      return;
    }
    if (uploadType === 'upload' && selectedImages.length === 0) {
      setErrorMsg('Please select at least one image');
      return;
    }
    if (uploadType === 'url' && !imageUrl.trim()) {
      setErrorMsg('Please provide an image URL');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      let productData = {
        title: title.trim(),
        slug: slug.trim(),
        price: Number(price),
        category: category,
        description: description.trim(),
      };

      console.log('Product data before upload:', productData);

      // Handle image upload vs URL
      if (uploadType === 'upload' && selectedImages.length > 0) {
        const formData = new FormData();
        selectedImages.forEach((image) => {
          formData.append('images', image);
        });

        console.log('Uploading images...');

        const uploadRes = await axios.post(
          'http://localhost:4000/api/admin/upload-images',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        console.log('Upload response:', uploadRes.data);

        productData.imageUrl = uploadRes.data.imageUrls[0];
        productData.additionalImages = uploadRes.data.imageUrls;
      } else if (uploadType === 'url') {
        productData.imageUrl = imageUrl.trim();
        productData.additionalImages = [imageUrl.trim()];
      }

      console.log('Final product data:', productData);

      const endpoint = editingId
        ? `http://localhost:4000/api/admin/products/${editingId}`
        : 'http://localhost:4000/api/admin/products';

      const method = editingId ? axios.put : axios.post;

      const res = await method(endpoint, productData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Server response:', res.data);

      if (editingId) {
        setProducts((prev) =>
          prev.map((p) => (p._id === editingId ? res.data.product : p))
        );
        setEditingId(null);
        setSuccessMsg('Product updated successfully!');
      } else {
        setProducts((prev) => [res.data.product, ...prev]);
        setSuccessMsg('Product added successfully!');
      }

      // Reset form
      setTitle('');
      setSlug('');
      setPrice('');
      setImageUrl('');
      setCategory('');
      setDescription('');
      setSelectedImages([]);
      setImagePreviewUrls([]);
      setUploadType('url');

      // Scroll to top to see success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error saving product:', err);
      console.error('Error response:', err.response);
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Failed to save product';
      setErrorMsg(msg);
    }
  };

  const handleEdit = (product) => {
    setTitle(product.title);
    setSlug(product.slug);
    setPrice(product.price);
    setImageUrl(product.imageUrl);
    setCategory(product.category || '');
    setDescription(product.description);
    setEditingId(product._id);
    setUploadType('url');
    setSelectedImages([]);
    setImagePreviewUrls([]);
    setErrorMsg('');
    setSuccessMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `http://localhost:4000/api/admin/products/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts((prev) => prev.filter((p) => p._id !== id));
      if (editingId === id) {
        setEditingId(null);
        setTitle(''); setSlug(''); setPrice(''); setImageUrl('');
        setCategory(''); setDescription('');
        setSelectedImages([]);
        setImagePreviewUrls([]);
      }
      setSuccessMsg('Product deleted successfully!');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Failed to delete product';
      setErrorMsg(msg);
    }
  };

  if (checking) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
          <p className="text-purple-200 mt-4 font-medium">Checking permissions...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Product Management
          </h1>
          <p className="text-purple-300">Manage your frame inventory and pricing</p>
        </div>

        {/* Add/Edit Product Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
              {editingId ? (
                <>
                  <Edit3 className="w-7 h-7 text-amber-400" />
                  Edit Product
                </>
              ) : (
                <>
                  <PackagePlus className="w-7 h-7 text-emerald-400" />
                  Add New Product
                </>
              )}
            </h2>
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setTitle(''); setSlug(''); setPrice(''); setImageUrl('');
                  setCategory(''); setDescription('');
                  setSelectedImages([]);
                  setImagePreviewUrls([]);
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-xl mb-6 backdrop-blur-sm">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-300 px-4 py-3 rounded-xl mb-6 backdrop-blur-sm">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleAddProduct}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="group">
                <label className="block text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Product Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-400/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Golden Frame 24x36"
                  required
                />
              </div>

              {/* Slug */}
              <div className="group">
                <label className="block text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Slug *
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-400/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="golden-frame-24x36"
                  required
                />
              </div>

              {/* Price */}
              <div className="group">
                <label className="block text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Price (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-400/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="1299"
                  required
                />
              </div>

              {/* Category - FIXED */}
              <div className="group">
                <label className="block text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="" className="bg-slate-900">-- Select a category --</option>
                  <option value="Acrylic Photo" className="bg-slate-900">Acrylic Photo</option>
                  <option value="Framed Acrylic Photo" className="bg-slate-900">Framed Acrylic Photo</option>
                  <option value="Acrylic Cutout" className="bg-slate-900">Acrylic Cutout</option>
                  <option value="Aluminium Framed Acrylic Photo" className="bg-slate-900">Aluminium Framed Acrylic Photo</option>
                  <option value="Miniphoto Gallery" className="bg-slate-900">Miniphoto Gallery</option>
                  <option value="Clear Acrylic Photo" className="bg-slate-900">Clear Acrylic Photo</option>
                  <option value="Collage Acrylic Photo" className="bg-slate-900">Collage Acrylic Photo</option>
                  <option value="Acrylic Desk Photo" className="bg-slate-900">Acrylic Desk Photo</option>
                  <option value="Acrylic Nameplate" className="bg-slate-900">Acrylic Nameplate</option>
                  <option value="Acrylic Wall Clock" className="bg-slate-900">Acrylic Wall Clock</option>
                  <option value="Acrylic Fridge Magnets" className="bg-slate-900">Acrylic Fridge Magnets</option>
                  <option value="Acrylic KeyChains" className="bg-slate-900">Acrylic KeyChains</option>
                  <option value="Acrylic Monogram" className="bg-slate-900">Acrylic Monogram</option>
                </select>
              </div>

              {/* Image Upload Type Selector */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-purple-300 mb-3 flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  Product Images *
                </label>

                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setUploadType('url');
                      setSelectedImages([]);
                      setImagePreviewUrls([]);
                    }}
                    className={`flex-1 py-2 px-4 rounded-lg transition-all ${uploadType === 'url'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/5 text-purple-300 hover:bg-white/10'
                      }`}
                  >
                    Image URL
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadType('upload');
                      setImageUrl('');
                    }}
                    className={`flex-1 py-2 px-4 rounded-lg transition-all ${uploadType === 'upload'
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/5 text-purple-300 hover:bg-white/10'
                      }`}
                  >
                    Upload Images
                  </button>
                </div>

                {uploadType === 'url' && (
                  <>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-400/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="https://example.com/frame.jpg"
                      required={uploadType === 'url'}
                    />
                    {imageUrl && (
                      <div className="mt-4 flex items-center gap-4">
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-xl border border-white/20 shadow-lg"
                        />
                        <span className="text-sm text-purple-300">Preview</span>
                      </div>
                    )}
                  </>
                )}

                {uploadType === 'upload' && (
                  <>
                    <div className="relative">
                      <input
                        type="file"
                        id="image-upload"
                        multiple
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/20 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition-all"
                      >
                        <Upload className="w-12 h-12 text-purple-400 mb-3" />
                        <p className="text-purple-300 font-medium mb-1">
                          Click to upload images
                        </p>
                        <p className="text-purple-400/70 text-sm">
                          Upload up to 4 images (JPG, PNG, WEBP - Max 5MB each)
                        </p>
                      </label>
                    </div>

                    {imagePreviewUrls.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {imagePreviewUrls.map((url, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={url}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-xl border border-white/20 shadow-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              Image {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-400/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-vertical"
                  placeholder="Premium quality golden wooden frame..."
                />
              </div>

              {/* Submit Buttons */}
              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 hover:scale-[1.02]"
                >
                  {editingId ? (
                    <>
                      <Edit3 className="w-5 h-5" />
                      Update Product
                    </>
                  ) : (
                    <>
                      <PackagePlus className="w-5 h-5" />
                      Add Product
                    </>
                  )}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setTitle(''); setSlug(''); setPrice(''); setImageUrl('');
                      setCategory(''); setDescription('');
                      setSelectedImages([]);
                      setImagePreviewUrls([]);
                      setErrorMsg('');
                      setSuccessMsg('');
                    }}
                    className="px-6 py-3 bg-white/5 border border-white/10 text-purple-300 font-medium rounded-xl hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Products List */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="px-8 py-6 border-b border-white/10">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
              <PackagePlus className="w-6 h-6 text-purple-400" />
              All Products
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm font-medium rounded-full">
                {products.length}
              </span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-purple-300">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">
                    Product Details
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300 hidden md:table-cell">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300 hidden lg:table-cell">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-4">
                      <div className="relative">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-16 h-16 object-cover rounded-xl border border-white/20 group-hover:scale-110 transition-transform"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-xl border border-dashed border-white/20 flex items-center justify-center text-xs text-purple-300/70">
                            No image
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-medium text-white text-lg">
                        {product.title}
                      </div>
                      <div className="text-sm text-purple-400 mt-1">
                        {product.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-xl font-bold text-emerald-400">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      {product.category ? (
                        <span className="px-3 py-1.5 bg-linear-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30">
                          {product.category}
                        </span>
                      ) : (
                        <span className="px-3 py-1.5 bg-red-500/20 text-red-300 text-xs font-medium rounded-full border border-red-500/30">
                          No Category
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2.5 text-amber-400 hover:bg-amber-500/10 rounded-lg transition-all hover:scale-110 border border-transparent hover:border-amber-500/30"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-all hover:scale-110 border border-transparent hover:border-red-500/30"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="text-center py-16">
              <PackagePlus className="w-20 h-20 text-purple-400/50 mx-auto mb-4" />
              <p className="text-xl text-purple-300 mb-2">No products found</p>
              <p className="text-sm text-purple-400">Add your first frame to get started!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}