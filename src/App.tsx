import { Toaster } from "react-hot-toast";
import "./App.css";
import TaskManagement from "./pages/TaskManagement";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TasksProvider } from "./contexts/TasksContext";
import { CategoriesProvider } from "./contexts/CategoriesContext";

function App() {
    return (
        <div className="  min-h-screen flex justify-center bg-background ">
            <ThemeProvider>
                <CategoriesProvider>
                    <TasksProvider>
                        <Toaster position="top-right" />
                        <TaskManagement />
                    </TasksProvider>
                </CategoriesProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
