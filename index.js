const express = require('express')
const cors = require('cors')
const config= require('dotenv')
const mongoose = require('mongoose');

// importing routes
const userRouter = require("./Routes/user.js")
const taskRouter = require("./Routes/task.js")


const app = express();

config.config({path:"./config/config.env"});

const port = process.env.PORT

const mongoDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGOURL,{ useNewUrlParser: true, useUnifiedTopology: true })
        console.log("db connected")
    } catch (error) {
        console.error(error.message,"db not connected")
    }
}

mongoDB();

app.use(express.json());
app.use(cors())

app.use("/api/v1",userRouter)
app.use("/api/v1",taskRouter)

app.get('/', (req,res)=>{
    res.send("working")
});

app.listen(port, ()=>{
    console.log(`listening on ${port}`)
});