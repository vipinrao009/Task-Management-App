import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TaskForm from "./pages/TaskForm";
import PrivateRoute from "./api/privateRoute.jsx";
import Register from "./pages/Register.jsx";

const App = () => {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task-form" element={<TaskForm />} />
          <Route path="/task-form/:id" element={<TaskForm />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
