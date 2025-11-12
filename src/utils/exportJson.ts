import type Task from "@/interfaces/Task";

export default function exportTasks(allTasks: Task[]) {
    const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(allTasks));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "tasks.json");
    dlAnchor.click();
}
