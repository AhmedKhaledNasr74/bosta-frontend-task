import type Task from "@/interfaces/Task";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { useTasks } from "@/contexts/TasksContext";
import { Button } from "./ui/button";
import { Check, Edit, GripVertical, Loader, Trash2 } from "lucide-react";
import { useCategories } from "@/contexts/CategoriesContext";

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

    const { deleteTask, editTask, deleting, editing } = useTasks();
    const { categories } = useCategories();
    const category = categories.find((c) => c.id === task.categoryId);
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
                        checked={task.completed}
                        onCheckedChange={() => handleToggle(task.id)}
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        {isEditing ? (
                            <textarea
                                defaultValue={task.todo}
                                onChange={(e) => setContent(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSubmit();
                                    }
                                }}
                                autoFocus
                                className="w-full  bg-background border border-border focus:border-primary focus:ring-0 shadow-sm"
                            />
                        ) : (
                            <div className="w-full relative flex items-center justify-between gap-2">
                                <div className="text-foreground  text-base font-medium leading-relaxed wrap-anywhere z-10">
                                    {task.todo}
                                </div>
                                {category && (
                                    <span
                                        className="px-2 py-1 rounded-full text-xs font-medium h-fit"
                                        style={{
                                            backgroundColor:
                                                category.color + "22", // transparent bg
                                            color: category.color,
                                        }}
                                    >
                                        {category.name}
                                    </span>
                                )}
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
                            disabled={editing}
                        >
                            {editing ? (
                                <Loader className="w-4 h-4 text-primary animate-spin" />
                            ) : (
                                <Edit className="w-4 h-4" />
                            )}
                        </Button>
                    )}
                    <Button
                        variant={"ghost"}
                        className="p-1.5! h-fit text-muted-foreground hover:text-destructive hover:bg-accent rounded-md transition-colors"
                        onClick={() => deleteTask(task.id)}
                        disabled={deleting}
                    >
                        {deleting ? (
                            <Loader className="w-4 h-4 text-primary animate-spin" />
                        ) : (
                            <Trash2 className="w-4 h-4" />
                        )}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
