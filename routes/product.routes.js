/**
 * POST localhost:8080/ecomm/api/v1/product/add
 * GET localhost:8080/ecomm/api/v1/product/find
 * DELETE localhost:8080/ecomm/api/v1/product/delete
 * PUT localhost:8080/ecomm/api/v1/product/edit
 */

const productController=require("../controllers/product.controller")
const productmw=require("../middlewares/product.mw")
const authmw=require("../middlewares/auth.mw")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/product/add",[authmw.verifyToken,authmw.isAdmin,productmw.verifyUniqueName,productmw.verifyQuantity],productController.addProduct),
    app.get("/ecomm/api/v1/product/find",[productmw.verifyName],productController.findProduct),
    app.delete("/ecomm/api/v1/product/delete",[authmw.verifyToken,authmw.isAdmin,productmw.verifyName],productController.deleteProduct),
    app.put("/ecomm/api/v1/product/edit",[authmw.verifyToken,authmw.isAdmin,productmw.verifyUpdateDetails],productController.editProduct)
}