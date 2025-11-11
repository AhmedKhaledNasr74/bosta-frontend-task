import TasksList from "@/components/TasksList";
import { ThemeToggle } from "@/components/themeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export const TaskManagement = () => {
    return (
        <div className="max-w-5xl flex flex-col gap-y-4 py-10 px-4 w-full">
            {/* settings */}
            <div>
                <ThemeToggle />
            </div>
            <Input
                placeholder="Search Tasks..."
                className="hover:shadow-md p-5"
            />
            <div className="flex justify-between">
                {/* filters */}
                <div className="flex gap-2 ">
                    <Button variant={"outline"}>All</Button>
                    <Button variant={"outline"}>Active</Button>
                    <Button variant={"outline"}>Completed</Button>
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
