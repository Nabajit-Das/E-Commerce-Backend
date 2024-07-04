/**
 * This is the schema for users
 */
const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    userID:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true,
        minLength:10,
        lowercase:true
    },
    userType:{
        type:String,
        required:true,
        default:"CUSTOMER",
        enum:["CUSTOMER","ADMIN"]
    },
    cart: {
        items: [
          {
            itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true }
          }
        ]
      }
},{timestamps:true,versionKey:false})

// Instance method to add an item to user's cart

userSchema.methods.addToCart = function(item) {
    const cartProductIndex = this.cart.items.findIndex(cartProduct => {
      return cartProduct.itemId.toString() === item._id.toString();
    });
  
    let newQty = 1;
    const updatedCartItems = [...this.cart.items];
  
    if (cartProductIndex >= 0) {
      newQty = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQty;
    } else {
      updatedCartItems.push({
        itemId: item._id,
        quantity: newQty
      });
    }
    this.cart = {
      items: updatedCartItems
    };
  
    return this.save();
  };

    // Instance method to remove an item from user's cart
// Instance method to remove an item from user's cart

userSchema.methods.removeFromCart = function(id) {
    const updatedCartItems = this.cart.items.filter(item => {
      return item.itemId.toString() !== id.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
  };
  
  // Instance method to clear user's cart
  
  userSchema.methods.clearCart = function() {
    this.cart = { items: [] };
    return this.save();
  };
  

module.exports=mongoose.model("User",userSchema)