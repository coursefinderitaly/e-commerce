import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { validateEmail, validateRequired } from '../utils/validators';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import OptimizedImage from '../components/ui/OptimizedImage';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'US',
  });

  const [payment, setPayment] = useState({
    cardNumber: '', name: '', expiry: '', cvv: '',
  });

  const shippingTotal = subtotal > 200 ? 0 : 12.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingTotal + tax;

  const validateShipping = () => {
    const errs = {};
    if (!validateRequired(shipping.firstName)) errs.firstName = 'Required';
    if (!validateRequired(shipping.lastName)) errs.lastName = 'Required';
    if (!validateEmail(shipping.email)) errs.email = 'Valid email required';
    if (!validateRequired(shipping.address)) errs.address = 'Required';
    if (!validateRequired(shipping.city)) errs.city = 'Required';
    if (!validateRequired(shipping.state)) errs.state = 'Required';
    if (!validateRequired(shipping.zip)) errs.zip = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePayment = () => {
    const errs = {};
    if (!validateRequired(payment.name)) errs.name = 'Required';
    if (!validateRequired(payment.cardNumber) || payment.cardNumber.replace(/\s/g, '').length < 16)
      errs.cardNumber = 'Valid card number required';
    if (!validateRequired(payment.expiry)) errs.expiry = 'Required';
    if (!validateRequired(payment.cvv)) errs.cvv = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleShipping = (e) => {
    e.preventDefault();
    if (validateShipping()) setStep(2);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (validatePayment()) setStep(3);
  };

  const handlePlaceOrder = () => {
    setProcessing(true);
    setTimeout(() => {
      clearCart();
      const orderId = 'GA-' + Date.now().toString(36).toUpperCase();
      navigate(`/order-confirmation?orderId=${orderId}`);
    }, 2000);
  };

  const updateShipping = (field) => (e) => {
    setShipping(s => ({ ...s, [field]: e.target.value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const formatCard = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length > 2) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-transparent pt-24 pb-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl md:text-4xl text-gray-900 mb-8">Checkout</h1>

        <div className="flex items-center gap-2 mb-10 font-body text-sm">
          {['Shipping', 'Payment', 'Review'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                step > i + 1 ? 'bg-green-500 text-white' :
                step === i + 1 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {step > i + 1 ? '✓' : i + 1}
              </span>
              <span className={step === i + 1 ? 'text-gray-900 font-semibold' : 'text-gray-500'}>{s}</span>
              {i < 2 && <span className="text-gray-100 mx-2">—</span>}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {step === 1 && (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleShipping}
                className="bg-transparent rounded-xl p-6 border border-gray-100 space-y-4"
              >
                <h2 className="font-display text-xl mb-4">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="First Name" value={shipping.firstName} onChange={updateShipping('firstName')} error={errors.firstName} />
                  <Input label="Last Name" value={shipping.lastName} onChange={updateShipping('lastName')} error={errors.lastName} />
                </div>
                <Input label="Email" type="email" value={shipping.email} onChange={updateShipping('email')} error={errors.email} />
                <Input label="Phone" type="tel" value={shipping.phone} onChange={updateShipping('phone')} />
                <Input label="Address" value={shipping.address} onChange={updateShipping('address')} error={errors.address} />
                <div className="grid grid-cols-3 gap-4">
                  <Input label="City" value={shipping.city} onChange={updateShipping('city')} error={errors.city} />
                  <Input label="State" value={shipping.state} onChange={updateShipping('state')} error={errors.state} />
                  <Input label="ZIP" value={shipping.zip} onChange={updateShipping('zip')} error={errors.zip} />
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
                  Continue to Payment
                </Button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handlePayment}
                className="bg-transparent rounded-xl p-6 border border-gray-100 space-y-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard size={20} />
                  <h2 className="font-display text-xl">Payment</h2>
                </div>
                <p className="font-body text-sm text-gray-500 flex items-center gap-1 mb-4">
                  <Lock size={14} /> Test mode — use card number 4242 4242 4242 4242
                </p>
                <Input label="Cardholder Name" value={payment.name} onChange={e => setPayment(p => ({ ...p, name: e.target.value }))} error={errors.name} />
                <Input label="Card Number" value={payment.cardNumber} onChange={e => setPayment(p => ({ ...p, cardNumber: formatCard(e.target.value) }))} error={errors.cardNumber} placeholder="4242 4242 4242 4242" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Expiry (MM/YY)" value={payment.expiry} onChange={e => setPayment(p => ({ ...p, expiry: formatExpiry(e.target.value) }))} error={errors.expiry} placeholder="MM/YY" />
                  <Input label="CVV" value={payment.cvv} onChange={e => setPayment(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))} error={errors.cvv} placeholder="123" />
                </div>
                <div className="flex gap-3 mt-2">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button type="submit" variant="primary" size="lg" className="flex-1">Review Order</Button>
                </div>
              </motion.form>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-transparent rounded-xl p-6 border border-gray-100 space-y-4"
              >
                <h2 className="font-display text-xl mb-4">Review Your Order</h2>
                <div className="space-y-3">
                  <div>
                    <p className="font-body text-xs text-gray-500 uppercase tracking-wider mb-1">Shipping To</p>
                    <p className="font-body text-gray-900">{shipping.firstName} {shipping.lastName}</p>
                    <p className="font-body text-sm text-gray-600">{shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}</p>
                    <p className="font-body text-sm text-gray-600">{shipping.email}</p>
                  </div>
                  <div className="border-t border-gray-100 pt-3">
                    <p className="font-body text-xs text-gray-500 uppercase tracking-wider mb-2">Items ({items.length})</p>
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm font-body">
                        <span>{item.name} × {item.quantity}</span>
                        <span>{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>Back</Button>
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    onClick={handlePlaceOrder}
                    disabled={processing}
                  >
                    {processing ? 'Processing…' : `Pay ${formatCurrency(total)}`}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-transparent rounded-xl p-6 border border-gray-100 sticky top-28">
              <h3 className="font-display text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 font-body text-sm">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <OptimizedImage src={item.image} alt={item.name} width={120} containerClassName="w-12 h-14 rounded flex-shrink-0" className="w-full h-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-4 pt-4 space-y-2 font-body text-sm">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shippingTotal === 0 ? 'Free' : formatCurrency(shippingTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
                <div className="flex justify-between font-semibold text-gray-900 border-t border-gray-100 pt-2">
                  <span>Total</span>
                  <span className="font-display text-xl">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
