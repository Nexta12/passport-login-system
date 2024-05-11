const router = require("express").Router();
const dashController = require("../controllers/dashController");
const { ensureLoggedin } = require("../middlewares/authentication")

// Get Register Page

router.get("/", ensureLoggedin, dashController.dashboardPage);

module.exports = router;
