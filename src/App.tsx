import { Toaster } from "react-hot-toast";
import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import TaskManagement from "./pages/TaskManagement";
import { TasksProvider } from "./contexts/TasksContext";

function App() {
    return (
        <ThemeProvider>
            <div className="  min-h-screen flex justify-center bg-background ">
                <Toaster position="top-right" />
                <TasksProvider>
                    <TaskManagement />
                </TasksProvider>
            </div>
        </ThemeProvider>
    );
}

export default App;
