const path = require("path");
const fs = require("fs");

const PDFDocument = require("pdfkit");

const Item = require("../models/products.model");
const Order = require("../models/cart.model");
const User = require("../models/user.model");

//  gets all items

exports.getItems = (req, res, next) => {
  Item.find()
    .then(products => {
      console.log(products);
      res.status(200).send(products);
    })
    .catch(err => console.log(err));
};

// gets a single item

exports.getItem = (req, res, next) => {
  const id = req.body.id;
  Item.findById(id)
    .then(item => {
      res.status(200).send(item);
    })
    .catch(err => console.log(err));
};

// adds an item(s) to a cart

exports.addToCart = (req, res, next) => {
  const itemId = req.body.id;
  console.log('Item ID:', itemId); // Log the item ID for debugging

  Item.findById(itemId)
    .then(item => {
      if (!item) {
        console.error('Item not found');
        throw new Error('Item not found');
      }
      console.log('Item found:', item);
      return User.findOne({ _id: req.body._id })
        .then(user => {
          if (!user) {
            console.error('User not found');
            throw new Error('User not found');
          }
          console.log('User found:', user);
          return user.addToCart(item);
        });
    })
    .then(result => {
      res
        .status(200)
        .send({ success: true, message: "Item successfully added to cart" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ success: false, message: err.message });
    });
};



//  gets a cart as specific to a user

exports.getCart = (req, res, next) => {
  User.findById(req.body._id) // Ensure this matches your schema
    .populate('cart.items.itemId') // Ensure this matches your schema
    .then(user => {
      if (!user) {
        return res.status(404).send({ success: false, message: "User not found" });
      }
      res.status(200).send(user.cart.items);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ success: false, message: "An error occurred" });
    });
};

//  removes an item from a cart

exports.deleteCartItem = (req, res, next) => {
  const itemId = req.body.id;
  User.findOne({ _id: req._id })
    .then(user => {
      user
        .removeFromCart(itemId)
        .then(
          res
            .status(200)
            .send({ message: "Item successfully removed from cart" })
        );
    })
    .catch(err => console.log(err));
};

// creates an order

exports.addOrder = (req, res, next) => {
  User.findOne({ _id: req.body._id })
    .populate("cart.items.itemId")
    .then(user => {
      const items = user.cart.items.map(item => {
        return { quantity: item.quantity, item: { ...item.itemId._doc } };
      });
      const order = new Order({
        user: {
          email: user.email,
          userId: req._id
        },
        items
      });
      order.save();
      return user.clearCart();
    })
    .then(res.status(200).send("Successfully placed order"))
    .catch(err => console.log(err));
};

// fetches all orders specific to a user

exports.fetchOrders = (req, res, next) => {
  Order.find({ "user.userId": req.body._id })
    .then(orders => {
      res.status(200).send(orders);
    })
    .catch(err => console.log(err));
};

exports.getInvoice = (req, res, next) => {
  const orderId = req.body.id;

  Order.findById(orderId).then(order => {
    if (!order) {
      return next(new Error("No order found"));
    }
    const invoiceName = `invoice-${orderId}.pdf`;
    const invoicePath = path.join("data", "invoices", invoiceName);
    /**
     * ! creating a readable stream so node only deals with one chunk at a time.
     * ! Better for bigger files
     */

    const pdfDoc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'inline; filename="' + invoiceName + '"'
    );
    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res);
    pdfDoc.fontSize(14).text("Order Invoice", {
      underline: true
    });
    pdfDoc.text("______________________");
    let total = 0;
    order.items.forEach(item => {
      total += item.quantity * item.item.price;
      pdfDoc.text(
        item.item.title + " - " + item.quantity + " x " + "$" + item.item.price
      );
    });
    pdfDoc.text("Total Price: $" + total);
    pdfDoc.end();

    /**
     * ? why the code below
     * ! to show a less optimized way to download pdf files where the whole data has to be preloaded before hand
     */

    // fs.readFile(invoicePath, (err, data) => {
    //   if (err) return next(err);
    //   res.setHeader("Content-Type", "application/pdf");
    //   res.setHeader(
    //     "Content-Disposition",
    //     'inline; filename="' + invoiceName + '"'
    //   );
    //   res.send(data);
    // });
  });
};