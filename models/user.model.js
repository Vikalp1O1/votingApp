const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String
  },
  aadharNumber: {
    type: Number,
    unique: true,
    required: true
  },
  role: {
    type: String,
    enum: ["voter", "admin"],
    default: "voter"
  },
  isVoted: {
    type: Boolean,
    default: false
  },
});


// Now For Hashing Password we use bcrypt
// we use pre save for hashing means just before saving the password in db it will encrypt it its type of middleware and have next it parameters
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// For checking password is same
// we make schema.methods manually

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports=User;
