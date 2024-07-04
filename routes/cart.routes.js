const cartController = require("../controllers/cart.controller");

module.exports=(app)=>{
    app.post("/ecomm/api/v1/cart/add",cartController.addToCart),
    app.get("/ecomm/api/v1/cart/getcart",cartController.getCart),
    app.get("/ecomm/api/v1/cart/getItem",cartController.getItem),
    app.post("/ecomm/api/v1/cart/addtocart",cartController.addToCart)
}
