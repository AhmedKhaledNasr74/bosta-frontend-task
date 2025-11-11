import type { Category } from "@/interfaces/Category";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CategoriesContextType {
    categories: Category[];
    addCategory: (name: string, color: string) => void;
    removeCategory: (id: string) => void;
}

const CategoriesContext = createContext<CategoriesContextType | null>(null);

export const CategoriesProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("categories");
        if (stored) setCategories(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(categories));
    }, [categories]);

    const addCategory = (name: string, color: string) => {
        const newCat: Category = {
            id: crypto.randomUUID(),
            name,
            color,
        };
        setCategories((prev) => [...prev, newCat]);
        toast.success("Category added successfully");
    };

    const removeCategory = (id: string) => {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        toast.success("Category removed successfully");
    };

    return (
        <CategoriesContext.Provider
            value={{ categories, addCategory, removeCategory }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategories = () => {
    const context = useContext(CategoriesContext);
    if (!context)
        throw new Error("useCategories must be used inside CategoriesProvider");
    return context;
};
