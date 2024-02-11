const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

// เชื่อมต่อกับ MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // แทนที่ด้วยรหัสผ่าน MySQL ของคุณ
  database: '' // แทนที่ด้วยชื่อฐานข้อมูลของคุณ
});

db.connect((err) => {
  if (err) {
    console.error('ไม่สามารถเชื่อมต่อกับ MySQL: ' + err.stack);
    return;
  }
  console.log('เชื่อมต่อกับ MySQL สำเร็จ');
});

app.use(bodyParser.urlencoded({ extended: true }));

// รับ request จากหน้าเว็บสำหรับการ register
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // เพิ่มข้อมูลผู้ใช้ในฐานข้อมูล
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการเพิ่มข้อมูล: ' + err.message);
      res.status(500).send('Error in registration');
    } else {
      res.send('Registration successful');
    }
  });
});

// รับ request จากหน้าเว็บสำหรับการ login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // ตรวจสอบข้อมูลผู้ใช้ในฐานข้อมูล
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('เกิดข้อผิดพลาดในการค้นหาข้อมูล: ' + err.message);
      res.status(500).send('Error in login');
    } else {
      if (result.length > 0) {
        res.send('Login successful');
      } else {
        res.send('Invalid username or password');
      }
    }
  });
});


app.listen(port, () => {
  console.log(`Server : run on :${port}`);
});
