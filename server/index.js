const express = require('express');
const cors = require("cors");
const connectDB = require("./mongodb/connect");
//routers assign 
const addphoneRoute = require('../server/routes/addphone.route.js');
const getphoneRoute = require('../server/routes/getphone.route.js');
const updatephoneRoute = require('../server/routes/updatephone.route')
const deletephoneRoute = require('../server/routes/deletephone.route')

const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cors());

const PORT = 8080;

//const url = "mongodb+srv://<<username>>:<<password>>@cluster0.fa0ka1l.mongodb.net/?retryWrites=true&w=majority";
connectDB(process.env.url)
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}..`);
})

app.use('/add-phone',addphoneRoute);
app.use('/get-phone',getphoneRoute);
app.use('/delete-phone',deletephoneRoute);
app.use('/update-phone',updatephoneRoute);