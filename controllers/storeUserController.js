const User = require('../models/user')

module.exports = (req,res)=>{
    User.create(req.body).then(()=> {
        console.log("User registered succesfully")
        res.redirect('/login')
    
    })
}