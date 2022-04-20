const express = require('express');
const router = express.Router();
const weather = require("../weather");
//middleware

const accessWather = (req, res, next) => {
    if (req.params.city === "paris") return res.send(403);
    next();

}

router.get("/", async (req, res) => {
    const data = await weather.getWeather();
    res.render("weather", {
        title: "Get Weather",
        h1Title: "Get Weather ",
        content: ` The ${data.location.name} temperature is  ${data.current.temperature}`
    });

});

router.get("/:city", accessWather, async (req, res) => {
    const data = await weather.getWeather(req.params.city);
    res.send(data);


});





module.exports = router;