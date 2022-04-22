const accessController={};

accessController.checkAdminMidellware=(req,res,next)=>{
   if(req.user.role!=="admin")
   {
      return res.sendStatus(403);
   }

   return next();
}
module.exports=accessController;