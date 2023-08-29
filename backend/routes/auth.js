const router = require("express").Router();
const Admin  = require("../model/Admin");
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken");

require("dotenv").config();

router.post("/register", async (req, res) => {
    try {

         //if username exists
         const usernameExist = await Admin.findOne({ username: req.body.username });
         if(usernameExist) return res.status(400).json({ error: "UserName Already Exist" })
 
         //Hash password
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(req.body.password, salt)
 

        const admin = new Admin({
            username: req.body.username,
            password: hashPassword
        })
       
        const saveDetails = await admin.save()
        res.status(200).json({ 
            message: "Register Successfully",
            status: true
        })



    } catch (err) {
        res.status(400).json({ error: err })
        console.log(err, "err")
    }
})

router.post("/login", async (req, res) => {
    try {
        // username is not found
        const usernameExist = await Admin.findOne({ username: req.body.username });
        if (!usernameExist) {
            return res.status(400).json({ error: "username Not Registered" });
        }

        // Incorrect password
        const validPassword = await bcrypt.compare(req.body.password, usernameExist.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Incorrect Password" });
        }

        // JWT sign
        const token = jwt.sign({ _id: usernameExist._id }, process.env.TOKEN_SECRET);

        // Respond with success message and token
        res.status(200).json({
            message: "Login Successfully",
            status: true,
            token: token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }

})

module.exports = router;