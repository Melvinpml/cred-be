const express = require("express");
const bcrypt = require("bcryptjs");

const userModel = require("../model/UserModel");

const router = express.Router();

const hashPasswordGenerator = async (pass) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(pass, salt)
}

router.post('/signup', async (req, res) => {
    try {
        let { data } = { "data": req.body }
        let password = data.password
        const hashedpassword = await hashPasswordGenerator(password)
        data.password = hashedpassword
        let user = new userModel(data)
        await user.save()
        res.json({ status: "success" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/view', async (req,res)=>{
    const result = await userModel.find()
    if(result){
        console.log(result)
        res.json(result)
    } 
    
}
)


router.post("/signin", async (req, res) => {
    let input = req.body;
    let email = req.body.email;
    let data = await userModel.findOne({ "email": email });
    if (!data) {
        return res.json({ status: "Incorrect email id" });
    }
    console.log(data);
    let dbPasswordTrainer = data.password;
    let inputPasswordTrainer = req.body.password;
    console.log(dbPasswordTrainer);
    console.log(inputPasswordTrainer);

    const match = await bcrypt.compare(inputPasswordTrainer, dbPasswordTrainer);
    if (!match) {
        return res.json({ status: "Incorrect password" });
    }

    // Removing the jwt token from the response
    res.json({ status: "success", "userdata": data });
});



module.exports = router
