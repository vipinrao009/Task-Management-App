import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function(){
  if(!this.isModified('password')){
    return next()
  }
  this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateJsonWebToken = async function(){
  return jwt.sign(
    {_id:this._id},
    process.env.JWT_SECRET_KEY,
    {expiresIn:process.env.JWT_EXPIRE}
  )
}

export default mongoose.model("User", userSchema);
