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
    setStatus: (status: string) => void;
    setCategory: (category: string) => void;
    status: string;
    category: string;
    search: string;
    setSearch: (search: string) => void;
}

const TasksContext = createContext<TasksContextType | null>(null);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
    const [allTasks, setAllTasks] = useState<Task[] | null>([]);
    const [tasks, setTasks] = useState<Task[] | null>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [status, setStatus] = useState<string>("all");
    const [category, setCategory] = useState<string>("all");
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            const data = await getAllTasks();
            if (data) {
                setAllTasks(data);
                setTasks(data);
            } else {
                setAllTasks(null);
                setTasks(null);
            }
            setLoading(false);
        };
        fetchTasks();
    }, []);

    const filterTasks = () => {
        let filteredTasks = allTasks ? [...allTasks] : [];
        if (status !== "all") {
            const isCompleted = status === "completed";
            filteredTasks = filteredTasks.filter(
                (task) => task.completed === isCompleted
            );
        }

        return filteredTasks.filter((task) =>
            task.todo.toLowerCase().includes(search.toLowerCase())
        );
    };

    useEffect(() => {
        setTasks(filterTasks());
    }, [category, status, allTasks, search]);

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
            value={
                {
                    tasks,
                    loading,
                    deleteTask,
                    editTask,
                    category,
                    status,
                    setCategory,
                    setStatus,
                    search,
                    setSearch,
                } as TasksContextType
            }
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
