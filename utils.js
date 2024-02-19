import crypto from "crypto";

// Function to generate a random JWT secret
function generateJWTSecret(length = 64) {
  // Use a secure random number generator
  const buffer = crypto.randomBytes(length);

  // Convert the buffer to a base64-encoded string
  const secret = buffer.toString('base64');

  return secret;
}

// Generate a JWT secret with a default length of 64 bytes
const jwtSecret = generateJWTSecret();
console.log('Generated JWT Secret:', jwtSecret);
