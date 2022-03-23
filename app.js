const express=require("express");
const path=require("path");
const app=express();
const hbs=require("hbs");
const morgan =require("morgan");
const weather=require("./weather");
const async = require("hbs/lib/async");
const port=3000;

const directoryPublicPath=path.join(__dirname,"/public");
const directoryViewsPath=path.join(__dirname,"/templates");
const directoryPartialsPath=path.join(directoryViewsPath,"/partials");
app.use(express.static("public"));
app.set('view engine', 'hbs');
app.set('views',directoryViewsPath);
hbs.registerPartials(directoryPartialsPath);

//middleware

const accessWather=(req,res,next)=>{
    if(req.params.city ==="paris") return res.send(403);
    next();
    
}

const logger=(req,res,next)=>{
    if(req.originalUrl === "/favicon.ico") return next();
    console.log(req.originalUrl);
    
    next();
}

app.use(morgan('dev'));

app.get("/",(req,res)=>{
    res.render("base",{
        title:"Home",
        h1Title:"Home Page",
        content:"Welcome To Home Page."
    });

});
app.get("/about",(req,res)=>{
    res.render("base",{
        title:"About US",
        h1Title:"About Us Page ",
        content:"Welcome To About Us Page"
    });

});
app.get("/contact",(req,res)=>{
    res.send([{
        name:"sajjad",
        email:"Sajjad.khosravi2013@gmail.com"
    },{
        name:"Ali",
        email:"ali@gmail.com"
    }])

  
})

app.get("/weather", async (req,res)=>{
    const data= await weather.getWeather();
    res.render("weather",{
        title:"Get Weather",
        h1Title:"Get Weather ",
        content:` The ${data.location.name} temperature is  ${data.current.temperature}`
    });

});

app.get("/weather/:city",accessWather, async (req,res)=>{
    const data= await weather.getWeather(req.params.city);
    res.send(data);
    

});

app.get('*',(req,res)=>{
    res.statusCode=404;
    res.render("404",{
        title:"not found page",
        h1Title:"404 : Not Found Page",
        error:"oh Page Not Found ;("
    })

})
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)

})