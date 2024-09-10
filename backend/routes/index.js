const express= require("express");
const router=express.Router();
const userRoute= require("./user");
const accountRouter=require("../routes/account")

router.get('/', (req, res)=>{
    res.send("From Router")
})

router.use("/user", userRoute);
router.use("/account", accountRouter);

module.exports= router;