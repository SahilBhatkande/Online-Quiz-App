const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database('./quiz.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    options TEXT NOT NULL,
    correct_option INTEGER NOT NULL
  )`);
});

// Seed database with sample questions
const sampleQuestions = [
  {
    text: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    correct_option: 0
  },
  {
    text: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correct_option: 1
  },
  {
    text: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correct_option: 1
  }
];

db.serialize(() => {
  db.get('SELECT COUNT(*) as count FROM questions', (err, row) => {
    if (err) {
      console.error(err.message);
    } else if (row.count === 0) {
      const stmt = db.prepare('INSERT INTO questions (text, options, correct_option) VALUES (?, ?, ?)');
      sampleQuestions.forEach(q => {
        stmt.run(q.text, JSON.stringify(q.options), q.correct_option);
      });
      stmt.finalize();
      console.log('Sample questions inserted.');
    }
  });
});

// Routes
app.get('/questions', (req, res) => {
  db.all('SELECT id, text, options FROM questions', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const questions = rows.map(row => ({
      id: row.id,
      text: row.text,
      options: JSON.parse(row.options)
    }));
    res.json(questions);
  });
});

app.post('/submit', (req, res) => {
  const { answers } = req.body; // answers is an array of selected option indices
  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Answers must be an array' });
module.exports = app;
  }

  db.all('SELECT id, correct_option FROM questions', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    let score = 0;
    const results = rows.map((row, index) => {
      const correct = row.correct_option === answers[index];
      if (correct) score++;
      return {
        questionId: row.id,
        correct: correct
      };
    });

    res.json({ score: score, total: rows.length, results: results });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});