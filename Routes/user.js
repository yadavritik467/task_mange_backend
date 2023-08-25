const express = require('express');

const {register,login,getAllUser} = require("../controller/user.js")

const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/getAllUser",getAllUser)

module.exports = router