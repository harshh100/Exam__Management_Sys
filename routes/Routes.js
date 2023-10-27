const express = require('express');
const router = express.Router();
const Auth = require('../middleware/auth.js')
const StudentController = require('../controller/StudentController.js')
const AdminController = require('../controller/AdminController.js')


router.post('/Studentlogin', StudentController.Studentlogin);
router.post('/StudentSignup', StudentController.StudentSignup);
router.get('/getExams', StudentController.getExams);
router.post('/JoinExam', Auth, StudentController.JoinExams);


router.post('/Adminlogin', AdminController.Adminlogin);
router.post('/AdminSignup', AdminController.AdminSignup);
router.post('/AddExam', Auth, AdminController.AddExam);



module.exports = router;