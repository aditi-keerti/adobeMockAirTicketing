const express=require("express");
const {connection}=require('./db');
const {api}=require('./routes/api.routes')

const app=express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Home Page")
})
app.use('/api',api);
app.listen(8080,async()=>{
    try{
        await connection;
        console.log("Connected to db");
        console.log("Server is running at 8080");
    }catch(err){
        console.log(err);
    }
    
})