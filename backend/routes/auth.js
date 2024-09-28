const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "usedthistogeneratesecretkey";
const db = require('../db');


//http://localhost:4000/auth/signup
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await db.promise().query(`INSERT INTO signdetails (username,email,password )
          VALUES ('${username}','${email}','${hashedPassword}')`);
        res.status(201).json(response[0]);
    } catch (err) {
        res.status(400).json(err);
    }
})



// http://localhost:4000/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await db.promise().query(`select * from signdetails where email='${email}'`);
        // user found in db
        if (response[0].length > 0) {
            //password matched
                if ((bcrypt.compare(password, response[0][0].password))) {
                    //password matched
                    let obj = {};
                    obj.token = jwt.sign({ email: response[0][0].email },"JWT_SECRET",  {
                        expiresIn: 600
                    });
                     console.log(obj);
                    obj.username = response[0][0].username;
                    res.status(200).json(obj);
                }
                //password not matched
                else {
                    res.status(401).json({ message: 'Incorrect Password' });
                }
            }
            // user not found
            else {
                res.status(404).json({ message: 'User Not Found' });
            }
        } catch (err) {
            // console.log(err);
            res.status(400).json(err);
        }
    })

module.exports = router;