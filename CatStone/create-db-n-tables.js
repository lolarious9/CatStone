const mysql = require('mysql2/promise');

async function createDatabase() {
    // db connection 
    const connectionConfig = {
        host: 'localhost',
        user: 'root',
        password: 
    };

    const connection = await mysql.createConnection(connectionConfig);

    try {
        // Check if db exists
        const [rows] = await connection.execute('SHOW DATABASES LIKE "catstonedb"');
        if (rows.length === 0) {
            // If db doesn't exist create catstonedb
            await connection.execute('CREATE DATABASE catstonedb');
            console.log('Database created successfully.');
        } else {
            console.log('Database already exists.');
        }
    } catch (error) {
        console.error('Error creating database:', error);
    } finally {
        connection.end('Connection End');
    }
}

async function createTables() {
    const connectionConfig = {
        host: 'localhost',
        user: 'root',
        password: ,
        database: 'catstonedb' 
    };

    // Create connection
    const connection = await mysql.createConnection(connectionConfig);

    try {
        // Create borrowers table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS borrowers (
                borrower_id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                borrower_email VARCHAR(255) UNIQUE,
                borrower_phone BIGINT UNIQUE,
                borrower_address VARCHAR(255)
            )
        `);

        // Create loans table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS loans (
                loan_id INT AUTO_INCREMENT PRIMARY KEY,
                borrower_id INT NOT NULL,
                loan_amt DECIMAL(10, 2) NOT NULL,
                loan_date DATE NOT NULL,
                FOREIGN KEY (borrower_id) REFERENCES borrowers(borrower_id)
            )
        `);

        // Create payments table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS payments (
                payment_id INT AUTO_INCREMENT PRIMARY KEY,
                loan_id INT NOT NULL,
                payment_amt DECIMAL(10, 2) NOT NULL,
                payment_date DATE NOT NULL,
                FOREIGN KEY (loan_id) REFERENCES loans(loan_id)
        )
        `);

        // Create accounts table
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS accounts (
                borrower_id INT PRIMARY KEY,
                balance DECIMAL(10, 2),
                FOREIGN KEY (borrower_id) REFERENCES borrowers(borrower_id)
            )
        `);


        console.log('Tables created successfully.');
    } catch (error) {
        console.error('Error creating tables:', error);
    } finally {
        connection.end('Connection End'); 
    }
}

async function setupDatabase() {
    await createDatabase();
    await createTables();
    
    // Grant privileges to the 'root' user
    const connectionConfig = {
        host: 'localhost',
        user: 'root',
        password: ,
        database: 'catstonedb' 
    };

    // Create connection
    const connection = await mysql.createConnection(connectionConfig);

    try {
        // Grant privileges to the 'root' user
        await connection.execute('GRANT ALL PRIVILEGES ON *.* TO "root"@localhost');
        await connection.execute('FLUSH PRIVILEGES');
        console.log('Privileges granted to the root user');
    } catch (error) {
        console.error('Error granting privileges:', error);
    } finally {
        connection.end('Connection End');
    }
}

setupDatabase().catch(error => {
    console.error('Database setup error:', error);
});
