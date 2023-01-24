const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    mobile: String,
    dob: Date,
    gender: String,
    image_link: String,
},
    { timestamps: true }
);
userSchema.index({ email: 1 }, { unique: true });


module.exports = mongoose.model("users", userSchema);
