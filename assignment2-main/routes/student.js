const express = require('express');
const router = express.Router();
const Student = require('../models/student');


router.post('/students/signup', (req, res) => {
  const { name, email, password } = req.body;
  Student.create(name, email, password, err => {
    if (err) return res.status(500).send('Signup failed');
    res.sendStatus(200);
  });
});


router.post('/students/login', (req, res) => {
  const { email, password } = req.body;
  Student.authenticate(email, password, (err, student) => {
    if (err) return res.status(401).send('Invalid credentials');
    res.json({ id: student.id, name: student.name });
  });
});


router.get('/students/profile/:id', (req, res) => {
  Student.findById(req.params.id, (err, results) => {
    if (err || results.length === 0) return res.status(404).send('Student not found');
    res.json(results[0]);
  });
});


router.post('/students/profile/:id', (req, res) => {
  const { name, email } = req.body;
  Student.update(req.params.id, name, email, err => {
    if (err) return res.status(500).send('Update failed');
    res.sendStatus(200);
  });
});

module.exports = router;
