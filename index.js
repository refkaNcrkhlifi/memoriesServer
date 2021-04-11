import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import connectDB from "./config/db.js"
import router from "./routes/posts.js"

dotenv.config({ path: './config/config.env' })

const app = express()

app.use(express.json({ limit: "30mb", extended: false }))
app.use(express.urlencoded({ limit: "30mb", extended: false }))
app.use(cors())

connectDB()

app.use('/posts', router)
const prot = process.env.NODE_PORT || 3001
app.listen(prot, () => console.log("lisning on port :", prot))