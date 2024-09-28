const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const db = require('./db');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


const empRoute = require('./routes/employee');
app.use('/employee', empRoute);



const authRoute = require('./routes/auth');
app.use('/auth', authRoute);



app.get("/", (req, res) =>{
    res.json("hello this is backend:")
})

app.get("/emp", (re, res) =>{
    const q= "SELECT * FROM signdetails"
    db.query(q, (err, data)=>{
        if(err) return res.json("your error:" +err)
        return res.json(data)
    })
})

app.listen(4000, function () {
    console.log('App running on port 4000.');
    db.connect(function (err) {
        if (err) {
            console.log('DB connection error', err);
        }
        else {
            console.log('DB Connection successful');
        }
    })
});