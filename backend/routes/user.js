const express=require("express");
const {zodUserSchema, updateSchema}=require('../schemas/userSchema');
const User=require("../models/user");
const JWT_SECRET=require('../config')
const jwt= require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");


const router=express.Router();

router.post('/signup',async (req, res)=>{
    const body= req.body;
 

    const {success}= zodUserSchema.safeParse(body);

    if(!success){
        return res.status(411).json(
            {
                message: "Incorrect Inputs"
            }
        )
    }

    const existingUser=await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json(
            {
                message: "Email already present"
            }
        )
    }

    const user= await User.create(body);
    const userId=user._id;

    const token=jwt.sign(
        {
            userId
        }, JWT_SECRET
    )

    res.json({
        message: "User Created",
        token: token
    })

})

router.put('/', authMiddleware, async (req, res)=>{
    const {success}= updateSchema.safeParse(req.body);

    if(!success)
    {
        res.status(411).json({
            message: "Error while updating"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated Successfully"
    })
})


router.get("/bulk", async(req, res)=>{
    const filter=req.query.filter || '';
    console.log(filter)
    const users = await User.find({
        $or: [
            {
                firstName: { 
                    $regex: filter, 
                    $options: 'i' // Case-insensitive search
                }
            }, 
            {
                lastName: { 
                    $regex: filter, 
                    $options: 'i' // Case-insensitive search
                }
            }
        ]
    });
    
    console.log(users);
    res.json({
        user: users.map(u =>({
            firstName: u.firstName,
            lastName: u.lastName,
            username: u.username,
            _id: u._id
        }))
    })
})
module.exports= router;