import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

/* ---------------------------- Types ---------------------------- */

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  country: string;
  acceptTerms: boolean;
}

type FormErrors = Partial<Record<keyof CheckoutFormData, string>>;

/* -------------------------- Component -------------------------- */

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    country: 'FR',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);

  /* ------------------------- Handlers -------------------------- */

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.confirmEmail.trim()) {
      newErrors.confirmEmail = "Confirmez votre email";
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Les emails ne correspondent pas';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true);

    setTimeout(() => {
      clearCart();
      navigate('/success', {
        state: {
          orderData: {
            ...formData,
            total: getCartTotal(),
            items: cart,
          },
        },
      });
    }, 5000);
  };

  /* ------------------------- Empty Cart ------------------------ */

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={() => navigate('/products')}>
          Votre panier est vide — Voir les produits
        </button>
      </div>
    );
  }

  /* ---------------------------- UI ----------------------------- */

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-8">
      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Prénom"
      />
      {errors.firstName && <p>{errors.firstName}</p>}

      <input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Nom"
      />
      {errors.lastName && <p>{errors.lastName}</p>}

      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email}</p>}

      <input
        name="confirmEmail"
        value={formData.confirmEmail}
        onChange={handleChange}
        placeholder="Confirmer Email"
      />
      {errors.confirmEmail && <p>{errors.confirmEmail}</p>}

      <select
        name="country"
        value={formData.country}
        onChange={handleChange}
      >
        <option value="FR">France</option>
        <option value="BE">Belgique</option>
      </select>

      <label>
        <input
          type="checkbox"
          name="acceptTerms"
          checked={formData.acceptTerms}
          onChange={handleChange}
        />
        Accepter les conditions
      </label>
      {errors.acceptTerms && <p>{errors.acceptTerms}</p>}

      <button type="submit" disabled={isProcessing}>
        Payer {getCartTotal().toFixed(2)}€
      </button>
    </form>
  );
}
