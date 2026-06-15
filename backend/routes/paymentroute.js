const express = require("express");
const Razorpay = require("razorpay");

const router = express.Router();

const razorpay = new Razorpay({
  key_id:
    process.env.RAZORPAY_KEY_ID,
  key_secret:
    process.env.RAZORPAY_KEY_SECRET,
});

router.post(
  "/create-order",
  async (req, res) => {
     console.log(
      "Create Order Request:",
      req.body
    );
    try {
      const { amount } = req.body;

      const order =
        await razorpay.orders.create({
          amount: amount * 100,
          currency: "INR",
        });

      res.json(order);
    } catch (error) {
      console.error(
  "Razorpay Error:",
  error
);
      res.status(500).json({
        message:
          "Order creation failed",
      });
    }
  }
);

module.exports = router;