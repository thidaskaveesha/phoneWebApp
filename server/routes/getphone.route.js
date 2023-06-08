const express = require('express');
const phonebook= require('../mongodb/model/phonebook');

const router = express.Router();

router.get('/', async(req,res)=>{
    const PhoneNumbers = await phonebook.find()
    try{
        res.status(200).json({
            status:"sucsess",
            data : {PhoneNumbers}
        })

    }catch(err){
        res.status(505).json({
            status:"failed",
            message : (err)
        })
    }
})

module.exports = router;