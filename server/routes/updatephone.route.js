const express = require('express');
const phonebook= require('../mongodb/model/phonebook');

const router = express.Router();

router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { phone } = req.body;
  
      const updatedPhone = await phonebook.findByIdAndUpdate(
        id,
        {  phone },
        { new: true }
      );
  
      if (!updatedPhone) {
        return res.status(404).json({
          status: 'failed',
          message: 'Phone number not found',
        });
      }
  
      res.status(200).json({
        status: 'success',
        data: updatedPhone,
      });
    } catch (err) {
      res.status(500).json({
        status: 'failed',
        message: err.message,
      });
    }
  });

module.exports = router;