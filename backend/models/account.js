const mongoose = require("mongoose");
const { Schema } = require("zod");


const acountSchema = new mongoose.Schema({
    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    ,
    balance: {
        type: Number,
        required: true
    }
})

const Account=await mongoose.model("Account", acountSchema);
module.exports= Account;