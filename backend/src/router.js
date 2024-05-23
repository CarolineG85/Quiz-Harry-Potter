const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");

const questionControllers = require("./controllers/questionControllers");
const answerControllers = require("./controllers/answerControllers");

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

// Route for answers
router.get("/answers", answerControllers.browse);
router.get("/answers/:id", answerControllers.read);
router.get("/answers-question/:id", answerControllers.readByQuestionId);

module.exports = router;
