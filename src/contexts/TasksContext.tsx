import {
    addNewTask,
    getAllTasks,
    removeTask,
    updateTask,
} from "@/apis/taskManagement";
import type Task from "@/interfaces/Task";
import { createContext, useContext, useEffect, useState } from "react";

interface TasksContextType {
    tasks: Task[];
    allTasks: Task[];
    setAllTasks: (tasks: Task[]) => void;
    setTasks: (tasks: Task[]) => void;
    deleteTask: (taskId: number) => Promise<void>;
    editTask: (taskId: number, newTask: Task) => Promise<void>;
    addTask: (task: Task) => Promise<any>;
    setStatus: (status: string) => void;
    setCategory: (category: string) => void;
    status: string;
    category: string;
    loading: boolean;
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
                const orderedData = data.map((task: Task, index: number) => ({
                    ...task,
                    position: index,
                }));
                setAllTasks(orderedData);
                setTasks(orderedData);
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

        if (category !== "all") {
            filteredTasks = filteredTasks.filter(
                (task) => task.categoryId === category
            );
        }

        return filteredTasks
            .filter((task) =>
                task.todo.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) => a.position - b.position);
    };

    useEffect(() => {
        setTasks(filterTasks());
    }, [category, status, allTasks, search]);

    const deleteTask = async (taskId: number) => {
        const deletedTask = await removeTask(1);
        if (deletedTask) {
            setAllTasks((prevTasks) =>
                prevTasks ? prevTasks.filter((task) => task.id !== taskId) : []
            );
        }
    };

    const editTask = async (taskId: number, newTask: Task) => {
        const editedTask = await updateTask(1, newTask);
        if (editedTask) {
            setAllTasks((prevTasks) =>
                prevTasks
                    ? prevTasks.map((task) =>
                          task.id === taskId
                              ? { ...newTask, position: newTask.position }
                              : task
                      )
                    : []
            );
        }
    };

    const addTask = async (task: Task) => {
        const addedTask = await addNewTask(task);

        if (addedTask) {
            setAllTasks((prevTasks) => {
                if (!prevTasks) return [{ ...task, position: 1 }];

                const updatedTasks = [
                    { ...task, position: 1 },
                    ...prevTasks.map((t) => ({
                        ...t,
                        position: t.position + 1,
                    })),
                ];

                return updatedTasks;
            });
        }

        return addedTask;
    };

    return (
        <TasksContext.Provider
            value={
                {
                    allTasks,
                    setAllTasks,
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
                    addTask,
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
