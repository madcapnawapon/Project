const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }).then((user) => {
        console.log(user);
        if (user) {
            let cmp = bcrypt.compare(password, user.password).then((match) => {
                if (match) {
                    req.session.userId = user._id;
                    res.redirect('/sitter');
                } else {
                    res.redirect('/login');
                }
            });
        } else {
            // เมื่อไม่พบผู้ใช้ในฐานข้อมูล
            res.redirect('/login');
        }
    });
};
