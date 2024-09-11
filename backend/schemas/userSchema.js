const zod= require("zod");

const userSchema=zod.object({
    username: zod.string().toLowerCase().min(3).max(30),
    firstName: zod.string().min(1).max(50),
    lastName: zod.string().min(1).max(50),
    password: zod.string().min(6)
})

const updateSchema=zod.object({
    firstName:zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional()
})

const signinSchema = zod.object({
    username: zod.string(),
	password: zod.string()
})

module.exports= {userSchema, updateSchema, signinSchema};