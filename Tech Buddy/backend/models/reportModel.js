const mongoose=require('mongoose')
const {Schema}=mongoose
const { Decimal128 } = mongoose.Schema.Types;
// var findOrCreate = require('mongoose-findOrCreate')

const reportSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,
        ref:"User",required:true},
   longitude:{
    type:Decimal128,
    required:true
   },
   latitude:{
    type:Decimal128,
    required:true
   },
   icon:{
    type:String,
    required:true,
   },
   description:{
    type:String
   },
    title:{
        type:String
    }
},{timestamps:true})
// userSchema.plugin(findOrCreate)
module.exports= mongoose.model("Report",reportSchema)