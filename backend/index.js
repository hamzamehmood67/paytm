const express = require("express");
const connectDb=require("./db")
const apiRouter=require("./routes/index");
const cors= require("cors");
const bodyParse= require("body-parser");

connectDb(); 

const app =express();


app.get("/" ,(req, res)=>{
    res.send("running");
})
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use("/api/v1", apiRouter);

app.listen(3000, ()=>{
    console.log("App listening on PORT 3000")
})

