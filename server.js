const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL database connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'petsitterfinder'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// API endpoint to get pet sitters
app.get('/api/pet-sitters', (req, res) => {
  // Implement logic to fetch pet sitters from the database
  // and send the data as JSON
  res.json({ petSitters: [] });
});

// More API endpoints and server logic as needed

const port = 8080;
app.listen(port, () => {
  console.log(`Server : run on port:${port}`);
});
