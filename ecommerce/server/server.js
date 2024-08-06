const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');



const app = express();
const PORT = process.env.PORT || 7000;
const DB_PATH = path.resolve(__dirname, 'database.db');
const JWT_SECRET = 'your_jwt_secret';  
app.use(cors());



const decodeToken = (token) => {
  try {

    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.user_id; 
  } catch (error) {
    console.error('Token decoding error:', error);
    return null;
};



}




let db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to the SQLite database.');
        createTables();
    }
});

const createTables = () => {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            price REAL NOT NULL,
            stock INTEGER NOT NULL,
            image_url TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL,
            image_url TEXT,
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
     title TEXT NOT NULL,
    product_id INTEGER NOT NULL,
    price DECIMAL,
    quantity INTEGER NOT NULL,
    total_amount DECIMAL,
     image_url TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)


        )`);
    });
};

// Middleware
app.use(cors());
app.use(bodyParser.json());
 
/*
// localhost:7000/api/auth/register
app.post('/api/auth/register', async (req, res) => {
    try{
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(201).send({ id: this.lastID, message: 'User registered successfully' });
    });
} catch (error) {
    res.status(500).json({ error: 'Internal server error' });
}
});


// localhost:7000/api/auth/login
app.post('/api/auth/login', async(req, res) => {
    try{
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) return res.status(500).send(err.message);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token,message:"Login Successful" });
    });
} catch (error) {
    res.status(500).json({ error: 'Internal server error' });
}
});
*/
app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if username already exists
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) return res.status(500).send(err.message);

        if (user) {
            return res.status(409).send('Username already exists'); // Conflict status
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(201).send({ id: this.lastID, message: 'User registered successfully' });
        });
    });
});

app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) return res.status(500).send(err.message);
        if (!user) {
            return res.status(401).send('Invalid username or password'); // Handle username not found
        }
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid username or password'); // Handle incorrect password
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, message: 'Login Successful' });
    });
});


// localhost:7000/api/products
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) return res.status(500).send(err.message);
        console.log(rows)
        res.json(rows);
    });
});


// localhost:7000/api/products/:id
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).send(err.message);
        if (!row) return res.status(404).send('Product not found');
        res.json(row);
    });
});



app.post('/api/products', (req, res) => {
    const {name, description, price, stock, image_url } = req.body;

    // Validate input
    if (!name || !description || !price || !stock || !image_url) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Insert product into database
    const query = 'INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)';
    db.run(query, [name, description, price, stock, image_url], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Database error: ' + err.message });
        }
        res.status(201).json({ id: this.lastID, message: 'Product added successfully' });
    });
});


app.get('/api/cart', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Token required');
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        const userId = decoded.id;
        db.all('SELECT c.id, c.user_id, c.product_id, p.name AS title, c.price, c.quantity, p.image_url FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?', [userId], (err, rows) => {
            if (err) return res.status(500).send(err.message);
            res.json(rows);
        });
    });
});


/*

app.post('/api/cart', (req, res) => {
    const { product_id, quantity } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Token required');
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        const userId = decoded.id;
        db.get('SELECT * FROM products WHERE id = ?', [product_id], (err, product) => {
            if (err) return res.status(500).send(err.message);
            if (!product) return res.status(404).send('Product not found');
            db.run('INSERT INTO cart (user_id, product_id, title, price, quantity, image_url) VALUES (?, ?, ?, ?, ?, ?)', [userId, product_id, product.name, product.price, quantity, product.image_url], function (err) {
                if (err) return res.status(500).send(err.message);
                res.status(201).send({ id: this.lastID, message: 'Product added to cart' });
            });
        });
    });
});
*/


/* imp

app.post('/api/cart', (req, res) => {
    const { product_id, quantity } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Token required');

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        const userId = decoded.id;

        db.get('SELECT * FROM cart WHERE user_id = ? AND product_id = ?', [userId, product_id], (err, existingItem) => {
            if (err) return res.status(500).send(err.message);

            if (existingItem) {
               
                const newQuantity = existingItem.quantity + quantity;
                db.run('UPDATE cart SET quantity = ? WHERE id = ?', [newQuantity, existingItem.id], function (err) {
                    if (err) return res.status(500).send(err.message);
                    res.status(200).send({ message: 'Cart updated successfully' });
                });
            } else {
                
                db.get('SELECT * FROM products WHERE id = ?', [product_id], (err, product) => {
                    if (err) return res.status(500).send(err.message);
                    if (!product) return res.status(404).send('Product not found');
                    db.run('INSERT INTO cart (user_id, product_id, title, price, quantity, image_url) VALUES (?, ?, ?, ?, ?, ?)', [userId, product_id, product.title, product.price, quantity, product.image_url], function (err) {
                        if (err) return res.status(500).send(err.message);
                        res.status(201).send({ id: this.lastID, message: 'Product added to cart' });
                    });
                });
            }
        });
    });
});
*/
app.post('/api/cart', (req, res) => {
    const { product_id, quantity } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Token required');

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        const userId = decoded.id;

        db.get('SELECT * FROM cart WHERE user_id = ? AND product_id = ?', [userId, product_id], (err, existingItem) => {
            if (err) return res.status(500).send(err.message);

            if (existingItem) {
                // Update quantity if item already exists in the cart
                const newQuantity = existingItem.quantity + quantity;
                db.run('UPDATE cart SET quantity = ? WHERE id = ?', [newQuantity, existingItem.id], function (err) {
                    if (err) return res.status(500).send(err.message);
                    res.status(200).send({ message: 'Cart updated successfully' });
                });
            } else {
                // Insert new item into the cart
                db.get('SELECT * FROM products WHERE id = ?', [product_id], (err, product) => {
                    if (err) return res.status(500).send(err.message);
                    if (!product) return res.status(404).send('Product not found');

                    db.run('INSERT INTO cart (user_id, product_id, title, price, quantity, image_url) VALUES (?, ?, ?, ?, ?, ?)', 
                        [userId, product_id, product.title, product.price, quantity, product.image_url], 
                        function (err) {
                            if (err) return res.status(500).send(err.message);
                            res.status(201).send({ id: this.lastID, message: 'Product added to cart' });
                        }
                    );
                });
            }
        });
    });
});



app.delete('/api/cart/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM cart WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).send(err.message);
        res.send({ message: 'Item removed from cart' });
    });
});









 app.get('/api/orders', (req, res) => {
    const sql = `SELECT * FROM orders`;
    
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
      }
      res.status(200).json(rows);
    });
  });

 
  app.post('/api/orders', (req, res) => {
    const { user_id, title, product_id, price, quantity, total_amount, image_url } = req.body;
  
    if (!user_id || !title || !product_id || !price || !quantity || !total_amount || !image_url) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    db.run(`
      INSERT INTO orders (user_id, title, product_id, price, quantity, total_amount, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [user_id, title, product_id, price, quantity, total_amount, image_url], function(err) {
      if (err) {
        console.error('Error inserting order:', err);
        return res.status(500).json({ message: 'Failed to create order', error: err.message });
      }
      res.status(201).json({ message: 'Order created successfully', orderId: this.lastID });
    });
  });


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

