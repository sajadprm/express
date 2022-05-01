const express = require('express');
const User=require("../model/user.model")
const Session=require("../model/session.model");
const RefreshToken=require("../model/refreshToken.model");
const uuid=require("uuid");
// const async = require('hbs/lib/async');
const router = express.Router();
const bcrypt=require("bcryptjs");
const  jwt=require("jsonwebtoken");
const confApp=require("../config/app");
const {isLoginBySession,createTokenForLogin, isLoginByJwtToken}=require("../tools/auth")
router.post('/login',async (req,res)=>{
   
    try
    {
    if(!req.body || !req.body.userName || !req.body.password)
    {
        throw {
            status:400,
            message:"Require fields Empty..",
            originError:Error("Require fields Empty..")
        }
    }
        const user= await User.findForLogin(req.body.userName,req.body.password);
      

      
   
    if(!user)
    {
        throw {
            status:403,
            message:"UserName Or Password incorrect...",
            originError:Error("UserName Or Password incorrect...")
        }
    }
      const session=uuid.v4();
    res.cookie("session",session,{maxAge:1000*60*10});
    const newSession=new Session({
        session,
        user:user._id
    });
    await newSession.save();
    // res.json(user);
    res.json(user);

    }catch(err){
        next(err)
    }

})


router.post('/login/jwt',async (req,res,next)=>{
   
    try
    {
    if(!req.body || !req.body.userName || !req.body.password)
    {
        throw{
            status:400,
            message:"Required fields empty",
            originError:Error("Required fields empty")
        }
    }
        const user= await User.findForLogin(req.body.userName,req.body.password);

         await createTokenForLogin(user,res);
        

       res.json({user});

    }catch(err){
       
        return next(err);
    }

})


router.post('/logout', isLoginBySession, async (req,res,next)=>{
   try
   {
    if(req.user)
    {
         await Session.findOneAndRemove({user:req.user._id});
        res.clearCookie("session");
        
                
    }
    res.sendStatus(200);
 
  
   }catch(err){
     return next(err)
   }
     
   res.sendStatus(200);
});


router.post('/logout/jwt',isLoginByJwtToken,async (req,res,next)=>{
    try
    {
     if(req.user)
     {
         
          await RefreshToken.findOneAndRemove({user:req.user._id});
         res.clearCookie("session");
         res.removeHeader('authorization');
  
                 
     }
     return res.sendStatus(200);

   
   
    }catch(err){
      return next(err)
    }
      
    res.sendStatus(200);
 });
 


router.post("/register", async (req,res)=>{
    try{
  if(!req.body || !req.body.firstName || !req.body.lastName || !req.body.email
    || !req.body.userName || !req.body.password )
    {
        return res.sendStatus(400);
    }

    const postKeysReq=Object.keys(req.body);
    const allowedPost=["firstName","lastName","age","password",'userName','email',"role","isActive"];
    const isAllowedPost=postKeysReq.every((key)=> allowedPost.includes(key));
      if(!isAllowedPost)
      {
          return res.sendStatus(400);
      }
  
        const person = await new User(req.body);
        await person.save();
            res.json(person);
            
    }catch(err){
        res.statusCode = 500;
        res.send(err.message)
    }
    
})
module.exports=router;