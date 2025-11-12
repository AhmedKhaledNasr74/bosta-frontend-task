import { useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea"; // use Textarea instead of Input
import { Button } from "./ui/button";
import { useTasks } from "@/contexts/TasksContext";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import type Task from "@/interfaces/Task";
import { useCategories } from "@/contexts/CategoriesContext";
import { Loader } from "lucide-react";

type AddTaskModalProps = {
    onClose: () => void;
};

const AddTaskModal = ({ onClose }: AddTaskModalProps) => {
    const { addTask, adding } = useTasks();
    const { categories } = useCategories();

    const [task, setTask] = useState<Task>({
        todo: "",
        completed: false,
        categoryId: null,
        position: 1,
        id: Date.now(),
        userId: 1,
    });

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="bg-background rounded-lg shadow-lg w-full max-w-md p-4">
                <CardTitle className="text-xl mb-2">Add New Task</CardTitle>
                <CardContent className="flex flex-col gap-4">
                    <Textarea
                        placeholder="Task description"
                        className="resize-none"
                        onChange={(e) =>
                            setTask((prev) => ({
                                ...prev,
                                todo: e.target.value,
                            }))
                        }
                    />

                    <Select
                        value={task.categoryId || "none"}
                        onValueChange={(value) =>
                            setTask((prev) => ({
                                ...prev,
                                categoryId: value === "none" ? null : value,
                            }))
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">No category</SelectItem>
                            {categories.map((c) => (
                                <SelectItem key={c.id} value={c.id}>
                                    <div className="flex gap-2 items-center">
                                        <div> {c.name}</div>
                                        <div
                                            className="p-1.5 rounded-full"
                                            style={{
                                                backgroundColor: c.color,
                                            }}
                                        ></div>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={async () => {
                            if (!task.todo.trim()) return;
                            const addedTask = await addTask({
                                ...task,
                                id: Date.now(),
                            });
                            if (addedTask) onClose();
                        }}
                        disabled={adding}
                        className="min-w-[100px]"
                    >
                        {adding ? (
                            <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                            "Add Task"
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default AddTaskModal;
