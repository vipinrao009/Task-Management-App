import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TaskForm from "./pages/TaskForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/task-form" element={<TaskForm/>}/>
        <Route path="/task-form/:id" element={<TaskForm/>}/>
      </Routes>
    </Router>
  )
}

export default App

