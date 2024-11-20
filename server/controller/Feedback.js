const FeedBackSchema = require('../model/FeedbackSchema');

const Insert=async(req,res)=>{
    try{
        const {userID,feedback,date,status}=req.body;
        const data=await new FeedBackSchema({user_id:userID,feedback,date,status})
        const savedData=await data.save()
        console.log("Insertion success")
        res.send({"Insertion success":true,savedData})
    }
    catch(err){
        console.error("some error occurred"+err)
        res.status(500).json("some internal error")
    }
}

const View=async(req,res)=>{
    try{
        const data=await FeedBackSchema.find().populate("user_id");
        // console.log(data,"view all candidates")
        res.json(data)
    }
    catch(err){
        console.error("some error occurred"+err)
        res.status(500).json("some internal error")
    }
}

const SingleView=async(req,res)=>{
    try{
        let data=await FeedBackSchema.findById(req.params.id).populate("user_id")
        if(!data){
            console.log("data not found with this id")
            return res.status(404).send("Data doesn't exist with this id")
        }else{
            console.log(data,"singleview data")
            res.json(data)
        }
    }
    catch(err){
        console.error("some error occurred"+err)
        res.status(500).json("some internal error")
    }
}

const Delete=async(req,res)=>{
    try{
        let data=await FeedBackSchema.findById(req.params.id);
        if(!data){
            console.log("Data not found with this id")
            return res.status(404).send("Data doesn't exist with this id")
        }else{
            data=await FeedBackSchema.findByIdAndDelete(req.params.id);
            console.log("Data deleted successfully")
            res.json({"Deletion success":true,"Deleted data":data})
        }
    }
    catch(err){
        console.error("some error occurred"+err)
        res.status(500).json("Some internal error")
    }
}

const Update=async(req,res)=>{
    const {feedback,date,status}=req.body
    try{
        const newData={}
        if(user_id){newData.user_id=user_id}
        if(feedback){newData.feedback=feedback}
        if(date){newData.date=date}
        if(status){newData.status=status}

        let data=await FeedbackSchema.findById(req.params.id)
        if(!data){
            console.log("Data not found with this Id")
            return res.status(404).send("Data doesn't exist with this Id")
        }else{
            data=await FeedbackSchema.findByIdAndUpdate(req.params.id,{$set:newData})
            res.json({data})
        }
    }
    catch(err){
        console.error("some error occurred")
        res.status(500).json("some internal error")
    }
}

module.exports={Insert,View,SingleView,Delete,Update}