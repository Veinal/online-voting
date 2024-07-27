const mongoose=require('mongoose')
const {Schema}=mongoose

const AdminSchema=new Schema({
    adminName:{
        type:String,
        required:true
    },
    adminEmail:{
        type:String,
        required:true
    },
    adminPassword:{
        type:String,
        required:true
    }  
})
module.exports=mongoose.model("AdminSchema")