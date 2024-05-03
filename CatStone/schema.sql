CREATE TABLE borrowers (
    borrower_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    borrower_email VARCHAR(255) UNIQUE,
    borrower_phone BIGINT UNIQUE,
    borrower_address VARCHAR(255)
);

CREATE TABLE loans (
    loan_id INT AUTO_INCREMENT PRIMARY KEY,
    borrower_id INT NOT NULL,
    loan_amt DECIMAL(10, 2) NOT NULL,
    loan_date DATE NOT NULL,
    FOREIGN KEY (borrower_id) REFERENCES borrowers(borrower_id)
);

CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    loan_id INT NOT NULL,
    payment_amt DECIMAL(10, 2) NOT NULL,
    payment_date DATE NOT NULL,
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id)
);

CREATE TABLE accounts (
    borrower_id INT PRIMARY KEY,
    balance DECIMAL(10, 2),
    FOREIGN KEY (borrower_id) REFERENCES borrowers(borrower_id)
);
