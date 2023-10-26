const mongoose=require('mongoose')
const {Schema}=mongoose
var findOrCreate = require('mongoose-findOrCreate')

const userSchema=new mongoose.Schema({
   googleId:{
      type:Number,
      required:true
   },
   reported:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Report"
   }
},{timestamps:true})
userSchema.plugin(findOrCreate)
module.exports= mongoose.model("User",userSchema)