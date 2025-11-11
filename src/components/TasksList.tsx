import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useTasks } from "@/contexts/TasksContext";

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
                <Card
                    className="p-4 w-full bg-background border shadow-xs hover:shadow-sm transition-all duration-200 hover:border-primary/20 group cursor-pointer"
                    key={task.id || index}
                >
                    <div className="flex items-center gap-4">
                        <Checkbox
                            className="w-5 h-5 mt-0.5 transition-colors"
                            checked={task.completed}
                        />

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <div className="text-foreground text-base font-medium leading-relaxed">
                                    {task.todo}
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                                variant={"ghost"}
                                className="p-1.5! h-fit text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                            >
                                <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={"ghost"}
                                className="p-1.5! h-fit text-muted-foreground hover:text-destructive hover:bg-accent rounded-md transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
