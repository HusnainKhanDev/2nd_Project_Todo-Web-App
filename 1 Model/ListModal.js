const mongoose = require("mongoose")
let ListSchema = new mongoose.Schema({
    title: { required: true, type: String, unique: true },

    description: { type: String, default: "Best Of Luck :)" },

    endDate: {
        type: String, required: true, set: (value) => {

            const date = new Date(value); return date.toISOString().split('T')[0]; //it is function which runs before inserting a data in DB it converts ISO format date in to ISO string First then break it using seprater "T" and insert its first part [0] 
        }
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }

}, { timestamps: true, versionKey: false })



module.exports = mongoose.model("list", ListSchema)