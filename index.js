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
	let newMsg=new msg(req.body);
	newMsg.save()
	res.json({"Message":"msg may be sent"})

})

app.get("/fetch",async(req,res)=>{
	let theRoom=await room.find({roomname:req.query.roomname});
	
	if(theRoom.toString()!='' && theRoom.password==req.query.password){
		let allmsgs=await msg.find(req.query);
		res.json(allmsgs);
	}else{
		res.json({"Message":"error"});

	}
})

app.post("/create_room",async(req,res)=>{
	let existedRoom=await room.find({roomname:req.body.roomname});
	if(existedRoom.toString()!=''){
		res.json(existedRoom)
	}else{
		let newRoom=new room(req.body)
		newRoom.save();
		res.json({"Message":"success"})
	}
})

app.listen(process.env.PORT);
