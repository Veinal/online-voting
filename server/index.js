const express=require('express');
const connectToMongo=require('./database');
// const cors=require('cors')
const app=express();

app.use(express.json());
// app.use(cors())

app.use('/api/adminreg',require('./router/AdminRouter'))
app.use('/api/candidate',require('./router/CandiRouter'))
app.use('/api/election',require('./router/ElectionRouter'))
app.use('/api/feedback',require('./router/FeedbackRouter'))
app.use('/api/result',require('./router/ResultsRouter'))
app.use('/api/userreg',require('./router/UserRouter'))

const port=7000;
app.listen(port,()=>{
    console.log("app is listening to port"+ port);
})
connectToMongo()