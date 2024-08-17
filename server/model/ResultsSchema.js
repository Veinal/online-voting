const mongoose=require('mongoose')
const {Schema}=mongoose

const ResultSchema=new Schema({
    // election_id:{}
    // candidate_id:{}
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