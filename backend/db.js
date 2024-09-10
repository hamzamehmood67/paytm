const mongoose= require("mongoose");

async function main() {
    await mongoose.connect("mongodb+srv://hamza:167167ham.a@rbac.1birt.mongodb.net/RBAC?retryWrites=true&w=majority&appName=RBAC");
    console.log("Connected Successfully to database");
  }


function connectDb(){
    main().catch((err) => console.log(err));
}

  module.exports= connectDb
 


