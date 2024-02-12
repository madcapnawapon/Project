const bcrypt = require('bcrypt')
const User = require('../models/user')

module.exports = (req,res) =>{
    const { username,password } = req.body 
    User.findOne({username:username}).then((user)=>{
        console.log(user)
        if (user){
            let cmp = bcrypt.compare(password,user.password).then((match)=>{
                if(match){
                    req.session.userId = user._id
                    res.redirect('/')
            
                }else{
                    res.redirect('/login')
                }

            })
        }

    })
}