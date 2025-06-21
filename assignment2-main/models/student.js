const db = require('../database');
const bcrypt = require('bcrypt');

const Student = {
  create: async (name, email, password, callback) => {
    const hash = await bcrypt.hash(password, 10);
    db.query('INSERT INTO students (name, email, password) VALUES (?, ?, ?)', [name, email, hash], callback);
  },

  authenticate: (email, password, callback) => {
    db.query('SELECT * FROM students WHERE email = ?', [email], async (err, results) => {
      if (err || results.length === 0) return callback(err || new Error('User not found'));
      const match = await bcrypt.compare(password, results[0].password);
      if (!match) return callback(new Error('Invalid password'));
      callback(null, results[0]);
    });
  },

  findById: (id, callback) => {
    db.query('SELECT * FROM students WHERE id = ?', [id], callback);
  },

  update: (id, name, email, callback) => {
    db.query('UPDATE students SET name = ?, email = ? WHERE id = ?', [name, email, id], callback);
  }
};

module.exports = Student;
