/**
 * POST localhost:8080/ecomm/api/v1/category/add
 * GET localhost:8080/ecomm/api/v1/category/find
 * PUT localhost:8080/ecomm/api/v1/category/edit
 */

const categoryController=require("../controllers/category.controller")
const categoryMiddlewares=require("../middlewares/category.mw")
const authmw=require("../middlewares/auth.mw")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/category/add",[categoryMiddlewares.VerifyCategory,authmw.verifyToken,authmw.isAdmin],categoryController.addCategory)

    app.get("/ecomm/api/v1/category/find",[categoryMiddlewares.verifyName],categoryController.findCategory),

    app.put("/ecomm/api/v1/category/edit",[categoryMiddlewares.editDetails,authmw.verifyToken,authmw.isAdmin],categoryController.editCategory)
}