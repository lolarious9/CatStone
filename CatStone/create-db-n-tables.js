const mysql = require('mysql2/promise');

async function createDatabase() {
    // Database connection 
    const connectionConfig = {
        host: 'localhost',
        user: 'username',
        password: 'password'
    };

    const connection = await mysql.createConnection(connectionConfig);

    try {
        // Check if the database exists
        const [rows] = await connection.execute('SHOW DATABASES LIKE "catstonedb"');
        if (rows.length === 0) {
            // If the database doesn't exist, create it
            await connection.execute('CREATE DATABASE catstonedb');
            console.log('Database created successfully.');
        } else {
            console.log('Database already exists.');
        }
    } catch (error) {
        console.error('Error creating database:', error);
    } finally {
        connection.end();
    }
}

async function createTables() {
    const connectionConfig = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'catstonedb' 
    };

    // Create connection
    const connection = await mysql.createConnection(connectionConfig);

    try {
        // Create tables
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS table1 (
                ...
            )
        `);

        await connection.execute(`
            CREATE TABLE IF NOT EXISTS table2 (
                ...
            )
        `);

        console.log('Tables created successfully.');
    } catch (error) {
        console.error('Error creating tables:', error);
    } finally {
        connection.end(); 
    }
}

async function setupDatabase() {
    await createDatabase();
    await createTables();
}

setupDatabase().catch(error => {
    console.error('Database setup error:', error);
});
