const User = require('../models/users');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const getUserByEmail = async function(email) {
  let user = await User.findOne({email});
  return user;
}
const getUserById = async function(id) {
  let user = await User.findById(id);
  return user;
}

module.exports = (passport)=>{
  const authenticateUser = async(email, password, done)=>{
    const user = await getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      console.log(user);
      console.log(password);
      console.log(user.password);
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    return done(null, await getUserById(id))
  })
}
