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
    // Pass any errors to the error-handling middleware
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
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const readByQuestionId = async (req, res, next) => {
  try {
    const answer = await tables.Answer.readByQuestionId(req.params.id);

    if (answer == null) {
      res.sendStatus(404);
    } else {
      res.json(answer);
    }
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  const { contentAnswer, isTheRightAnswer, question_id: questionId } = req.body;

  const updatedAnswer = {
    id: req.params.id,
    contentAnswer,
    isTheRightAnswer,
    questionId,
  };
  if (updatedAnswer.isTheRightAnswer === "true") {
    updatedAnswer.isTheRightAnswer = 1;
  } else {
    updatedAnswer.isTheRightAnswer = 0;
  }

  try {
    await tables.Answer.update(updatedAnswer);

    res.status(200).send(updatedAnswer);
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const answer = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.Answer.create(answer);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    await tables.Answer.delete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  readByQuestionId,
};
