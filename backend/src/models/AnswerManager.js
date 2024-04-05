// Import the AbstractManager class
const AbstractManager = require("./AbstractManager");

// Define a new class AnswerManager that extends AbstractManager
class AnswerManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "Answer" as configuration
    super({ table: "Answer" });
  }

  // The C of CRUD - Create operation
  // This method creates a new answer in the database
  async create({ contentAnswer, isTheRightAnswer, question_id: questionId }) {
    try {
      // Execute the SQL INSERT query to add a new answer to the "Answer" table
      const [result] = await this.database.query(
        `insert into ${this.table} (contentAnswer, isTheRightAnswer, question_id) values (?, ?, ?)`,
        [contentAnswer, isTheRightAnswer, questionId]
      );

      // Return the result of the query
      return result;
    } catch (error) {
      // Log the error message and re-throw the error
      console.error(
        `Error occurred while creating a new answer: ${error.message}`
      );
      throw error;
    }
  }

  // The Rs of CRUD - Read operations

  // This method reads an answer by its ID
  async read(id) {
    try {
      const [rows] = await this.database.query(
        `select * from ${this.table} where id = ?`,
        [id]
      );
      // Return the first row (the answer)
      return rows[0];
    } catch (error) {
      // Log the error message and re-throw the error
      console.error(`Error occurred while reading an answer: ${error.message}`);
      throw error;
    }
  }

  // This method reads all answers
  async readAll() {
    try {
      const [rows] = await this.database.query(`select * from ${this.table}`);
      // Return all rows (all answers)
      return rows;
    } catch (error) {
      // Log the error message and re-throw the error
      console.error(
        `Error occurred while reading all answers: ${error.message}`
      );
      throw error;
    }
  }

  // This method reads answers by question ID
  async readByQuestionId(questionId) {
    try {
      const [result] = await this.database.query(
        `select * from ${this.table} where question_id = ?`,
        [questionId]
      );
      // Return the result of the query
      return result;
    } catch (error) {
      // Log the error message and re-throw the error
      console.error(
        `Error occurred while reading answers by question ID: ${error.message}`
      );
      throw error;
    }
  }

  // The U of CRUD - Update operation
  // This method updates an answer by its ID
  async update({
    contentAnswer,
    isTheRightAnswer,
    question_id: questionId,
    id,
  }) {
    try {
      const [result] = await this.database.query(
        `update ${this.table} set contentAnswer =?, isTheRightAnswer =?, question_id =? where id = ?`,
        [contentAnswer, isTheRightAnswer, questionId, id]
      );
      // Return the result of the query
      return result;
    } catch (error) {
      // Log the error message and re-throw the error
      console.error(
        `Error occurred while updating an answer: ${error.message}`
      );
      throw error;
    }
  }

  // The D of CRUD - Delete operation
  // This method deletes an answer by its ID
  async delete(id) {
    try {
      const [result] = await this.database.query(
        `DELETE FROM ${this.table} WHERE id=?`,
        [id]
      );
      // Return the result of the query
      return result;
    } catch (error) {
      // Log the error message and re-throw the error
      console.error(
        `Error occurred while deleting an answer: ${error.message}`
      );
      throw error;
    }
  }
}

// Export the AnswerManager class
module.exports = AnswerManager;
