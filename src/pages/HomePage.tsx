import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import ProductCard from '../components/products/ProductCard';
import  products  from '../data/products';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Get featured products (first 6)
  const featuredProducts = products.slice(0, 6);

  // Category data structure
  const categories = [
    {
      id: 'quick-wins',
      name: 'Quick Wins',
      description: 'Get results in under 30 minutes',
      icon: '⚡',
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      hoverBorder: 'hover:border-emerald-400',
      products: ['Checklists', 'Cheat Sheets']
    },
    {
      id: 'deep-dives',
      name: 'Deep Dives',
      description: 'Comprehensive mastery resources',
      icon: '📚',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBorder: 'hover:border-blue-400',
      products: ['Workbooks', 'eBooks']
    },
    {
      id: 'ready-to-use',
      name: 'Ready-to-Use',
      description: 'Plug-and-play templates',
      icon: '🎯',
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverBorder: 'hover:border-purple-400',
      products: ['Templates']
    },
    {
      id: 'step-by-step',
      name: 'Step-by-Step',
      description: 'Guided implementation plans',
      icon: '🗺️',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      hoverBorder: 'hover:border-amber-400',
      products: ['How-to Guides']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <Hero />

      {/* Categories Section - NEW */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Blueprint-style decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, #1e40af 1px, transparent 1px),
              linear-gradient(to bottom, #1e40af 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-800 bg-blue-100 px-6 py-2 rounded-full">
                Build What Matters
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700 bg-clip-text text-transparent">
                Your Blueprint Library
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Structured guides, templates, and workbooks designed to turn your ideas into action
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`${category.bgColor} ${category.borderColor} ${category.hoverBorder} border-2 rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer`}>
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.products.map((product, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium text-gray-700 bg-white/70 px-3 py-1 rounded-full border border-gray-200"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                  {/* Coming Soon Badge for non-ebook categories */}
                  {category.id !== 'deep-dives' && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <span className="inline-block text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blueprints Section */}
      <section className="py-20 px-4 relative overflow-hidden bg-white">
        {/* Blueprint-style corner accents */}
        <div className="absolute top-8 left-8 w-32 h-32 border-l-4 border-t-4 border-blue-600 opacity-10"></div>
        <div className="absolute bottom-8 right-8 w-32 h-32 border-r-4 border-b-4 border-blue-600 opacity-10"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold tracking-[0.3em] uppercase text-indigo-800 bg-indigo-100 px-6 py-2 rounded-full">
                Start Here
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700 bg-clip-text text-transparent">
                Featured Blueprints
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Handpicked resources to accelerate your journey and deliver real results
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* CTA to All Products */}
          <div className="text-center">
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <span>Explore All Blueprints</span>
              <svg
                className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
        {/* Animated blueprint grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px'
          }}></div>
        </div>

        {/* Technical corner markers */}
        <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-blue-400 opacity-30"></div>
        <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-blue-400 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-blue-400 opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-blue-400 opacity-30"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-blue-400">Chronos Blueprints</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Structured plans that transform ideas into measurable outcomes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Instant Access',
                description: 'Download immediately after purchase. Start implementing in seconds, not hours.'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                ),
                title: 'Action-Oriented',
                description: 'Every blueprint is designed for implementation, not just information.'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Battle-Tested',
                description: 'Real frameworks used by professionals to deliver consistent results.'
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-blue-400/50 group"
              >
                <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by <span className="text-blue-600">Thousands</span> of Builders
            </h2>
            <p className="text-xl text-gray-600">Join professionals who ship results, not just ideas</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "These blueprints cut my planning time in half. I go from idea to execution in record time.",
                author: "Sarah Mitchell",
                role: "Product Designer"
              },
              {
                quote: "Finally, resources that give me a clear path forward instead of just theory.",
                author: "James Chen",
                role: "Software Engineer"
              },
              {
                quote: "The structured approach transformed how I launch projects. No more guesswork.",
                author: "Maria Rodriguez",
                role: "Entrepreneur"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-blue-500 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                  <p className="text-blue-700">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter/Email Capture Section - NEW */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        {/* Blueprint corner accent */}
        <div className="absolute top-0 right-0 w-64 h-64 border-r-4 border-t-4 border-blue-600 opacity-5"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-800 bg-blue-100 px-6 py-2 rounded-full">
              Stay Updated
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get Notified When New Blueprints Launch
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Be the first to access new templates, guides, and workbooks. Plus, get exclusive launch discounts.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-lg"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap"
            >
              Notify Me
            </button>
          </form>
          
          <p className="text-sm text-gray-500 mt-4">
            Join 2,500+ subscribers. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white relative overflow-hidden">
        {/* Blueprint grid overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Corner technical markers */}
        <div className="absolute top-8 left-8 w-32 h-32 border-l-4 border-t-4 border-white opacity-20"></div>
        <div className="absolute bottom-8 right-8 w-32 h-32 border-r-4 border-b-4 border-white opacity-20"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready to Build Something Great?
          </h2>
          <p className="text-2xl mb-10 text-white/90">
            Get the blueprints you need to turn vision into reality
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-3 bg-white text-blue-700 px-12 py-6 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105"
          >
            <span>Explore All Blueprints</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;