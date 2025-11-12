import type Task from "@/interfaces/Task";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { useEffect, useRef, useState } from "react";
import { useTasks } from "@/contexts/TasksContext";
import { Button } from "./ui/button";
import { Check, Edit, GripVertical, Loader, Trash2 } from "lucide-react";
import { useCategories } from "@/contexts/CategoriesContext";
import { Textarea } from "./ui/textarea";

type TaskProps = { task: Task; dragHandleProps: any };

export default function TaskCard({ task, dragHandleProps }: TaskProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [content, setContent] = useState<string>(task.todo || "");
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const { deleteTask, editTask } = useTasks();
    const { categories } = useCategories();
    const category = categories.find((c) => c.id === task.categoryId);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.focus();
            textarea.setSelectionRange(
                textarea.value.length,
                textarea.value.length
            );
        }
    }, [isEditing]);

    const handleSubmit = async () => {
        setIsSaving(true);
        await editTask(task.id, {
            ...task,
            todo: content,
        });
        setIsSaving(false);
        setIsEditing(false);
    };

    const handleToggle = async () => {
        setIsSaving(true);
        await editTask(task.id, {
            ...task,
            completed: !task.completed,
        });
        setIsSaving(false);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        await deleteTask(task.id);
        setIsDeleting(false);
    };

    return (
        <Card
            className="p-4 w-full bg-background border shadow-xs hover:shadow-sm transition-all duration-200 hover:border-primary/20 group cursor-pointer"
            role="listitem"
        >
            <div className="flex items-center gap-4">
                {/* Drag Handle */}
                <div className="flex items-center gap-2">
                    <GripVertical
                        className="w-5 h-5 text-muted-foreground cursor-move"
                        aria-label="Drag to reorder task"
                        {...dragHandleProps}
                    />
                    <Checkbox
                        className="w-5 h-5 transition-colors"
                        checked={task.completed}
                        onCheckedChange={handleToggle}
                        disabled={isSaving}
                        aria-label={
                            task.completed
                                ? `Mark "${task.todo}" as incomplete`
                                : `Mark "${task.todo}" as complete`
                        }
                    />
                </div>

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        {isEditing ? (
                            <Textarea
                                ref={textareaRef}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSubmit();
                                }}
                                autoFocus
                                className="w-full bg-background border border-border focus:border-primary focus:ring-0 shadow-sm"
                                aria-label="Edit task content"
                            />
                        ) : (
                            <div className="w-full relative flex items-center justify-between gap-2">
                                <div
                                    className={`text-foreground text-base font-medium leading-relaxed wrap-anywhere z-10 ${
                                        task.completed
                                            ? "line-through text-muted-foreground"
                                            : ""
                                    }`}
                                >
                                    {task.todo}
                                </div>
                                {category && (
                                    <span
                                        className="px-2 py-1 rounded-full text-xs font-medium h-fit"
                                        style={{
                                            backgroundColor:
                                                category.color + "22",
                                            color: category.color,
                                        }}
                                        aria-label={`Category: ${category.name}`}
                                    >
                                        {category.name}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1">
                    {isEditing ? (
                        <Button
                            variant="ghost"
                            className="p-1.5 h-fit text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                            onClick={handleSubmit}
                            disabled={isSaving}
                            aria-label="Save task"
                        >
                            {isSaving ? (
                                <Loader className="w-4 h-4 text-primary animate-spin" />
                            ) : (
                                <Check className="w-4 h-4" />
                            )}
                        </Button>
                    ) : (
                        <Button
                            variant="ghost"
                            className="p-1.5 h-fit text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                            onClick={() => {
                                setContent(task.todo);
                                setIsEditing(true);
                            }}
                            disabled={isSaving}
                            aria-label="Edit task"
                        >
                            {isSaving ? (
                                <Loader className="w-4 h-4 text-primary animate-spin" />
                            ) : (
                                <Edit className="w-4 h-4" />
                            )}
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        className="p-1.5 h-fit text-muted-foreground hover:text-destructive hover:bg-accent rounded-md transition-colors"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        aria-label="Delete task"
                    >
                        {isDeleting ? (
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
