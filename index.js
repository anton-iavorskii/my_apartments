const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path'); // используется для папки views
const hbs = require('hbs'); // подключаем handlebars (УСЫ)
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportSession = require('passport-session');
const LocalStrategy = require('passport-local').Strategy;

const fileUpload = require('express-fileupload');
const sha256 = require('sha256');
mongoose.connect('mongodb://localhost:27017/myRooms', { useNewUrlParser: true });
// user model
const User = require('./models/user.js');

app.use(cookieParser());

app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: false})); // должен быть выше чем app.use паспорта

// express-fileupload
app.use(fileUpload());

//passport
app.use(passport.initialize());
app.use(passport.session());



// Обработка POST запросов.
// urlencoded.
app.use(express.urlencoded({ extended: true }));
// json.
app.use(express.json());

/* app.use((req, res, next) => {
  // этот миддлвер выводит сессию в консоль
  console.log(req.session.passport.user.name);
  next();
}); */


// стратегия входа
passport.use(new LocalStrategy(
    function(username, password, done) {
      const passwordHash = sha256(password);
      User.findOne({ username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          console.log('логин не верен')
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password !== passwordHash) {
          console.log('пароль не верен')
          return done(null, false, { message: 'Incorrect password.' }); 
        }
        return done(null, user);
      });
    }
  ));
  // стратегия регистрации
  passport.use('registration', new LocalStrategy(  // может принимать только username и password
    async function(username, password, done) {
      const passwordHash = sha256(password);
      const user = new User({
        username,
        password:passwordHash,
    });
      await user.save();
      return done(null, user);
      })
  );


  function authenticationMiddleware() {
    return function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      console.log('аутентификация не пройдена');
      res.redirect('/');
    }
  }

// Подключаем views(hbs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Подключаем статику
app.use(express.static(path.join(__dirname, 'public')));


// ручка на главную
app.get('/', (req,res) => {
    res.render('startPage')
})

// ручка на регистрацию
app.get('/reg', (req,res) => {
    res.render('registration')
})

// ручка на профиль
app.get('/prof', authenticationMiddleware(), (req,res) => {
    const user = req.user;
    const room = user.rooms; // массив с объектами
   res.render('profile', {user, room:room}/* {name: req.session.passport.user.name} */)
})

// ручка на добавление данных после регистрации
app.get('/addInfoUser', authenticationMiddleware(), (req,res) => {
  const user = req.user;
 res.render('addInfoUser', {user}/* {name: req.session.passport.user.name} */)
})


// ручка passport login
app.post('/login',
  passport.authenticate('local', { successRedirect: '/prof',
                                   failureRedirect: '/',
                                   /* failureFlash: true */ })
);

// ручка passport регистрация
app.post('/user/newUser',
  passport.authenticate('registration', { successRedirect: '/addInfoUser',
                                          failureRedirect: '/',
                                   /* failureFlash: true */ })
);

// ручка разлогирования passport
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function (user, done) {
    done(null, user);
  });

// подключаем роуты
  const userRouter = require('./routes/userRouter.js');
  app.use('/user', userRouter);

   const roomsRouter = require('./routes/roomsRouter.js');
  app.use('/rooms', roomsRouter);

  const guestRouter = require('./routes/guestRouter.js');
  app.use('/guest', guestRouter);



app.listen(3050)