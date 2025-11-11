export default interface Task {
    id: number;
    todo: string;
    completed: boolean;
    userId?: number;
    categoryId?: string | null;
    position: number;
}
