import bookingModel from "../models/bookingsModel.js";
import userModel from "../models/userModel.js"
import Razorpay from "razorpay"


const razorpay = new Razorpay({
  key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
  key_secret: process.env.REACT_APP_RAZORPAY_SECRET_KEY
});

//placing user order from frontend 
const bookTicket = async (req, res) => {

  try {
    // Save ticket details in DB
    const newTicket = new bookingModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newTicket.save();

    // Clear user's cart after booking
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Creating Razorpay order
    const order = await razorpay.orders.create({
      amount: req.body.amount * 100, // Amount in paise
      currency: "INR",
      receipt: `ticket_${newTicket._id}`,

    });
    res.json({ success: true, order_id: order.id });
  } catch (error) {
    console.error("Error while making payment:", error);
    res.json({ success: false, message: "Error while making payment" });
  }
};

export { bookTicket };