import { useState } from "react";

function Login({ onLogin, onSwitchToSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      onLogin(foundUser.username);
    } else {
      alert("❌ Invalid username or password");
    }
  };

  return (
    <div style={styles.container}>
      <h2>🔐 Nonsense Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p>
        Don’t have an account?{" "}
        <span style={{ color: "blue", cursor: "pointer" }} onClick={onSwitchToSignup}>
          Sign up here
        </span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "250px",
    margin: "0 auto",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid gray",
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    background: "purple",
    color: "white",
    cursor: "pointer",
  },
};

export default Login;
