function Offline() {
  return (
    <div style={styles.container}>
      <h1>📴 You’re Offline</h1>
      <p>No internet connection detected.</p>
      <img
        src="https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif"
        alt="Offline gif"
        style={styles.img}
      />
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  img: {
    marginTop: "20px",
    width: "300px",
    borderRadius: "10px",
  },
};

export default Offline;
