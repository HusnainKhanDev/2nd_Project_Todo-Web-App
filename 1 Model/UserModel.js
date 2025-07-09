const mongoose = require("mongoose")

let UserShema = new mongoose.Schema({
    UserName: {
        required: true,
        type: String,
    },

    Email: {
        required: true,
        type: String,
        unique: true,
    },

    Password: {
        required: true,
        type: String,
    }

})

module.exports = mongoose.model("user", UserShema)
