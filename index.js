/**
 * This is the entry point for our application
 */
const express=require("express")
const app=express()
const mongoose=require("mongoose")
const serverConfig = require("./configs/server.config")
const dbConfig=require("./configs/db.config")
const userModel=require("./models/user.model")
const bcrypt=require("bcryptjs")


app.use(express.json()) //converts json object in request body in js object

/**
 * connecction with mongoose
 */
mongoose.connect(dbConfig.DB_URL)
const db=mongoose.connection
db.on("err",()=>{
    console.log("Error in connecting with the database")
})
db.once("open",()=>{
    console.log("Connected successfully with the databse");
    init()
})
// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });


/**
 * check if admin is present
 */
async function init(){
    try{
        let user=await userModel.findOne({userType:"ADMIN"})
        if(user){
            console.log("Admin is already present")
            return
        }
    }catch(err){
        console.log("Error while reading data",err)
    }

    try{
        user=await userModel.create({
            name:"Nabajit",
            userID:"Admin01",
            password:bcrypt.hashSync("Welcome1",8),
            Email:"dasnabajit2005@gmail.com",
            userType:"ADMIN"
        })
        console.log("Admin Created Successfully",user)

    }catch(err){
        console.log("Error while creating Admin",err);
    }
    

}


/**
 * stitching the routes
 */

require("./routes/auth.routes")(app)
require("./routes/category.routes")(app)
require("./routes/product.routes")(app)
/**
 * Starting the server
 */
app.listen(serverConfig.PORT,()=>{
    console.log("Connected Successfully to the port number : ",serverConfig.PORT)
})