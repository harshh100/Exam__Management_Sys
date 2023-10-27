const mongoose = require('mongoose');
const { AdminModel } = require('../models/Admin.model');
const jwt = require('jsonwebtoken')
const { ExamModel } = require('../models/exam.model');


const AdminController = {

    async Adminlogin(req, res) {

        const { username, password } = req.body;
        // console.log(username + "  " + password);
        try {
            AdminModel.findOne({ username })
                .then(user => {

                    if (user.password != password) return res.status(400).send({ error: "Enter Valid Username or Password" });

                    const token = jwt.sign({
                        userId: user._id,
                        username: user.username,
                        role: user.role
                    }, process.env.SECRETkey, { expiresIn: "24h" });

                    return res.status(200).send({
                        token
                    });
                })
                .catch(err => {
                    return res.status(400).send({ error: "Enter Valid Username or Password" });
                });

        } catch (error) {
            return res.status(500).json({ err: "Error in login" });
        }
    },
    async AdminSignup(req, res) {
        const { username, password } = req.body;
        const role = "Admin";
        try {
            const newAdmin = new AdminModel({ username, password, role });
            await newAdmin.save();
            res.status(201).json({ msg: "Register successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Error to Register' });
        }
    }, async AddExam(req, res) {
        const { Title, ExamID, Date, Time, Duration, Venue } = req.body;
        try {
            const newExam = new ExamModel({ Title, ExamID, Date, Time, Duration, Venue });
            await newExam.save();
            res.status(201).json({ msg: "Exam Added successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Error to Add Exam' });
        }
    }

}

module.exports = AdminController;