import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import eventRouter from "./routes/EventRoute.js"
import userRouter from "./routes/userRoute.js"
import "dotenv/config"

//app config

const app = express()
const port = 4000

//middle-ware

app.use(express.json())
app.use(cors())

//db connection 
connectDB()

// API endpoints
app.use("/api/event", eventRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)


app.get("/", (req, res) => {
  res.send("API Working")
})

app.listen(port, () => {
  console.log(`Server Started On http://localhost:${port}`)
})

//mongodb+srv://adityadivate25:0101196625@cluster0.eyk0n.mongodb.net/?