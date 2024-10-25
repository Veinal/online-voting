const mongoose=require('mongoose')
const {Schema}=mongoose

const ResultSchema=new Schema({
    election_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Elections"
    },
    winner:{
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
module.exports=mongoose.model("Results",ResultSchema)