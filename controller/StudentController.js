const mongoose = require('mongoose');
const { StudentModel } = require('../models/Student.model');
const jwt = require('jsonwebtoken');
const { ExamModel } = require('../models/exam.model');



const StudentController = {

    async Studentlogin(req, res) {

        const { username, password } = req.body;
        // console.log(username + "  " + password);
        try {
            StudentModel.findOne({ username })
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
    async StudentSignup(req, res) {
        const { username, password } = req.body;
        // console.log(username, password);
        const role = "Student";
        try {
            const newStudent = new StudentModel({ username, password, role });
            await newStudent.save();
            res.status(201).json({ msg: "Register successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Error to Register' });
        }
    }, async getExams(req, res) {
        try {
            const Exam = await ExamModel.find({}).select('-Participation');
            res.send(Exam);
        } catch (error) {
            return res.status(500).json({ err: "Error finding documents" });
        }
    }, async JoinExams(req, res) {
        const { examId, username } = req.body;
        try {

            const student = await StudentModel.findOne({ username });
            if (!student) {
                return res.status(404).json({ error: "Student not found" });
            }

            const exam = await ExamModel.findOne({ ExamID: examId });
            if (!exam) {
                return res.status(404).json({ error: "Exam not found" });
            }

            const isAlreadyParticipating = exam.Participation.some((participant) => participant.username === username);

            if (isAlreadyParticipating) {
                return res.status(400).json({ error: "Student is already participating in this exam" });
            }

            exam.Participation.push({ username });

            student.Enrollment.push({
                Title: exam.Title,
                ExamID: exam.ExamID,
                Date: exam.Date,
                Time: exam.Time,
                Duration: exam.Duration,
                Venue: exam.Venue,
            });

            await student.save();
            await exam.save();

            res.status(200).json({ message: "Student join the exam successfully" });

        } catch (error) {
            return res.status(500).json({ err: "Error  Join Exam" });
        }
    }

}

module.exports = StudentController;