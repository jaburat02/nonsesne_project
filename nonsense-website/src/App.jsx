import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./features/login/Login";
import Signup from "./features/login/Signup";

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser).username);
    }

    // Detect offline
    function handleOffline() {
      navigate("/offline");
    }
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, [navigate]);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user) {
    return showSignup ? (
      <Signup onSignup={() => setShowSignup(false)} />
    ) : (
      <Login onLogin={handleLogin} onSwitchToSignup={() => setShowSignup(true)} />
    );
  }

  return (
    <div className="app">
      <h1>🎉 Welcome {user} to the Nonsense Website 🎉</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default App;
