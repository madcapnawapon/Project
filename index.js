const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')


mongoose.connect('mongodb+srv://admin:1234@cluster0.dzu6zww.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true
})

const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const ownerController = require('./controllers/ownerController')
const aboutController = require('./controllers/aboutController')
const storeUserController = require('./controllers/storeUserController')
const loginUserController = require('./controllers/loginUserController')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.set('view engine', 'ejs')
app.use(expressSession({
    secret:"node secret"
}))

app.get('/',indexController)
app.get('/login',loginController)
app.get('/register',registerController)
app.get('/owner',ownerController)
app.get('/about',aboutController)
app.post('/user/register',storeUserController)
app.post('/user/login', loginUserController)
app.listen(4000, ()=> {
    console.log("app listening on port 4000")
})





