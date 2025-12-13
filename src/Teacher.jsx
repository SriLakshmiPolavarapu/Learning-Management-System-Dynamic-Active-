export default function Teacher({ setRole }) {
    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 40 }}>

        <h2>Teacher Dashboard</h2>
  
        <p>Here teachers will:</p>
        <ul style={{ listStyle: "none" }}>
          <li>Create assignments</li>
          <li>Grade submissions</li>
          <li>Upload materials</li>
        </ul>
  
        <button onClick={() => setRole(null)}>Logout</button>
      </div>
    );
  }
  