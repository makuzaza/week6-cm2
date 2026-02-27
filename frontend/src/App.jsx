import { useState } from "react";
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  const addJob = async (newJob) => {
    const token = localStorage.getItem("token");
    await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(newJob),
    });
  };

  const deleteJob = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  };

  const updateJob = async (job) => {
    const token = localStorage.getItem("token");
    await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(job),
    });
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <MainLayout
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />
        }
      >
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />

        <Route
          path="/add-job"
          element={
            isAuthenticated ? (
              <AddJobPage addJobSubmit={addJob} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/edit-job/:id"
          element={
            isAuthenticated ? (
              <EditJobPage updateJobSubmit={updateJob} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
          loader={jobLoader}
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignupPage setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default App;
