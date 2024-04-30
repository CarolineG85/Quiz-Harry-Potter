// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const administrators = await tables.Admin.readAll();

    // Respond with the items in JSON format
    res.json(administrators);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const admin = await tables.Admin.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (admin == null) {
      res.sendStatus(404);
    } else {
      res.json(admin);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// const add = async (req, res, next) => {
//   const admin = req.body;
//   try {
//     const insertid = await tables.Admin.create(admin);
//     res.status(201).json({ id: insertid });
//   } catch (error) {
//     next(error);
//   }
// };

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // add,
};
