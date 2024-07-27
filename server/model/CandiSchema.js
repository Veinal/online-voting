const mongoose=require('mongoose')
const {Schema}=mongoose;

const CandiSchema=new Schema({
    candName:{
        type:String,
        required:true
    },
    partyName:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    symbol:{
        type:String
    },
    partySign:{
        type:String
    }
})
module.exports=mongoose.model("CandiSchema")