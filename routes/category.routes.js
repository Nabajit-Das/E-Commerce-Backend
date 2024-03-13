/**
 * POST localhost:8080/ecomm/api/v1/category/add
 * GET localhost:8080/ecomm/api/v1/category/find
 * GET localhost:8080/ecomm/api/v1/category/products
 * PUT localhost:8080/ecomm/api/v1/category/edit
 * DELETE localhost:8080/ecomm/api/v1/category/delete
 */

const categoryController=require("../controllers/category.controller")
const categoryMiddlewares=require("../middlewares/category.mw")
const authmw=require("../middlewares/auth.mw")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/category/add",[categoryMiddlewares.VerifyCategory,authmw.verifyToken,authmw.isAdmin],categoryController.addCategory)

    app.get("/ecomm/api/v1/category/find",[categoryMiddlewares.verifyName],categoryController.findCategory),

    app.get("/ecomm/api/v1/category/products",[categoryMiddlewares.verifyName],categoryController.getProducts)

    app.put("/ecomm/api/v1/category/edit",[categoryMiddlewares.editDetails,authmw.verifyToken,authmw.isAdmin],categoryController.editCategory)

    app.delete("/ecomm/api/v1/category/delete",[categoryMiddlewares.verifyName,authmw.verifyToken,authmw.isAdmin],categoryController.deleteCategory)
}