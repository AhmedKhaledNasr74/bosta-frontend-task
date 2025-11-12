import { useTasks } from "@/contexts/TasksContext";

const StatisticsLine = () => {
    const { allTasks } = useTasks();
    const total = allTasks?.length ?? 0;
    const completed = allTasks?.filter((t) => t.completed).length ?? 0;
    return (
        <div className="flex flex-col  gap-2 px-2">
            <div className="text-sm text-muted-foreground text-end">
                {completed + "/" + total}
            </div>
            <div className="w-full h-1 bg-gray-200 rounded">
                <div
                    className="h-1 bg-linear-to-r  to-primary from-primary/50  rounded"
                    style={{ width: `${(completed / total) * 100}%` }}
                ></div>
            </div>
        </div>
    );
};

export default StatisticsLine;
