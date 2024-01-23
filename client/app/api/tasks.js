import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const getAllTasks = async (status, search, sort) => {
    try {
        const response = await axios.get(API_BASE_URL, {
            params: { status, search, sort },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

export const addTask = async (taskData) => {
    try {
        const response = await axios.post(API_BASE_URL, taskData);
        return response.data;
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
};

export const updateTask = async (taskId, done) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/${taskId}`, {
            done,
        });
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${taskId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};
