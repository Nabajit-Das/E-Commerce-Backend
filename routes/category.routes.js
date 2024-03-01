/**
 * POST localhost:8080/ecomm/api/v1/category
 */

const categoryController=require("../controllers/category.controller")
const categoryMiddlewares=require("../middlewares/category.mw")
const authmw=require("../middlewares/auth.mw")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/category",[categoryMiddlewares.VerifyCategory,authmw.verifyToken,authmw.isAdmin],categoryController.addCategory)
}