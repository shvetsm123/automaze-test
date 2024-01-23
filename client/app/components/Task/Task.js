import React from "react";

const Task = ({ task, onTaskClick, onDelete }) => {
    return (
        <li
            className={`mb-2 flex justify-between items-center ${
                task.done ? " text-gray-500" : ""
            }`}
        >
            <label className="cursor-pointer">
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => onTaskClick(task._id, !task.done)}
                    className="mr-2"
                />
                {`${task.description} - Priority: ${task.priority}`}
            </label>
            <button
                onClick={() => onDelete(task._id)}
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
                Delete
            </button>
        </li>
    );
};

export default Task;
