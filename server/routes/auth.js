const router = require("express").Router()
const authController = require("../controllers/authController")
const { ensureGuest} = require("../middlewares/authentication");

// Get Register Page

router.get("/register",ensureGuest, authController.registerPage);
router.post("/register", ensureGuest, authController.register);
router.get("/login",ensureGuest, authController.loginPage);
router.post("/login",ensureGuest, authController.login);
router.get("/logout", authController.logout);



module.exports = router