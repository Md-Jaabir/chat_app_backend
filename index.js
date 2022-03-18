const express=require("express");
const app=express();
const mongoose =require("mongoose");
const dotenv=require("dotenv");

dotenv.config();
app.use(express.json());

app.get("/",(req,res)=>{
	res.json({"Message":"Hello"})
})

app.listen(process.env.PORT);
