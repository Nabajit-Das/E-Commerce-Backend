/**
 * checks for all the field in the request body
 */
const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken")
const authConfig=require("../configs/auth.config")

const verifySignUpBody=async (req,res,next)=>{
    try{
        //check for name
        if(!req.body.name){
            return res.status(400).send({
                message:"Name not provided"
            })
        }
        //check for email
        if(!req.body.Email){
            return res.status(400).send({
                message:"Email not provided"
            })
        }
        //check for user id
        if(!req.body.userID){
            return res.status(400).send({
                message:"userID not provided"
            })
        }
        //Ccheck if userID is unique
        const user=await userModel.findOne({userID:req.body.userID})
        if(user){
            return res.status(400).send({
                message:"userID is not unique"
            })
        }

        next()

    }catch(err){
        console.log("Error in validating request body ",err)
        res.status(500).send({
            message:"Error while validating data"
        })
    }
}

const verifySignInBody=async (req,res,next)=>{
    // check if all information is provided or not
    try{
        if(!req.body.userID){
            return res.status(400).send({
                message: "UserId not provided"
            })
        }

        if(!req.body.password){
            return res.status(400).send({
                message: "Password is not provided"
            })
        }

        next()
    }catch(err){
        console.log("Error in validating signIn data ", err)
        res.status(500).send({
            message: "Error while validating data"
        })
    }
}

const verifyToken=async(req,res,next)=>{
    const token=req.headers["x-acess-token"]
    if(!token){
        return res.status(401).send({
            message: "Unauthorized. Should LogIn for access"
        })
    }
    jwt.verify(token,authConfig.secret,async (err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"Unauthorized. Error in token reading"
            })
        }
        const user=await userModel.findOne({userID:decoded.id})
        if(!user){
            return res.status(401).send({
                message:"User doesn't exist with this token"
            })
        }
        req.user=user
        next()
    })
    
}

const isAdmin=async(req,res,next)=>{
    const user=req.user
    if(user && user.userType=='ADMIN'){
        next()
    }
    else{
        return res.status(401).send({
            message: "Unauthorized for Customers"
        })
    }
}
module.exports={
    verifySignUpBody: verifySignUpBody,
    verifySignInBody: verifySignInBody,
    verifyToken: verifyToken,
    isAdmin: isAdmin
}