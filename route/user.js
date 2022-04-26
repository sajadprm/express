const express = require('express');
const async = require('hbs/lib/async');
const router = express.Router();
const User = require("../model/user.model");
const ac = require("../tools/ac");

router.get('/',ac.checkAdminMidellware, async (req, res) => {
   

    try{
        const users= await User.find();
         res.json(users);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
            
    }
});

router.get("/:id", async (req, res) =>  {
    try{
        const user= await User.findById(req.params.id);
         

         if(!user)
         {

            return res.sendStatus(404);
         }
         res.json(user);
       
    }catch(err){
       
        console.log(err);
         res.sendStatus(500);
    }
    
})

router.put("/:id", async (req, res) => {

    try{

        const updateKeysReq=Object.keys(req.body);
        const allowedUpdate=["firstName","lastName","age","password"];
        const isAllowedUpdate=updateKeysReq.every((key)=> allowedUpdate.includes(key));
          if(!isAllowedUpdate)
          {
              return res.sendStatus(400);
          }
        const user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if (!user) {
            return res.sendStatus(404);
        }
       

            res.json(user);
        
   
    }catch(err){
        console.log(err.message);
       return res.sendStatus(500);
    }
      
        
});

router.delete("/:id", async (req, res) => {
    try{
        const deletedUser= await User.findByIdAndDelete(req.params.id)
        if (!deletedUser) {
            return res.sendStatus(404);
        }
       return  res.sendStatus(200);


    }catch(err){
      console.log(err);
     return  res.sendStatus(500);
    }
   
});



module.exports = router;