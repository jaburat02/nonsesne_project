import { useState } from "react";

function Signup({ onSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // get all users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // check if username already exists
    if (users.find((u) => u.username === username)) {
      alert("⚠️ Username already exists!");
      return;
    }

    // add new user
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Signup successful! Please log in.");
    onSignup(); // switch back to login page
  };

  return (
    <div style={styles.container}>
      <h2>📝 Nonsense Signup</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Choose a Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Choose a Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
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
    background: "green",
    color: "white",
    cursor: "pointer",
  },
};

export default Signup;
