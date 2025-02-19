import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Blocks from "../components/Blocks";
import AddTask from "../pages/AddTask";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "../pages/Signup";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Blocks />,
      },
      {
        path: "add-task",
        element: <AddTask />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default appRoutes;
