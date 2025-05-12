import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { DashboardLayout } from "./pages/DashboardLayout";
import { Tasks } from "./pages/Tasks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TaskProvider } from "./context/TaskContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { FocusSession } from "./pages/FocusSession";
import { Profile } from "./pages/Profile";
import { Home } from "./pages/Home";
import { FeaturesPage } from "./pages/FeaturesPage";
import { PublicRoute } from "./components/PublicRoute";
import { Docs } from "./pages/Docs";

function App() {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <TaskProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/docs" element={<Docs />} />
                <Route
                  path="/signup"
                  element={
                    <PublicRoute>
                      <SignUp />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/signin"
                  element={
                    <PublicRoute>
                      <SignIn />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Tasks />} />
                  <Route path="tasks" element={<Tasks />} />
                  <Route path="focus-session" element={<FocusSession />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
              </Routes>
            </BrowserRouter>
            <ToastContainer position="top-right" autoClose={1500} />
          </TaskProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
