module.exports = {
  ensureLoggedin: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect("/login");
    }
  },
  ensureGuest: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  },
};