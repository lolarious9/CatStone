const mysql = require('mysql2/promise');

// Replace with your actual MySQL connection details (avoid storing sensitive information in code)
const connectionConfig = {
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'catstonedb',
};

async function connect() {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    return connection;
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
    throw err; // Re-throw to indicate connection failure
  }
}

// Function to get all borrowers and their loans
async function getAllBorrowers() {
  const connection = await connect();
  try {
    const [rows] = await connection.query(`
      SELECT b.*, l.loan_amt AS loanAmount, l.loan_date AS loanDate
      FROM borrowers AS b
      INNER JOIN loans AS l ON b.borrower_id = l.borrower_id;
    `);

    // Process the rows (e.g., format data)
    const formattedData = rows.map(row => ({
      borrower_id: row.borrower_id,
      first_name: row.first_name,
      last_name: row.last_name,
      borrower_email: row.borrower_email,
      borrower_phone: row.borrower_phone,
      borrower_address: row.borrower_address,
      loans: row.loanAmount ? [{ loanAmount: row.loanAmount, loanDate: row.loanDate }] : [],
    }));

    return formattedData;
  } catch (err) {
    console.error('Error getting borrowers:', err);
    throw err; // Re-throw for handling in main.js
  } finally {
    await connection.end(); // Close the connection
  }
}

// Function to add a new borrower
async function addBorrower(firstName, lastName, email, phone, address) {
  const connection = await connect();
  try {
    await connection.query(`
      INSERT INTO borrowers (first_name, last_name, borrower_email, borrower_phone, borrower_address)
      VALUES (?, ?, ?, ?, ?)
    `, [firstName, lastName, email, phone, address]);
  } catch (err) {
    console.error('Error adding borrower:', err);
    throw err; // Re-throw for handling in main.js
  } finally {
    await connection.end(); // Close the connection
  }
}

// Function to add a new loan
async function addLoan(borrowerID, loanAmount, loanDate) {
  const connection = await connect();
  try {
    await connection.query(`
      INSERT INTO loans (borrower_id, loan_amt, loan_date)
      VALUES (?, ?, ?)
    `, [borrowerID, loanAmount, loanDate]);
  } catch (err) {
    console.error('Error adding loan:', err);
    throw err; // Re-throw for handling in main.js
  } finally {
    await connection.end(); // Close the connection
  }
}

// Function to get all payments for a specific loan (optional)
async function getPaymentsForLoan(loanID) {
  const connection = await connect();
  try {
    const [rows] = await connection.query(`
      SELECT *
      FROM payments
      WHERE loan_id = ?;
    `, [loanID]);

    // Process the rows (e.g., format data)
    const formattedPayments = rows.map(row => ({
      payment_id: row.payment_id,
      loan_id: row.loan_id,
      payment_amt: row.payment_amt,
      payment_date: row.payment_date,
    }));

    return formattedPayments;
  } catch (err) {
    console.error('Error getting payments for loan:', err);
    throw err; // Re-throw for handling in main.js
  } finally {
    await connection.end(); // Close the connection
  }
}

// Function to add a new payment 