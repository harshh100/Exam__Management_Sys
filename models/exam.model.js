const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    ExamID: {
        type: String,
        required: true,
        unique: true,
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
    Participation: [{
        username: {
            type: String,
            required: true,
            sparse: true,
        }
    }]
});

mongoose.model('Exam', ExamSchema);

const ExamModel = mongoose.model('Exam') || mongoose.model('Exam', ExamSchema);

module.exports = { ExamModel, ExamSchema };



