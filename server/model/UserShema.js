const mongoose=require('mongoose');
const {Schema}=mongoose

const UserSchema=new Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    picture:{
        type:String,
    },
    role:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String
    }
})

module.exports=mongoose.model("UserDetails",UserSchema)