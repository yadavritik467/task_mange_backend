const express = require('express');


const { createTask, updateTask, deleteTask, getAllTask } = require('../controller/task.js');
const { isAuthenticate } = require('../middleware/auth.js');

const router = express.Router();

router.post("/create", createTask)
router.put("/update/:id",updateTask)
router.delete("/delete/:id",deleteTask)
router.get("/getAllTask",getAllTask)

module.exports = router