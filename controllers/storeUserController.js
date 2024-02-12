const User = require('../models/User')

module.exports = (req,res)=>{
    User.create(req.body).then(()=> {
        console.log("User registered succesfully")
        res.redirect('/login')
    
    })
}