import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import ProductCard from '../components/products/ProductCard';
import { products } from '../data/products';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Get featured products (first 6)
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Hero Section */}
      <Hero />

      {/* Featured Books Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold tracking-[0.3em] uppercase text-amber-800 bg-amber-100 px-6 py-2 rounded-full">
                Bestsellers
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-amber-700 via-orange-600 to-rose-700 bg-clip-text text-transparent">
                Curated Knowledge
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Handpicked digital books that transform perspectives and accelerate your journey
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
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <span>Explore Our Complete Collection</span>
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
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-amber-950 to-gray-900 text-white relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-amber-400">Chronos eBooks</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Premium digital content delivered instantly to accelerate your growth
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
                description: 'Download immediately after purchase. No waiting, no shipping. Start reading in seconds.'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Premium Quality',
                description: 'Carefully curated content from expert authors. Every book is vetted for excellence.'
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Best Value',
                description: 'Digital pricing means premium content at a fraction of physical book costs.'
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-amber-400/50 group"
              >
                <div className="text-amber-400 mb-4 group-hover:scale-110 transition-transform">
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
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by <span className="text-amber-600">Thousands</span> of Readers
            </h2>
            <p className="text-xl text-gray-600">Join our community of lifelong learners</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "These ebooks have completely transformed how I approach learning. The quality is unmatched.",
                author: "Sarah Mitchell",
                role: "Product Designer"
              },
              {
                quote: "Instant access to premium content has accelerated my career growth exponentially.",
                author: "James Chen",
                role: "Software Engineer"
              },
              {
                quote: "The curated selection saves me hours of research. Every book is a gem.",
                author: "Maria Rodriguez",
                role: "Entrepreneur"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-500 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                  <p className="text-amber-700">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Start Your Learning Journey Today
          </h2>
          <p className="text-2xl mb-10 text-white/90">
            Invest in knowledge that compounds over time
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-3 bg-white text-amber-700 px-12 py-6 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105"
          >
            <span>Browse All Books</span>
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