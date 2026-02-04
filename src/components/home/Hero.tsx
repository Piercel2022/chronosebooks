import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '10,000+', label: 'Happy Readers' },
    { number: '500+', label: 'E-books Available' },
    { number: '4.8/5', label: 'Average Rating' }
  ];

  const categories = [
    { name: 'Fiction', icon: '📚', color: 'from-amber-400 to-orange-500' },
    { name: 'Business', icon: '💼', color: 'from-blue-400 to-indigo-500' },
    { name: 'Self-Help', icon: '🌟', color: 'from-purple-400 to-pink-500' },
    { name: 'Tech', icon: '💻', color: 'from-green-400 to-teal-500' }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        {/* Trust Badge */}
        <div className={`inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-300 font-medium">
            Trusted by 10,000+ readers worldwide
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className={`transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {/* Headline */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-none mb-6">
              <span className="block text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Next
              </span>
              <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 bg-clip-text text-transparent animate-gradient-x" style={{ fontFamily: "'Playfair Display', serif" }}>
                Great Read
              </span>
              <span className="block text-white text-5xl sm:text-6xl lg:text-7xl mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Awaits
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed max-w-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
              Discover thousands of premium e-books across every genre. 
              <span className="text-amber-400 font-semibold"> Instant download.</span>
              <span className="text-purple-400 font-semibold"> Forever yours.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                to="/products"
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105"
              >
                <span className="relative z-10">Browse E-books</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <button className="group px-8 py-4 bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:scale-105">
                <span className="flex items-center justify-center gap-2">
                  <span>Learn More</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="text-3xl font-black text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 mt-1 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Floating Book Stack */}
            <div className="relative h-[600px]">
              {/* Book 1 - Front */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-80 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg shadow-2xl transform rotate-3 hover:rotate-6 transition-all duration-500 hover:scale-105 cursor-pointer animate-float">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div>
                <div className="relative h-full p-6 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-purple-200 mb-2 font-semibold tracking-wider">FICTION</div>
                    <h3 className="text-2xl font-black text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                      The Midnight Chronicles
                    </h3>
                  </div>
                  <div className="text-sm text-purple-200">
                    <div className="flex items-center gap-1 mb-1">
                      {'★'.repeat(5).split('').map((star, i) => (
                        <span key={i} className="text-amber-400">{star}</span>
                      ))}
                    </div>
                    <div className="font-bold text-white">$9.99</div>
                  </div>
                </div>
              </div>

              {/* Book 2 - Mid */}
              <div className="absolute top-16 left-1/2 -translate-x-1/2 translate-x-20 w-64 h-80 bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg shadow-2xl transform -rotate-6 hover:-rotate-3 transition-all duration-500 hover:scale-105 cursor-pointer animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div>
                <div className="relative h-full p-6 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-orange-200 mb-2 font-semibold tracking-wider">BUSINESS</div>
                    <h3 className="text-2xl font-black text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Digital Success Blueprint
                    </h3>
                  </div>
                  <div className="text-sm text-orange-200">
                    <div className="flex items-center gap-1 mb-1">
                      {'★'.repeat(5).split('').map((star, i) => (
                        <span key={i} className="text-amber-400">{star}</span>
                      ))}
                    </div>
                    <div className="font-bold text-white">$14.99</div>
                  </div>
                </div>
              </div>

              {/* Book 3 - Back */}
              <div className="absolute top-32 left-1/2 -translate-x-1/2 -translate-x-20 w-64 h-80 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg shadow-2xl transform rotate-1 hover:rotate-4 transition-all duration-500 hover:scale-105 cursor-pointer animate-float" style={{ animationDelay: '1s' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div>
                <div className="relative h-full p-6 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-blue-200 mb-2 font-semibold tracking-wider">SELF-HELP</div>
                    <h3 className="text-2xl font-black text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Mindful Living Guide
                    </h3>
                  </div>
                  <div className="text-sm text-blue-200">
                    <div className="flex items-center gap-1 mb-1">
                      {'★'.repeat(5).split('').map((star, i) => (
                        <span key={i} className="text-amber-400">{star}</span>
                      ))}
                    </div>
                    <div className="font-bold text-white">$12.99</div>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/20 via-amber-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className={`mt-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Explore Popular Categories</h2>
            <p className="text-gray-400">Find your perfect read from our curated collections</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group relative px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-lg overflow-hidden"
                style={{ 
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                <span className="relative flex items-center gap-2 text-white font-semibold">
                  <span className="text-2xl">{category.icon}</span>
                  <span>{category.name}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Social Proof Banner */}
        <div className={`mt-16 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-slate-900 flex items-center justify-center text-white font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-white font-bold">Join thousands of happy readers</div>
                <div className="text-gray-400 text-sm">Reading better, learning faster</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-amber-400">
              {'★'.repeat(5).split('').map((star, i) => (
                <span key={i} className="text-2xl">{star}</span>
              ))}
              <span className="text-white font-bold ml-2">4.8/5</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap');
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(var(--rotate, 0deg));
          }
          50% {
            transform: translateY(-20px) rotate(var(--rotate, 0deg));
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 3s linear infinite;
        }
        
        .animate-float:nth-child(1) {
          --rotate: 3deg;
        }
        
        .animate-float:nth-child(2) {
          --rotate: -6deg;
        }
        
        .animate-float:nth-child(3) {
          --rotate: 1deg;
        }
      `}</style>
    </div>
  );
};

export default Hero;