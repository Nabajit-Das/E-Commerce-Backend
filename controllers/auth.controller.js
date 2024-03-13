/**
 * controller for creating user from request body
 */
const userModel=require("../models/user.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const secret=require("../configs/auth.config")

exports.signUp=async (req,res)=>{
    /**
     * Logic to create the user
     */

    //Read the request body
    const request_body=req.body

    //Adding data in MongoDB
    const userObj={
        name:request_body.name,
        userID:request_body.userID,
        Email:request_body.Email,
        userType:request_body.userType,
        password:bcrypt.hashSync(request_body.password,8)
    }
    try{
        const user_created=await userModel.create(userObj)

        const res_obj={
            name:user_created.name,
            userID:user_created.userID,
            Email:user_created.Email,
            userType:user_created.userType,
            createdAt:user_created.createdAt,
            updatedAt:user_created.updatedAt
        }
        //returning response back to the user
        console.log("User Created Successfully");
        res.status(200).send(res_obj)
    }catch(err){
        console.log("Error while creating the user ",err)
        res.status(500).send({
            message:"Some Error in signing up"
        })
    }
}

exports.signIn= async (req,res)=>{
    /**
     * Logic to Sign In user
     */

    // 1. Check if user ID already presenr or not
    const user=await userModel.findOne({userID:req.body.userID});
    if(user==null){
        return res.status(400).send({
            message: "User ID not present"
        })
    }

    // 2. Check for password Validation
    const isPasswordValid=bcrypt.compareSync(req.body.password,user.password);

    if(!isPasswordValid){
        return res.status(401).send({
            message: "Wrong Password"
        })
    }

    // 3. Return JWT on successful authentication
    const token=jwt.sign({id:user.userID},secret.secret,{
        expiresIn: 600 //seconds
    })

    res.status(200).send({
        name: user.name,
        userID: user.userID,
        Email:user.Email,
        userType: user.userType,
        token: token
    })
}