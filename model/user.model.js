const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt=require("bcryptjs");
const async = require('hbs/lib/async');

const UserSchema=mongoose.Schema({
    firstName: {
        type: String,
        required:true,
    },
    lastName: {
        type: String,
        required:true,
    },
    age: {
        type: Number,
       
    },

    role:{
        type:String,
        enum:['admin','client'],
        default:'client',
        required:true,
    },

    isActive: {
        type: Boolean,
        default: true,
        required:true
    },
    userName: {
        type: String,
        required: true,
        validate: (value) => {
            if (value.toLowerCase().includes("admin") || value.toLowerCase().includes("root")) {
                throw new Error("UserName includes invalid words");
            }
        },
        trim: true,
        minLength: 5,
        unique:true,
        lowercase:true

    },
    email: {
        type: String,
        required:true,

        validate: {
            validator: (email) => {
                if (!validator.isEmail(email)) {
                    throw new Error("invalid Email..");
                } else {
                    return true;
                }
            }
        }

    },
    password:{
        type:String,
        minLength: 5,
        trim:true,
        required:true

    }

})

UserSchema.pre("save",async function(next){

    if(this.isModified("password"))
    {
        this.password= await bcrypt.hash(this.password,10);
    }
    next();
})
UserSchema.pre("findOneAndUpdate",async function(next){

    if(this._update.password && this._update.password.trim().length > 4  )
    {
        this._update.password=await bcrypt.hash(this._update.password,10);
    }else
    {
        delete this._update.password;
    }
    next();
})

UserSchema.statics.findForLogin= async function(userName,password){
    const user= await this.findOne({userName});
   
    const isMachedPassword = await bcrypt.compare(password,user.password);

    if(!isMachedPassword)
    {
         throw new Error("Username and Password not valid...");
    }
     return user;
}


const User = mongoose.model("Users",UserSchema);

module.exports = User;