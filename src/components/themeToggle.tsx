import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            onClick={toggleTheme}
            aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
            } mode`}
            className="relative h-fit hover:bg-primary/50 flex items-center rounded-md p-1 bg-muted border border-border transition-all duration-200 ease-in-out "
        >
            <div
                className={`w-6 h-6 bg-background rounded shadow-sm transition-transform duration-200 ease-in-out flex items-center justify-center `}
            >
                {theme === "light" ? (
                    <Sun className="w-5 h-5 text-muted-foreground" />
                ) : (
                    <Moon className="w-5 h-5 text-muted-foreground" />
                )}
            </div>
        </Button>
    );
};
