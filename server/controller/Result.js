const ResultSchema=require('../model/ResultsSchema');

const Insert=async(req,res)=>{
    try{
        const {winner,date,status}=req.body;
        const data=await new ResultSchema({winner,date,status})
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
        const data=await ResultSchema.find();
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
        let data=await ResultSchema.findById(req.params.id)
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
        let data=await ResultSchema.findById(req.params.id);
        if(!data){
            console.log("Data not found with this id")
            return res.status(404).send("Data doesn't exist with this id")
        }else{
            data=await ResultSchema.findByIdAndDelete(req.params.id);
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
    const {winner,date,status}=req.body
    try{
        const newData={}
        if(winner){newData.winner=winner}
        if(date){newData.date=date}
        if(status){newData.status=status}

        let data=await ResultSchema.findById(req.params.id)
        if(!data){
            console.log("Data not found with this Id")
            return res.status(404).send("Data doesn't exist with this Id")
        }else{
            data=await ResultSchema.findByIdAndUpdate(req.params.id,{$set:newData})
            res.json({data})
        }
    }
    catch(err){
        console.error("some error occurred")
        res.status(500).json("some internal error")
    }
}

module.exports={Insert,View,SingleView,Delete,Update}