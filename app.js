if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const ejsLayouts = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const flash = require('express-flash');
const passport = require('passport');

const initializePassport = require('./config/passport');
initializePassport(passport);

const rootRoute = require('./routes/root');
const usersRoute = require('./routes/users');
const apiUsersRoute = require('./routes/api/users');
const projectsRoute = require('./routes/projects');

//EJS
app.set('view engine', 'ejs');
app.use(ejsLayouts);
//Middleware
let sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false
}

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
  sess.store = new RedisStore({url: process.env.REDIS_URL});
}
app.use(session(sess))
app.use(flash());
if (process.env.NODE_ENV !== 'production'){
  app.use(morgan('common'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use('/', rootRoute);
app.use('/users', usersRoute);
app.use('/projects', projectsRoute);
app.use('/api/users', apiUsersRoute);

//Mongo connection
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to DB');
});

app.listen(process.env.PORT, ()=>{
  console.log(`Server started on port ${process.env.PORT}`);
});
