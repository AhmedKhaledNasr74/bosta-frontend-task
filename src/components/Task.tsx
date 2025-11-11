import type Task from "@/interfaces/Task";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { useTasks } from "@/contexts/TasksContext";
import { Button } from "./ui/button";
import { Check, Edit, GripVertical, Trash2 } from "lucide-react";
import { Input } from "./ui/input";

type TaskProps = { task: Task; dragHandleProps: any };

export default function TaskCard({ task, dragHandleProps }: TaskProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [content, setContent] = useState<string>(task.todo || "");
    const [isDone, setIsDone] = useState<boolean>(task.completed || false);
    const handleSubmit = () => {
        setIsEditing(false);
        editTask(task.id, {
            ...task,
            todo: content,
        });
    };

    const handleToggle = (taskId: number) => {
        setIsDone(!isDone);
        editTask(taskId, {
            ...task,
            completed: !isDone,
        });
    };

    const { deleteTask, editTask } = useTasks();
    return (
        <Card className="p-4 w-full bg-background border shadow-xs hover:shadow-sm transition-all duration-200 hover:border-primary/20 group cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <GripVertical
                        className="w-5 h-5  text-muted-foreground cursor-move"
                        {...dragHandleProps}
                    />
                    <Checkbox
                        className="w-5 h-5  transition-colors"
                        // Add checked state and onChange handler if needed
                        checked={task.completed}
                        onCheckedChange={() => handleToggle(task.id)}
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        {isEditing ? (
                            <Input
                                defaultValue={task.todo}
                                onChange={(e) => setContent(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSubmit();
                                    }
                                }}
                                autoFocus
                                type="text"
                                className="w-full bg-background border border-border focus:border-primary focus:ring-0 shadow-sm"
                            />
                        ) : (
                            <div className="text-foreground text-base font-medium leading-relaxed">
                                {task.todo}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {isEditing ? (
                        <Button
                            variant={"ghost"}
                            className="p-1.5! h-fit text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                            onClick={handleSubmit}
                        >
                            <Check className="w-4 h-4" />
                        </Button>
                    ) : (
                        <Button
                            variant={"ghost"}
                            className="p-1.5! h-fit text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                            onClick={() => setIsEditing(true)}
                        >
                            <Edit className="w-4 h-4" />
                        </Button>
                    )}
                    <Button
                        variant={"ghost"}
                        className="p-1.5! h-fit text-muted-foreground hover:text-destructive hover:bg-accent rounded-md transition-colors"
                        onClick={() => deleteTask(task.id)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}
