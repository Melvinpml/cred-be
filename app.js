const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRouter = require("./controller/UserRouter")
const cardRouter = require("./controller/CardRouter")

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/user',userRouter)
app.use('/api/card',cardRouter)

mongoose.connect("mongodb+srv://melvinpoulose06:melvinpml4151@cluster0.yshbagz.mongodb.net/credxDb?retryWrites=true&w=majority",{useNewUrlParser:true})

app.listen(3001, () => {
    console.log("Server Running")
})