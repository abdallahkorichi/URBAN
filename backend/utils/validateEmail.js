import validator from "validator";

// Normalize email for storage/lookup:
// - enforce string input
// - trim whitespace
// - reject CR/LF to prevent email header injection into mailers
// - lowercase to match mongoose `lowercase: true`
const normalizeEmail = (email) => {
  if (typeof email !== "string") return "";
  if (/[\r\n]/.test(email)) return "";

  const trimmed = email.trim();
  if (!trimmed) return "";
  if (trimmed.length > 254) return "";

  return trimmed.toLowerCase();
};

// Strict, security-focused email validation.
// Note: we validate after normalization so the accepted format is stable.
const isValidEmail = (email) => {
  if (typeof email !== "string") return false;
  if (!email || email.length > 254) return false;
  if (/[\r\n]/.test(email)) return false;

  return validator.isEmail(email, {
    allow_utf8: false,
    require_tld: true,
  });
};

export { normalizeEmail, isValidEmail };

