const express=require("express");
const app=express();
const mongoose =require("mongoose");
const dotenv=require("dotenv");

app.use(express.json());

app.get("/",(req,res)=>{
	res.json({"Message":"Hello"})
})
dotenv.config();

app.listen(process.env.PORT);
