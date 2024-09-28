const express = require('express');
const router = express.Router();

const db = require('../db');

// http://localhost:4000/employee/employeelist

router.get('/employeelist', async (req, res) => {
    try {
        const response = await db.promise().query(`select * from t_employee`);
        res.status(200).json(response[0]);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

//http://localhost:4000/employee/:1
router.get('/:f_id', async (req, res) => {
    const f_id = req.params.f_id;
    try {
        const response = await db.promise().query(`select * from t_employee where f_id =${f_id}`);
        res.status(200).json(response[0]);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

//http://localhost:4000/employee/addemployee
router.post('/addemployee', async (req, res) => {
    try {
        console.log(req.body);
        const {f_name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course} = req.body;
        const response = await db.promise().query(`insert into t_employee ( f_name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course) values ( '${f_name}' , '${f_Email}','${f_Mobile}', '${f_Designation}', '${f_Gender}', '${f_Course}' )`);
        res.status(200).json(response[0]);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

//http://localhost:4000/employee/updateemployee/102
router.put('/updateemployee/:f_id', async (req, res) => {
    try {
        const f_id = req.params.f_id;
        const {f_name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course} = req.body;
        const response = await db.promise().query(`update t_employee set f_name='${f_name}' , f_Email = '${f_Email}', f_Mobile='${f_Mobile}', f_Designation='${f_Designation}', f_Gender='${f_Gender}', f_Course='${f_Course}' where f_id = ${f_id}`);
        res.status(200).json(response[0]);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

//http://localhost:4000/employee/deletermployee/102
router.delete('/deletermployee/:f_id', async(req, res)=>{
    const f_id= req.params.f_id;
    try {
        const response = await db.promise().query(`DELETE FROM t_employee where f_id = "${f_id}"`);
        res.status(200).json(response[0]);
    } catch (error) {
        res.status(400).json(err);
    }
})

module.exports = router;