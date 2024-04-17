const mongoose = require("mongoose")
const cardSchema = new mongoose.Schema(
    {
        cardName: {
            type: String,
            required: true
        },
        cardNo: {
            type: String,
            required: true
        },
        cvv: {
            type: String,
            required: true
        },
        expiryDate: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        }
        
    }
)

module.exports = mongoose.model("addcard", cardSchema)