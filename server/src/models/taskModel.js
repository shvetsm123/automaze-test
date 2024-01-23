const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    done: Boolean,
    priority: Number,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
