"use client";

import { useEffect, useState } from "react";
import { getAllTasks, deleteTask, updateTask } from "./api/tasks";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import Filters from "./components/Filters/Filters";
import SortButton from "./components/SortButton/SortButton";
import SearchInput from "./components/SearchInput/SearchInput";

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [filter, setFilter] = useState("all");
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksData = await getAllTasks();
                setTasks(tasksData);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const handleTaskAdded = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const handleSort = () => {
        setSortOrder((prevSortOrder) =>
            prevSortOrder === "asc" ? "desc" : "asc"
        );
    };

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks((prevTasks) =>
                prevTasks.filter((task) => task._id !== taskId)
            );
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleTaskClick = async (taskId, done) => {
        try {
            const updatedTask = await updateTask(taskId, done);
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === updatedTask._id
                        ? { ...task, done: updatedTask.done }
                        : task
                )
            );
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const sortedTasks = tasks.slice().sort((a, b) => {
        const orderMultiplier = sortOrder === "asc" ? 1 : -1;
        return orderMultiplier * (a.priority - b.priority);
    });

    const filteredTasks = sortedTasks
        .filter((task) => {
            if (filter === "all") {
                return true;
            } else if (filter === "done") {
                return task.done;
            } else if (filter === "undone") {
                return !task.done;
            }
        })
        .filter((task) =>
            task.description.toLowerCase().includes(searchText.toLowerCase())
        );

    return (
        <div className="max-w-md mx-auto my-8 p-4 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4 text-center">
                TODO App for Automaze &#128584;
            </h1>
            <TaskForm onTaskAdded={handleTaskAdded} />
            <div className="flex justify-between items-center">
                <SortButton sortOrder={sortOrder} handleSort={handleSort} />
                <Filters setFilter={setFilter} filter={filter} />
            </div>
            <SearchInput
                searchText={searchText}
                setSearchText={setSearchText}
            />
            <TaskList
                tasks={filteredTasks}
                onTaskClick={handleTaskClick}
                onDelete={handleDelete}
            />
        </div>
    );
}
