const express = require('express');
const session = require('express-session');
const path = require('path');
const companyRoutes = require('./routes/company');
const studentRoutes = require('./routes/student');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'your-secret-key-here',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Routes
app.use('/company', companyRoutes);
app.use('/student', studentRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Internship Management System is running!');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});