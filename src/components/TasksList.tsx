import { useTasks } from "@/contexts/TasksContext";
import TaskCard from "./Task";

export default function TasksList() {
    const { tasks, loading } = useTasks();

    if (loading)
        return (
            <div className="flex flex-col flex-1 justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3 text-muted-foreground">
                    Loading tasks...
                </span>
            </div>
        );

    if (!tasks)
        return (
            <div className="text-center py-12 text-muted-foreground">
                <div className="text-lg font-medium mb-2">No tasks found</div>
                <div className="text-sm">
                    Something went wrong while loading your tasks
                </div>
            </div>
        );

    if (tasks.length === 0)
        return (
            <div className="text-center py-16 text-muted-foreground">
                <div className="text-lg font-medium mb-2">No tasks yet</div>
                <div className="text-sm">
                    Create your first task to get started
                </div>
            </div>
        );

    return (
        <div className="space-y-3">
            {tasks.map((task, index) => (
                <TaskCard task={task} key={task.id || index} />
            ))}
        </div>
    );
}
