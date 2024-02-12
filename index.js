const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

global.loggedIn = null

mongoose.connect('mongodb+srv://admin:1234@cluster0.dzu6zww.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true
})

const indexController = require('./controllers/indexController')
const sitterController = require('./controllers/sitterController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const ownerController = require('./controllers/ownerController')
const postController = require('./controllers/postController')
const aboutController = require('./controllers/aboutController')
const storeUserController = require('./controllers/storeUserController')
const loginUserController = require('./controllers/loginUserController')
const logout = require('./controllers/logout')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.set('view engine', 'ejs')
app.use(expressSession({
    secret:"node secret"
}))
app.use("*",(req,res,next)=>{
    loggedIn = req.session.userId
    next()
})
app.get('/',indexController)
app.get('/login',loginController)
app.get('/sitter',sitterController)
app.get('/register',registerController)
app.get('/owner',ownerController)
app.get('/about',aboutController)
app.get('/post',postController)
app.post('/user/register',storeUserController)
app.post('/user/login', loginUserController)
app.get('/logout', logout)
app.listen(4000, ()=> {
    console.log("app listening on port 4000")
})





