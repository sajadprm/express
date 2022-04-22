const express = require('express');
const router = express.Router();
const weather = require("../tools/weather");
//middleware

const accessWather = (req, res, next) => {
    if (req.params.city === "paris") return res.send(403);
    next();

}

router.get("/", async (req, res) => {
   try{
    const data = await weather.getWeather();
    res.render("weather", {
        title: "Get Weather",
        h1Title: "Get Weather ",
        content: ` The ${data.location.name} temperature is  ${data.current.temperature}`
    });

   }catch(err){
       console.log(err);
       return res.sendStatus(500);
   }
});

router.get("/:city", accessWather, async (req, res) => {
   try{
    const data = await weather.getWeather(req.params.city);
     res.send(data);
   }catch(err){
       console.log(err);
       return res.sendStatus(500);
   }


});





module.exports = router;