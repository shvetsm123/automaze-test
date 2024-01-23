const Task = require("../models/taskModel");

exports.getAllTasks = async (req, res) => {
    try {
        const { status, search, sort } = req.query;
        let query = {};

        if (status) {
            query.done = status === "done";
        }

        if (search) {
            query.description = { $regex: search, $options: "i" };
        }

        const sortOptions = {};
        if (sort) {
            sortOptions.priority = sort === "asc" ? 1 : -1;
        }

        const tasks = await Task.find(query).sort(sortOptions);
        res.json(tasks);
    } catch (error) {
        console.log("getAllTasks: ", error.message);
    }
};

exports.createTask = async (req, res) => {
    try {
        const { description, done, priority } = req.body;

        const newTask = await Task.create({
            description,
            done: done || false,
            priority: priority || 1,
        });

        res.json(newTask);
    } catch (error) {
        console.log("createTask: ", error.message);
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { done } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { done },
            { new: true }
        );

        res.json(updatedTask);
    } catch (error) {
        console.log("updateTask: ", error.message);
    }
};

exports.removeTask = async (req, res) => {
    try {
        const { id } = req.params;
        const removedTask = await Task.findByIdAndDelete(id);
        res.json({ message: "Task removed successfully", removedTask });
    } catch (error) {
        console.log("removeTask: ", error.message);
    }
};
