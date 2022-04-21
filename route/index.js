const express = require('express');
const router = express.Router();
const authRouter=require("../route/auth");
router.get("/", (req, res) => {
    res.render("base", {
        title: "Home",
        h1Title: "Home Page",
        content: "Welcome To Home Page."
    });

});
router.get("/about", (req, res) => {
    res.render("base", {
        title: "About US",
        h1Title: "About Us Page ",
        content: "Welcome To About Us Page"
    });

});
router.get("/contact", (req, res) => {
    res.send([{
        name: "sajjad",
        email: "Sajjad.khosravi2013@gmail.com"
    }, {
        name: "Ali",
        email: "ali@gmail.com"
    }])


})
router.use('/auth',authRouter)
router.get('*', (req, res) => {
    res.statusCode = 404;
    res.render("404", {
        title: "not found page",
        h1Title: "404 : Not Found Page",
        error: "oh Page Not Found ;("
    })

});


router.all('*', (req, res) => {
    res.sendStatus(404);

});





module.exports = router;