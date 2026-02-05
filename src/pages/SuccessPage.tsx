import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Mail, Home, BookOpen, Sparkles } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const SuccessPage = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState('');
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Generate order number
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    setOrderNumber(`CHR-${timestamp}-${random}`);

    // Clear cart on successful order
    clearCart();

    // Hide confetti after animation (10 seconds)
    const timer = setTimeout(() => setShowConfetti(false), 10000);
    
    return () => clearTimeout(timer);
  }, [clearCart]);

  // Redirect if accessed directly without purchase
  useEffect(() => {
    const hasCompletedPurchase = sessionStorage.getItem('purchaseCompleted');
    if (!hasCompletedPurchase) {
      navigate('/');
    } else {
      // Clear the flag after displaying success page
      sessionStorage.removeItem('purchaseCompleted');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Sparkles 
                className="text-emerald-500" 
                size={16 + Math.random() * 16}
                style={{ opacity: 0.6 + Math.random() * 0.4 }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Success Icon with Animation */}
          <div className="text-center mb-8 animate-scale-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-2xl mb-6 animate-bounce-slow">
              <CheckCircle className="w-14 h-14 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              Commande confirmée !
            </h1>
            <p className="text-xl text-gray-700 font-medium">
              Merci pour votre achat 🎉
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-10 mb-8 border border-emerald-100 animate-slide-up">
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
              <div>
                <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-2">
                  Numéro de commande
                </p>
                <p className="text-2xl font-bold text-gray-900 font-mono tracking-tight">
                  {orderNumber}
                </p>
              </div>
              <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold">
                Payé
              </div>
            </div>

            {/* What's Next Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-6 h-6 text-emerald-600" />
                Prochaines étapes
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Email Confirmation */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">
                        Vérifiez vos emails
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Un email de confirmation avec vos liens de téléchargement a été envoyé à votre adresse.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Download Instructions */}
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Download className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">
                        Téléchargez vos e-books
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Cliquez sur les liens dans l'email pour télécharger vos e-books au format PDF.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mt-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">!</span>
                  </div>
                  <div>
                    <p className="text-amber-900 font-semibold mb-1">
                      Pensez à vérifier vos spams
                    </p>
                    <p className="text-amber-800 text-sm">
                      Si vous ne recevez pas l'email dans les 5 minutes, vérifiez votre dossier spam ou promotions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Link
              to="/"
              className="group flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Retour à l'accueil
            </Link>
            
            <Link
              to="/products"
              className="group flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-emerald-500 transform hover:-translate-y-1 transition-all duration-300"
            >
              <BookOpen className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
              Découvrir d'autres e-books
            </Link>
          </div>

          {/* Social Proof / Thank You Message */}
          <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
            <p className="text-gray-700 text-lg leading-relaxed">
              Merci de faire confiance à <span className="font-bold text-emerald-600">Chronos E-books</span>. 
              Nous espérons que nos ouvrages vous accompagneront dans votre développement personnel et professionnel.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>Bonne lecture !</span>
              <Sparkles className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }

        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes scale-in {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes slide-up {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 10s;
        }

        .animate-confetti {
          animation: confetti linear forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SuccessPage;