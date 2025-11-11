import { Toaster } from "react-hot-toast";
import "./App.css";
import TaskManagement from "./pages/TaskManagement";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TasksProvider } from "./contexts/TasksContext";
import { CategoriesProvider } from "./contexts/CategoriesContext";

function App() {
    return (
        <ThemeProvider>
            <div className="  min-h-screen flex justify-center bg-background ">
                <Toaster position="top-right" />
                <CategoriesProvider>
                    <TasksProvider>
                        <TaskManagement />
                    </TasksProvider>
                </CategoriesProvider>
            </div>
        </ThemeProvider>
    );
}

export default App;
