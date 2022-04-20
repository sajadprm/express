const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const morgan = require("morgan");
// Router 
const weatherRouter = require("./route/weather");
const userRouter = require("./route/user");
const taskRouter = require("./route/task");
const indexRouter = require("./route/index");
//***************************/
const port = process.env.PORT || 3000;
require("./db");

const directoryPublicPath = path.join(__dirname, "/public");
const directoryViewsPath = path.join(__dirname, "/templates");
const directoryPartialsPath = path.join(directoryViewsPath, "/partials");
app.use(express.static("public"));
app.set('view engine', 'hbs');
app.set('views', directoryViewsPath);
hbs.registerPartials(directoryPartialsPath);

app.use(morgan('dev'));
app.use(express.json());


app.use('/weather', weatherRouter);
app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/', indexRouter);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})