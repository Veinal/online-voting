const express=require('express');
const connectToMongo=require('./database');
const app=express();

app.use(express.json());

const port=7000;
app.listen(port,()=>{
    console.log("app is listening to port"+ port);
})
connectToMongo()