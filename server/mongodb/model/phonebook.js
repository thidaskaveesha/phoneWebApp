const mongoose = require('mongoose');

const phonebookschema = new mongoose.Schema({
    id:{
        type: String,
    },
    name :{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
});

const phonebook = mongoose.model("phonebook",phonebookschema);

module.exports = phonebook;