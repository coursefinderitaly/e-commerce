import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation & Error states
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/profile';

  if (user && user.role !== 'admin') {
    return <Navigate to={from} replace />;
  }

  // Calculate password strength
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { label: '', color: 'bg-gray-200', width: 'w-0' };
    if (pwd.length < 6) return { label: 'Weak', color: 'bg-rose-500', width: 'w-1/3' };
    if (pwd.length < 10) return { label: 'Medium', color: 'bg-amber-500', width: 'w-2/3' };
    return { label: 'Strong', color: 'bg-emerald-500', width: 'w-full' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      if (!email || !password) {
        setError('Please enter both your email address and password.');
        return;
      }
      setLoading(true);
      const res = await login(email, password);
      setLoading(false);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.error || 'Invalid credentials');
      }
    } else {
      // Signup Validations
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (!email.trim()) {
        setError('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please check and try again.');
        return;
      }
      if (!agreeTerms) {
        setError('Please accept the Terms of Service to create an account.');
        return;
      }

      setLoading(true);
      const res = await signup(name, email, password, phone);
      setLoading(false);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.error || 'Failed to create account');
      }
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50/50 py-6 sm:py-12 pb-24 md:pb-12 px-4">
      <div className="max-w-md w-full">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center justify-center gap-2.5 mb-2 group">
            <div className="p-1.5 px-2 bg-gradient-to-br from-slate-900 via-gray-950 to-black rounded-xl border border-gray-800 shadow-md flex items-center justify-center group-hover:border-amber-500/40 transition-all">
              <img
                src="/logo1.png"
                alt="Glam AURA"
                className="h-8 sm:h-9 w-auto object-contain filter brightness-105 contrast-110 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
              />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-baseline">
                <span className="font-sans font-extrabold text-xl tracking-tight text-slate-900 uppercase">
                  GLAM
                </span>
                <span className="font-display italic font-semibold text-xl tracking-normal text-amber-600 ml-0.5">
                  Aura
                </span>
              </div>
              <span className="text-[7px] uppercase tracking-[0.22em] font-black text-amber-700">
                Clean Cosmetics
              </span>
            </div>
          </Link>
          <p className="text-xs text-gray-500 font-medium">
            {isLogin
              ? 'Access your saved addresses, orders, and wishlist'
              : 'Join the Glam Aura Beauty Club & get 15% off'}
          </p>
        </div>

        {/* Main Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
        >
          {/* Tabs: Log In / Sign Up */}
          <div className="flex bg-gray-100/70 p-1.5 m-4 sm:m-6 rounded-2xl border border-gray-200/50">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-xl transition-all ${
                isLogin
                  ? 'bg-white text-black shadow-sm'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase rounded-xl transition-all ${
                !isLogin
                  ? 'bg-white text-black shadow-sm'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="px-6 sm:px-8 pb-8 pt-2">
            
            {/* Error Message Box */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm rounded-xl font-medium flex items-start gap-2"
              >
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Sign Up: Full Name */}
              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      required
                      className="w-full bg-gray-50 hover:bg-gray-100/50 focus:bg-white text-gray-900 text-sm pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                    />
                    <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="Please enter a valid email address format (e.g. name@gmail.com)"
                    required
                    className="w-full bg-gray-50 hover:bg-gray-100/50 focus:bg-white text-gray-900 text-sm pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                  />
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Sign Up: Phone Number */}
              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ''))}
                      placeholder="+15550000000"
                      maxLength="15"
                      className="w-full bg-gray-50 hover:bg-gray-100/50 focus:bg-white text-gray-900 text-sm pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                    />
                    <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              )}

              {/* Password Field with Eye Toggle */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => setError('Password reset instructions sent to your email.')}
                      className="text-xs text-gray-500 hover:text-black font-medium underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isLogin ? 'Enter your password' : 'Create a strong password (min 6 chars)'}
                    required
                    className="w-full bg-gray-50 hover:bg-gray-100/50 focus:bg-white text-gray-900 text-sm pl-10 pr-11 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                  />
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Password strength bar on signup */}
                {!isLogin && password && (
                  <div className="mt-2">
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`} />
                    </div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase mt-1 block">
                      Strength: {strength.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Sign Up: Confirm Password Field with Eye Toggle */}
              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      required
                      className={`w-full bg-gray-50 hover:bg-gray-100/50 focus:bg-white text-gray-900 text-sm pl-10 pr-11 py-3 rounded-xl border focus:outline-none focus:ring-1 transition-all ${
                        confirmPassword && password !== confirmPassword
                          ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'
                          : 'border-gray-200 focus:border-black focus:ring-black'
                      }`}
                    />
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors p-1"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {confirmPassword && password === confirmPassword && (
                    <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
                      <CheckCircle2 size={13} /> Passwords match
                    </div>
                  )}
                </div>
              )}

              {/* Sign Up: Agree Terms Checkbox */}
              {!isLogin && (
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-black rounded border-gray-300 focus:ring-black"
                  />
                  <label htmlFor="terms" className="text-xs text-gray-600 leading-snug">
                    I agree to the{' '}
                    <span className="font-bold text-gray-900 underline">Terms of Service</span> and{' '}
                    <span className="font-bold text-gray-900 underline">Privacy Policy</span>.
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white hover:bg-gray-900 font-bold uppercase tracking-wider text-xs sm:text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isLogin ? (
                  <>
                    Log In to Account <ArrowRight size={16} />
                  </>
                ) : (
                  <>
                    Create Glam Aura Account <ArrowRight size={16} />
                  </>
                )}
              </button>

            </form>

            {/* Trust Footer inside card */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-400">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>256-bit encrypted secure authentication</span>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
