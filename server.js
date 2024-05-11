 require('dotenv').config({path: ".env"})
const express = require("express")
const app = express()
const port  = process.env.PORT || 3000
const path = require("path")
const expressLayouts = require("express-ejs-layouts");
const connectDb = require("./server/database/connection")
const session = require("express-session");
const passport = require("passport")
const MongoStore = require("connect-mongo");
const initialize = require("./server/utils/passport")

connectDb()


// load passport
 initialize(passport)

// Bring in templete Englin
app.use(expressLayouts);
app.set("layout", "../layouts/layout");
app.set('view engine', 'ejs')
app.set("views", path.resolve(__dirname, "views"));

// Set Body Passers
app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    secret: process.env.SESSION_SECRETE,
    resave: false,
    saveUninitialized: false,
 
  })
);

// load passport middlewares
app.use(passport.initialize());
app.use(passport.session());


// set global variables for flash messages
app.use((req, res, next)=>{
 res.locals.user = req.user
 next()
})


// Set up static files

app.use("/css", express.static(path.resolve(__dirname, "./public/css")))


// Set Home Route
app.get("/", (req, res)=>{
    res.status(200).render("Homepage", {
      title: "PassportAuth: Homepage",
      layout: "./layouts/layout",
    });
})

app.use("/", require("./server/routes/auth"))
app.use("/dashboard", require("./server/routes/dashboard"))


app.listen(port, ()=> console.log(`Server started on http://localhost:${port}`))