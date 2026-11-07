require('dotenv').config();
const express = require('express');
const path = require('path')

const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash');

const homeRouter = require('./routes/home.route')
const doctorsRouter = require('./routes/doctors.route')
const doctorRouter = require('./routes/doctor.route')
const authRouter = require('./routes/auth.route')

const app = express();

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(flash())

const STORE = new SessionStore({
    uri : 'mongodb://localhost:27017/health-care',
    collection: "sessions"
})

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        store: STORE
    })
);

app.set('view engine', 'ejs');
app.set('views', 'views');// default


app.get('/', (req,res)=>{
    res.render('index')
} )

app.use('/', homeRouter)
app.use('/', authRouter)
app.use('/',doctorsRouter )
app.use('/doctor', doctorRouter)

app.listen(3000, ()=>{
    console.log('we are on port 3000');
})