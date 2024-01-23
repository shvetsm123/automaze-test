"use client";
import { useState } from "react";
import { addTask } from "../../api/tasks";
import validationSchema from "@/app/utils/validationSchema";

const TaskForm = ({ onTaskAdded }) => {
    const [taskDescription, setTaskDescription] = useState("");
    const [taskPriority, setTaskPriority] = useState(1);
    const [validationErrors, setValidationErrors] = useState({});

    const handleInputChange = (event) => {
        setTaskDescription(event.target.value);
    };

    const handlePriorityChange = (event) => {
        setTaskPriority(parseInt(event.target.value, 10));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await validationSchema.validate(
                { description: taskDescription, priority: taskPriority },
                { abortEarly: false }
            );

            const newTask = await addTask({
                description: taskDescription,
                priority: taskPriority,
            });
            onTaskAdded(newTask);
            setTaskDescription("");
            setTaskPriority(1);
            setValidationErrors({});
        } catch (error) {
            if (error.name === "ValidationError") {
                const errors = {};
                error.inner.forEach((err) => {
                    errors[err.path] = err.message;
                });
                setValidationErrors(errors);
            } else {
                console.error("Error adding task:", error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="my-4">
            <label className="block text-lg mb-2">
                Task Description:
                <input
                    type="text"
                    value={taskDescription}
                    onChange={handleInputChange}
                    className={`border ${
                        validationErrors.description
                            ? "border-red-500"
                            : "border-gray-300"
                    } rounded px-2 py-1 w-full mt-1`}
                />
                {validationErrors.description && (
                    <p className="text-red-500 text-sm mt-1">
                        {validationErrors.description}
                    </p>
                )}
            </label>
            <label className="block text-lg mb-2">
                Priority:
                <select
                    value={taskPriority}
                    onChange={handlePriorityChange}
                    className="border border-gray-300 rounded px-2 py-1 w-full mt-1"
                >
                    {Array.from({ length: 10 }, (_, index) => index + 1).map(
                        (value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        )
                    )}
                </select>
            </label>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
