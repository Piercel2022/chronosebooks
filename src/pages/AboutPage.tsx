import { Link } from 'react-router-dom';
import { ShieldCheck, Clock, Award, Users, BookOpen, TrendingUp, Heart, Zap } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { number: '50,000+', label: 'Happy Readers', icon: Users },
    { number: '1,200+', label: 'eBooks Available', icon: BookOpen },
    { number: '98%', label: 'Satisfaction Rate', icon: Award },
    { number: '24/7', label: 'Instant Access', icon: Clock },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Knowledge',
      description: 'We believe in the transformative power of reading. Every book we curate is chosen to inspire, educate, and entertain.',
      color: 'text-accent-500',
      bgColor: 'bg-accent-50',
    },
    {
      icon: ShieldCheck,
      title: 'Quality You Can Trust',
      description: 'Each eBook undergoes rigorous quality checks. We guarantee perfect formatting, no missing pages, and crystal-clear content.',
      color: 'text-primary-500',
      bgColor: 'bg-primary-50',
    },
    {
      icon: Zap,
      title: 'Instant Gratification',
      description: 'No waiting, no shipping. Get your books instantly and start reading within seconds on any device, anywhere.',
      color: 'text-secondary-500',
      bgColor: 'bg-secondary-50',
    },
    {
      icon: TrendingUp,
      title: 'Growing With You',
      description: 'Your learning journey matters. We constantly expand our library based on reader feedback and emerging trends.',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
  ];

  const testimonials = [
    {
      quote: "Chronos eBooks transformed how I learn. The instant access and quality are unmatched. I've built my entire digital library here.",
      author: "Sarah Chen",
      role: "Software Engineer",
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      quote: "As a busy professional, I love that I can buy and start reading immediately. The selection is incredible and prices are fair.",
      author: "Marcus Johnson",
      role: "Marketing Director",
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      quote: "The quality of every eBook I've purchased has been perfect. No formatting issues, just pure reading pleasure. Highly recommend!",
      author: "Elena Rodriguez",
      role: "Book Enthusiast",
      image: "https://i.pravatar.cc/150?img=9",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50/30 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              Your Journey to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-white mt-2">
                Limitless Knowledge
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-primary-100 mb-8 leading-relaxed">
              At Chronos eBooks, we're not just selling books—we're opening doors to new worlds, ideas, and possibilities.
            </p>
            <Link 
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-50 hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105"
            >
              Explore Our Library
              <BookOpen className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="text-center animate-fade-in-up group cursor-default"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl shadow-medium group-hover:shadow-glow-lg transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-4xl font-display font-bold text-dark-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-dark-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-display font-bold text-dark-900 mb-6">
                Born from a Love of Reading
              </h2>
              <div className="space-y-4 text-lg text-dark-700 leading-relaxed">
                <p>
                  Chronos eBooks started with a simple belief: <span className="font-semibold text-primary-600">everyone deserves instant access to quality knowledge</span>. In a world moving at the speed of light, waiting for physical books felt like a constraint on curiosity.
                </p>
                <p>
                  We built this platform for the midnight learner, the commuting professional, the curious mind who wants to start reading <span className="font-semibold text-primary-600">right now</span>. No delays. No compromises. Just pure, uninterrupted access to the books that matter to you.
                </p>
                <p>
                  Today, we're proud to serve a global community of readers who share our passion for instant knowledge and continuous growth. Every purchase supports our mission to make quality eBooks accessible to everyone, everywhere.
                </p>
              </div>
            </div>
            
            <div className="relative animate-fade-in-up lg:animate-slide-in-right">
              <div className="relative rounded-3xl overflow-hidden shadow-strong">
                <img 
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop" 
                  alt="Reading and learning"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-dark-900/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="text-2xl font-display font-bold mb-2">
                    "A book is a dream you hold in your hands"
                  </p>
                  <p className="text-primary-200">— Neil Gaiman</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-dark-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-xl text-dark-600 max-w-2xl mx-auto">
              Our core values drive everything we do, from curating our library to serving our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="group p-8 bg-white rounded-2xl border-2 border-dark-100 hover:border-primary-500 hover:shadow-strong transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${value.bgColor} ${value.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-dark-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-dark-700 leading-relaxed text-lg">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-dark-900 mb-4">
              Loved by Readers Worldwide
            </h2>
            <p className="text-xl text-dark-600 max-w-2xl mx-auto">
              Don't just take our word for it—hear from our community of passionate readers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-medium hover:shadow-strong transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-primary-100"
                  />
                  <div>
                    <div className="font-bold text-dark-900">{testimonial.author}</div>
                    <div className="text-sm text-dark-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-dark-700 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="mt-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-primary-500 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6 animate-fade-in-up">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Join thousands of readers who've discovered the joy of instant access to quality eBooks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <Link 
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-50 hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105"
            >
              Browse Our Collection
              <BookOpen className="w-5 h-5" />
            </Link>
            <Link 
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-primary-700/50 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-700/70 hover:border-white/50 transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;