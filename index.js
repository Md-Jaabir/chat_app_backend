const express=require("express");
const app=express();
const mongoose =require("mongoose");
const dotenv=require("dotenv");
const cors=require('cors');

dotenv.config();
app.use(express.json());
app.use(cors({
   origin:"*"
}));

app.get("/",(req,res)=>{
	res.json({"Message":"Hello"})
})

app.listen(process.env.PORT);
