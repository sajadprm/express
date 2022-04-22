const validator = require('validator');
const mongoose = require('mongoose');
const User = mongoose.model("Users", {
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
        required:true

    }

});
module.exports = User;