const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../database');
const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, description, location } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const query = 'INSERT INTO companies (name, email, password, description, location) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [name, email, hashedPassword, description, location], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                res.status(400).send('Registration failed');
            } else {
                console.log('Company registered successfully');
                res.redirect('/company-login.html');
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).send('Registration failed');
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const query = 'SELECT * FROM companies WHERE email = ?';
        db.query(query, [email], async (err, results) => {
            if (err) {
                console.error('Database error:', err);
                res.status(500).send('Login failed');
                return;
            }
            
            const company = results[0];
            if (company && await bcrypt.compare(password, company.password)) {
                req.session.companyId = company.id;
                res.send('Login successful! Company ID: ' + company.id);
            } else {
                res.status(401).send('Invalid credentials');
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Login failed');
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/company-login.html');
});

module.exports = router;

// Get profile
router.get('/profile', async (req, res) => {
    try {
        if (!req.session.companyId) {
            return res.redirect('/company-login.html');
        }
        
        const query = 'SELECT * FROM companies WHERE id = ?';
        db.query(query, [req.session.companyId], (err, results) => {
            if (err) {
                res.status(500).send('Error loading profile');
            } else {
                const company = results[0];
                res.json(company);
            }
        });
    } catch (error) {
        res.status(500).send('Error loading profile');
    }
});

// Update profile
router.post('/profile', async (req, res) => {
    try {
        if (!req.session.companyId) {
            return res.redirect('/company-login.html');
        }
        
        const { name, description, location } = req.body;
        const query = 'UPDATE companies SET name = ?, description = ?, location = ? WHERE id = ?';
        db.query(query, [name, description, location, req.session.companyId], (err, result) => {
            if (err) {
                res.status(400).send('Profile update failed');
            } else {
                res.send('Profile updated successfully');
            }
        });
    } catch (error) {
        res.status(400).send('Profile update failed');
    }
});