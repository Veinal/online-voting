const UserSchema=require('../model/UserShema')
const bcrypt =require('bcrypt')
const jwt=require('jsonwebtoken')
const JWT_SECRET="user"

const Register = async(req,res)=>{
    try{
        const {userName,email,password,phone,age,role}=req.body;
        // picture

        const data = await new UserSchema({userName,email,password,phone,age,role})
        const savedData=data.save()
        console.log("User Registration successful")
        res.send({"Registration successful":true,savedData})
    }
    catch(err){
        console.error("some error occured!!!"+err)
        res.status(500).json("some internal error")
    }
}

const Login=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user =await new UserSchema.findOne({email})
        console.log(user,"user")
        if(!user){
            return res.json({error:"Invalid user email address"})
        }
        //password

        const data=user.id;
        console.log(data)
        console.log("login successful")
    }
    catch(err){
        console.error("some error occurred"+err)
        res.status(500).json("some internal error")
    }
}

const View=async(req,res)=>{
    try{
        const data=await UserSchema.findById(req.params.id);
        console.log(data,"user login view")
        res.json(data)
    }
    catch(err){
        console.error("some error occurred"+err);
        res.status(500).json("some internal error")
    }
}

const SingleView=async(req,res)=>{
    try{
        let data=await UserSchema.findById(req.params.id)
        if(!data){
            console.log("data not found with this id")
            return res.status(404).send("Data doesn't exist with this id")
        }
        else{
            console.log(data,"data")
            res.json(data)
        }
    }
    catch(err){
        console.error("some error occurred"+err);
        res.status(500).json("some internal error")
    }
}

const Delete =async(req,res)=>{
    try{
        let data=await UserSchema.findById(req.params.id)
        if(!data){
            console.log("data not found with this id")
            return res.status(404).send("Data doesn't exist with this id")
        }
        else{
            data=await UserSchema.findByIdAndDelete(req.params.id)
            console.log("Data deleted successfully")
            res.json({"Deletion success":true,"Deleted data":data})
        }
    }
    catch(err){
        console.error("some error occurred"+err)
        res.status(500).json("some internal error")
    }
}