const express= require("express");
const router=express.Router();
const userRoute= require("./user");

router.get('/', (req, res)=>{
    res.send("From Router")
})

router.use("/user", userRoute);

module.exports= router;