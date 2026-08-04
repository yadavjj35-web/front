export function required(val) {
  return val !== undefined && val !== null && String(val).trim() !== '';
}

export function isEmail(val) {
  if (!val) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

export function minLength(val, len) {
  if (!val) return false;
  return String(val).length >= len;
}

export function maxLength(val, len) {
  if (!val) return false;
  return String(val).length <= len;
}
