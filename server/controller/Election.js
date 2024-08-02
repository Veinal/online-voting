const ElectionSchema=require('../model/ElectionSchema');

const Insert=async(req,res)=>{
    try{
        const {partyName,symbol,voteCount,date,status}=req.body;
        const data=await new ElectionSchema({partyName,symbol,voteCount,date})
        const savedData=data.save()
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
        const data=await ElectionSchema.find();
        console.log(data,"view all candidates")
        res.json(data)
    }
    catch(err){
        console.error("some error occurred"+err)
        res.status(500).json("some internal error")
    }
}

const SingleView=async(req,res)=>{
    try{
        let data=await ElectionSchema.findById(req.params.id)
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
        let data=await ElectionSchema.findById(req.params.id);
        if(!data){
            console.log("Data not found with this id")
            return res.status(404).send("Data doesn't exist with this id")
        }else{
            data=await ElectionSchema.findByIdAndDelete(req.params.id);
            console.log("Data deleted successfully")
            res.json({"Deletion success":true,"Deleted data":data})
        }
    }
    catch(err){
        console.error("some error occurred"+err)
        res.status(500).json("Some internal error")
    }
}

module.exports={Insert,View,SingleView,Delete}