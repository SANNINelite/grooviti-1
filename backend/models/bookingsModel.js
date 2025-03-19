import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Booked" },
  date: { type: Date, default: Date.now() },
  payment: { type: Boolean, default: false }

})

const bookingModel = mongoose.models.booking || mongoose.model("booking", bookingSchema)

export default bookingModel;