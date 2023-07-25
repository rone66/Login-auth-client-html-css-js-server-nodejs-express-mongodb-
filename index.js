const express=require("express");
const app=express();
const cors=require("cors");

app.use(cors())

const dbConnect=require("./config/database");
dbConnect();

require("dotenv").config();
const PORT=process.env.PORT||3000;

app.use(express.json());

const user=require("./router/user");
app.use("/api/v1",user)

app.listen(PORT,()=>{
    console.log("server is stared successfully",PORT);
})