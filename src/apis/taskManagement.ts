import toast from "react-hot-toast";
import { api, handleAxiosError } from "./apiClient";
import type Task from "../interfaces/Task";

export const getAllTasks = async () => {
    try {
        const response = await api.get("/todos");
        return response.data.todos;
    } catch (error) {
        toast.error(handleAxiosError(error).message);
    }
};

export const addTask = async (task: Task) => {
    try {
        const response = await api.post("/add", task);
        return response.data;
    } catch (error) {
        toast.error(handleAxiosError(error).message);
    }
};

export const updateTask = async (taskId: number, newTask: Task) => {
    try {
        const { id, ...taskWithoutId } = newTask;
        const response = await api.put(`/todos/${taskId}`, taskWithoutId);
        toast.success("Task updated successfully");
        return response.data;
    } catch (error) {
        toast.error(handleAxiosError(error).message);
    }
};

export const removeTask = async (taskId: number) => {
    try {
        const response = await api.delete(`/todos/${taskId}`);
        toast.success("Task deleted successfully");
        return response.data;
    } catch (error) {
        toast.error(handleAxiosError(error).message);
    }
};
