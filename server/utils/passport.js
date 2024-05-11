const User = require("../models/User")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs")

const initialize = (passport) =>{

  passport.use(new LocalStrategy( async (userInput, password, done)=>{

  const user = await User.findOne(
    userInput.includes("@")
      ? { email: userInput.toLowerCase().trim() }
      : { username: userInput.toLowerCase().trim() }
  );

     if(!user){
        return done(null, false, {
          message: "This Username does not Exist.",
        });
     }else{
       // check password correctness
       const correctPassword = await bcrypt.compare(password, user.password);
       if (!correctPassword) {
         return done(null, false, { message: "Password is Incorrect" });
       } else {
         return done(null, user);
       }
     }

  } ) )



  passport.serializeUser(function (user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(async function (username, done) {
    try {
      const user = await User.findOne({username});
      done(null, user); // pass null for error and user for the serialized user
    } catch (err) {
      return done(err); // pass error to Passport
    }
  });






}

module.exports = initialize