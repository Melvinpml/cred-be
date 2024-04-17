const express = require("express");

const cardModel = require("../model/CardModel")

const router = express.Router();


router.post('/addcard', async (req, res) => {
    try {
        let { data } = { "data": req.body }
        console.log("hai")
        let card = new cardModel(data)
        await card.save()
        res.json({ status: "success" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/viewcard', async (req,res)=>{
    const result = await cardModel.find()
    if(result){
        console.log(result)
        res.json(result)
    } 
    
}
)

module.exports = router