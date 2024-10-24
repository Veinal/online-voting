const ElectionSchema=require('../model/ElectionSchema');

const Insert=async(req,res)=>{
    try{
        const {candidates,electionName,description,startDate,endDate,batch,date,status}=req.body;
        const data=await new ElectionSchema({candidate_id:candidates,electionName,description,startDate,endDate,batch,date,status})
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
        const data=await ElectionSchema.find().populate("candidate_id");
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
        let data=await ElectionSchema.findById(req.params.id)
        if(!data){
            console.log("data not found with this id")
            return res.status(404).send("Data doesn't exist with this id")
        }else{
            // console.log(data,"singleview data")
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

const Update=async(req,res)=>{
    const {electionName,description,startDate,endDate,batch,date,status}=req.body
    try{
        const newData={}
        if(electionName){newData.electionName=electionName}
        if(description){newData.description=description}
        if(startDate){newData.startDate=startDate}
        if(endDate){newData.endDate=endDate}
        if(batch){newData.batch=batch}
        if(date){newData.date=date}
        if(status){newData.status=status}

        let data=await ElectionSchema.findById(req.params.id)
        if(!data){
            console.log("Data not found with this Id")
            return res.status(404).send("Data doesn't exist with this Id")
        }else{
            data=await ElectionSchema.findByIdAndUpdate(req.params.id,{$set:newData})
            res.json({data})
        }
    }
    catch(err){
        console.error("some error occurred")
        res.status(500).json("some internal error")
    }
}

module.exports={Insert,View,SingleView,Delete,Update}