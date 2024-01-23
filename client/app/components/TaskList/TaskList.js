import React from "react";
import Task from "../Task/Task";

const TaskList = ({ tasks, onTaskClick, onDelete }) => {
    const taskItems = tasks.map((task) => (
        <Task
            key={task._id}
            task={task}
            onTaskClick={onTaskClick}
            onDelete={onDelete}
        />
    ));

    return <ul className="list-disc pl-1 mt-4">{taskItems}</ul>;
};

export default TaskList;
