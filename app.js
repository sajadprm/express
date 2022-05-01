const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const morgan = require("morgan");
const cookieParser=require("cookie-parser");
const {isLoginBySession}=require("./tools/auth");
const confApp=require("./config/app");
// Router 
const weatherRouter = require("./route/weather");
const userRouter = require("./route/user");
const taskRouter = require("./route/task");
const indexRouter = require("./route/index");
//***************************/
const port = process.env.PORT || confApp.PORT;
require("./config/db");

const directoryPublicPath = path.join(__dirname, "/public");
const directoryViewsPath = path.join(__dirname, "/templates");
const directoryPartialsPath = path.join(directoryViewsPath, "/partials");
app.use(express.static("public"));
app.set('view engine', 'hbs');
app.set('views', directoryViewsPath);
hbs.registerPartials(directoryPartialsPath);

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());



app.use('/weather', weatherRouter);
app.use('/users',isLoginBySession,userRouter);
app.use('/tasks',isLoginBySession,taskRouter);
app.use('/', indexRouter);




app.use((err,req,res,next)=>{
   res.status(err.status ? err.status : 500).json({
       status:err.status ? err.status : 500,
       message:err.message ? err.message : " Something Wrong Please try again Later...",
       
   });
   console.log(err);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})