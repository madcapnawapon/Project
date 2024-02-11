const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username:{
        type:String,
        required: [true, 'Please provide username']
    },
    password:{
        type:String,
        required: [true, 'Please provide password']
    },
    email:{
        type:String,
        required: [true, 'Please provide email']
    },
    phone:{
        type:String,
        required: [true, 'Please provide tel-number']
    },
   
})
UserSchema.pre('save',function(next){
    const user = this 
    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash 
        next()
    }).catch(error => {
        console.error(error)
    })
})

const User = mongoose.model('User',UserSchema)
module.exports = User