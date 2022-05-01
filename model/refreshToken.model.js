const mongoose = require('mongoose');
const RefreshTokenSchema = mongoose.Schema(
    {
        refreshToken:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true,
    
        },
        user:{
            type:mongoose.ObjectId ,
            ref:"Users",
            required:true,
        }
        
    
    },
    { timestamps: true }
)
const RefreshToken=mongoose.model('RefreshToken',RefreshTokenSchema);

module.exports = RefreshToken;