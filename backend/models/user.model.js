const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({


    profilePic: {
        type: String
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    username: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },

    events: {
        type: Array
    }

    // profilePic: {
    //     type:String
    // }

});

module.exports = User = mongoose.model("user", userSchema);