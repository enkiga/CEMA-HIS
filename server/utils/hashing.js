// import requirements
const { hash, compare } = require("bcryptjs");

// Hashing function
exports.doHash = (value, saltValue) => {
  const result = hash(value, saltValue);
  return result;
};

// Validate hashed password function
exports.doHashValidation = (value, hashedValue) => {
  const result = compare(value, hashedValue);
  return result;
};
