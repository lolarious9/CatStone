const mysql = require('mysql2/promise');

const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'catstonedb',
};
import {faker} from'@faker-js/faker'
const genPerson = async ()=>{
  
  const firstName=faker.person.firstName()
  const last = faker.person.lastName()
  const email = faker.internet.email()
  const phone = faker.string.numeric({length:10})
  const loc = faker.location.streetAddress(true)

  console.log(phone)
  return addBorrower(firstName,last,email,phone,loc)
}


const addLoans = async (borrower)=>{
    const id = await borrower
    const amt = faker.finance.amount()
    const date = faker.date.recent()
    await addLoan(id,amt,date)
    return {id,amt,date}
    
}
const payLoans = async(borrower)=>{
    const data = await borrower
    console.log(data)
    return addPayment(data.id,faker.number.float({max:data.amt,fractionDigits:2}),faker.date.between({from:data.date,to:Date.now()}))
}
const fakeData = async()=> payLoans(addLoans(genPerson()))
  


// CREATE CONNECTION
async function connect() {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    return connection;
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
    throw err; 
  }
}

// GET ALL BORROWERS AND THEIR ACCOUNT BALANCE
async function getAllBorrowers() {
    const connection = await mysql.createConnection(connectionConfig);
    try {
     // fakeData()
      const [rows] = await connection.query(`
        SELECT b.*, a.balance AS accountBalance
        FROM borrowers AS b
        INNER JOIN accounts AS a ON b.borrower_id = a.borrower_id;
      `);
  
      // Process data
      const formattedData = rows.map(row => ({
        borrower_id: row.borrower_id,
        first_name: row.first_name,
        last_name: row.last_name,
        borrower_email: row.borrower_email,
        borrower_phone: row.borrower_phone,
        borrower_address: row.borrower_address,
        accountBalance: row.accountBalance, 
      }));
  
      return formattedData;
    } catch (err) {
      console.error('Error getting borrowers:', err);
      throw err; 
    } finally {
      await connection.end(); 
    }
  }
  
// GET ALL PAYMENTS MADE BY A SPECIFIED BORROWER
async function getAllPaymentsByBorrower(borrowerID) {
    const connection = await mysql.createConnection(connectionConfig);
    try {
      const [rows] = await connection.query(`
        SELECT payment_id, payment_amt, payment_date
        FROM payments
        WHERE borrower_id = ?;
      `, [borrowerID]);
  
      // Process data
      const formattedPayments = rows.map(row => ({
        payment_id: row.payment_id,
        payment_amt: row.payment_amt,
        payment_date: row.payment_date,
      }));
  
      return Promise.resolve(formattedPayments);
    } catch (err) {
      console.error('Error getting payments for borrower:', err);
      return Promise.reject(err) 
    } finally {
      await connection.end(); 
    }
  }
  

// ADD BORROWER AND CREATE ACCOUNT
async function addBorrower(firstName, lastName, email, phone, address) {
  console.log(firstName,lastName,email,phone,address)
  const connection = await connect();
  try {
   await connection.beginTransaction();
   const borrower = await connection.query(`
      INSERT INTO borrowers (first_name, last_name, borrower_email, borrower_phone, borrower_address)
      VALUES (?, ?, ?, ?, ?)
    `, [firstName, lastName, email, phone, address]);
   // console.log(borrower[0].insertId)
    // Get borrower id
    //const borrowerID = borrower[0].insertId
   const borrowerIDValue = borrower[0].insertId; 

    // Create account with id and a zero balance
    await connection.execute(`
      INSERT INTO accounts (borrower_id, balance)
      VALUES (?, ?)
    `, [borrowerIDValue, 0.00]); 

    await connection.commit(); // Commit changes
    console.log(`Borrower added with ID: ${borrowerIDValue}`);

    return borrowerIDValue; 
  } catch (err) {
    console.error('Error adding borrower:', err);
    throw err; 
  } finally {
    await connection.end(); 
  }
}

// ADD LOAN & UPDATE ACCOUNT BALANCE
async function addLoan(borrowerID, loanAmount, loanDate) {
    const connection = await mysql.createConnection(connectionConfig);
    console.log(`addLoan called: ${borrowerID} ${loanAmount} ${loanDate}`)
    try {
      await connection.beginTransaction();
  
      // Update balance 
      await connection.execute(`
        UPDATE accounts
        SET balance = balance + ?
        WHERE borrower_id = ?
      `, [loanAmount, borrowerID]);
  
      // Insert new loan record
      await connection.execute(`
        INSERT INTO loans (borrower_id, loan_amt, loan_date)
        VALUES (?, ?, ?)
      `, [borrowerID, loanAmount, loanDate]);
  
      // Commit if steps succeed
      await connection.commit();
      console.log(`Loan of ${loanAmount} added for borrower ${borrowerID}`);
      Promise.resolve()
    } catch (error) {
      console.error('Error adding loan:', error);
      // Rollback if any errors occur
      await connection.rollback();
      Promise.reject(error)
    } finally {
      await connection.end('Connection End');
    }
  }

// ADD PAYMENT & UPDATE ACCOUNT BALANCE
async function addPayment(borrowerID, paymentAmount, paymentDate) {
    const connection = await mysql.createConnection(connectionConfig);
   console.log(`addPayment called: ${borrowerID} ${paymentAmount} ${paymentDate}`)
    try {
      await connection.beginTransaction();
  
      // Deduct amount from balance
      await connection.execute(`
        UPDATE accounts
        SET balance = balance - ?
        WHERE borrower_id = ?
      `, [paymentAmount, borrowerID]);
  
      // Check affected rows
      const [updateResult] = await connection.query('SELECT ROW_COUNT() AS rowCount');
      if (updateResult[0].rowCount === 0) {
        throw new Error('Payment failed: Borrower not found or potential overpayment');
      }
  
      // Insert payment record
      await connection.execute(`
        INSERT INTO payments (borrower_id, payment_amt, payment_date)
        VALUES (?, ?, ?)
      `, [borrowerID, paymentAmount, paymentDate]); 
  
      // Commit if steps succeed
      await connection.commit();
      console.log(`Payment of ${paymentAmount} added for borrower ${borrowerID}`);
  
    } catch (error) {
      console.error('Error adding payment:', error);
      // Rollback if errors occur
      await connection.rollback();
      throw error; 
    } finally {
      await connection.end('Connection End');
    }
  }
  export default{
    fakeData,
    getAllBorrowers,
    getAllPaymentsByBorrower,
    addPayment,
    addLoan,
    addBorrower,
  }
  module.exports = {
    fakeData,
    getAllBorrowers,
    getAllPaymentsByBorrower,
    addPayment,
    addLoan,
    addBorrower,
  };