const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    Enrollment: [{
        Title: {
            type: String,
            required: true,
        },
        ExamID: {
            type: String,
            required: true,
            sparse: true,
        },
        Date: {
            type: String,
            required: true,
        },
        Time: {
            type: String,
            required: true,
        },
        Duration: {
            type: String,
            required: true,
        },
        Venue: {
            type: String,
            required: true,
        },
    }],
});

mongoose.model('Student', StudentSchema);

const StudentModel = mongoose.model('Student') || mongoose.model('Student', StudentSchema);

module.exports = { StudentModel, StudentSchema };
