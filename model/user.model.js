const validator = require('validator');
const mongoose = require('mongoose');
const User = mongoose.model("Users", {
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    age: {
        type: Number,
        min: [3, 'very low age'],
        max: [80, 'very high age']
    },

    isActive: {
        type: Boolean,
        default: true,
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
        minLength: 4,

    },
    email: {
        type: String,

        validate: {
            validator: (email) => {
                if (!validator.isEmail(email)) {
                    throw new Error("invalid Email..");
                } else {
                    return true;
                }
            }
        }

    }

});
module.exports = User;