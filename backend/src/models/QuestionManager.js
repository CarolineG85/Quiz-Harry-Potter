// Import the AbstractManager class
const AbstractManager = require("./AbstractManager");

// Define a new class QuestionManager that extends AbstractManager
class QuestionManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "Question" as configuration
    super({ table: "Question" });
  }

  // The C of CRUD - Create operation
  // This method creates a new question in the database
  async create({ content }) {
    try {
      // Execute the SQL INSERT query to add a new question to the "Question" table
      const [result] = await this.database.query(
        `insert into ${this.table} (content) values (?)`,
        [content]
      );

      // Return the result of the query
      return result;
    } catch (error) {
      // Log the error message and re-throw the error
      console.error(
        `Error occurred while creating a new question: ${error.message}`
      );
      throw error;
    }
  }

  // The Rs of CRUD - Read operations

  // This method reads a question by its ID
  async read(id) {
    try {
      const [rows] = await this.database.query(
        `select * from ${this.table} where id = ?`,
        [id]
      );
      // Return the first row (the question)
      return rows[0];
    } catch (error) {
      // Log the error message and re-throw the error
      console.error(
        `Error occurred while reading a question: ${error.message}`
      );
      throw error;
    }
  }

  // This method reads all questions
  async readAll() {
    try {
      const [rows] = await this.database.query(`select * from ${this.table}`);
      // Return all rows (all questions)
      return rows;
    } catch (error) {
      // Log the error message and re-throw the error
      console.error(
        `Error occurred while reading all questions: ${error.message}`
      );
      throw error;
    }
  }

  // The U of CRUD - Update operation
  // This method updates a question by its ID
  async update({ id, content }) {
    try {
      const [result] = await this.database.query(
        `update ${this.table} set content = ? where id = ?`,
        [content, id]
      );
      // Return the result of the query
      return result;
    } catch (error) {
      // Log the error message and re-throw the error
      console.error(
        `Error occurred while updating a question: ${error.message}`
      );
      throw error;
    }
  }

  // The D of CRUD - Delete operation
  // This method deletes a question by its ID
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
        `Error occurred while deleting a question: ${error.message}`
      );
      throw error;
    }
  }
}

// Export the QuestionManager class
module.exports = QuestionManager;
