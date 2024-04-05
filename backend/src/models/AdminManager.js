// Import the AbstractManager class
const AbstractManager = require("./AbstractManager");

// Define a new class AdminManager that extends AbstractManager
class AdminManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "Admin" as configuration
    super({ table: "Admin" });
  }

  // This method reads an admin by its ID
  async read(id) {
    try {
      // Execute the SQL SELECT query to get an admin from the "Admin" table by ID
      const [rows] = await this.database.query(
        `select * from ${this.table} where id = ?`,
        [id]
      );
      // Return the first row (the admin)
      return rows[0];
    } catch (error) {
      // Log the error message and re-throw the error
      console.error(`Error occurred while reading an admin: ${error.message}`);
      throw error;
    }
  }

  // This method reads all admins
  async readAll() {
    try {
      // Execute the SQL SELECT query to get all admins from the "Admin" table
      const [rows] = await this.database.query(`select * from ${this.table}`);
      // Return all rows (all admins)
      return rows;
    } catch (error) {
      // Log the error message and re-throw the error
      console.error(
        `Error occurred while reading all admins: ${error.message}`
      );
      throw error;
    }
  }

  // This method gets an admin by email
  async getByMail(email) {
    try {
      // Execute the SQL SELECT query to get an admin from the "Admin" table by email
      const [result] = await this.database.query(
        `SELECT * FROM ${this.table} WHERE email=?`,
        [email]
      );
      // Return the result of the query
      return result;
    } catch (error) {
      // Log the error message and re-throw the error
      console.error(
        `Error occurred while getting an admin by email: ${error.message}`
      );
      throw error;
    }
  }
}

// Export the AdminManager class
module.exports = AdminManager;
