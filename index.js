const express=require("express");
const app=express();
const mongoose =require("mongoose");
const dotenv=require("dotenv");
const cors=require('cors');

app.use(cors({origin:"*"}));

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.DB,{
	useUnifiedTopology:true,
	useNewUrlParser:true
}).then(()=>{
	console.log("connected successfully")
});

const roomSchema = mongoose.Schema({
	roomname:String,
	password:String,
	authorname:String
});

const room=mongoose.model("room",roomSchema);

const chatSchema = mongoose.Schema({
	roomname:String,
	password:String,
	name:String,
	message:String
});

const msg=mongoose.model("msg",chatSchema);


app.get("/",(req,res)=>{
	res.json({"Message":"Hello"})
})

app.post("/send",(req,res)=>{
	
})

app.get("/fetch",(req,res)=>{
	res.json(req.query);
})

app.post("/create_room",async(req,res)=>{
	let existedRoom=await room.find({roomname:req.body.roomname});
	console.log(existedRoom)
})

app.listen(process.env.PORT);
