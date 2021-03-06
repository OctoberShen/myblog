// import mongoose from 'mongoose'
const mongoose =require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
})

// export default mongoose.model('UserSchema', UserSchema);
module.exports = mongoose.model('UserSchema', UserSchema);