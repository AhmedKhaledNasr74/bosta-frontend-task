import { getAllTasks, removeTask, updateTask } from "@/apis/taskManagement";

import type Task from "@/interfaces/Task";
import { createContext, useContext, useEffect, useState } from "react";

interface TasksContextType {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    deleteTask: (taskId: number) => Promise<void>;
    editTask: (taskId: number, newTask: Task) => Promise<void>;
    addTask: (task: Task) => Promise<void>;
    loading: boolean;
}

const TasksContext = createContext<TasksContextType | null>(null);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<Task[] | null>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            const data = await getAllTasks();
            if (data) setTasks(data);
            else setTasks(null);
            setLoading(false);
        };
        fetchTasks();
    }, []);

    const deleteTask = async (taskId: number) => {
        const deletedTask = await removeTask(taskId);
        if (deletedTask) {
            setTasks((prevTasks) =>
                prevTasks ? prevTasks.filter((task) => task.id !== taskId) : []
            );
        }
    };

    const editTask = async (taskId: number, newTask: Task) => {
        const editedTask = await updateTask(taskId, newTask);
        if (editedTask) {
            setTasks((prevTasks) =>
                prevTasks
                    ? prevTasks.map((task) =>
                          task.id === taskId ? editedTask : task
                      )
                    : []
            );
        }
    };

    return (
        <TasksContext.Provider
            value={{ tasks, loading, deleteTask, editTask } as TasksContextType}
        >
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TasksContext);
    if (!context)
        throw new Error("useTasks must be used within a TasksProvider");
    return context;
};
