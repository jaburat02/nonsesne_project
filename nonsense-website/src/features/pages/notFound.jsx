function NotFound() {
  return (
    <div style={styles.container}>
      <h1>😵 404 Page Not Found</h1>
      <p>The nonsense you’re looking for doesn’t exist.</p>
      <img
        src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif"
        alt="404 gif"
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

export default NotFound;
