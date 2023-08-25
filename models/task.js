const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        default:"To do"
    }
})

const Task = mongoose.model("Task",taskSchema);

module.exports =Task