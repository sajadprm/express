const multer=require("multer");
const uploadTools={};
const storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./files')
      },
      filename:function(req,file,cb)
      {
       console.log(file);
        cb(null, file.originalname)
      }
});

uploadTools.upload=multer({
    storage,
    fileFilter:function(req,file,cb)
    {
       if(file.originalname.split(".")[file.originalname.split(".").length-1]!=="jpg")
       {
           cb(new Error("incorrect format"));
       }else
       {
           cb(null,true);
       }
    },
    limits:{
        fileSize:800000000
    }
})




module.exports=uploadTools;