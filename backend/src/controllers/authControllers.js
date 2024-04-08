// Import the argon2 library for password verification
const argon2 = require("argon2");
// Import the jsonwebtoken library for token generation
const jwt = require("jsonwebtoken");
// Import access to database tables
const tables = require("../tables");

// Define the login controller
const login = async (req, res, next) => {
  // Extract the email from the request body
  const { email } = req.body;

  try {
    // Fetch the user/admin from the database by email
    const result = await tables.Admin.getByMail(email);

    // If a user is found and the password is correct
    if (result && result[0]) {
      const admin = result[0];
      // Verify the password using argon2
      const verified = await argon2.verify(admin.password, req.body.password);

      if (verified) {
        // Remove the hashed password from the admin object
        delete admin.password;

        // Generate a JWT token for the user
        const token = await jwt.sign(
          { adminId: admin.id },
          process.env.APP_SECRET,
          {
            expiresIn: "1h", // The token will expire in 1 hour
          }
        );

        // Respond with the admin and the token in JSON format
        res.json({
          token,
          admin,
        });
      } else {
        // If the password is incorrect, respond with HTTP 400 (Bad Request)
        res.status(400).send("Incorrect mail ou mot de passe");
      }
    } else {
      // If no user is found, respond with HTTP 400 (Bad Request)
      res.status(400).send("Incorrect mail ou mot de passe");
    }
  } catch (err) {
    // If an error occurs, pass it to the next error handler
    next(err);
  }
};

// Export the login controller
module.exports = { login };
