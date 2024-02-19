import crypto from "crypto";

export function generateUniqueChars(length = 32) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

// // Function to generate a random JWT secret
// function generateJWTSecret(length = 64) {
//   // Use a secure random number generator
//   const buffer = crypto.randomBytes(length);

//   // Convert the buffer to a base64-encoded string
//   const secret = buffer.toString('base64');

//   return secret;
// }

// // Generate a JWT secret with a default length of 64 bytes
// const jwtSecret = generateJWTSecret();
// console.log('Generated JWT Secret:', jwtSecret);
