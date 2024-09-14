const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/user");
const Account = require("../models/account");
const { default: mongoose } = require("mongoose");
const router= express.Router();



router.get("/",async (req, res)=>{
    res.send("inside accoutn")
})

router.get("/balance", authMiddleware, async(req, res)=>{
   
    const account=await Account.findOne({
        userId: req.userId
    })

    
    if(!account)
    {
        res.status(404).json({
            message: "Not Found"
        })
    }
    res.json({
        balance: account.balance
    })
})

router.post("/transfer", authMiddleware, async(req, res)=>{
    const session=await mongoose.startSession();

    session.startTransaction();
    const{to, amount}= req.body;

    const account=await Account.findOne({
        userId: req.userId
    }).session(session);

    if(!account || account.balance<amount)
    {
        await session.abortTransaction();
        console.log("Insufficient balance");
        return;
    }

    const toAccount=await Account.findOne({
        userId: to
    }).session(session);

    if(!toAccount)
    {
        await session.abortTransaction();
        console.log("Invalid Account");
        return;
    }

    await Account.updateOne({userId: req.userId}, {$inc:{balance:-amount}}).session(session);
    await Account.updateOne({userId: to}, {$inc:{balance: amount}}).session(session);

   await session.commitTransaction();
   console.log("Done")
   res.json({
    message: "Transfer successful"
});
})

module.exports= router;