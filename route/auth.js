const express = require('express');
const User=require("../model/user.model")
const Session=require("../model/session.model");
const uuid=require("uuid");
const router = express.Router();

router.post('/login',(req,res)=>{
    if(!req.body || !req.body.userName || !req.body.password)
    {
        return res.sendStatus(400);
    }
User.findOne({userName:req.body.userName,password:req.body.password}).exec((err,user)=>{
    if(err)
    {
        console.log(err);
        return res.sendStatus(500);
    }
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
    newSession.save().then().catch(err=>{
        if(err) console.log(err);

    })

    res.json(user);

})
})

module.exports=router;