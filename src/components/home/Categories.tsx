import { useState, useEffect } from 'react';
import type { Category } from '../../types/Category';

interface CategoriesProps {
  title?: string;
  subtitle?: string;
  showAll?: boolean;
}

const Categories = ({ 
  title = "Explore by Category",
  subtitle = "Find your next favorite read in our curated collections",
  showAll = false 
}: CategoriesProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => {
    // Fetch categories - replace with your actual API call
    const fetchCategories = async () => {
      try {
        // Mock data - replace with actual API call
        const mockCategories: Category[] = [
          {
            id: '1',
            name: 'Business & Finance',
            slug: 'business-finance',
            description: 'Master the art of money, entrepreneurship, and success',
            icon: '💼',
            productCount: 156,
            featured: true
          },
          {
            id: '2',
            name: 'Self-Development',
            slug: 'self-development',
            description: 'Transform your mindset and unlock your potential',
            icon: '🚀',
            productCount: 243,
            featured: true
          },
          {
            id: '3',
            name: 'Technology & Coding',
            slug: 'technology-coding',
            description: 'Stay ahead in the digital age with cutting-edge knowledge',
            icon: '💻',
            productCount: 189,
            featured: true
          },
          {
            id: '4',
            name: 'Health & Wellness',
            slug: 'health-wellness',
            description: 'Optimize your body, mind, and lifestyle',
            icon: '🧘',
            productCount: 127,
            featured: true
          },
          {
            id: '5',
            name: 'Fiction & Literature',
            slug: 'fiction-literature',
            description: 'Escape into captivating stories and timeless classics',
            icon: '📚',
            productCount: 312,
            featured: true
          },
          {
            id: '6',
            name: 'Science & Nature',
            slug: 'science-nature',
            description: 'Discover the wonders of our universe and planet',
            icon: '🔬',
            productCount: 98,
            featured: true
          },
          {
            id: '7',
            name: 'History & Politics',
            slug: 'history-politics',
            description: 'Understand the past to navigate the present',
            icon: '🏛️',
            productCount: 134,
            featured: false
          },
          {
            id: '8',
            name: 'Arts & Creativity',
            slug: 'arts-creativity',
            description: 'Unleash your creative potential and artistic vision',
            icon: '🎨',
            productCount: 87,
            featured: false
          }
        ];

        setCategories(showAll ? mockCategories : mockCategories.filter(c => c.featured));
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [showAll]);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-2xl p-8 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {category.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    <span className="font-medium">{category.productCount} books</span>
                  </div>

                  {/* Arrow */}
                  <div className={`flex items-center gap-1 text-blue-600 font-medium transition-transform ${
                    hoveredCategory === category.id ? 'translate-x-1' : ''
                  }`}>
                    <span className="text-sm">Explore</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          ))}
        </div>

        {/* Browse All CTA */}
        {!showAll && (
          <div className="text-center">
            <a
              href="/categories"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg group"
            >
              <span>Browse All Categories</span>
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}

        {/* Value Proposition Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Get personalized recommendations from our expert curators. We'll help you discover your next favorite book.
            </p>
            <a
              href="/recommendations"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Get Recommendations
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;