const express = require('express');
const phonebook= require('../mongodb/model/phonebook');

const router = express.Router();

router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      await phonebook.findByIdAndDelete(id);
      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      res.status(500).json({
        status: 'failed',
        message: err.message,
      });
    }
  });

module.exports = router;