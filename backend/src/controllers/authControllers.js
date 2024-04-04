const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../tables");

const login = async (req, res, next) => {
  const { email } = req.body;

  try {
    // If the request fails, handle the error (not shown in this code snippet)
    const result = await tables.user.getByMail(email);

    if (result && result[0]) {
      const admin = result[0];
      const verified = await argon2.verify(admin.password, req.body.password);

      if (verified) {
        // Respond with the user and a signed token in JSON format (but without the hashed password)
        delete admin.hashed_password;

        const token = await jwt.sign(
          { adminId: admin.id },
          process.env.APP_SECRET,
          {
            expiresIn: "1h",
          }
        );

        res.json({
          token,
          admin,
        });
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

module.exports = { login };
