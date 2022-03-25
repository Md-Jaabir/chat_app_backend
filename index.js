const express=require("express");
const bcrypt=require("bcrypt");
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

app.post("/join_room",async(req,res)=>{
	let expectedRoom = await room.find({roomname:req.body.roomname});
	
	let isPasswordCorrect=await bcrypt.compare(req.body.password,expectedRoom[0].password)
	
	if (isPasswordCorrect) {
		res.json({"Message":"success"});
	}else{
		res.json({"Message":"error"});

	// res.json({"Message":isPasswordCorrect});
	}
})

app.get("/fetch",async(req,res)=>{
	let theRoom=await room.find({roomname:req.query.roomname});
	let isPwdMatch= await bcrypt.compare(req.body.password,theRoom[0].password)
	if(theRoom.toString()!='' && isPwdMatch){
		let allmsgs=await msg.find(req.query);
		res.json(allmsgs);
	}else{
		res.json({"Message":"error"});

	}
});



app.post("/create_room",async(req,res)=>{
	let existedRoom=await room.find({roomname:req.body.roomname});
	let hashedPwd=await bcrypt.hash(req.body.password,10);
	if(existedRoom.toString()!=''){
		res.json(existedRoom)
	}else{
		let newRoom=new room({
			roomname:req.body.roomname,
			password:hashedPwd,
			authorname:req.body.authorname
		})
		newRoom.save();
		res.json(newRoom);
		// res.json({"Message":"success"})
	}
})

app.listen(process.env.PORT);
