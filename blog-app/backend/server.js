
/*
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blog_website'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected');
  
  // Create tables if they do not exist
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `;
  
  const createBlogsTable = `
    CREATE TABLE IF NOT EXISTS blogs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      image VARCHAR(255),
      userId INT,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `;
const createCommentsTable=`

  CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    blog_id INT,
    user_id INT,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`;
  

db.query(createCommentsTable, (err) => {
  if (err) throw err;
  console.log('Comments table created or already exists');
});

  db.query(createUsersTable, (err) => {
    if (err) throw err;
    console.log('Users table created or already exists');
  });

  db.query(createBlogsTable, (err) => { 
    if (err) throw err;
    console.log('Blogs table created or already exists');
  });
});
 
// Middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], (err) => {
      if (err) throw err;
      res.status(201).json({ message: 'User registered' });
    });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) throw err;
    if (results.length === 0) return res.status(400).json({ message: 'User not found' });
    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) throw err;
      if (match) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ token });
      } else {
        res.status(400).json({ message: 'Invalid credentials' });
      }
    });
  });
});

app.post('/posts', authenticateJWT, (req, res) => {
  const { title, content, image } = req.body;
  const userId = req.user.id;
  db.query('INSERT INTO blogs (title, content, image, userId) VALUES (?, ?, ?, ?)', [title, content, image, userId], function (err) {
    if (err) return res.status(400).send('Error creating blog');
    res.status(201).json({ id: this.lastID ,message:"Blog Created Successfully"});
  });
});



app.get('/posts', (req, res) => {
  db.query('SELECT * FROM blogs', (err, results) => {
    if (err) return res.status(400).send('Error fetching blogs');
    res.json(results);
  });
});

app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM blogs WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(400).send('Error fetching blog');
    if (results.length === 0) return res.status(404).send('Blog not found');
    res.json(results[0]);
  });
});

app.put('/posts/:id', authenticateJWT, (req, res) => {
  const { title, content, image } = req.body;
  const { id } = req.params;
  db.query('UPDATE blogs SET title = ?, content = ?, image = ? WHERE id = ?', [title, content, image, id], (err) => {
    if (err) return res.status(400).send('Error updating blog');
    res.send('Blog updated');
  });
});

app.delete('/posts/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM blogs WHERE id = ?', [id], (err) => {
    if (err) return res.status(400).send('Error deleting blog');
    res.send('Blog deleted');
  });
});




// Add a comment to a blog post
app.post('/posts/:id/comments', authenticateJWT, (req, res) => {
    const { id } = req.params; // blog_id
    const { text } = req.body;
    const userId = req.user.id;
  
    const query = 'INSERT INTO comments (blog_id, user_id, text) VALUES (?, ?, ?)';
    db.query(query, [id, userId, text], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error adding comment' });
      res.status(201).json({ message: 'Comment added successfully', commentId: result.insertId });
    });
  });
  
  
  // Get comments for a specific blog post
  app.get('/posts/:id/comments', (req, res) => {
    const { id } = req.params; // blog_id
  
    const query = `
      SELECT comments.*, users.username
      FROM comments
      JOIN users ON comments.user_id = users.id
      WHERE blog_id = ?
      ORDER BY created_at DESC
    `;
  
    db.query(query, [id], (err, results) => {
      if (err) return res.status(500).json({ message: 'Error fetching comments' });
      res.json(results);
    });
  });
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

 */
 


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
 
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}))
// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0 
});
  
// Creating tables
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  )
`, (err) => {
  if (err) throw err;
  console.log('Users table created or already exists');
});

pool.query(`
  CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image VARCHAR(255),
    userId INT,
    FOREIGN KEY (userId) REFERENCES users(id)
  )
`, (err) => { 
  if (err) throw err;
  console.log('Blogs table created or already exists');
});

pool.query(`
  CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    blog_id INT,
    user_id INT,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`, (err) => {
  if (err) throw err;
  console.log('Comments table created or already exists');
});

// Middleware for JWT Authentication
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], (err) => {
      if (err) throw err;
      res.status(201).json({ message: 'User registered' });
    });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) throw err;
    if (results.length === 0) return res.status(400).json({ message: 'User not found' });
    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) throw err;
      if (match) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ token });
      } else {
        res.status(400).json({ message: 'Invalid credentials' });
      }
    });
  });
});

app.post('/posts', authenticateJWT, (req, res) => {
  const { title, content, image } = req.body;
  const userId = req.user.id;
  pool.query('INSERT INTO blogs (title, content, image, userId) VALUES (?, ?, ?, ?)', [title, content, image, userId], function (err) {
    if (err) return res.status(400).send('Error creating blog');
    res.status(201).json({ id: this.lastID, message: "Blog Created Successfully" });
  });
});

app.get('/posts', (req, res) => {
  pool.query('SELECT * FROM blogs', (err, results) => {
    if (err) return res.status(400).send('Error fetching blogs');
    res.json(results);
  });
});

app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM blogs WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(400).send('Error fetching blog');
    if (results.length === 0) return res.status(404).send('Blog not found');
    res.json(results[0]);
  });
});

app.put('/posts/:id', authenticateJWT, (req, res) => {
  const { title, content, image } = req.body;
  const { id } = req.params;
  pool.query('UPDATE blogs SET title = ?, content = ?, image = ? WHERE id = ?', [title, content, image, id], (err) => {
    if (err) return res.status(400).send('Error updating blog');
    res.send('Blog updated');
  });
});

app.delete('/posts/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM blogs WHERE id = ?', [id], (err) => {
    if (err) return res.status(400).send('Error deleting blog');
    res.send('Blog deleted');
  });
});

// Add a comment to a blog post
app.post('/posts/:id/comments', authenticateJWT, (req, res) => {
  const { id } = req.params; // blog_id
  const { text } = req.body;
  const userId = req.user.id;

  const query = 'INSERT INTO comments (blog_id, user_id, text) VALUES (?, ?, ?)';
  pool.query(query, [id, userId, text], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error adding comment' });
    res.status(201).json({ message: 'Comment added successfully', commentId: result.insertId });
  });
});

// Get comments for a specific blog post
app.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params; // blog_id

  const query = `
    SELECT comments.*, users.username
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE blog_id = ?
    ORDER BY created_at DESC
  `;
  
  pool.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching comments' });
    res.json(results);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
