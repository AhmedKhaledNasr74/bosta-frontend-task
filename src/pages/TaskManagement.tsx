import AddTaskModal from "@/components/AddTaskModal";
import TasksList from "@/components/TasksList";
import { ThemeToggle } from "@/components/themeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTasks } from "@/contexts/TasksContext";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/contexts/CategoriesContext";
import AddCategoryModal from "@/components/AddCategoryModal";
const TaskManagement = () => {
    const { status, setStatus, setSearch } = useTasks();
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    const { categories } = useCategories();
    const { category, setCategory } = useTasks();

    return (
        <div className="max-w-5xl flex flex-col gap-y-4 py-10 px-4 w-full">
            {/* settings */}
            <div>
                <ThemeToggle />
            </div>
            <Input
                placeholder="Search Tasks..."
                className="hover:shadow-md p-5"
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex justify-between gap-4">
                {/* filters */}
                <div className="flex flex-wrap gap-4 w-full items-center justify-between">
                    <div className="flex flex-wrap gap-2 items-center  w-full md:w-fit order-2 md:order-1">
                        {/* Status filter select */}
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="flex-1 min-w-[180px]">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="completed">
                                    Completed
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {/* Category filter select */}
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="flex-1 min-w-[180px]">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Categories
                                </SelectItem>
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
                    </div>

                    <div className="flex gap-3 flex-1 md:flex-initial order-1 md:order-2">
                        <Button
                            className="px-10 flex-1 md:flex-initial border border-border"
                            variant={"secondary"}
                            onClick={() => setShowCategoryModal(true)}
                        >
                            Add Category
                        </Button>
                        {/* add new task */}
                        <Button
                            className="px-10 flex-1 md:flex-initial"
                            onClick={() => setShowTaskModal(true)}
                        >
                            Add Task
                        </Button>
                    </div>
                </div>

                {showTaskModal && (
                    <AddTaskModal onClose={() => setShowTaskModal(false)} />
                )}
                {showCategoryModal && (
                    <AddCategoryModal
                        onClose={() => setShowCategoryModal(false)}
                    />
                )}
            </div>
            <TasksList />
        </div>
    );
};

export default TaskManagement;
