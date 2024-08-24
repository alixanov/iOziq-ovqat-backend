const express = require("express");
const connectDB = require("./config/db")
const cors = require("cors")
require("dotenv").config()
const itemRoutes = require("./router/router")

connectDB()
const app = express();

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use("/api", itemRoutes)


const PORT = process.env.PORT || 3006 
app.listen(PORT, () => console.log(`Сервернинг запущен на порту ${PORT}`))