import { Toaster } from "react-hot-toast";
import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeToggle } from "./components/themeToggle";

function App() {
    return (
        <ThemeProvider>
            <div className="  min-h-screen flex justify-center bg-background ">
                <Toaster position="top-right" />
                <ThemeToggle />
            </div>
        </ThemeProvider>
    );
}

export default App;
