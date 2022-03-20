const express=require("express");
const app=express();
const mongoose =require("mongoose");
const dotenv=require("dotenv");
const cors=require('cors');

app.use(cors({origin:"*"}));

dotenv.config();
app.use(express.json());

app.get("/",(req,res)=>{
	res.json({"Message":"Hello"})
})

app.post("/send",(req,res)=>{
	res.json(req.body);
})

app.get("/fetch",(req,res)=>{
	res.json(req.query);
})

app.post("/create_room",(req,res)=>{
	res.json(req.body);
})

app.listen(process.env.PORT);
