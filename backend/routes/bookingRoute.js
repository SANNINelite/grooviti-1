import express from "express"
import authMiddleware from "../middleware/auth.js"
import { bookTicket } from "../controllers/bookingController.js"

const bookingRouter = express.Router();

bookingRouter.post("/ticket", authMiddleware, bookTicket);

export default bookingRouter