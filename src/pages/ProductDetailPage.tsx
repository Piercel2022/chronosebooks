import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { products, type Product } from '../data/products';
import Button from '../components/common/Button';

// Define the Product type based on your data structure


const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  //const [product, setProduct] = useState<Product | null>(null);
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const product = products.find(p => p.id === Number(id));

  if (!product) {
  return <Navigate to="/products" replace />;
}


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Create a cart item object that matches CartContext expectations
    const cartItem = {
      id: product.id.toString(), // Convert number to string to match CartItem type
      title: product.title,
      author: product.author,
      price: product.price,
      category: product.category,
      rating: product.rating,
      reviews: product.reviews,
      description: product.description,
      selectedFormat: selectedFormat,
      ...('cover' in product && product.coverImage && { cover: product.coverImage })
    };
    addToCart(cartItem);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const formats = [
    { id: 'pdf', name: 'PDF', description: 'Universal format' },
    { id: 'epub', name: 'EPUB', description: 'For e-readers' },
    { id: 'mobi', name: 'MOBI', description: 'For Kindle' }
  ];

  const features = [
    { icon: '📱', text: 'Read on any device' },
    { icon: '⬇️', text: 'Instant download' },
    { icon: '🔄', text: 'Free updates' },
    { icon: '💯', text: '30-day guarantee' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="text-sm text-gray-600 animate-fadeIn">
            <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-orange-600 transition-colors">Books</Link>
            <span className="mx-2">/</span>
            <Link to={`/products?category=${product.category}`} className="hover:text-orange-600 transition-colors">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-gray-900">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Product Image */}
          <div className="animate-fadeIn">
            <div className="sticky top-8">
              <div className="relative group">
                {/* Main image container */}
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-3xl">
                  {'cover' in product && product.coverImage ? (
                    <img
                      src={product.coverImage}
                      alt={product.title}
                      className="w-full h-full object-cover opacity-90"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) {
                          fallback.style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  {/* Fallback design */}
                  <div className={`${'cover' in product && product.coverImage ? 'hidden' : 'flex'} w-full h-full items-center justify-center p-12 text-center`}>
                    <div>
                      <div className="text-6xl mb-4">📚</div>
                      <h3 className="text-2xl font-serif font-bold text-white mb-2">{product.title}</h3>
                      <p className="text-gray-300">by {product.author}</p>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-orange-400 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-amber-400 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              </div>

              {/* Trust badges */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">✓</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Instant Delivery</p>
                      <p className="text-xs text-gray-500">Download now</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">🔒</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Secure Payment</p>
                      <p className="text-xs text-gray-500">Protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            {/* Category badge */}
            <div className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
              {product.category}
            </div>

            {/* Title and Author */}
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
              {product.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              by <span className="font-semibold text-gray-900">{product.author}</span>
            </p>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(product.rating)
                        ? 'text-amber-400 fill-current'
                        : 'text-gray-300'
                    }`}
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-lg font-bold text-gray-900">{product.rating}</span>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-gray-500 text-lg">one-time payment</span>
              </div>
              <p className="text-green-600 font-medium mt-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Limited time offer - Save 40%
              </p>
            </div>

            {/* Format Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Choose Format
              </label>
              <div className="grid grid-cols-3 gap-3">
                {formats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedFormat === format.id
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <p className={`font-bold mb-1 ${
                      selectedFormat === format.id ? 'text-orange-600' : 'text-gray-900'
                    }`}>
                      {format.name}
                    </p>
                    <p className="text-xs text-gray-500">{format.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 mb-8">
              <Button
                onClick={handleAddToCart}
                className="w-full py-5 text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {addedToCart ? (
                    <>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Button>

              <Link to="/products" className="block w-full">
                <button className="w-full py-4 text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-medium">
                  Continue Shopping
                </button>
              </Link>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8 p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    Join {product.reviews}+ happy readers
                  </p>
                  <p className="text-sm text-gray-600">
                    Trusted by professionals worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-20 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <div className="border-b border-gray-200 mb-8">
            <div className="flex gap-8">
              {['overview', 'details', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 font-semibold capitalize transition-colors relative ${
                    activeTab === tab
                      ? 'text-orange-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            {activeTab === 'overview' && (
              <div className="prose prose-lg max-w-none">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">About This Book</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {product.description || product.description}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This comprehensive guide provides you with everything you need to master the subject. 
                  Whether you're a beginner or looking to advance your skills, this e-book offers 
                  practical insights, real-world examples, and actionable strategies.
                </p>
              </div>
            )}

            {activeTab === 'details' && (
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Book Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <span className="font-medium text-gray-900">Author</span>
                    <span className="text-gray-700">{product.author}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <span className="font-medium text-gray-900">Category</span>
                    <span className="text-gray-700">{product.category}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <span className="font-medium text-gray-900">Pages</span>
                    <span className="text-gray-700">{product.pages || '350+'}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <span className="font-medium text-gray-900">Language</span>
                    <span className="text-gray-700">{product.releaseDate|| 'English'}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <span className="font-medium text-gray-900">Format</span>
                    <span className="text-gray-700">PDF, EPUB, MOBI</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-200">
                    <span className="font-medium text-gray-900">Published</span>
                    <span className="text-gray-700">{product.releaseDate || '2024'}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-serif font-bold text-gray-900">Customer Reviews</h3>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-3xl font-bold text-gray-900">{product.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{product.reviews} reviews</p>
                  </div>
                </div>

                {/* Sample reviews */}
                <div className="space-y-6">
                  {[
                    { name: 'Sarah Johnson', rating: 5, text: 'Absolutely fantastic! This book changed the way I approach my work. Highly recommended for anyone serious about learning.' },
                    { name: 'Michael Chen', rating: 5, text: 'Clear, concise, and incredibly useful. The examples are practical and easy to follow. Worth every penny!' },
                    { name: 'Emma Davis', rating: 4, text: 'Great resource with lots of valuable insights. Would have liked more advanced topics, but overall excellent for beginners to intermediate level.' }
                  ].map((review, idx) => (
                    <div key={idx} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold">
                            {review.name[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{review.name}</p>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                You Might Also Like
              </h2>
              <Link
                to={`/products?category=${product.category}`}
                className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2 group"
              >
                View all {product.category}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, idx) => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.id}`}
                  className="group block animate-fadeIn"
                  style={{ animationDelay: `${0.7 + idx * 0.1}s` }}
                >
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1">
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
                      {relatedProduct.coverImage && (
                 <img
                   src={relatedProduct.coverImage}
                   alt={relatedProduct.title}
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                     const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.style.display = 'flex';
                        }
                        }}
                       />
                           )}
  
                      <div className={`${'cover' in relatedProduct && relatedProduct.coverImage ? 'hidden' : 'flex'} w-full h-full items-center justify-center p-6 text-center absolute inset-0`}>
                        <div>
                          <div className="text-4xl mb-2">📚</div>
                          <p className="text-sm font-semibold text-white">{relatedProduct.title}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {relatedProduct.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{relatedProduct.author}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-orange-600">
                          ${relatedProduct.price}
                        </span>
                        <div className="flex items-center gap-1 text-sm">
                          <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-gray-600">{relatedProduct.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Money-back guarantee banner */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="text-6xl">🛡️</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                30-Day Money-Back Guarantee
              </h3>
              <p className="text-gray-700">
                Not satisfied? Get a full refund within 30 days. No questions asked. 
                We're confident you'll love this book, but if it's not for you, we've got you covered.
              </p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg whitespace-nowrap">
              Risk-Free Purchase
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .font-serif {
          font-family: 'Crimson Pro', serif;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;