/**
 * POST localhost:8080/ecomm/api/v1/auth/signup
 */

const authController=require("../controllers/auth.controller")
const authmw=require("../middlewares/auth.mw")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/signup",[authmw.verifySignUpBody],authController.signUp)
}