/**
 * POST localhost:8080/ecomm/api/v1/product/add
 */

const productController=require("../controllers/product.controller")
const productmw=require("../middlewares/product.mw")
const authmw=require("../middlewares/auth.mw")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/product/add",[authmw.verifyToken,authmw.isAdmin,productmw.verifyName,productmw.verifyQuantity],productController.addProduct)
}