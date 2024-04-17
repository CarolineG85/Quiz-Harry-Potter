// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const answers = await tables.Answer.readAll();

    // Respond with the items in JSON format
    res.json(answers);
  } catch (err) {
    // Log the error and pass it to the error-handling middleware
    console.error("Error occurred while fetching all answers: ", err);
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const answer = await tables.Answer.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (answer == null) {
      res.sendStatus(404);
    } else {
      res.json(answer);
    }
  } catch (err) {
    // Log the error and pass it to the error-handling middleware
    console.error("Error occurred while fetching a specific answer: ", err);
    next(err);
  }
};

// Function to read an answer by its associated question ID
const readByQuestionId = async (req, res, next) => {
  try {
    // Fetch the answer associated with the provided question ID
    const answer = await tables.Answer.readByQuestionId(req.params.id);

    // If the answer is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the answer in JSON format
    if (answer == null) {
      res.sendStatus(404);
    } else {
      res.json(answer);
    }
  } catch (err) {
    // Log the error and pass it to the error-handling middleware
    console.error("Error occurred while fetching answer by question ID: ", err);
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Extract the updated answer data from the request body
  const { contentAnswer, isTheRightAnswer, question_id: questionId } = req.body;

  // Prepare the updated answer object
  const updatedAnswer = {
    id: req.params.id,
    contentAnswer,
    isTheRightAnswer,
    questionId,
  };

  // Convert the isTheRightAnswer property to a boolean value
  if (updatedAnswer.isTheRightAnswer === "true") {
    updatedAnswer.isTheRightAnswer = 1;
  } else {
    updatedAnswer.isTheRightAnswer = 0;
  }

  try {
    // Update the answer in the database
    await tables.Answer.update(updatedAnswer);

    // Respond with HTTP 200 (OK) and the updated answer
    res.status(200).send(updatedAnswer);
  } catch (err) {
    // Log the error and pass it to the error-handling middleware
    console.error("Error occurred while updating an answer: ", err);
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the new answer data from the request body
  const answer = req.body;

  try {
    // Insert the new answer into the database
    const insertId = await tables.Answer.create(answer);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted answer
    res.status(201).json({ insertId });
  } catch (err) {
    // Log the error and pass it to the error-handling middleware
    console.error("Error occurred while creating an answer: ", err);
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the answer from the database
    await tables.Answer.delete(req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Log the error and pass it to the error-handling middleware
    console.error("Error occurred while deleting an answer: ", err);
    next(err);
  }
};

// Export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  readByQuestionId,
};
