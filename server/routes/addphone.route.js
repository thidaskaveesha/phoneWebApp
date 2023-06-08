const express = require('express');
const phonebook= require('../mongodb/model/phonebook');

const router = express.Router();

router.post('/', async(req,res)=>{
    try{
        const PhoneNumber = new phonebook(req.body);
        await PhoneNumber.save()
        res.status(200).json({
            status:"sucsess",
            data : {PhoneNumber}
        })

    }catch(err){
        res.status(500).json({
            status:"failed",
            message : {err}
        })
    }
})

module.exports = router;