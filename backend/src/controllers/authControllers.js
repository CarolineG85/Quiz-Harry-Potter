const argon2 = require("argon2");
const tables = require("../tables");

// If the request fails, handle the error (not shown in this code snippet)

const login = async (req, res, next) => {
  // If the request fails, handle the error (not shown in this code snippet)
  const { email } = req.body;

  try {
    // If the request fails, handle the error (not shown in this code snippet)
    const result = await tables.Admin.getByMail(email);

    if (result && result[0]) {
      const admin = result[0];
      const verified = await argon2.verify(admin.password, req.body.password);

      if (verified) {
        // Respond with the user and a signed token in JSON format (but without the hashed password)
        delete admin.hashed_password;
      } else {
        res.status(400).send("Incorrect mail ou mot de passe");
      }
    } else {
      res.status(400).send("Incorrect mail ou mot de passe");
    }
  } catch (err) {
    // If an error occurs, pass it to the next error handler
    next(err);
  }
};

// Exporting the login and signin functions
module.exports = { login };
