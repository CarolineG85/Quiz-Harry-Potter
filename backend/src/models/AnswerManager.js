const AbstractManager = require("./AbstractManager");

class AnswerManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "Answer" });
  }

  // The C of CRUD - Create operation

  async create({ contentAnswer, isTheRightAnswer, question_id: questionId }) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await this.database.query(
      `insert into ${this.table} (contentAnswer, isTheRightAnswer, question_id) values (?, ?, ?)`,
      [contentAnswer, isTheRightAnswer, questionId]
    );

    return result;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of items
    return rows;
  }

  async readByQuestionId(questionId) {
    const [result] = await this.database.query(
      `select * from ${this.table} where question_id = ?`,
      [questionId]
    );
    return result;
  }

  // The U of CRUD - Update operation
  async update({
    contentAnswer,
    isTheRightAnswer,
    question_id: questionId,
    id,
  }) {
    const [result] = await this.database.query(
      `update ${this.table} set contentAnswer =?, isTheRightAnswer =?, question_id =?   where id = ?`,
      [contentAnswer, isTheRightAnswer, questionId, id]
    );
    return result;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );
    return result;
  }
}
module.exports = AnswerManager;
