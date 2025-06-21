CREATE TABLE companies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    university VARCHAR(255),
    major VARCHAR(255),
    year INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE internships (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    type ENUM('remote', 'on-site') NOT NULL,
    required_skills TEXT,
    salary DECIMAL(10,2),
    duration VARCHAR(100),
    deadline DATE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    internship_id INT,
    status ENUM('pending', 'shortlisted', 'accepted', 'rejected') DEFAULT 'pending',
    resume_path VARCHAR(500),
    applied_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (internship_id) REFERENCES internships(id)
);