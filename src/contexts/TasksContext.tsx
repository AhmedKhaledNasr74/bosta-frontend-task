import { getAllTasks } from "@/apis/taskManagement";
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

    return (
        <TasksContext.Provider value={{ tasks, loading } as TasksContextType}>
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
