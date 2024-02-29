/**
 * Logic to add category to the database
 */

const mongoose=require("mongoose")
const categoryModel=require("../models/category.model")

exports.addCategory=async (req,res)=>{
    //Read req body

    // adding data in MongoDB
    try{
        const categoryCreated=await categoryModel.create({
            name: req.body.name,
            description: req.body.description
        })

        return res.status(201).send({
            name: categoryCreated.name,
            description: categoryCreated.description
        })

    }catch(err){
        console.log("Error in creating category",err)
        res.status(400).send({
            message: "Error in creating category"
        })
    }
    //returning response
}