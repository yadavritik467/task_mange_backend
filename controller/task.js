const Task = require("../models/task")
const { findByIdAndDelete } = require("../models/user")


module.exports.createTask = async(req,res) =>{
    try {
        let {user,title,description} = req.body;
        
        const task = await Task.create({
            user,title,description
        })

        return res.status(200).json({
            success: true,
            message:"task created",
            task,
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }

}
module.exports.updateTask = async(req,res) =>{
    try {
        
        const task = await Task.findById(req.params.id);
        if(!task){
            return res.status(404).send({
                success: false,
                message: "Task not found",
            })
        }
        
        const {title,description,status} = req.body;
     
        if(title){
            task.title = title;
        }
        if(description){
            task.description = description;
        }
        if(status){
            task.status = status;
        }

        await task.save(req,res);

        return res.status(200).send({
            success: true,
            message:"task updated"
        })

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
module.exports.deleteTask = async(req,res) =>{
   try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        message:"Task deleted"
    })
   } catch (error) {
    res.status(500).json({error: error.message})
   }
}
module.exports.getAllTask = async(req,res) =>{
try {
    const task = await Task.find();
    res.status(200).json({task})
} catch (error) {
    res.status(500).json({error: error.message})
}
}