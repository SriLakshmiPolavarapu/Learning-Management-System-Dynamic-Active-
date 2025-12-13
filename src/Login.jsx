export default function Login({ setRole }) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>Learning Management System (K-12)</h1>
          <p style={styles.subtitle}>Select your role to continue</p>
  
          <button
            style={{ ...styles.button, background: "blue" }}
            onClick={() => setRole("student")}
          >
            Login as Student
          </button>
  
          <button
            style={{ ...styles.button, background: "green" }}
            onClick={() => setRole("teacher")}
          >
            Login as Teacher
          </button>
        </div>
      </div>
    );
  }
  
  const styles = {
    page: {
      background: "#0f172a",
      minHeight: "100vh",
      paddingTop: "60px",
    },
    card: {
      maxWidth: "600px",
      margin: "0 auto",
      background: "#020617",
      padding: "35px",
      borderRadius: "16px",
      textAlign: "center",
      boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
    },
    title: {
      margin: 0,
      fontSize: "28px",
      color: "white",
    },
    subtitle: {
      margin: "8px 0 24px",
      color: "grey",
    },
    button: {
      width: "60%",
      padding: "15px",
      border: "none",
      borderRadius: "10px",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
      marginBottom: "15px",
    },
  };
  