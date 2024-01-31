const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
// const authControllers = require("./controllers/authControllers");
const adminControllers = require("./controllers/adminControllers");
const questionControllers = require("./controllers/questionControllers");
const answerControllers = require("./controllers/answerControllers");
// importer hashpassword de auth

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

/* ************************************************************************* */
// Route for questions
router.get("/questions", questionControllers.browse);
router.get("/questions/:id", questionControllers.read);
router.post("/questions", questionControllers.add);
router.put("/questions/:id", questionControllers.edit);
router.delete("/questions/:id", questionControllers.destroy);

// Route for admin
router.get("/admin/:id", adminControllers.read);
router.get("/admin", adminControllers.browse);

// Route for answers
router.get("/answers", answerControllers.browse);
router.get("/answers/:id", answerControllers.read);
router.get("/answers-question/:id", answerControllers.readByQuestionId);
router.post("/answers", answerControllers.add);
router.put("/answers/:id", answerControllers.edit);
router.delete("/answers/:id", answerControllers.destroy);

module.exports = router;
