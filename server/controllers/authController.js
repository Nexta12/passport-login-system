const User = require("../models/User")
const bcrypt = require("bcryptjs")
const passport = require("passport")

module.exports = {
  registerPage: async (req, res) => {
    res.status(200).render("Register", {
      title: "PassportAuth: Register",
      layout: "./layouts/layout"
    });
  },
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (username == "" || email == "" || password === "") {
        return res.status(403).redirect("/register")
      }
      // Please do your validations
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.create({
        username,
        email,
        password: hashedPassword,
      });

      res.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  },
  loginPage: async (req, res) => {
    res.status(200).render("Login", {
      title: "PassportAuth: Login",
      layout: "./layouts/layout",
    });
  },

  login: async (req, res, next) => {
    // validate forms
    let { username, password } = req.body;
    if (!username || !password) {
      res.status(200).render("Login", {
        title: "PassportAuth: Login",
        layout: "./layouts/layout",
        username,
        password
      });
    } else {
      passport.authenticate("local", { session: true }, (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.redirect("./login");
        }
       req.logIn(user, (err) => {
         if (err) {
           return next(err);
         } else {
           res.redirect("/dashboard");
         }
       });
      })(req, res, next);
    }
  },
  logout: async (req, res)=>{
    try {
      // Destroy the session
      req.session.destroy((err) => {
        if (err) {
          console.log(err)
        }
        res.redirect("/")
      });
    } catch (error) {
     console.log(error)
    }
  },

};