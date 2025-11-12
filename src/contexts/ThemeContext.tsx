import React, {
    createContext,
    useState,
    useContext,
    type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        if (savedTheme) {
            document.documentElement.classList.toggle(
                "dark",
                savedTheme === "dark"
            );
            return savedTheme;
        }
        return "light";
    });

    const toggleTheme = () => {
        // Temporarily disable transitions
        const html = document.documentElement;
        html.classList.add("disable-transitions");

        setTheme((prev) => {
            const newTheme = prev === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            html.classList.toggle("dark", newTheme === "dark");
            return newTheme;
        });

        // Force a reflow so the class takes effect, then remove it
        requestAnimationFrame(() => {
            html.classList.remove("disable-transitions");
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
