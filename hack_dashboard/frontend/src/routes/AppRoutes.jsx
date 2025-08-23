import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../features/Login";
import Signup from "../features/Signup";
import Dashboard from "../features/Dashboard";
import Logs from "../features/Logs";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </Router>
  );
}
