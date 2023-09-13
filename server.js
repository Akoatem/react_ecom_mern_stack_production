import express from "express"
import colors  from "colors"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js";
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from "url" // for es6 to avoid error during deployment


// configure env
dotenv.config()

// database config
connectDB()

// ES6 Module fixed
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// rest object
const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// routes api
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes)

// for deployment
app.use(express.static(path.join(__dirname, './client/build')))

// for deployment
app.use('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

// before deployment
// app.get('/', (req, res) => {
//     res.send("<h3>Welcome to ecommerce app</h3>")
// })

// PORT

const PORT = process.env.PORT || 8080

// run listen
// template literal
app.listen(PORT, () =>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
});