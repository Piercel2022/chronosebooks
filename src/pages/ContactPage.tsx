import { useState } from 'react';
import { Mail, MessageSquare, Clock, Facebook, Instagram, Send, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/.netlify/functions/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      //const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 5000);
      } else {
        alert('Failed to send message. Please try again or email us directly.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again or email us at support@chronosebooks.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            We're Here to Help You Succeed
          </h1>
          <p className="text-xl text-blue-100 text-center max-w-2xl mx-auto">
            Have questions about our eBooks? Need recommendations? Want to share your transformation story? 
            We'd love to hear from you!
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Send Us a Message
              </h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours. 
                Your success is our priority!
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-green-700">
                  Thank you for reaching out. We'll respond to your inquiry shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="">Select a topic...</option>
                    <option value="general">General Inquiry</option>
                    <option value="recommendation">eBook Recommendation</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback & Testimonial</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    placeholder="Tell us how we can help you achieve your goals..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column - Contact Info & Social */}
          <div className="space-y-8">
            {/* Quick Contact Cards */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Other Ways to Reach Us
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Email Us</h4>
                    <p className="text-gray-600 text-sm mb-2">
                      For detailed inquiries and support
                    </p>
                    <a href="mailto:chronosebooks@outlook.fr" className="text-blue-600 font-semibold hover:text-blue-700">
                      chronosebooks@outlook.fr
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                  <div className="bg-indigo-600 p-3 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Live Chat</h4>
                    <p className="text-gray-600 text-sm mb-2">
                      Quick questions? Chat with us!
                    </p>
                    <button className="text-indigo-600 font-semibold hover:text-indigo-700">
                      Start Chat →
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                  <div className="bg-green-600 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Response Time</h4>
                    <p className="text-gray-600 text-sm">
                      We typically respond within 24 hours during business days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">
                Join Our Community
              </h3>
              <p className="text-purple-100 mb-6">
                Follow us for daily inspiration, exclusive content, success stories, and special offers!
              </p>

              <div className="space-y-4">
                {/* Facebook */}
                <a
                  href="https://facebook.com/chronosebooks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all transform hover:scale-[1.02] group"
                >
                  <div className="bg-blue-600 p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <Facebook className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">Facebook</h4>
                    <p className="text-sm text-purple-100">
                      @chronosebooks - Join 50K+ learners
                    </p>
                  </div>
                  <div className="text-2xl group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/chronosebooks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all transform hover:scale-[1.02] group"
                >
                  <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">Instagram</h4>
                    <p className="text-sm text-purple-100">
                      @chronosebooks - Daily motivation & tips
                    </p>
                  </div>
                  <div className="text-2xl group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-purple-100 text-center">
                  ⭐ Share your transformation story with #ChronosSuccess
                </p>
              </div>
            </div>

            {/* Trust Builder */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Why Our Customers Love Us
              </h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>24-hour response guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Expert recommendations tailored to you</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Friendly, helpful support team</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Your privacy is our priority</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-bold text-lg text-gray-900 mb-2">
                How quickly will I receive my eBook?
              </h4>
              <p className="text-gray-600">
                Instantly! After purchase, you'll receive immediate download access to your eBook.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-bold text-lg text-gray-900 mb-2">
                Can I get a refund if I'm not satisfied?
              </h4>
              <p className="text-gray-600">
                Yes! We offer a 30-day money-back guarantee. Contact us if you're not completely satisfied.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-bold text-lg text-gray-900 mb-2">
                Do you offer bulk discounts?
              </h4>
              <p className="text-gray-600">
                Absolutely! Contact us for special pricing on corporate or educational bulk orders.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-bold text-lg text-gray-900 mb-2">
                Can you recommend an eBook for me?
              </h4>
              <p className="text-gray-600">
                Yes! Tell us about your goals and interests, and we'll provide personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;