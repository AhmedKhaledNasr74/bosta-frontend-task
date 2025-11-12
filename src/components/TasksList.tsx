import { useTasks } from "@/contexts/TasksContext";
import TaskCard from "./Task";
import { useState, useEffect } from "react";

import {
    DndContext,
    TouchSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
    closestCorners,
    MouseSensor,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import type Task from "@/interfaces/Task";

function SortableTask({ task }: { task: Task }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: task.id });

    const style = {
        transform: transform
            ? `translate3d(0, ${transform.y}px, 0)` // vertical only
            : undefined,
        transition,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <TaskCard
                task={task}
                dragHandleProps={{ ...attributes, ...listeners }}
            />
        </div>
    );
}

export default function TasksList() {
    const { tasks, allTasks, setAllTasks, loading } = useTasks();
    const [items, setItems] = useState(tasks);

    useEffect(() => {
        setItems(tasks);
    }, [tasks]);

    const sensors = useSensors(
        useSensor(TouchSensor),
        useSensor(MouseSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = items.findIndex((t) => t.id === active.id);
        const newIndex = items.findIndex((t) => t.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        setItems(newItems);

        if (allTasks) {
            const newAllTasks = [...allTasks];
            newItems.forEach((task, index) => {
                const idx = newAllTasks.findIndex((t) => t.id === task.id);
                if (idx !== -1) {
                    newAllTasks[idx] = { ...task, position: index + 1 };
                }
            });
            setAllTasks(newAllTasks);
        }
    };

    if (loading)
        return (
            <div className="flex flex-col flex-1 justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3 text-muted-foreground">
                    Loading tasks...
                </span>
            </div>
        );

    if (!items)
        return (
            <div className="text-center py-16 text-muted-foreground">
                <div className="text-lg font-medium mb-2">
                    There is an error
                </div>
                <div className="text-sm">
                    please refresh the page or try again later
                </div>
            </div>
        );

    if (items.length === 0)
        return (
            <div className="text-center py-16 text-muted-foreground">
                <div className="text-lg font-medium mb-2">No tasks here</div>
                <div className="text-sm">
                    Create your first task to get started
                </div>
            </div>
        );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-3">
                    {items.map((task) => (
                        <SortableTask key={task.id} task={task} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}
