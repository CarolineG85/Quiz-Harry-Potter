// Import the argon2 library for password hashing
const argon2 = require("argon2");
// Import the jsonwebtoken library for token verification
const jwt = require("jsonwebtoken");

// Define the options for the argon2 hashing function
const hashingOptions = {
  type: argon2.argon2id, // Use the argon2id variant of Argon2
  memoryCost: 19 * 2 ** 10, // Amount of memory (in kibibytes) to use
  timeCost: 2, // Amount of computation realized
  parallelism: 1, // Parallelism factor
};

// Middleware function to verify the JWT token in the Authorization header
const verifyToken = (req, res, next) => {
  try {
    // Check for the presence of the "Authorization" header
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    // Check that the header is in the form "Bearer <token>"
    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    // Verify the token's validity (its authenticity and expiration date)
    // On success, the payload is extracted and decoded
    req.auth = jwt.verify(token, process.env.APP_SECRET);

    next();
  } catch (err) {
    console.error(err);

    // Send a 401 Unauthorized response if the token is invalid
    res.sendStatus(401);
  }
};

// Middleware function to hash the password in the request body
const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    // Hash the password using argon2
    const hashedPassword = await argon2.hash(password, hashingOptions);

    // Replace the plain-text password with the hashed password in the request body
    req.body.hashedPassword = hashedPassword;

    // Remove the plain-text password from the request body
    delete req.body.password;

    next();
  } catch (err) {
    next(err);
  }
};

// Export the middleware functions
module.exports = { hashPassword, verifyToken };
