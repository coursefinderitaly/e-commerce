export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateRequired(value) {
  if (typeof value === 'string') return value.trim().length > 0;
  return value !== null && value !== undefined;
}

export function validatePhone(phone) {
  return /^\+?[\d\s-]{7,15}$/.test(phone);
}

export function validateCardNumber(number) {
  return /^\d{16}$/.test(number.replace(/\s/g, ''));
}

export function validateExpiry(expiry) {
  const [month, year] = expiry.split('/').map(s => s.trim());
  if (!month || !year) return false;
  const m = parseInt(month, 10);
  const y = parseInt(year, 10) + 2000;
  if (m < 1 || m > 12) return false;
  const now = new Date();
  const exp = new Date(y, m, 0);
  return exp > now;
}

export function validateCVV(cvv) {
  return /^\d{3,4}$/.test(cvv);
}
