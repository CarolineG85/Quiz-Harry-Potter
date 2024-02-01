const tables = require("../tables");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await tables.Admin.getByMail(email);

    if (result && result[0]) {
      const admin = result[0];

      if (admin.password === password) {
        delete admin.password;
        res.status(200).send(admin);
      } else {
        res.status(400).send("Incorrect mail ou mot de passe");
      }
    } else {
      res.status(400).send("Incorrect mail ou mot de passe");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { login };
