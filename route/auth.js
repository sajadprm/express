const express = require('express');
const User=require("../model/user.model")
const Session=require("../model/session.model");
const uuid=require("uuid");
const async = require('hbs/lib/async');
const router = express.Router();

router.post('/login',async (req,res)=>{
    try
    {
    if(!req.body || !req.body.userName || !req.body.password)
    {
        return res.sendStatus(400);
    }
  
        const user= await User.findOne({userName:req.body.userName,password:req.body.password})
   
    if(!user)
    {
        return res.sendStatus(403);
    }
      const session=uuid.v4();
    res.cookie("session",session,{maxAge:1000*60*10});
    const newSession=new Session({
        session,
        user:user._id
    });
    await newSession.save();
    res.json(user);

    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

})

router.post("/register", async (req,res)=>{
    try{
  if(!req.body || !req.body.firstName || !req.body.lastName || !req.body.email
    || !req.body.userName || !req.body.password )
    {
        return res.sendStatus(400);
    }
  
        const person = await new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age===undefined ? null :req.body.age,
            userName: req.body.userName,
            email: req.body.email,
            password:req.body.password,
    
        });
        await person.save();
            res.json(person);
            
    }catch(err){
        res.statusCode = 500;
        res.send(err.message)
    }
    
})
module.exports=router;