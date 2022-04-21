const express = require('express');
const User=require("../model/user.model")
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

    res.json(user);

})
})

module.exports=router;