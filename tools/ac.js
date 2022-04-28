const accessController={};

accessController.checkAdminMidellware=(req,res,next)=>{
   if(req.user.role!=="admin")
   {
      return res.sendStatus(403);
   }

   return next();
}


accessController.checkAdminForDeleteUserOrUpdateUser=(req,res,next)=>{
   if(req.user.role !=="admin" && req.params.id==="me")
   {
       res.locals.userId=req.user._id;
        return next();
      
   }
   if(req.user.role==="admin")
   {
      res.locals.userId=req.params.id;
      return next();
   }

   res.sendStatus(403);

}

module.exports=accessController;