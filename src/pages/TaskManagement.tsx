import TasksList from "@/components/TasksList";
import { ThemeToggle } from "@/components/themeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTasks } from "@/contexts/TasksContext";
export const TaskManagement = () => {
    const { status, setStatus, setSearch } = useTasks();

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
            <div className="flex justify-between">
                {/* filters */}
                <div className="flex gap-2">
                    {["all", "active", "completed"].map((filter) => (
                        <Button
                            key={filter}
                            variant={status === filter ? "default" : "outline"}
                            onClick={() => setStatus(filter)}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </Button>
                    ))}
                </div>
                {/* add new task */}
                <Button className="px-8">Add Task</Button>
            </div>
            {/* tasks list */}
            <TasksList />
        </div>
    );
};

export default TaskManagement;
