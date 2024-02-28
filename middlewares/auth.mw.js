/**
 * checks for all the field in the request body
 */
const userModel=require("../models/user.model")
const authController=require("../controllers/auth.controller")

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

module.exports={
    verifySignUpBody: verifySignUpBody
}