const mongoose = require('mongoose');
const Task = mongoose.model('Task', {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "Task Description"
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true
    }
});

module.exports = Task;