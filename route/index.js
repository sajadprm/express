const express = require('express');
const router = express.Router();
const authRouter=require("../route/auth");
const jwt=require("jsonwebtoken");
const {isLoginByJwtToken}=require("../tools/auth")
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


});
router.use('/auth',authRouter)

router.get("/test",(req,res)=>{

   
        const token = jwt.sign({name:"sajjad",family:"khosravi"},"BootCamp..");
        res.json({token});    
      
    
})

router.get("/test/auth",isLoginByJwtToken,(req,res)=>{
    res.json(req.user);
})

router.get("/test/:token",(req,res)=>{

  const decode=jwt.decode(req.params.token);
    return res.json({decode});

})

router.get("/test/verify/:token",(req,res)=>{

    const verify=jwt.verify(req.params.token,"BootCamp..");
      return res.json({verify});
  
  })
  


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