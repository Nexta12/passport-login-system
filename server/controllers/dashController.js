module.exports = {
  dashboardPage: async(req, res)=>{

    res.status(200).render("Dashboard", {
      title: "Passport: Dashboard",
      layout: "./layouts/layout",
    });
  }
};