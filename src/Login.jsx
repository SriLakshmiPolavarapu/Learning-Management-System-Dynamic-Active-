export default function Login({ setRole }) {
    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 40 }}>

        <h1>K–12 Learning Management System</h1>
        <p>Select your role</p>
  
        <button onClick={() => setRole("student")}>
          Login as Student
        </button>
  
        <br /><br />
  
        <button onClick={() => setRole("teacher")}>
          Login as Teacher
        </button>
      </div>
    );
  }

  